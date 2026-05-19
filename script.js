const CHECKOUT_URL = "https://pay.kiwify.com.br/RQASrq5";
const DEADLINE = new Date("2026-05-29T23:59:59-03:00");

const checkoutLinks = document.querySelectorAll(".js-checkout");
checkoutLinks.forEach((link) => {
  link.setAttribute("href", CHECKOUT_URL);
  link.setAttribute("rel", "noopener");
});

const pad = (value) => String(value).padStart(2, "0");
const countdownParts = {
  days: document.querySelector('[data-countdown="days"]'),
  hours: document.querySelector('[data-countdown="hours"]'),
  minutes: document.querySelector('[data-countdown="minutes"]'),
  seconds: document.querySelector('[data-countdown="seconds"]'),
};
const countdownLabels = document.querySelectorAll("[data-countdown-label]");

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
