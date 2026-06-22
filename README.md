# Juliani Consulting Company

International consulting site for complex software delivery, AI systems, SaaS products, security architecture, and decision-critical automation.

The homepage is static by design. The hero uses `ascii-video-js@0.2.6` from jsDelivr to render the locally generated JCC ident as real-time ASCII video.

## Publish

```powershell
npx vercel --prod --yes
```

The production CTA opens WhatsApp at the company contact number. Update `CONTACT_PHONE` in `script.js` if that changes.

