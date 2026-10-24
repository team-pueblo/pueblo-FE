const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

test('secure build preserves module exports, property names and error behavior', async () => {
  const { loadConfigFromFile } = await import('vite');
  const loaded = await loadConfigFromFile(
    { command: 'build', mode: 'obfuscated' },
    path.resolve(__dirname, '../vite.config.ts'),
  );
  const plugin = loaded.config.plugins.find(item => item?.name === 'pueblo-obfuscate');
  const source = `
    export const product = { name: 'PUEBLO', price: 37300 };
    export function total(quantity) { return product.price * quantity; }
    export function fail() { throw new Error('checkout failed'); }
    export async function lazy() { return import('data:text/javascript,export default 42'); }
  `;
  const result = plugin.renderChunk(source);
  assert.notEqual(result.code, source);
  assert.equal(result.map, null);
  const module = await import(`data:text/javascript;base64,${Buffer.from(result.code).toString('base64')}`);
  assert.deepEqual(module.product, { name: 'PUEBLO', price: 37300 });
  assert.equal(module.total(2), 74600);
  assert.throws(module.fail, /checkout failed/);
  assert.equal((await module.lazy()).default, 42);
});

test('normal production build leaves code unchanged', async () => {
  const { loadConfigFromFile } = await import('vite');
  const loaded = await loadConfigFromFile(
    { command: 'build', mode: 'production' },
    path.resolve(__dirname, '../vite.config.ts'),
  );
  const plugin = loaded.config.plugins.find(item => item?.name === 'pueblo-obfuscate');
  assert.equal(plugin.renderChunk('export const value = 1;'), null);
});
