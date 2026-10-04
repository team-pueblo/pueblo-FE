const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const axios = require('axios');

function setup() {
  const events = [];
  let current = {};
  let time = 0;
  const sentry = {
    withScope(fn) {
      const previous = current;
      current = {};
      try { fn({ setLevel: value => current.level = value, setTags: value => current.tags = value,
        setFingerprint: value => current.fingerprint = value,
        setContext: (key, value) => { (current.contexts ??= {})[key] = value; } }); }
      finally { current = previous; }
    },
    captureException(error, context) { events.push({ error, ...current, ...context }); },
  };
  function load(relative, dependencies) {
    const source = fs.readFileSync(path.join(__dirname, '..', relative), 'utf8')
      .replace('import.meta.env.VITE_API_BASE_URL', 'undefined');
    const exports = {};
    vm.runInNewContext(ts.transpileModule(source, { compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
    } }).outputText, { exports, require: name => dependencies[name],
      Date: { now: () => time }, window: { location: { pathname: '/product/42' } } });
    return exports;
  }
  const errors = load('src/monitoring/errors.ts', { axios, '@sentry/react': sentry });
  const { api } = load('src/api/client.ts', { axios, '../monitoring/errors': errors });
  function failure(status, code, extra = {}) {
    const config = { url: '/users/123?email=private', method: 'post', timeout: 15000,
      headers: { Authorization: 'SECRET' }, data: { password: 'SECRET' },
      params: { page: 2, size: 20, email: 'SECRET', q: 'SECRET' },
      monitoring: { endpoint: '/users/123?token=SECRET', feature: 'auth', action: 'login', ...extra } };
    return new axios.AxiosError('SECRET', code, config, {}, status ? { status, data: { token: 'SECRET' }, config } : undefined);
  }
  return { events, errors, api, failure, advance: value => { time += value; } };
}

test('API classification, safe context, grouping and isolated scope', () => {
  const { events, errors, failure } = setup();
  errors.reportApiError(failure(503, 'ERR_BAD_RESPONSE', { critical: true }));
  assert.equal(events[0].level, 'fatal');
  assert.match(events[0].error.name, /503 Error.*POST \/users\/\{id\}/);
  assert.equal(events[0].tags.page, '/product/:id');
  assert.equal(events[0].contexts.query.page, 2);
  assert.equal(JSON.stringify(events).includes('SECRET'), false);
  assert.equal(events[0].error.config, undefined);
  errors.reportApiError(failure(undefined, 'ETIMEDOUT'));
  assert.equal(events[1].level, 'warning');
  errors.reportApiError(failure(undefined, 'ERR_NETWORK'));
  assert.equal(events[2].level, 'warning');
  assert.notEqual(JSON.stringify(events[1].fingerprint), JSON.stringify(events[2].fingerprint));
  errors.captureHandledError(new Error('local'), { feature: 'cart', action: 'save' });
  assert.equal(events[3].level, 'error');
  assert.equal(events[3].contexts, undefined);
});

test('expected failures/cancellation ignored; repetition limited; fatal retained', () => {
  const { events, errors, failure, advance } = setup();
  const expected = failure(401, 'ERR_BAD_REQUEST', { endpoint: '/api/login' });
  expected.response.data = { code: 'INVALID_CREDENTIALS' };
  errors.reportApiError(expected);
  errors.captureHandledError(expected, { feature: 'auth', action: 'login' });
  errors.reportApiError(new axios.CanceledError());
  assert.equal(events.length, 0);
  errors.reportApiError(failure(404, 'ERR_BAD_REQUEST'));
  errors.reportApiError(failure(404, 'ERR_BAD_REQUEST'));
  assert.equal(events.length, 1);
  advance(30001);
  errors.reportApiError(failure(404, 'ERR_BAD_REQUEST'));
  assert.equal(events.length, 2);
  errors.reportApiError(failure(500, 'ERR_BAD_RESPONSE', { critical: true }));
  errors.reportApiError(failure(500, 'ERR_BAD_RESPONSE', { critical: true }));
  assert.equal(events.length, 4);
});

test('real Axios interceptor rejects original error and avoids catch double capture', async () => {
  const { events, errors, api } = setup();
  const original = new axios.AxiosError('failure', 'ERR_BAD_RESPONSE');
  await assert.rejects(api.get('/products', { monitoring: { endpoint: '/api/products', feature: 'catalog', action: 'list' },
    adapter: async config => { original.config = config; original.response = { status: 500 }; throw original; } }), error => {
      assert.equal(error, original);
      errors.captureHandledError(error, { feature: 'catalog', action: 'list' });
      return true;
    });
  assert.equal(events.length, 1);
  assert.equal(events[0].level, 'error');
  const result = await api.get('/products', { adapter: async config => ({ data: [], status: 200, statusText: 'OK', headers: {}, config }) });
  assert.equal(result.status, 200);
  assert.equal(events.length, 1);
});

test('dynamic IDs and query strings do not fragment endpoint names', () => {
  const { errors } = setup();
  assert.equal(errors.normalizePath('/orders/42?token=secret#hash'), '/orders/{id}');
  assert.equal(errors.normalizePath('/orders/123e4567-e89b-12d3-a456-426614174000'), '/orders/{id}');
});


test('business filters require route, method, status and reviewed response', () => {
  const { errors, failure } = setup();
  const error = failure(400, 'ERR_BAD_REQUEST', { endpoint: '/api/login' });
  error.response.data = { code: 'INVALID_CREDENTIALS' };
  assert.equal(errors.shouldSkipErrorLogging(error), true);
  error.config.method = 'get';
  assert.equal(errors.shouldSkipErrorLogging(error), false);
  error.config.method = 'post';
  error.config.monitoring.endpoint = '/api/orders';
  assert.equal(errors.shouldSkipErrorLogging(error), false);
  error.config.monitoring.endpoint = '/api/login';
  error.response.data = { code: 'UNKNOWN_CONTRACT_ERROR' };
  assert.equal(errors.shouldSkipErrorLogging(error), false);
  error.response.data = { message: '이메일 또는 비밀번호를 확인해주세요.' };
  assert.equal(errors.shouldSkipErrorLogging(error), true);
  error.response.status = 500;
  assert.equal(errors.shouldSkipErrorLogging(error), false);
});
