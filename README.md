# Juliani Consulting Company

International consulting site for complex software delivery, AI systems, SaaS products, security architecture, and decision-critical automation.

The homepage is **static by design** — `index.html`, `styles.css`, `script.js`, plus two serverless endpoints under `api/`. No build step, no framework, no runtime dependencies.

## Hero

The hero is an **interactive ASCII / HyperFrames animation** built with native CSS + Canvas (no libraries):

- **Layer A — iridescent field:** an animated blue → violet → gold gradient.
- **Layer B — ASCII glyph canvas:** a drifting field of ASCII glyphs, hue-sampled from the iridescent field, that brighten and ripple near the pointer.
- **Layer C — morphing wordmark:** real text that starts as **"JCC" at 72px**, spins on the Z axis, then morphs into **"Juliani Consulting Company"** with a per-letter reveal. Click/tap to replay; the pointer tilts it in 3D.

The **Signal / Structure / Edge map** buttons switch the Canvas glyph charset. Honors `prefers-reduced-motion` (lands statically on the full name, no spin or drift).

## Language (PT / EN)

Locale is resolved in priority order:

1. `?lang=pt|en` query string
2. `jcc_locale` cookie (set by the manual toggle)
3. Synchronous `navigator.language` guess (stamped pre-paint in `<head>`, no FOUC)
4. `GET /api/locale` — Vercel Edge Function reading `request.geo.country` (`BR` → `pt`, else `en`); if it disagrees with the guess and the visitor hasn't chosen manually, the page swaps once and persists the cookie.

The header has a **PT / EN toggle** that hits `/api/locale?set=pt|en`, which sets the cookie and redirects to `/`. All copy lives in the `content`, `capabilityData`, and `positions` maps in `script.js`.

## Buy-click notifications

Every contact CTA fires a fire-and-forget POST to `/api/buy-click` (`sendBeacon`, `keepalive` fallback) just before navigation. That endpoint forwards a short message to:

- **`BUY_CLICK_WEBHOOK_URL`** — a Discord/Slack/Make/ntfy-compatible webhook (primary channel).
- Optionally **Resend email** when `RESEND_API_KEY`, `BUY_CLICK_EMAIL_TO`, and `BUY_CLICK_EMAIL_FROM` are all set.

If neither is configured, the endpoint still returns `204` silently so nothing breaks.

### Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Required | Purpose |
| --- | --- | --- |
| `BUY_CLICK_WEBHOOK_URL` | no | Discord-style webhook for contact/buy clicks |
| `RESEND_API_KEY` | no | Optional email channel |
| `BUY_CLICK_EMAIL_TO` | no | Optional recipient |
| `BUY_CLICK_EMAIL_FROM` | no | Optional verified sender |

## Contact

WhatsApp CTAs open `https://wa.me/5521999913363` (**+55 21 99991-3363**). The number lives in one place — `CONTACT_PHONE` in `script.js` — and drives every `[data-contact-link]` href at runtime; the static `href`s in `index.html` are fallbacks.

## Publish

```powershell
npx vercel --prod --yes
```

## Local development

Any static server works for the page itself:

```powershell
npx serve .
```

The `/api/*` functions need Vercel's runtime, so test those with:

```powershell
npx vercel dev
```

`request.geo.country` is only populated on the Vercel edge network; under `vercel dev` it may be empty and the locale endpoint falls back to the `Accept-Language` header.
