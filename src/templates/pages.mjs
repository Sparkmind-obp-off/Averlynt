// Page bodies. Each page returns { title, description, body } built from locale content.

import * as cfg from '../site.config.mjs';
import {
  esc, href, term, pad, icon, status, button, textLink, notice, section, pageHero,
  routeMap, capabilityCards, steps, ctaBand,
} from './components.mjs';

const paragraphs = (items) => items.map((p) => `<p>${esc(p)}</p>`).join('\n');

const cardGrid = (items, { cols = 3, render } = {}) =>
  `<ul class="card-grid card-grid--${cols}" data-reveal>${items.map((item, i) =>
    `<li class="card">${render ? render(item, i) : `<span class="card__index">${pad(i + 1)}</span><h3 class="card__title">${esc(item.title)}</h3><p class="card__text">${esc(item.text)}</p>`}</li>`).join('')}</ul>`;

const checkList = (items, kind = 'check') =>
  `<ul class="check-list check-list--${kind}" data-reveal>${items.map((text) => `<li>${icon[kind]}<span>${esc(text)}</span></li>`).join('')}</ul>`;

const board = (ctx, items, extra = () => '') =>
  `<ul class="board" data-reveal>${items.map((item) =>
    `<li class="board__row"><h3 class="board__title">${esc(item.title)}</h3><div class="board__text"><p>${esc(item.text)}</p>${extra(item)}</div>${status(ctx, item.status)}</li>`).join('')}</ul>`;

const meta = (p, body) => ({ title: p.title, description: p.description, body });

/* ---------- Home ---------- */

function home(ctx) {
  const p = ctx.t.pages.home;
  return meta(p, `<section class="hero">
<div class="frame hero__inner">
<div class="hero__copy">
<p class="label"><span class="label__index label__index--node" aria-hidden="true"></span>${esc(p.eyebrow)}</p>
<h1>${esc(p.h1)}</h1>
<p class="lede">${esc(p.lede)}</p>
<div class="actions">${button({ url: href(ctx, 'platform'), label: p.primary })}${button({ url: href(ctx, 'how'), label: p.secondary, variant: 'ghost', iconName: '' })}</div>
<p class="hero__note">${status(ctx, 'building')}<span>${esc(p.note)}</span></p>
</div>
${routeMap(ctx)}
</div>
</section>
${section({ id: 'value', index: 1, ...p.value, body: cardGrid(p.value.items) })}
${section({ id: 'capabilities', index: 2, ...p.capabilities, body: capabilityCards(ctx) })}
${section({ id: 'how', index: 3, ...p.how, body: `${steps(ctx)}<p class="section__more">${textLink({ url: href(ctx, 'how'), label: p.how.link })}</p>` })}
${section({
    id: 'use-cases', index: 4, ...p.useCases,
    body: `${cardGrid(p.useCases.items, { render: (item) => `<p class="card__kicker">${esc(item.who)}</p><h3 class="card__title">${esc(item.title)}</h3><p class="card__text">${esc(item.text)}</p>` })}${notice(p.useCases.note)}`,
  })}
${section({ id: 'status', index: 5, ...p.status, body: board(ctx, p.status.items) })}
${ctaBand(ctx)}`);
}

/* ---------- Platform ---------- */

function platform(ctx) {
  const { t } = ctx;
  const p = t.pages.platform;
  const link = (item) => `<p class="card__route">${term(ctx, t.capabilities[item.from].name)}<span aria-hidden="true"> → </span><span class="vh">${esc(p.links.to)} </span>${term(ctx, t.capabilities[item.to].name)}</p><p class="card__text">${esc(item.text)}</p>`;
  return meta(p, `${pageHero({ eyebrow: esc(p.eyebrow), title: p.h1, lede: p.lede })}
${section({ id: 'model', index: 1, ...p.model, modifier: 'section--map', body: `<div class="split">${routeMap(ctx)}<div class="prose" data-reveal>${paragraphs(p.model.paragraphs)}</div></div>` })}
${section({ id: 'connections', index: 2, ...p.links, body: cardGrid(p.links.items, { cols: 2, render: link }) })}
${section({ id: 'principles', index: 3, ...p.principles, body: cardGrid(p.principles.items, { cols: 2 }) })}
${section({ id: 'boundaries', index: 4, ...p.boundaries, body: checkList(p.boundaries.items, 'limit') })}
${ctaBand(ctx)}`);
}

