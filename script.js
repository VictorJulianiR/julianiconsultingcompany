// Juliani Consulting Company — landing page logic.
// Full-viewport ASCII identity over a living iridescent field, locale-aware
// content (pt/en), work plates, the Signal Lab, and fire-and-forget
// buy-click notifications.

const CONTACT_PHONE = "5521999913363"; // +55 21 99991-3363
const CONTACT_BASE = `https://wa.me/${CONTACT_PHONE}`;
const LOCALE_ENDPOINT = "/api/locale";
const BUY_CLICK_ENDPOINT = "/api/buy-click";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ====================== CONTENT MAP (pt / en) ====================== */

const content = {
  en: {
    "skipLink": "Skip to content",
    "nav.work": "Work",
    "nav.signalLab": "Signal Lab",
    "nav.contact": "Start a project",
    "hero.eyebrow": "Juliani Consulting Company",
    "hero.lede": "We design and build AI systems, software products, and infrastructure for work that has to hold up in production.",
    "hero.cta": "Start a project",
    "hero.ctaSecondary": "See the work",
    "machine.signal": "LIVE IDENTITY SIGNAL",
    "machine.modeSignal": "Signal",
    "machine.modeStructure": "Structure",
    "machine.modeEdge": "Edge",
    "machine.replay": "Replay ↺",
    "work.eyebrow": "Work",
    "work.title": "Four ways the work takes shape.",
    "work.cta": "Start",
    "work.1.name": "AI Systems",
    "work.1.def": "Agents and automation with real boundaries.",
    "work.1.ship": "Ships running — with escalation, oversight, and a reason to exist past the demo.",
    "work.2.name": "Products",
    "work.2.def": "SaaS and platforms built to carry customers.",
    "work.2.ship": "From architecture to the first release that has to work — and the model behind it.",
    "work.3.name": "Security",
    "work.3.def": "Threat models and hardening for production.",
    "work.3.ship": "A review of what carries real exposure, turned into a plan a team can execute.",
    "work.4.name": "Decision Systems",
    "work.4.def": "Data that ends in a decision.",
    "work.4.ship": "The flow and interface that turn uncertainty into a clear next move.",
    "signal.eyebrow": "Signal Lab",
    "signal.title": "Three questions. One starting point.",
    "signal.lede": "Tell the instrument where the pressure is. It returns a concrete first move to bring into a real conversation.",
    "signal.q1": "What needs to move?",
    "signal.a1.ai": "AI leverage",
    "signal.a1.product": "A real product",
    "signal.a1.risk": "Risk under control",
    "signal.q2": "Where is the pressure?",
    "signal.a2.revenue": "Revenue",
    "signal.a2.operations": "Operations",
    "signal.a2.trust": "Trust",
    "signal.q3": "How soon?",
    "signal.a3.weeks": "Weeks",
    "signal.a3.quarter": "This quarter",
    "signal.a3.foundation": "Foundation first",
    "signal.outputHead": "STARTING POSITION",
    "signal.send": "Send to JCC",
    "signal.copy": "Copy",
    "footer.tagline": "Juliani Consulting Company — software, internationally.",
    "footer.cta": "Start a project",
  },
  pt: {
    "skipLink": "Pular para o conteúdo",
    "nav.work": "Trabalhos",
    "nav.signalLab": "Signal Lab",
    "nav.contact": "Iniciar um projeto",
    "hero.eyebrow": "Juliani Consulting Company",
    "hero.lede": "Projetamos e construímos sistemas de IA, produtos de software e infraestrutura para trabalhos que precisam funcionar em produção.",
    "hero.cta": "Iniciar um projeto",
    "hero.ctaSecondary": "Ver os trabalhos",
    "machine.signal": "SINAL DE IDENTIDADE AO VIVO",
    "machine.modeSignal": "Sinal",
    "machine.modeStructure": "Estrutura",
    "machine.modeEdge": "Borda",
    "machine.replay": "Repetir ↺",
    "work.eyebrow": "Trabalhos",
    "work.title": "Quatro formas que o trabalho assume.",
    "work.cta": "Iniciar",
    "work.1.name": "Sistemas de IA",
    "work.1.def": "Agentes e automação com fronteiras reais.",
    "work.1.ship": "Sobem rodando — com escalonamento, supervisão e um motivo para existir depois da demo.",
    "work.2.name": "Produtos",
    "work.2.def": "SaaS e plataformas feitos para sustentar clientes.",
    "work.2.ship": "Da arquitetura ao primeiro release que precisa funcionar — e ao modelo por trás dele.",
    "work.3.name": "Segurança",
    "work.3.def": "Modelos de ameaça e hardening para produção.",
    "work.3.ship": "Uma revisão do que carrega exposição real, virada num plano que o time executa.",
    "work.4.name": "Sistemas de Decisão",
    "work.4.def": "Dados que terminam numa decisão.",
    "work.4.ship": "O fluxo e a interface que transformam incerteza num próximo passo claro.",
    "signal.eyebrow": "Signal Lab",
    "signal.title": "Três perguntas. Um ponto de partida.",
    "signal.lede": "Diga ao instrumento onde está a pressão. Ele devolve um primeiro movimento concreto para levar a uma conversa real.",
    "signal.q1": "O que precisa mudar?",
    "signal.a1.ai": "Alavancagem com IA",
    "signal.a1.product": "Um produto real",
    "signal.a1.risk": "Risco sob controle",
    "signal.q2": "Onde está a pressão?",
    "signal.a2.revenue": "Receita",
    "signal.a2.operations": "Operação",
    "signal.a2.trust": "Confiança",
    "signal.q3": "Com qual urgência?",
    "signal.a3.weeks": "Semanas",
    "signal.a3.quarter": "Neste trimestre",
    "signal.a3.foundation": "Fundação primeiro",
    "signal.outputHead": "POSIÇÃO INICIAL",
    "signal.send": "Enviar para a JCC",
    "signal.copy": "Copiar",
    "footer.tagline": "Juliani Consulting Company — software, internacionalmente.",
    "footer.cta": "Iniciar um projeto",
  },
};

