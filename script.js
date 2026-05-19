const CHECKOUT_URL = "https://pay.kiwify.com.br/SEU-CHECKOUT-AQUI";
const DEADLINE = new Date("2026-05-29T23:59:59-03:00");

const checkoutLinks = document.querySelectorAll(".js-checkout");
const hasCheckout =
  CHECKOUT_URL.startsWith("https://pay.kiwify.com.br/") && !CHECKOUT_URL.includes("SEU-CHECKOUT");

if (hasCheckout) {
  checkoutLinks.forEach((link) => {
    link.setAttribute("href", CHECKOUT_URL);
    link.setAttribute("rel", "noopener");
  });
}

const count = document.querySelector("#deadline-count");
if (count) {
  const now = new Date();
  const diff = DEADLINE.getTime() - now.getTime();

  if (Number.isFinite(diff) && diff > 0) {
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    count.textContent = days > 0 ? `${days} dias e ${hours}h` : `${Math.max(hours, 1)}h restantes`;
  } else {
    count.textContent = "Prazo encerrado";
  }
}
