const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
function setup(expires){
 const values=new Map([['token','opaque-access-token'],['user','{}'],['tokenExpiresAt',String(expires)]]);
 const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/utils/auth.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports,Date,localStorage:{getItem:k=>values.get(k),removeItem:k=>values.delete(k)},console});return {exports,values};
}
test('expiry metadata supports opaque Bearer tokens and removes expired sessions',()=>{
 const valid=setup(Date.now()+60000);assert.equal(valid.exports.isAuthenticated(),true);
 const expired=setup(Date.now()-1000);assert.equal(expired.exports.isAuthenticated(),false);assert.equal(expired.values.has('user'),false);
 valid.exports.logout();assert.equal(valid.values.has('tokenExpiresAt'),false);
});
