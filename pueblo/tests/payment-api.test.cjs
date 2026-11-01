const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const {webcrypto}=require('node:crypto');
function setup({paymentState='REVIEW_REQUIRED',orderState='PENDING_PAYMENT',postError}={}){
 const calls=[];const saved=new Map();const id='12345678-1234-1234-1234-123456789abc';
 const client={get:async(url,config)=>{calls.push({url,config});return {data:{data:{orderId:id,status:url.includes('/payments/')?paymentState:orderState,totalAmount:39000}}}},post:async(url,body,config)=>{calls.push({url,body,config});if(postError)throw postError;return {data:{data:url==='/checkout/quotes'?{quoteId:id}:url==='/orders'?{orderId:id}:{status:'SUCCEEDED'}}}}};
 const source=fs.readFileSync('src/pages/checkout/paymentApi.ts','utf8').replaceAll('import.meta.env.DEV','true');
 const exports={};vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,require:name=>name==='axios'?({default:{create:()=>client,isAxiosError:error=>error?.isAxiosError===true}}):{checkTokenExpiration:()=>{}},localStorage:{getItem:()=> 'member-token'},sessionStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)},crypto:webcrypto,TextEncoder});return {...exports,calls,id,saved};
}
test('order retries reuse the persisted server order and send the same member auth',async()=>{
 const api=setup();const items=[{productId:api.id,skuId:api.id,quantity:1}];const shipping={recipient:'A',phone:'01012345678',postalCode:'12345',address1:'Address',address2:''};
 assert.equal(await api.createOrder(items,shipping),api.id);
 assert.equal(await api.createOrder(items,shipping),api.id);
 assert.equal(api.calls.length,3);
 assert.equal(api.calls[1].config.headers.Authorization,'Bearer member-token');
 assert.match(api.calls[1].config.headers['Idempotency-Key'],api.uuid);
 assert.equal(api.calls[1].body.quoteId,api.id);
 assert.equal(api.calls[1].body.purchaseTermsVersion,'purchase-v1');
});
test('only PENDING_PAYMENT with valid server amount can proceed; confirm uses contract',async()=>{
 const api=setup();assert.throws(()=>api.payable({status:'PREPARING',totalAmount:39000}));assert.throws(()=>api.payable({status:'PENDING_PAYMENT',totalAmount:NaN}));
 assert.equal(await api.confirm(api.id,'payment-key',39000),'SUCCEEDED');
 assert.equal(api.calls[0].url,'/payments/confirm');assert.equal(api.calls[0].body.amount,39000);
 assert.equal(api.calls[0].config.headers.Authorization,'Bearer member-token');
});

test('invalid shipping is rejected before quote or order creation',async()=>{
 const api=setup();const items=[{productId:api.id,skuId:api.id,quantity:1}];
 const shipping={recipient:'A',phone:'12312',postalCode:'test',address1:'Address',address2:''};
 await assert.rejects(api.createOrder(items,shipping),/연락처/);
 await assert.rejects(api.createOrder(items,{...shipping,phone:'01012345678'}),/우편번호/);
 assert.equal(api.calls.length,0);
});
test('missing payment status is distinct from a server UNKNOWN result',()=>{
 const api=setup();
 assert.equal(api.readPaymentStatus({data:{status:'UNKNOWN'}}),'UNKNOWN');
 assert.equal(api.readPaymentStatus({data:{status:'SUCCEEDED'}}),'SUCCEEDED');
 assert.throws(()=>api.readPaymentStatus({data:{}}),/상태 정보/);
});

test('request errors distinguish unavailable server, missing order and server failure',()=>{
 const api=setup();
 assert.match(api.message({isAxiosError:true,code:'ERR_NETWORK'}),/CORS/);
 assert.match(api.message({isAxiosError:true,code:'ECONNABORTED'}),/초과/);
 assert.match(api.message({isAxiosError:true,response:{status:404,data:{error:{code:'ORDER_NOT_FOUND'}}}}),/ORDER_NOT_FOUND/);
 assert.match(api.message({isAxiosError:true,response:{status:500,data:{}}}),/HTTP 500/);
});

test('recheck posts no body with Bearer then reloads order and payment; uncertain stays uncertain',async()=>{
 const api=setup({orderState:'RECONCILIATION_REQUIRED'});
 const result=await api.recheckPayment(api.id);
 assert.equal(api.calls[0].url,`/me/payments/orders/${api.id}/rechecks`);
 assert.equal(api.calls[0].body,undefined);
 assert.equal(api.calls[0].config.headers.Authorization,'Bearer member-token');
 assert.deepEqual(api.calls.map(c=>c.url),[`/me/payments/orders/${api.id}/rechecks`,`/me/orders/${api.id}`,`/me/payments/orders/${api.id}`]);
 assert.equal(result.order.status,'RECONCILIATION_REQUIRED');assert.equal(result.status,'REVIEW_REQUIRED');
});
test('recheck uses server final status and never guesses failure or retries a failed POST',async()=>{
 const api=setup({orderState:'PAID',paymentState:'SUCCEEDED'});
 assert.equal((await api.recheckPayment(api.id)).order.status,'PAID');
 const failure=new Error('timeout');const failing=setup({postError:failure});
 await assert.rejects(failing.recheckPayment(failing.id),/timeout/);assert.equal(failing.calls.length,1);
 await assert.rejects(failing.recheckPayment('invalid'),/UUID/);assert.equal(failing.calls.length,1);
});

test('server REJECTED releases old request for a fresh quote and idempotency key',async()=>{
 for(const changed of [false,true]){
  const api=setup({orderState:'REJECTED'});
  const items=[{productId:api.id,skuId:api.id,quantity:1}];const shipping={recipient:'A',phone:'01012345678',postalCode:'12345',address1:'Address',address2:''};
  await api.createOrder(items,shipping);
  const oldKey=api.calls[1].config.headers['Idempotency-Key'];
  await api.createOrder(items,{...shipping,address2:changed?'Updated':''});
  assert.deepEqual(api.calls.map(c=>c.url),['/checkout/quotes','/orders',`/me/orders/${api.id}`,'/checkout/quotes','/orders']);
  assert.notEqual(api.calls[4].config.headers['Idempotency-Key'],oldKey);
 }
});
test('uncertain orders retain saved request and block a changed checkout',async()=>{
 const api=setup({orderState:'RECONCILIATION_REQUIRED'});const items=[{productId:api.id,skuId:api.id,quantity:1}];const shipping={recipient:'A',phone:'01012345678',postalCode:'12345',address1:'Address',address2:''};
 await api.createOrder(items,shipping);const saved=api.saved.get('pueblo-order-request');
 await assert.rejects(api.createOrder(items,{...shipping,address2:'Updated'}),/이전 주문/);
 assert.equal(api.saved.get('pueblo-order-request'),saved);assert.equal(api.calls.length,3);
});
