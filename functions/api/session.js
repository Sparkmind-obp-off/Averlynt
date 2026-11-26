// Pages Function: /api/session
//
// GET    → returns the *server-verified* Clerk session for the caller.
// DELETE → clears Clerk cookies left on this domain during sign-out.
//
// Verification happens in this Worker, never in the browser:
// the client sends its Clerk session token as a Bearer token, we check the RS256
// signature against Clerk's JWKS, then confirm iss / azp / exp / nbf before
// trusting any claim. The Clerk secret key lives only in env.CLERK_SECRET_KEY
// (a Cloudflare Pages secret) and is used for the optional profile lookup.

const JWKS_TTL_MS = 10 * 60 * 1000;
let jwksCache = { keys: null, fetchedAt: 0 };

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });

const b64urlToBytes = (value) => {
  const normalised = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalised + '='.repeat((4 - (normalised.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const decodeJson = (value) => JSON.parse(new TextDecoder().decode(b64urlToBytes(value)));

async function loadJwks(env) {
  const now = Date.now();
  if (jwksCache.keys && now - jwksCache.fetchedAt < JWKS_TTL_MS) return jwksCache.keys;

  const url = env.CLERK_JWKS_URL || 'https://api.clerk.com/v1/jwks';
  const headers = { Accept: 'application/json' };
  // The Frontend API JWKS is public; the Backend API one requires the secret key.
  if (url.includes('api.clerk.com') && env.CLERK_SECRET_KEY) {
    headers.Authorization = `Bearer ${env.CLERK_SECRET_KEY}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`jwks ${response.status}`);
  const data = await response.json();
  const keys = Array.isArray(data.keys) ? data.keys.filter((k) => k.kty === 'RSA') : [];
  if (keys.length === 0) throw new Error('jwks empty');
  jwksCache = { keys, fetchedAt: now };
  return keys;
}

async function verifyToken(token, env) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('malformed token');
  const [rawHeader, rawPayload, rawSignature] = parts;

  const header = decodeJson(rawHeader);
  const payload = decodeJson(rawPayload);
  if (header.alg !== 'RS256') throw new Error('unexpected alg');

  const keys = await loadJwks(env);
  const jwk = keys.find((k) => k.kid === header.kid) || keys[0];
  if (!jwk) throw new Error('no matching key');

  const key = await crypto.subtle.importKey(
    'jwk',
    { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: 'RS256', ext: true },
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify'],
  );

  const valid = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    key,
    b64urlToBytes(rawSignature),
    new TextEncoder().encode(`${rawHeader}.${rawPayload}`),
  );
  if (!valid) throw new Error('bad signature');

  const now = Math.floor(Date.now() / 1000);
  const skew = 15;
  if (typeof payload.exp !== 'number' || payload.exp + skew < now) throw new Error('token expired');
  if (typeof payload.nbf === 'number' && payload.nbf - skew > now) throw new Error('token not yet valid');

  const issuer = env.CLERK_ISSUER || 'https://clerk.averlynt.biz.id';
  if (payload.iss !== issuer) throw new Error('unexpected issuer');

  const parties = (env.CLERK_AUTHORIZED_PARTIES || 'https://averlynt.biz.id')
    .split(',').map((value) => value.trim()).filter(Boolean);
  if (payload.azp && !parties.includes(payload.azp)) throw new Error('unexpected party');
  if (!payload.sub) throw new Error('no subject');

  return payload;
}

/** Fresh profile from the Clerk Backend API; only attempted when the secret exists. */
async function fetchProfile(subject, env) {
  if (!env.CLERK_SECRET_KEY) return null;
  try {
    const response = await fetch(`https://api.clerk.com/v1/users/${encodeURIComponent(subject)}`, {
      headers: { Authorization: `Bearer ${env.CLERK_SECRET_KEY}`, Accept: 'application/json' },
    });
    if (!response.ok) return null;
    const user = await response.json();
    const emails = user.email_addresses || [];
    const primary = emails.find((entry) => entry.id === user.primary_email_address_id) || emails[0];
    const name = [user.first_name, user.last_name].filter(Boolean).join(' ')
      || user.username
      || (primary ? primary.email_address : '')
      || '';
    return { id: user.id, name, email: primary ? primary.email_address : '', imageUrl: user.image_url || '' };
  } catch {
    return null;
  }
}

const bearer = (request) => {
  const header = request.headers.get('Authorization') || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : '';
};

export async function onRequestGet({ request, env }) {
  const token = bearer(request);
  if (!token) return json({ signedIn: false });

  try {
    const payload = await verifyToken(token, env);
    const user = await fetchProfile(payload.sub, env);
    return json({
      signedIn: true,
      verified: true,
      profile: Boolean(user),
      user: user || { id: payload.sub, name: '', email: '' },
    });
  } catch (error) {
    return json({ signedIn: false, verified: false, reason: String(error.message || error) });
  }
}

export async function onRequestDelete() {
  const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  headers.append('Set-Cookie', '__session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax');
  headers.append('Set-Cookie', '__client_uat=; Path=/; Max-Age=0; Secure; SameSite=Lax');
  return new Response(JSON.stringify({ signedOut: true }), { status: 200, headers });
}

export async function onRequest(context) {
  if (context.request.method === 'GET') return onRequestGet(context);
  if (context.request.method === 'DELETE') return onRequestDelete(context);
  return json({ error: 'method_not_allowed' }, 405, { Allow: 'GET, DELETE' });
}

// Exposed for unit tests only.
export const __test = { verifyToken, loadJwks, b64urlToBytes, fetchProfile };
