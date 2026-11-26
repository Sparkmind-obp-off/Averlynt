# AVERLYNT

Indonesia-first digital operations platform brand and public website.

## Product direction
AVERLYNT connects AI-assisted intelligence, automation, focused software and digital commerce into practical systems for founders, small businesses and independent operators.

## Local preview
Serve the static site:

```bash
python3 -m http.server 4173 --directory public
```

Open `http://localhost:4173`.

## Tests
Requires Node.js (built-in test runner; no dependencies):

```bash
node --test
```

## Cloudflare Pages
The public website is static and has no runtime package dependencies. `wrangler.toml` configures the Pages output directory.

To create a free Pages project and deploy manually:

```bash
npx wrangler pages project create averlynt --production-branch main
npx wrangler pages deploy public --project-name averlynt
```

This repository does not use GitHub Actions or automatic deployment. Do not enable paid services, subscriptions, prepayment, or billing. AVERLYNT custom-domain binding is intentionally not configured: no AVERLYNT domain is currently present in the connected Cloudflare account.

## Scope and trust
This is the initial brand and product-direction website. Product capabilities are being developed progressively; the site does not claim that all platform features are live. No customer logos, testimonials, metrics, certifications or guarantees are fabricated.

See [DESIGN.md](./DESIGN.md) and [PRODUCT.md](./PRODUCT.md) for the working brief.
