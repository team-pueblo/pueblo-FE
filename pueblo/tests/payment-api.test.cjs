const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const {webcrypto}=require('node:crypto');
function setup(){
 const calls=[];const saved=new Map();const id='12345678-1234-1234-1234-123456789abc';
 const client={get:async(url,config)=>{calls.push({url,config});return {data:{data:{orderId:id,status:'PENDING_PAYMENT',totalAmount:39000}}}},post:async(url,body,config)=>{calls.push({url,body,config});return {data:{data:url==='/checkout/quotes'?{quoteId:id}:url==='/orders'?{orderId:id}:{status:'SUCCEEDED'}}}}};
 const source=fs.readFileSync('src/pages/checkout/paymentApi.ts','utf8').replaceAll('import.meta.env.DEV','true');
 const exports={};vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,require:name=>name==='axios'?({default:{create:()=>client,isAxiosError:()=>false}}):{checkTokenExpiration:()=>{}},localStorage:{getItem:()=> 'member-token'},sessionStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)},crypto:webcrypto,TextEncoder});return {...exports,calls,id};
}
test('order retries reuse the persisted server order and send the same member auth',async()=>{
 const api=setup();const items=[{productId:api.id,skuId:api.id,quantity:1}];const shipping={recipient:'A',phone:'01012345678',postalCode:'12345',address1:'Address',address2:''};
 assert.equal(await api.createOrder(items,shipping),api.id);
 assert.equal(await api.createOrder(items,shipping),api.id);
 assert.equal(api.calls.length,2);
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
