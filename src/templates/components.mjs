// Reusable, framework-free HTML components. Every function returns a string.
// Rules: no inline styles, no inline scripts, no event-handler attributes (strict CSP).

import * as cfg from '../site.config.mjs';

export const esc = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Locale-aware URL for a route key, with an optional #hash. */
export const href = (ctx, key, hash = '') => cfg.localePath(ctx.locale, cfg.routePath(key)) + (hash ? `#${hash}` : '');

/** Product terms stay in English; mark them so assistive tech pronounces them correctly. */
export const term = (ctx, text) => (ctx.locale === 'en' ? esc(text) : `<span lang="en">${esc(text)}</span>`);

export const pad = (n) => String(n).padStart(2, '0');

/* ---------- Icons (24px grid, 1.5 stroke, square caps: the Route-Frame line language) ---------- */

const svg = (body, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true" focusable="false">${body}</svg>`;

export const icon = {
  arrow: svg('<path d="M4 12h15M13 6l6 6-6 6"/>'),
  external: svg('<path d="M8 6h10v10M18 6 6 18"/>'),
  check: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
  limit: svg('<path d="M6 12h12"/>'),
  download: svg('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  menu: svg('<path class="menu-icon__top" d="M4 8h16"/><path class="menu-icon__bottom" d="M4 16h16"/>', 'icon menu-icon'),
  // Capability glyphs: a route drawn inside an implied frame.
  ai: svg('<path d="M3 12h6l4-6h5M9 12h9M9 12l4 6h5"/><path d="M20 5v2M20 11v2M20 17v2" stroke-width="2.5"/>', 'icon glyph'),
  automation: svg('<path d="M6 12V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9"/><path d="M3.5 10 6 12.5 8.5 10"/>', 'icon glyph'),
  saas: svg('<path d="M4 5h16v14H4zM4 9.5h16M8 14h5"/>', 'icon glyph'),
  commerce: svg('<path d="M4 9h14M15 6l3 3-3 3M20 15H6M9 12l-3 3 3 3"/>', 'icon glyph'),
};

/** The AVERLYNT symbol: an A-frame whose crossbar is a route ending in a signal node. */
export const symbol = (cls = 'symbol') =>
  `<svg class="${cls}" viewBox="0 0 64 64" width="32" height="32" fill="none" aria-hidden="true" focusable="false"><path class="symbol__frame" d="M11 54 32 9l21 45" stroke="currentColor" stroke-width="6.5" stroke-linecap="square"/><path class="symbol__route" d="M22.5 41H31" stroke-width="5"/><circle class="symbol__node" cx="38" cy="41" r="3.6"/></svg>`;

/* ---------- Small pieces ---------- */

export const status = (ctx, key) =>
  `<span class="status status--${key}"><span class="status__dot" aria-hidden="true"></span><span class="vh">${esc(ctx.t.common.statusPrefix)}: </span>${esc(ctx.t.common.status[key])}</span>`;

export const button = ({ url, label, variant = 'primary', iconName = 'arrow', attrs = '' }) =>
  `<a class="btn btn--${variant}" href="${esc(url)}"${attrs}><span>${esc(label)}</span>${iconName ? icon[iconName] : ''}</a>`;

export const textLink = ({ url, label, iconName = 'arrow', attrs = '' }) =>
  `<a class="text-link" href="${esc(url)}"${attrs}><span>${esc(label)}</span>${icon[iconName]}</a>`;

export const notice = (text) =>
  `<div class="notice" role="note"><span class="notice__mark" aria-hidden="true"></span><p>${esc(text)}</p></div>`;

/** Section wrapper with the indexed mono label that anchors the Route-Frame grid. */
export function section({ id, index, label, title, intro = '', body, modifier = '' }) {
  const titleId = `${id}-title`;
  return `<section class="section${modifier ? ` ${modifier}` : ''}" id="${id}" aria-labelledby="${titleId}">
<div class="frame">
<div class="section-head" data-reveal>
<p class="label"><span class="label__index">${pad(index)}</span><span class="label__rule" aria-hidden="true"></span>${esc(label)}</p>
<h2 id="${titleId}">${esc(title)}</h2>
${intro ? `<p class="section-head__intro">${esc(intro)}</p>` : ''}
</div>
${body}
</div>
</section>`;
}

/** Hero for inner pages. `eyebrow` is trusted HTML so it can carry a link. */
export function pageHero({ eyebrow, title, lede, extra = '' }) {
  return `<section class="page-hero">
<div class="frame page-hero__inner">
<p class="label"><span class="label__index label__index--node" aria-hidden="true"></span>${eyebrow}</p>
<h1>${esc(title)}</h1>
<p class="lede">${esc(lede)}</p>
${extra}
</div>
</section>`;
}

/* ---------- Route-Frame map: the signature visual ---------- */

export function routeMap(ctx) {
  const { t } = ctx;
  const nodes = cfg.CAPABILITIES.map((key, i) => {
    const cap = t.capabilities[key];
    return `<li class="route-node" data-node="${key}"><a href="${href(ctx, `capability:${key}`)}"><span class="route-node__top"><span class="route-node__index">${pad(i + 1)}</span>${icon[key]}</span><span class="route-node__body"><span class="route-node__name">${term(ctx, cap.name)}</span><span class="route-node__role">${esc(cap.role)}</span></span></a></li>`;
  }).join('\n');
  return `<figure class="route-map" data-reveal>
<div class="route-map__stage">
<svg class="route-map__lines" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path class="route-map__track" d="M21.5 21.5H78.5V78.5H21.5ZM50 21.5V78.5M21.5 50H78.5"/><path class="route-map__signal" pathLength="100" d="M21.5 21.5H78.5V78.5H21.5Z"/></svg>
<ol class="route-map__nodes" aria-label="${esc(t.common.map.label)}">
${nodes}
</ol>
<span class="route-map__core" aria-hidden="true">${symbol('symbol symbol--core')}</span>
</div>
<figcaption class="route-map__caption">${esc(t.common.map.caption)}</figcaption>
</figure>`;
}

/* ---------- Capability cards ---------- */

export function capabilityCards(ctx, { only = cfg.CAPABILITIES } = {}) {
  const { t } = ctx;
  return `<ul class="cap-grid cap-grid--${only.length}" data-reveal>
${only.map((key) => {
    const cap = t.capabilities[key];
    return `<li class="cap-card"><a class="cap-card__link" href="${href(ctx, `capability:${key}`)}"><span class="cap-card__top"><span class="cap-card__index">${pad(cfg.CAPABILITIES.indexOf(key) + 1)}</span>${icon[key]}</span><h3 class="cap-card__name">${term(ctx, cap.name)}</h3><p class="cap-card__role">${esc(cap.role)}</p><p class="cap-card__summary">${esc(cap.summary)}</p><span class="cap-card__foot">${status(ctx, cap.status)}<span class="cap-card__go">${esc(t.common.learnMore)}${icon.arrow}</span></span></a></li>`;
  }).join('\n')}
</ul>`;
}

/* ---------- Workflow: Discover → Improve ---------- */

export function steps(ctx, { detail = false } = {}) {
  const { t } = ctx;
  const items = cfg.STEPS.map((key, i) => {
    const step = t.steps[key];
    const extra = detail
      ? `<p class="step__detail">${esc(step.detail)}</p><p class="step__output"><span class="step__output-label">${esc(t.pages.how.outputLabel)}</span>${esc(step.output)}</p>`
      : '';
    return `<li class="step" data-step="${key}"><span class="step__node" aria-hidden="true"></span><div class="step__head"><span class="step__index">${pad(i + 1)}</span><h3 class="step__name">${term(ctx, step.name)}</h3><p class="step__local">${esc(step.local)}</p></div><div class="step__body"><p class="step__summary">${esc(step.summary)}</p>${extra}</div></li>`;
  }).join('\n');
  return `<ol class="steps ${detail ? 'steps--detail' : 'steps--rail'}" data-reveal>\n${items}\n</ol>`;
}

/* ---------- Call to action band (inverse surface) ---------- */

export function ctaBand(ctx) {
  const c = ctx.t.common.cta;
  return `<section class="cta-band" aria-labelledby="cta-title">
<div class="frame cta-band__inner" data-reveal>
<div class="cta-band__copy"><h2 id="cta-title">${esc(c.title)}</h2><p>${esc(c.text)}</p></div>
<div class="actions">${button({ url: href(ctx, 'contact'), label: c.primary, variant: 'inverse' })}${textLink({ url: href(ctx, 'about'), label: c.secondary })}</div>
</div>
</section>`;
}

/* ---------- Header ---------- */

export function langSwitch(ctx, { full = false } = {}) {
  const target = cfg.LOCALES.find((l) => l !== ctx.locale);
  const url = cfg.localePath(target, ctx.route.path);
  if (full) {
    return `<a class="lang-link" data-lang-switch href="${url}" hreflang="${target}" lang="${target}">${cfg.LANG_NAME[target]}</a>`;
  }
  return `<span class="lang-switch"><span class="lang-switch__current"><span class="vh">${esc(ctx.t.common.currentLanguage)}: </span>${cfg.LANG_CODE[ctx.locale]}</span><a class="lang-switch__link" data-lang-switch href="${url}" hreflang="${target}" lang="${target}" aria-label="${cfg.LANG_SWITCH_LABEL[target]}">${cfg.LANG_CODE[target]}</a></span>`;
}

export function header(ctx) {
  const { t, route, locale } = ctx;
  const current = (key) => {
    if (route.key === key) return ' aria-current="page"';
    if (key === 'capabilities' && route.key.startsWith('capability:')) return ' aria-current="true"';
    return '';
  };
  const links = ['platform', 'capabilities', 'how', 'about']
    .map((key) => `<li><a href="${href(ctx, key)}"${current(key)}>${esc(t.nav[key])}</a></li>`).join('');
  return `<header class="site-header" data-header>
<div class="frame site-header__inner">
<a class="brand" href="${href(ctx, 'home')}" aria-label="AVERLYNT — ${esc(t.nav.home)}">${symbol()}<span class="brand__word" aria-hidden="true">AVERLYNT</span></a>
<nav class="site-nav" id="site-nav" aria-label="${esc(t.common.navLabel)}" data-nav>
<ul class="site-nav__list">${links}</ul>
<div class="site-nav__actions">
<a class="site-nav__account" href="${esc(cfg.signInUrl(locale))}" rel="noopener" data-auth-link data-account-href="${href(ctx, 'account')}" data-account-label="${esc(t.nav.account)}">${esc(t.nav.signIn)}</a>
<a class="btn btn--primary btn--sm" href="${href(ctx, 'contact')}"${current('contact')}><span>${esc(t.nav.start)}</span>${icon.arrow}</a>
</div>
</nav>
${langSwitch(ctx)}
<button type="button" class="menu-toggle" data-menu-toggle aria-expanded="false" aria-controls="site-nav" aria-label="${esc(t.common.menuOpen)}" data-label-open="${esc(t.common.menuOpen)}" data-label-close="${esc(t.common.menuClose)}">${icon.menu}</button>
</div>
</header>`;
}

/* ---------- Footer ---------- */

export function footer(ctx) {
  const { t } = ctx;
  const f = t.footer;
  const list = (items) => `<ul>${items.map(([url, label, external]) =>
    `<li><a href="${esc(url)}"${external ? ' rel="noopener noreferrer"' : ''}>${label}${external ? icon.external : ''}</a></li>`).join('')}</ul>`;
  const column = (title, items) => `<nav class="site-footer__col" aria-label="${esc(title)}"><p class="site-footer__title">${esc(title)}</p>${list(items)}</nav>`;
  return `<footer class="site-footer">
<div class="frame">
<div class="site-footer__top">
<div class="site-footer__brand">
<a class="brand" href="${href(ctx, 'home')}" aria-label="AVERLYNT — ${esc(t.nav.home)}">${symbol()}<span class="brand__word" aria-hidden="true">AVERLYNT</span></a>
<p class="site-footer__tagline">${esc(f.tagline)}</p>
<p class="site-footer__status">${status(ctx, 'building')}<span>${esc(f.statusLine)}</span></p>
</div>
${column(f.ecosystem, [[href(ctx, 'platform'), esc(t.nav.platform)], [href(ctx, 'capabilities'), esc(t.nav.capabilities)], [href(ctx, 'how'), esc(t.nav.how)]])}
${column(f.capabilities, cfg.CAPABILITIES.map((key) => [href(ctx, `capability:${key}`), term(ctx, t.capabilities[key].name)]))}
${column(f.brand, [[href(ctx, 'about'), esc(t.nav.about)], [href(ctx, 'contact'), esc(t.nav.contact)], [href(ctx, 'account'), esc(t.nav.account)], [cfg.REPO_URL, esc(t.nav.repo), true]])}
${column(f.legal, [[href(ctx, 'privacy'), esc(t.nav.privacy)], [href(ctx, 'terms'), esc(t.nav.terms)]])}
</div>
<div class="site-footer__bottom">
<p>© ${cfg.COPYRIGHT_YEAR} AVERLYNT. ${esc(f.rights)}</p>
<p>${esc(f.origin)}</p>
<p>${langSwitch(ctx, { full: true })}</p>
</div>
</div>
</footer>`;
}