/* ---------- Capabilities ---------- */

function capabilities(ctx) {
  const p = ctx.t.pages.capabilities;
  return meta(p, `${pageHero({ eyebrow: esc(p.eyebrow), title: p.h1, lede: p.lede })}
${section({ id: 'list', index: 1, ...p.list, body: `${capabilityCards(ctx)}${notice(p.note)}` })}
${ctaBand(ctx)}`);
}

function capability(ctx) {
  const { t, route } = ctx;
  const cap = t.capabilities[route.capability];
  const L = t.pages.capability;
  const others = cfg.CAPABILITIES.filter((key) => key !== route.capability);
  const hero = pageHero({
    eyebrow: `<a href="${href(ctx, 'capabilities')}">${esc(t.nav.capabilities)}</a><span aria-hidden="true"> / </span>${term(ctx, cap.name)}`,
    title: cap.title,
    lede: cap.lede,
    extra: `<p class="hero__note">${status(ctx, cap.status)}<span>${esc(L.statusNote)}</span></p>`,
  });
  return {
    title: cap.metaTitle,
    description: cap.metaDescription,
    body: `${hero}
${section({ id: 'description', index: 1, ...L.description, body: `<div class="prose prose--lead" data-reveal>${paragraphs(cap.description)}</div>` })}
${section({ id: 'benefits', index: 2, ...L.benefits, body: checkList(cap.benefits) })}
${section({ id: 'limits', index: 3, ...L.limits, body: checkList(cap.limits, 'limit') })}
${section({ id: 'use-cases', index: 4, ...L.useCases, body: `${cardGrid(cap.useCases)}${notice(L.useCasesNote)}` })}
${section({ id: 'connections', index: 5, ...L.connects, body: `<div class="prose prose--lead" data-reveal><p>${esc(cap.connects)}</p></div>${capabilityCards(ctx, { only: others })}` })}
${ctaBand(ctx)}`,
  };
}

/* ---------- How it works ---------- */

function how(ctx) {
  const p = ctx.t.pages.how;
  return meta(p, `${pageHero({ eyebrow: esc(p.eyebrow), title: p.h1, lede: p.lede })}
${section({ id: 'flow', index: 1, ...p.flow, body: steps(ctx, { detail: true }) })}
${section({ id: 'today', index: 2, ...p.honesty, body: board(ctx, p.honesty.items) })}
${ctaBand(ctx)}`);
}

/* ---------- About ---------- */

function about(ctx) {
  const p = ctx.t.pages.about;
  const assets = cfg.BRAND_ASSETS.map((asset) =>
    `<li class="asset"><div class="asset__preview asset__preview--${asset.surface}"><img src="${asset.file}" width="${asset.width}" height="${asset.height}" alt="${esc(p.brand.assets[asset.key])}" loading="lazy" decoding="async"></div><p class="asset__name">${esc(p.brand.assets[asset.key])}</p><a class="text-link" href="${asset.file}" download>${icon.download}<span>${esc(p.brand.download)}<span class="vh"> — ${esc(p.brand.assets[asset.key])}</span></span></a></li>`).join('');
  return meta(p, `${pageHero({ eyebrow: esc(p.eyebrow), title: p.h1, lede: p.lede })}
${section({ id: 'identity', index: 1, ...p.identity, body: `<div class="prose prose--lead" data-reveal>${paragraphs(p.identity.paragraphs)}</div>` })}
${section({ id: 'principles', index: 2, ...p.principles, body: cardGrid(p.principles.items) })}
${section({ id: 'boundaries', index: 3, ...p.not, body: checkList(p.not.items, 'limit') })}
${section({ id: 'brand', index: 4, ...p.brand, body: `<ul class="asset-grid" data-reveal>${assets}</ul>${notice(p.brand.note)}` })}
${ctaBand(ctx)}`);
}

/* ---------- Contact ---------- */

