const MAX_BODY_BYTES = 32_768;

function readRequestBody(req) {
  if (req.body && typeof req.body === "object") {
    return Promise.resolve(req.body);
  }

  if (typeof req.body === "string") {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.resolve({});
    }
  }

  return new Promise((resolve) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_BYTES) {
        req.destroy();
        resolve({});
      }
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });

    req.on("error", () => resolve({}));
  });
}

function sanitizeText(value, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function sanitizeAttribution(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, val]) => {
        const normalizedKey = key.toLowerCase();
        return (
          typeof val === "string" &&
          (normalizedKey.startsWith("utm_") || normalizedKey === "fbclid")
        );
      })
      .map(([key, val]) => [key.slice(0, 80), sanitizeText(val, 500)])
  );
}

function normalizePayload(payload) {
  return {
    attribution: sanitizeAttribution(payload.attribution),
    checkoutUrl: sanitizeText(payload.checkoutUrl, 1_000),
    pageUrl: sanitizeText(payload.pageUrl, 1_000),
    referrer: sanitizeText(payload.referrer, 1_000) || null,
    source: sanitizeText(payload.source, 80) || "unknown",
    text: sanitizeText(payload.text, 160) || "CTA sem texto",
    timestamp: sanitizeText(payload.timestamp, 80) || new Date().toISOString(),
  };
}

function buildMessage(event) {
  const attribution = Object.entries(event.attribution)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return [
    "Clique em Comprar",
    `CTA: ${event.text}`,
    `Origem: ${event.source}`,
    `Pagina: ${event.pageUrl || "n/a"}`,
    `Referrer: ${event.referrer || "n/a"}`,
    `Attribution: ${attribution || "n/a"}`,
    `Horario: ${event.timestamp}`,
  ].join("\n");
}

async function sendWebhook(event, message) {
  const webhookUrl = process.env.BUY_CLICK_WEBHOOK_URL;
  if (!webhookUrl) return { configured: false, ok: true };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: message,
      event,
      text: message,
    }),
  });

  return { configured: true, ok: response.ok, status: response.status };
}

async function sendEmail(event, message) {
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
      to,
      subject: `Clique em Comprar: ${event.source}`,
      text: message,
    }),
  });

  return { configured: true, ok: response.ok, status: response.status };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const payload = await readRequestBody(req);
  const event = normalizePayload(payload);
  const message = buildMessage(event);

  const results = await Promise.allSettled([sendWebhook(event, message), sendEmail(event, message)]);
  const failures = results.filter((result) => result.status === "rejected" || result.value?.ok === false);

  if (failures.length > 0) {
    console.error("buy-click notification failed", failures);
  }

  res.status(204).end();
};
