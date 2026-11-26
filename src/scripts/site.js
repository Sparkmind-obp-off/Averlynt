// Progressive enhancement only. The site is fully usable without JavaScript:
// navigation, language switching and every page work as plain links.
// No inline scripts, no analytics, no third-party requests until the account
// page actually needs Clerk.

(() => {
  const doc = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile navigation ---------- */

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');

  if (header && menuButton) {
    const close = () => {
      header.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', menuButton.dataset.labelOpen);
    };

    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      header.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? menuButton.dataset.labelClose : menuButton.dataset.labelOpen);
      if (!open) menuButton.focus({ preventScroll: true });
    });

    header.querySelectorAll('#site-nav a').forEach((link) => link.addEventListener('click', close));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && header.classList.contains('is-open')) {
        close();
        menuButton.focus({ preventScroll: true });
      }
    });

    document.addEventListener('click', (event) => {
      if (header.classList.contains('is-open') && !header.contains(event.target)) close();
    });
  }

  /* ---------- Header state on scroll ---------- */

  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Reveal on first view ---------- */

  const revealables = document.querySelectorAll('[data-reveal]');
  if (revealables.length && !reduceMotion && 'IntersectionObserver' in window) {
    doc.classList.add('reveal-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealables.forEach((element) => observer.observe(element));
  }

  /* ---------- Account: server-verified Clerk session ---------- */

  const panel = document.querySelector('[data-auth-panel]');
  if (!panel) return;

  const views = ['loading', 'signed-out', 'signed-in', 'unavailable', 'error'];
  const show = (name) => views.forEach((key) => {
    const node = panel.querySelector(`[data-auth-show="${key}"]`);
    if (node) node.hidden = key !== name;
  });

  const fill = (field, value) => {
    const node = panel.querySelector(`[data-auth-field="${field}"]`);
    if (node && value) node.textContent = value;
  };

  const signedIn = (data) => {
    if (!data || !data.signedIn) return false;
    fill('name', data.user && data.user.name);
    fill('email', data.user && data.user.email);
    const session = panel.querySelector('[data-auth-field="session"]');
    if (session) session.textContent = data.verified ? session.dataset.textOk : session.dataset.textFail;
    show('signed-in');
    return true;
  };

  // Clerk is bound to the production domain; on preview hosts there is nothing to load.
  const isProductionHost = window.location.hostname === doc.dataset.siteHost;
  if (!isProductionHost) {
    show('unavailable');
    return;
  }

  show('loading');

  const loadScript = (src) => new Promise((resolve, reject) => {
    const element = document.createElement('script');
    element.src = src;
    element.async = true;
    element.crossOrigin = 'anonymous';
    element.addEventListener('load', resolve, { once: true });
    element.addEventListener('error', () => reject(new Error('clerk script')), { once: true });
    document.head.appendChild(element);
  });

  const sessionRequest = async (token) => {
    const response = await fetch('/api/session', {
      credentials: 'same-origin',
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    });
    // 401 means the token is stale or not ours: treat it as signed out, not as a crash.
    if (response.status === 401) return { signedIn: false, stale: true };
    // 503 means the verifier itself is unavailable; that is worth surfacing.
    if (!response.ok) throw new Error(`session ${response.status}`);
    return response.json();
  };

  (async () => {
    try {
      if (!window.Clerk) await loadScript(doc.dataset.clerkJs);
      const clerk = window.Clerk;
      if (!clerk) throw new Error('clerk unavailable');
      await clerk.load();

      if (!clerk.user) {
        show('signed-out');
        return;
      }

      const token = clerk.session ? await clerk.session.getToken() : null;
      if (!token) {
        show('signed-out');
        return;
      }
      signedIn(await sessionRequest(token));
    } catch {
      show('error');
    }
  })();

  const signOut = panel.querySelector('[data-auth-signout]');
  if (signOut) {
    signOut.addEventListener('click', async () => {
      signOut.disabled = true;
      try {
        if (window.Clerk && window.Clerk.user) await window.Clerk.signOut();
        await fetch('/api/session', { method: 'DELETE', credentials: 'same-origin' });
        window.location.reload();
      } catch {
        signOut.disabled = false;
        show('error');
      }
    });
  }
})();
