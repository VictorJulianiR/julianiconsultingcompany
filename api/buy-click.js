// Buy-click notification endpoint (Vercel Serverless Function).
//
// Fire-and-forget: the client POSTs a click attribution payload just before a
// contact/buy CTA navigates away. This function forwards a short message to a
// Discord-style webhook (BUY_CLICK_WEBHOOK_URL) and, optionally, an email via
// Resend. It always returns 204 No Content so it never blocks navigation.
//
// Configure via env vars (Project Settings -> Environment Variables):
//   BUY_CLICK_WEBHOOK_URL   Discord/Slack/Make/ntfy webhook URL (primary channel)
//   RESEND_API_KEY          Optional email channel
//   BUY_CLICK_EMAIL_TO      Optional email recipient
//   BUY_CLICK_EMAIL_FROM    Optional verified sender domain

const MAX_BODY_BYTES = 32 * 1024;
const ALLOWED_ATTR_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
];

const sanitize = (value, max = 80) => {
  if (value === null || value === undefined) return "";
  return String(value).trim().slice(0, max);
};

const normalizePayload = (raw) => {
  const attribution = {};
  if (raw && typeof raw.attribution === "object") {
    for (const key of ALLOWED_ATTR_KEYS) {
      if (raw.attribution[key] !== undefined && raw.attribution[key] !== null) {
        attribution[key] = sanitize(raw.attribution[key], 500);
      }
    }
  }
  return {
    attribution,
    checkoutUrl: sanitize(raw?.checkoutUrl, 500),
    pageUrl: sanitize(raw?.pageUrl, 500),
    referrer: sanitize(raw?.referrer, 500),
    source: sanitize(raw?.source, 80) || "unknown",
    text: sanitize(raw?.text, 160) || "CTA sem texto",
    timestamp: raw?.timestamp || new Date().toISOString(),
  };
};

const buildMessage = (payload) => {
  const lines = ["**Clique em contato / compra**"];
  lines.push(`CTA: ${payload.text}`);
  lines.push(`Origem: ${payload.source}`);
  if (payload.pageUrl) lines.push(`Página: ${payload.pageUrl}`);
  if (payload.referrer) lines.push(`Referrer: ${payload.referrer}`);
  if (payload.checkoutUrl) lines.push(`Checkout: ${payload.checkoutUrl}`);
  const utm = Object.entries(payload.attribution).filter(([, v]) => v);
  if (utm.length) {
    lines.push(`Attribution: ${utm.map(([k, v]) => `${k}=${v}`).join(" | ")}`);
  }
  lines.push(`Horário: ${payload.timestamp}`);
  return lines.join("\n");
};

const readRequestBody = async (req) => {
  // Vercel usually parses JSON bodies for us.
  if (req.body && typeof req.body === "object") return req.body;
  // Otherwise, read the raw stream (capped).
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) break;
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8").trim();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
};

const sendWebhook = async (content, event, text) => {
  const url = process.env.BUY_CLICK_WEBHOOK_URL;
  if (!url) return { configured: false, ok: true };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, event, text }),
  });
  if (!response.ok) {
    throw new Error(`webhook ${response.status} ${response.statusText}`);
  }
  return { configured: true, ok: true };
};

const sendEmail = async (content, payload) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BUY_CLICK_EMAIL_TO;
  const from = process.env.BUY_CLICK_EMAIL_FROM;
  if (!apiKey || !to || !from) return { configured: false, ok: true };
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `JCC · clique em contato (${payload.source})`,
      text: content,
    }),
  });
  if (!response.ok) {
    throw new Error(`resend ${response.status} ${response.statusText}`);
  }
  return { configured: true, ok: true };
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).setHeader("Allow", "POST");
    return res.end();
  }

  try {
    const raw = await readRequestBody(req);
    const payload = normalizePayload(raw);
    const content = buildMessage(payload);

    const [webhookResult, emailResult] = await Promise.allSettled([
      sendWebhook(content, "buy_click", payload.text),
      sendEmail(content, payload),
    ]);

    if (webhookResult.status === "rejected") {
      console.error("buy-click webhook failed:", webhookResult.reason);
    }
    if (emailResult.status === "rejected") {
      console.error("buy-click email failed:", emailResult.reason);
    }
  } catch (error) {
    console.error("buy-click handler failed:", error);
  }

  // Always 204 — the click must never be blocked.
  res.status(204).end();
};
