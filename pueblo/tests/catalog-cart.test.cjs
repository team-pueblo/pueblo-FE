const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
test('SKU cart retains backend IDs, separates variants and enforces purchase limit',()=>{
 const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/pages/cart/cartStorage.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports});
 const values=new Map();const storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
 const item={id:'sku-one',productId:'product-uuid',skuId:'one',brand:'brand',name:'product',price:152000,img:'',qty:1,maxQuantity:2};
 assert.equal(exports.addCartItem(item,storage),true);assert.equal(exports.addCartItem(item,storage),true);assert.equal(exports.addCartItem(item,storage),false);
 assert.equal(exports.addCartItem({...item,id:'sku-two',skuId:'two'},storage),true);
 const items=exports.readCart(storage).items;assert.equal(items.length,2);assert.equal(items[0].productId,'product-uuid');assert.equal(items[0].skuId,'one');assert.equal(items[0].qty,2);
});