function contact(ctx) {
  const p = ctx.t.pages.contact;
  const action = (item) => (item.status === 'live'
    ? `<p class="board__action">${button({ url: cfg.ISSUES_URL, label: p.channels.cta, variant: 'primary', iconName: 'external', attrs: ' rel="noopener noreferrer"' })}</p>`
    : '');
  return meta(p, `${pageHero({ eyebrow: esc(p.eyebrow), title: p.h1, lede: p.lede })}
${section({ id: 'channels', index: 1, ...p.channels, body: `${board(ctx, p.channels.items, action)}${notice(p.notice)}` })}
${section({ id: 'prepare', index: 2, ...p.prepare, body: checkList(p.prepare.items) })}`);
}

/* ---------- Account (Clerk) ---------- */

function account(ctx) {
  const { locale } = ctx;
  const p = ctx.t.pages.account;
  const row = (label, field, attrs = '', text = '') => `<div class="facts__row"><dt>${esc(label)}</dt><dd data-auth-field="${field}"${attrs}>${esc(text)}</dd></div>`;
  return meta(p, `${pageHero({ eyebrow: esc(p.eyebrow), title: p.h1, lede: p.lede })}
<section class="section" aria-label="${esc(p.eyebrow)}">
<div class="frame">
<div class="panel" data-auth-panel aria-live="polite">
<div data-auth-show="signed-out">
<h2>${esc(p.signedOut.title)}</h2>
<p>${esc(p.signedOut.text)}</p>
<div class="actions">${button({ url: cfg.signInUrl(locale), label: p.signedOut.signIn, attrs: ' rel="noopener"' })}${button({ url: cfg.signUpUrl(locale), label: p.signedOut.signUp, variant: 'ghost', iconName: '', attrs: ' rel="noopener"' })}</div>
</div>
<div data-auth-show="loading" hidden><p class="panel__loading">${esc(p.loading)}</p></div>
<div data-auth-show="signed-in" hidden>
<h2>${esc(p.signedIn.title)}</h2>
<dl class="facts">
${row(p.signedIn.name, 'name')}
${row(p.signedIn.email, 'email')}
${row(p.signedIn.session, 'session', ` data-text-ok="${esc(p.signedIn.verified)}" data-text-fail="${esc(p.signedIn.unverified)}"`, p.signedIn.checking)}
</dl>
<div class="actions">${button({ url: cfg.manageAccountUrl, label: p.signedIn.manage, variant: 'ghost', iconName: 'external', attrs: ' rel="noopener"' })}<button type="button" class="btn btn--ghost" data-auth-signout><span>${esc(p.signedIn.signOut)}</span></button></div>
<p class="panel__note">${esc(p.signedIn.note)}</p>
</div>
<div data-auth-show="unavailable" hidden>
<h2>${esc(p.unavailable.title)}</h2>
<p>${esc(p.unavailable.text)}</p>
<div class="actions">${button({ url: cfg.SITE_URL + href(ctx, 'account'), label: p.unavailable.cta })}</div>
</div>
<div data-auth-show="error" hidden>
<h2>${esc(p.error.title)}</h2>
<p>${esc(p.error.text)}</p>
</div>
</div>
${notice(p.notice)}
<p class="section__more">${textLink({ url: href(ctx, 'privacy'), label: ctx.t.nav.privacy })}</p>
</div>
</section>`);
}

/* ---------- Legal ---------- */

function legal(ctx, key) {
  const p = ctx.t.pages[key];
  const L = ctx.t.pages.legal;
  const sections = p.sections.map((s, i) =>
    `<section class="legal__section"><h2><span class="label__index">${pad(i + 1)}</span>${esc(s.title)}</h2>${paragraphs(s.paragraphs)}</section>`).join('\n');
  return meta(p, `${pageHero({
    eyebrow: esc(L.eyebrow), title: p.h1, lede: p.lede,
    extra: `<p class="hero__note">${status(ctx, 'draft')}<span>${esc(L.updated)}</span></p>`,
  })}
<section class="section">
<div class="frame">
<div class="legal prose">
${notice(L.draft)}
${sections}
</div>
</div>
</section>`);
}

const PAGES = {
  home, platform, capabilities, how, about, contact, account,
  privacy: (ctx) => legal(ctx, 'privacy'),
  terms: (ctx) => legal(ctx, 'terms'),
};

export function renderPage(ctx) {
  if (ctx.route.capability) return capability(ctx);
  const render = PAGES[ctx.route.key];
  if (!render) throw new Error(`No template for route ${ctx.route.key}`);
  return render(ctx);
}