// Locale-specific Signal Lab outputs.
const positions = {
  en: {
    "ai-revenue-weeks": { type: "AI SYSTEM", title: "Start with one workflow that proves the loop.", copy: "For when valuable work is stuck in people, inboxes, and manual steps close to revenue.", horizon: "Move in weeks — we scope a focused first build.", deliverables: ["Boundary", "Oversight", "Live workflow"] },
    "ai-operations-weeks": { type: "AI SYSTEM", title: "Automate the decision that repeats all day.", copy: "For manual classification, reconciliation, and document work that should be visible.", horizon: "Move in weeks — one controlled workflow end to end.", deliverables: ["Audit", "Controls", "Automation"] },
    "ai-revenue-quarter": { type: "AI SYSTEM", title: "Build the capability before the market window closes.", copy: "For when the leverage is clear but the operating model still needs to be set.", horizon: "Move this quarter — architecture plus the first live system.", deliverables: ["Architecture", "Model", "Release"] },
    "ai-operations-quarter": { type: "AI PLATFORM", title: "Turn operations into a system others can build on.", copy: "For throughput problems that keep returning because the platform under them isn't there.", horizon: "Move this quarter — the platform and its first tenant.", deliverables: ["Platform", "Tenant", "Hand-off"] },
    "ai-trust-foundation": { type: "TRUSTED AI", title: "Make the AI safe to put in production before it scales.", copy: "For when customers, regulation, or reliability make oversight a constraint, not a feature.", horizon: "Set the foundation first — governance, boundaries, and one pilot.", deliverables: ["Governance", "Boundary", "Pilot"] },
    "product-revenue-weeks": { type: "PRODUCT", title: "Ship the slice that earns its place.", copy: "For a market hypothesis that needs a real customer using real software fast.", horizon: "Move in weeks — scope, design, and ship the first cut.", deliverables: ["Scope", "Design", "First cut"] },
    "product-revenue-quarter": { type: "PRODUCT", title: "Take the product from idea to carrying a customer.", copy: "For when the opportunity is clear but the build path is still disconnected.", horizon: "Move this quarter — the release that has to work.", deliverables: ["Architecture", "Build", "Release"] },
    "risk-trust-foundation": { type: "SECURITY", title: "Find the exposure before it finds you.", copy: "For when growth, customers, or regulation make trust a business constraint.", horizon: "Set the foundation first — threat model and hardening plan.", deliverables: ["Threat model", "Review", "Hardening plan"] },
    "default": { type: "ENGAGEMENT", title: "Start with the constraint, choose the smallest serious move.", copy: "For outcomes that need framing before the technical path is obvious.", horizon: "We scope it together in one conversation.", deliverables: ["Frame", "Position", "Path"] },
  },
  pt: {
    "ai-revenue-weeks": { type: "SISTEMA DE IA", title: "Comece com um fluxo que prova o ciclo.", copy: "Para trabalho valioso preso em pessoas, inboxes e passos manuais perto da receita.", horizon: "Mover em semanas — delimitamos um primeiro build focado.", deliverables: ["Fronteira", "Supervisão", "Fluxo vivo"] },
    "ai-operations-weeks": { type: "SISTEMA DE IA", title: "Automatize a decisão que se repete o dia todo.", copy: "Para classificação manual, reconciliação e trabalho com documentos que deveriam ser visíveis.", horizon: "Mover em semanas — um fluxo controlado de ponta a ponta.", deliverables: ["Auditoria", "Controles", "Automação"] },
    "ai-revenue-quarter": { type: "SISTEMA DE IA", title: "Construa a capacidade antes da janela fechar.", copy: "Para quando a alavancagem é clara, mas o modelo operacional ainda precisa ser definido.", horizon: "Mover neste trimestre — arquitetura e o primeiro sistema vivo.", deliverables: ["Arquitetura", "Modelo", "Release"] },
    "ai-operations-quarter": { type: "PLATAFORMA DE IA", title: "Transforme a operação num sistema que outros podem construir em cima.", copy: "Para problemas de throughput que voltam porque a plataforma por baixo não existe.", horizon: "Mover neste trimestre — a plataforma e seu primeiro inquilino.", deliverables: ["Plataforma", "Inquilino", "Hand-off"] },
    "ai-trust-foundation": { type: "IA CONFIÁVEL", title: "Deixe a IA segura para produção antes de escalar.", copy: "Para quando clientes, regulação ou confiabilidade tornam supervisão uma restrição, não um recurso.", horizon: "Fundação primeiro — governança, fronteiras e um piloto.", deliverables: ["Governança", "Fronteira", "Piloto"] },
    "product-revenue-weeks": { type: "PRODUTO", title: "Lance a fatia que justifica seu lugar.", copy: "Para uma hipótese de mercado que precisa de um cliente real usando software real, rápido.", horizon: "Mover em semanas — escopo, design e lançamento do primeiro corte.", deliverables: ["Escopo", "Design", "Primeiro corte"] },
    "product-revenue-quarter": { type: "PRODUTO", title: "Leve o produto da ideia a carregar um cliente.", copy: "Para quando a oportunidade é clara, mas o caminho de build ainda está desconectado.", horizon: "Mover neste trimestre — o release que precisa funcionar.", deliverables: ["Arquitetura", "Build", "Release"] },
    "risk-trust-foundation": { type: "SEGURANÇA", title: "Encontre a exposição antes que ela encontre você.", copy: "Para quando crescimento, clientes ou regulação tornam a confiança uma restrição de negócio.", horizon: "Fundação primeiro — modelo de ameaça e plano de hardening.", deliverables: ["Modelo de ameaça", "Revisão", "Plano de hardening"] },
    "default": { type: "PROJETO", title: "Comece pela restrição, escolha o menor movimento sério.", copy: "Para resultados que precisam de enquadramento antes que o caminho técnico fique óbvio.", horizon: "Delimitamos juntos numa conversa.", deliverables: ["Enquadramento", "Posição", "Caminho"] },
  },
};

