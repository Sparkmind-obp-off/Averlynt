// Regression tests for the /api/session Pages Function.
//
// These cover the failure paths that a browser can actually trigger. The
// important property: a caller-supplied token must never produce a 200, and the
// raw error text must never be echoed back (it can contain parser output built
// from attacker-controlled bytes).

import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequest, onRequestGet, onRequestDelete } from '../functions/api/session.js';

const env = {};

const b64url = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const token = (header, payload, signature = 'sig') =>
  `${b64url(header)}.${b64url(payload)}.${signature}`;

const call = (method = 'GET', authorization) => {
  const headers = authorization ? { Authorization: authorization, Accept: 'application/json' } : { Accept: 'application/json' };
  const request = new Request('https://averlynt.biz.id/api/session', { method, headers });
  return onRequest({ request, env });
};

test('no credentials returns a signed-out 200, not an error', async () => {
  const response = await call('GET');
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { signedIn: false });
});

test('a non-Bearer authorization scheme is rejected with 401', async () => {
  const response = await call('GET', 'Basic YWJjOjEyMw==');
  assert.equal(response.status, 401);
  assert.match(response.headers.get('WWW-Authenticate') || '', /^Bearer/);
  const body = await response.json();
  assert.equal(body.signedIn, false);
  assert.equal(body.error, 'invalid_authorization_scheme');
});

test('a malformed bearer token is 401, never 200', async () => {
  // Three dot-separated parts, but not decodable — this is the case that
  // previously leaked a JSON parse message and returned 200.
  const response = await call('GET', 'Bearer not.a.jwt');
  assert.equal(response.status, 401);
  const body = await response.json();
  assert.equal(body.signedIn, false);
  assert.equal(body.verified, false);
  assert.equal(body.error, 'invalid_token');
  assert.equal(body.reason, undefined, 'internal error text must not be echoed');
});

test('a token signed with the wrong algorithm is 401', async () => {
  const response = await call('GET', `Bearer ${token({ alg: 'HS256', typ: 'JWT' }, { sub: 'user_1', exp: 9999999999 })}`);
  assert.equal(response.status, 401);
  assert.equal((await response.json()).error, 'invalid_token');
});

test('the failure response is not cacheable and carries a Bearer challenge', async () => {
  const response = await onRequestGet({
    request: new Request('https://averlynt.biz.id/api/session', { headers: { Authorization: 'Bearer x.y.z' } }),
    env,
  });
  assert.equal(response.status, 401);
  assert.match(response.headers.get('Cache-Control') || '', /no-store/);
  assert.match(response.headers.get('WWW-Authenticate') || '', /invalid_token/);
});

test('DELETE clears both Clerk cookies on this domain', async () => {
  const response = await onRequestDelete();
  assert.equal(response.status, 200);
  const cookies = response.headers.getSetCookie();
  assert.equal(cookies.length, 2);
  assert.match(cookies.join('\n'), /__session=;.*Max-Age=0/);
  assert.match(cookies.join('\n'), /__client_uat=;.*Max-Age=0/);
  assert.deepEqual(await response.json(), { signedOut: true });
});

test('unsupported methods answer 405 with an Allow header', async () => {
  for (const method of ['POST', 'PUT', 'PATCH']) {
    const response = await call(method);
    assert.equal(response.status, 405, method);
    assert.equal(response.headers.get('Allow'), 'GET, DELETE');
    assert.equal((await response.json()).error, 'method_not_allowed');
  }
});
