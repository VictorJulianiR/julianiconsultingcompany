const CHECKOUT_URL = "https://pay.kiwify.com.br/RQASrq5";
const DEADLINE = new Date("2026-05-29T23:59:59-03:00");
const META_PIXEL_ID = "2506439286493521";
const MARKETING_CONSENT_KEY = "irIaMarketingConsent";

const getMarketingConsent = () => {
  try {
    return window.localStorage.getItem(MARKETING_CONSENT_KEY);
  } catch {
    return null;
  }
};

const setMarketingConsent = (value) => {
  try {
    window.localStorage.setItem(MARKETING_CONSENT_KEY, value);
  } catch {
    return false;
  }
  return true;
};

const clearMarketingConsent = () => {
  try {
    window.localStorage.removeItem(MARKETING_CONSENT_KEY);
  } catch {
    return false;
  }
  return true;
};

const checkoutLinks = document.querySelectorAll(".js-checkout");
checkoutLinks.forEach((link) => {
  link.setAttribute("href", CHECKOUT_URL);
  link.setAttribute("rel", "noopener");
  link.addEventListener("click", (event) => {
    const isPlainLeftClick =
      event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

    if (!isPlainLeftClick || typeof window.fbq !== "function") return;

    event.preventDefault();
    window.fbq("track", "InitiateCheckout", {
      content_name: "IR de Ultima Hora com IA",
      content_type: "product",
      currency: "BRL",
      value: 47.0,
    });
    window.setTimeout(() => {
      window.location.href = CHECKOUT_URL;
    }, 350);
  });
});

const pad = (value) => String(value).padStart(2, "0");
const countdownParts = {
  days: document.querySelector('[data-countdown="days"]'),
  hours: document.querySelector('[data-countdown="hours"]'),
  minutes: document.querySelector('[data-countdown="minutes"]'),
  seconds: document.querySelector('[data-countdown="seconds"]'),
};
const countdownLabels = document.querySelectorAll("[data-countdown-label]");
const stickyBuy = document.querySelector(".sticky-buy");

function updateCountdown() {
  const now = new Date();
  const diff = DEADLINE.getTime() - now.getTime();

  if (!Number.isFinite(diff) || diff <= 0) {
    Object.values(countdownParts).forEach((node) => {
      if (node) node.textContent = "00";
    });
    countdownLabels.forEach((node) => {
      node.textContent = "Prazo final encerrado";
    });
    return;
  }

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);

  if (countdownParts.days) countdownParts.days.textContent = pad(days);
  if (countdownParts.hours) countdownParts.hours.textContent = pad(hours);
  if (countdownParts.minutes) countdownParts.minutes.textContent = pad(minutes);
  if (countdownParts.seconds) countdownParts.seconds.textContent = pad(seconds);

  const label =
    days > 0
      ? `${days} dias, ${hours}h e ${minutes}min até 29/05`
      : `${hours}h ${minutes}min ${seconds}s até o prazo`;

  countdownLabels.forEach((node) => {
    node.textContent = label;
  });
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

function updateStickyBuy() {
  if (!stickyBuy) return;
  stickyBuy.classList.toggle("is-visible", window.scrollY > 420);
}

updateStickyBuy();
window.addEventListener("scroll", updateStickyBuy, { passive: true });

function loadMetaPixel() {
  if (window.fbq || !META_PIXEL_ID) return;
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

function setupCookieBanner() {
  const banner = document.querySelector("[data-cookie-banner]");
  const accept = document.querySelector("[data-cookie-accept]");
  const reject = document.querySelector("[data-cookie-reject]");
  const resetButtons = document.querySelectorAll("[data-cookie-reset]");
  const consent = getMarketingConsent();

  resetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      clearMarketingConsent();
      if (banner) banner.hidden = false;
    });
  });

  if (accept) {
    accept.addEventListener("click", () => {
      setMarketingConsent("granted");
      if (banner) banner.hidden = true;
      loadMetaPixel();
    });
  }

  if (reject) {
    reject.addEventListener("click", () => {
      setMarketingConsent("denied");
      if (banner) banner.hidden = true;
    });
  }

  if (consent === "granted") {
    loadMetaPixel();
    if (banner) banner.hidden = true;
    return;
  }

  if (consent === "denied") {
    if (banner) banner.hidden = true;
    return;
  }

  if (banner) banner.hidden = false;
}

setupCookieBanner();