const defaultMessages = {
  en: "Hello JCC, I'd like to start a project.",
  pt: "Olá JCC, gostaria de iniciar um projeto.",
};

/* ====================== LOCALE ====================== */

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const currentLocale = () => {
  const fromAttr = document.documentElement.getAttribute("data-locale");
  return fromAttr === "pt" ? "pt" : "en";
};

const applyLocale = (locale) => {
  const html = document.documentElement;
  html.setAttribute("data-locale", locale);
  html.setAttribute("lang", locale === "pt" ? "pt-BR" : "en");
  const dict = content[locale] || content.en;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (dict[key] !== undefined) node.textContent = dict[key];
  });
};

let activeLocale = currentLocale();

const resolveLocale = async () => {
  try {
    const response = await fetch(LOCALE_ENDPOINT, { credentials: "same-origin" });
    if (!response.ok) return;
    const data = await response.json();
    const edge = data.locale === "pt" ? "pt" : "en";
    const chose = getCookie("jcc_locale");
    const params = new URLSearchParams(window.location.search);
    const forced = params.get("lang");
    if (!chose && !forced && edge !== activeLocale) {
      activeLocale = edge;
      applyLocale(activeLocale);
      setupSignalLab();
    }
  } catch {
    // Static hosts / offline: keep the pre-paint guess.
  }
};

/* ====================== CONTACT LINKS ====================== */

const setContactLinks = (brief = "") => {
  const message = brief || defaultMessages[activeLocale] || defaultMessages.en;
  document.querySelectorAll("[data-contact-link]").forEach((link) => {
    link.href = `${CONTACT_BASE}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
};

const setSignalContactLink = (brief) => {
  const link = document.querySelector("[data-signal-output] [data-contact-link]");
  if (!link) return;
  link.href = `${CONTACT_BASE}?text=${encodeURIComponent(brief)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
};

/* ====================== BUY-CLICK NOTIFICATION ====================== */

const getAttributionParams = () => {
  const params = new URLSearchParams(window.location.search);
  const attribution = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid"]) {
    const value = params.get(key);
    if (value) attribution[key] = value;
  }
  return attribution;
};

const notifyBuyClick = (source, text) => {
  const payload = {
    source: source || "unknown",
    text: text || "CTA sem texto",
    pageUrl: window.location.href,
    referrer: document.referrer || "",
    attribution: getAttributionParams(),
    timestamp: new Date().toISOString(),
  };
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(BUY_CLICK_ENDPOINT, blob)) return;
    }
  } catch {
    // fall through to fetch
  }
  fetch(BUY_CLICK_ENDPOINT, { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
};

const wireBuyClicks = () => {
  document.querySelectorAll("[data-buy-source]").forEach((link) => {
    if (!link.matches("a")) return;
    link.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const source = link.getAttribute("data-buy-source");
      const text = link.textContent.trim().slice(0, 160);
      notifyBuyClick(source, text);
    });
  });
};

/* ====================== HERO: ASCII IDENTITY OVER IRIDESCENT BG ====================== */
/* The page's CSS gradient is the iridescent field. The canvas sits in a bordered    */
/* box beside the hero copy and paints only monochrome white ASCII: a drifting       */
/* density field plus the JCC -> "Juliani Consulting Company" morph. A translucent   */
/* dark veil lets the gradient read through with depth. Pointer stirs the field.     */

const setupAsciiIdentity = () => {
  const canvas = document.querySelector("[data-ascii-canvas]");
  const machine = document.querySelector("[data-machine]");
  const replay = document.querySelector("[data-ascii-replay]");
  const machineState = document.querySelector("[data-machine-state]");
  if (!canvas || !machine) return;

  const ctx = canvas.getContext("2d");
  const mask = document.createElement("canvas");
  const maskCtx = mask.getContext("2d", { willReadFrequently: true });
  if (!ctx || !maskCtx) return;

  const MODES = {
    signal: { glyphs: " .,:;irsXA253hMHGS#9B&@", columns: 96 },
    structure: { glyphs: " .:-=+*#%@", columns: 84 },
    edge: { glyphs: " .,:;-=+*#%@", columns: 112 },
  };
  const TEXT_GLYPHS = " .:-=+*#%@";
  const MORPH_MS = 1700;
  const HOLD_MS = 2600;
  const LOOP_MS = MORPH_MS * 2 + HOLD_MS * 2;

  let mode = "signal";
  let width = 1;
  let height = 1;
  let dpr = 1;
  let cell = 8;
  let cols = 1;
  let rows = 1;
  let cycleStart = performance.now();
  let lastPaint = 0;
  let raf = 0;
  let visible = true;
  let pointer = { x: -1, y: -1, active: false };

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const ease = (value) => value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
  const falloff = (x, y, cx, cy, radius) => Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / radius);

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = MODES[mode].columns;
    rows = Math.max(24, Math.round(cols * height / width));
    cell = width / cols;
    mask.width = cols;
    mask.height = rows;
  };

  const loopProgress = (now) => {
    const phase = (now - cycleStart) % LOOP_MS;
    if (phase < MORPH_MS) return ease(phase / MORPH_MS);
    if (phase < MORPH_MS + HOLD_MS) return 1;
    if (phase < MORPH_MS * 2 + HOLD_MS) return 1 - ease((phase - MORPH_MS - HOLD_MS) / MORPH_MS);
    return 0;
  };

  // Render the wordmark into the mask canvas, scaled/rolled by morph progress.
  // progress 0 -> "JCC" (compact), 1 -> "Juliani Consulting Company" (stacked).
  const drawTextMask = (progress) => {
    const jccVisible = progress < 0.5;
    const local = jccVisible ? ease(progress / 0.5) : ease((progress - 0.5) / 0.5);
    const horizontalScale = jccVisible
      ? Math.max(0.02, Math.cos(local * Math.PI * 0.5))
      : Math.max(0.02, 0.96 * Math.sin(local * Math.PI * 0.5));
    const roll = jccVisible ? -0.1 * Math.sin(local * Math.PI) : 0.05 * (1 - local);

    maskCtx.clearRect(0, 0, cols, rows);
    maskCtx.save();
    maskCtx.translate(cols * 0.5, rows * 0.5);
    maskCtx.rotate(roll);
    maskCtx.transform(horizontalScale, -0.04 * Math.sin(local * Math.PI), 0, 1, 0, 0);
    maskCtx.fillStyle = "#fff";
    maskCtx.textAlign = "center";
    maskCtx.textBaseline = "middle";

    if (jccVisible) {
      const fontSize = Math.min(rows * 0.82, cols * 0.34);
      maskCtx.font = `800 ${fontSize}px "Funnel Display", Arial, sans-serif`;
      maskCtx.fillText("JCC", 0, 0);
    } else {
      const fontSize = Math.min(rows * 0.27, cols * 0.16);
      const lineHeight = fontSize * 1.08;
      maskCtx.font = `760 ${fontSize}px "Funnel Display", Arial, sans-serif`;
      ["Juliani", "Consulting", "Company"].forEach((line, index) => {
        maskCtx.fillText(line, 0, (index - 1) * lineHeight);
      });
    }

    maskCtx.restore();
    return maskCtx.getImageData(0, 0, cols, rows).data;
  };

  const render = (now) => {
    const progress = reducedMotion ? 1 : loopProgress(now);
    const textPixels = drawTextMask(progress);
    const time = reducedMotion ? 0 : now;
    const modeDef = MODES[mode];
    const pointerU = pointer.x / width;
    const pointerV = pointer.y / height;

    // Translucent dark veil — lets the CSS iridescent gradient show through
    // behind the glyphs, giving depth without competing color in the ASCII.
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "oklch(7% 0.02 265 / 0.55)";
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${Math.max(6.5, cell * 1.12)}px "JetBrains Mono", ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < cols; column += 1) {
        const index = row * cols + column;
        const u = (column + 0.5) / cols;
        const v = (row + 0.5) / rows;
        const x = (column + 0.5) * cell;
        const y = (row + 0.5) * cell;

        // A couple of slow-drifting light centers give the monochrome field
        // a living "density" without introducing color.
        const lightA = falloff(u, v, 0.3 + Math.sin(time * 0.00029) * 0.16, 0.4 + Math.cos(time * 0.00023) * 0.14, 0.16);
        const lightB = falloff(u, v, 0.7 + Math.cos(time * 0.00021) * 0.14, 0.6 + Math.sin(time * 0.00031) * 0.16, 0.16);
        const scan = (Math.sin(u * 22 - v * 13 + time * 0.0018) + 1) / 2;
        const ripple = (Math.sin(Math.hypot(u - 0.5, v - 0.5) * 26 - time * 0.002) + 1) / 2;
        const dominant = Math.max(lightA, lightB);

        let energy = clamp(0.08 + dominant * 0.8 + scan * 0.12 + ripple * 0.1);
        if (mode === "structure") {
          energy = clamp(0.08 + dominant * 0.85 + (row % 6 === 0 ? 0.18 : 0) + scan * 0.14);
        } else if (mode === "edge") {
          const contour = Math.abs(Math.sin((lightA * 1.6 + lightB * 1.3) * 19 + time * 0.0015));
          energy = clamp(contour * 0.96 + dominant * 0.4);
        }

        const pointerDistance = pointer.active ? Math.hypot(u - pointerU, v - pointerV) : 1;
        const pointerLift = pointer.active ? clamp(1 - pointerDistance / 0.2) * 0.4 : 0;

        const textAlpha = textPixels[index * 4 + 3] / 255;
        if (textAlpha > 0.03) {
          // Wordmark: crisp white ASCII, brighter where the mask is denser.
          const glyph = TEXT_GLYPHS[Math.min(TEXT_GLYPHS.length - 1, Math.ceil(textAlpha * (TEXT_GLYPHS.length - 1)))];
          if (glyph !== " ") {
            ctx.fillStyle = `hsla(220, 8%, ${86 + textAlpha * 12}%, ${0.9 + textAlpha * 0.1})`;
            ctx.fillText(glyph, x, y);
          }
          continue;
        }

        // Field: monochrome white glyphs at varying density/opacity.
        const glyph = modeDef.glyphs[Math.min(modeDef.glyphs.length - 1, Math.floor((energy + pointerLift) * (modeDef.glyphs.length - 1)))];
        if (glyph === " ") continue;
        const intensity = energy + pointerLift;
        ctx.fillStyle = `hsla(220, 10%, ${72 + intensity * 22}%, ${0.14 + intensity * 0.8})`;
        ctx.fillText(glyph, x, y);
      }
    }

    if (machineState) {
      const onEdge = progress > 0.46 && progress < 0.54;
      machineState.textContent = reducedMotion
        ? "IDENTITY LOCKED"
        : onEdge ? "MORPH" : `${mode.toUpperCase()} / LIVE`;
    }
  };

  const frame = (now) => {
    raf = 0;
    if (!visible) return;
    if (now - lastPaint >= 1000 / 30) {
      render(now);
      lastPaint = now;
    }
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (!reducedMotion && !raf) raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  const replayIdent = () => {
    cycleStart = performance.now();
    render(cycleStart);
    start();
  };

  resize();
  window.addEventListener("resize", () => { resize(); render(performance.now()); }, { passive: true });
  machine.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
  }, { passive: true });
  machine.addEventListener("pointerleave", () => { pointer.active = false; }, { passive: true });
  replay?.addEventListener("click", replayIdent);

  document.querySelectorAll("[data-ascii-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.asciiMode in MODES ? button.dataset.asciiMode : "signal";
      document.querySelectorAll("[data-ascii-mode]").forEach((node) => node.setAttribute("aria-pressed", String(node === button)));
      resize();
      render(performance.now());
    });
  });

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      if (reducedMotion) render(performance.now());
      else start();
    } else {
      stop();
    }
  }, { threshold: 0 });
  observer.observe(machine);

  document.fonts?.ready?.then(() => render(performance.now()));
  replayIdent();
};

/* ====================== SIGNAL LAB ====================== */

const setupSignalLab = () => {
  const form = document.querySelector("[data-signal-form]");
  const type = document.querySelector("[data-signal-type]");
  const title = document.querySelector("[data-signal-title]");
  const copy = document.querySelector("[data-signal-copy]");
  const horizon = document.querySelector("[data-signal-horizon]");
  const deliverables = document.querySelector("[data-signal-deliverables]");
  const status = document.querySelector("[data-signal-status]");
  const copyButton = document.querySelector("[data-copy-brief]");
  const copyStatus = document.querySelector("[data-copy-status]");
  if (!form) return;
  const table = positions[activeLocale] || positions.en;
  let brief = "";

  const render = () => {
    const values = new FormData(form);
    const change = values.get("change");
    const pressure = values.get("pressure");
    const horizonVal = values.get("horizon");
    const position = table[`${change}-${pressure}-${horizonVal}`] || table.default;
    type.textContent = position.type;
    title.textContent = position.title;
    copy.textContent = position.copy;
    horizon.textContent = position.horizon;
    deliverables.replaceChildren(...position.deliverables.map((item) => {
      const tag = document.createElement("span");
      tag.textContent = item;
      return tag;
    }));
    status.textContent = activeLocale === "pt" ? "DEFINIDA" : "SET";
    brief = activeLocale === "pt"
      ? `Olá JCC. Mapeei uma posição inicial no site.%0A%0AMudança: ${change}.%0APressão: ${pressure}.%0AHorizonte: ${horizonVal}.%0A%0APonto de partida: ${position.type}.%0A${position.title}`
      : `Hello JCC. I mapped a starting position on the site.%0A%0AChange: ${change}.%0APressure: ${pressure}.%0AHorizon: ${horizonVal}.%0A%0AStarting point: ${position.type}.%0A${position.title}`;
    setSignalContactLink(decodeURIComponent(brief));
  };

  form.addEventListener("change", render);
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const plainBrief = decodeURIComponent(brief).replace(/%0A/g, "\n");
      try {
        await navigator.clipboard.writeText(plainBrief);
        copyStatus.textContent = activeLocale === "pt" ? "Brief copiado." : "Brief copied.";
      } catch {
        copyStatus.textContent = activeLocale === "pt"
          ? "Cópia indisponível aqui — use \"Enviar para a JCC\"."
          : "Copy unavailable here — use \"Send to JCC\".";
      }
    });
  }
  render();
};

/* ====================== HEADER SCROLL STATE ====================== */

const setupHeader = () => {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const onScroll = () => header.setAttribute("data-scrolled", String(window.scrollY > 40));
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
};

/* ====================== BOOT ====================== */

applyLocale(activeLocale);
setContactLinks();
wireBuyClicks();
setupHeader();
setupAsciiIdentity();
setupSignalLab();
resolveLocale(); // async edge confirmation, may refine locale post-load
