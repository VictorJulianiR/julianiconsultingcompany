// Juliani Consulting Company — landing page logic.
// Locale-aware content, interactive ASCII/HyperFrames hero, capabilities,
// Signal Lab, and fire-and-forget buy-click notifications.

const CONTACT_PHONE = "5521999913363"; // +55 21 99991-3363
const CONTACT_BASE = `https://wa.me/${CONTACT_PHONE}`;
const LOCALE_ENDPOINT = "/api/locale";
const BUY_CLICK_ENDPOINT = "/api/buy-click";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ====================== CONTENT MAP (pt / en) ====================== */

const content = {
  en: {
    "skipLink": "Skip to content",
    "nav.capabilities": "Capabilities",
    "nav.approach": "Approach",
    "nav.signalLab": "Signal Lab",
    "nav.contact": "Start a conversation",
    "hero.eyebrow": "JCC / Independent software consultancy",
    "hero.title": "Build the hard part<br /><span>before it hardens.</span>",
    "hero.lede": "Juliani Consulting Company works with teams that need decisive software: AI that runs inside the business, products that can carry a market, and infrastructure that deserves to be trusted.",
    "hero.ctaPrimary": "Bring the difficult problem",
    "hero.ctaSecondary": "Map it first",
    "hero.proof1": "International",
    "hero.proof2": "Senior-led",
    "hero.proof3": "Built to transfer",
    "machine.signal": "LIVE IDENTITY SIGNAL",
    "machine.modeSignal": "Signal",
    "machine.modeStructure": "Structure",
    "machine.modeEdge": "Edge map",
    "machine.hint": "Move your pointer across the field",
    "statement.body": "Most software risk is created before the first sprint. We enter where the architecture, the model, the operating reality, and the decision-maker have stopped agreeing.",
    "statement.tag": "does not sell hours without a point of view.",
    "capabilities.eyebrow": "What can be put in motion",
    "capabilities.title": "The work is broad.<br />The standard is specific.",
    "capabilities.lede": "Choose a field. The ledger shows the practical outcome, not a list of fashionable nouns.",
    "cap.ai.label": "AI systems &amp; automation",
    "cap.saas.label": "SaaS &amp; internal platforms",
    "cap.chat.label": "Conversational business systems",
    "cap.security.label": "Security architecture &amp; hardening",
    "cap.data.label": "Data, analytics &amp; decision systems",
    "cap.special.label": "The thing nobody owns yet",
    "cap.detailContact": "Discuss this work",
    "approach.eyebrow": "How the work holds up",
    "approach.title": "A consulting engagement should leave the system more legible than it found it.",
    "approach.step1.h": "Find the load-bearing problem",
    "approach.step1.p": "Separate the visible request from the constraint that is actually making the business slow, exposed, or unable to move.",
    "approach.step2.h": "Make the smallest serious system",
    "approach.step2.p": "Set architecture, interfaces, controls, and delivery slices around the decision that needs to become true first.",
    "approach.step3.h": "Put it under real pressure",
    "approach.step3.p": "Test the behavior, failure modes, security posture, and team hand-off against the conditions that matter after launch.",
    "approach.step4.h": "Leave the next move obvious",
    "approach.step4.p": "Document the choices, transfer the capability, and make the next investment easier to judge.",
    "signal.eyebrow": "Signal Lab / 90 seconds",
    "signal.title": "Give the problem a shape.",
    "signal.lede": "Not a lead form. A first technical position. Select the variables that are true now and get a sensible starting engagement to bring into a real conversation.",
    "signal.qChange": "What needs to change?",
    "signal.change.ai": "Expert work needs leverage",
    "signal.change.product": "A product needs to become real",
    "signal.change.risk": "Risk is outrunning confidence",
    "signal.qPressure": "Where is the pressure?",
    "signal.pressure.revenue": "Revenue or customer experience",
    "signal.pressure.operations": "Operations and internal throughput",
    "signal.pressure.trust": "Security, reliability, or compliance",
    "signal.qHorizon": "How soon must it move?",
    "signal.horizon.weeks": "Within weeks",
    "signal.horizon.quarter": "This quarter",
    "signal.horizon.foundation": "Set the foundation first",
    "signal.outputHead": "WORKING POSITION",
    "signal.copy": "Copy this brief",
    "signal.send": "Send it to JCC",
    "closing.title": "If it has to work outside the slide deck, bring it here.",
    "closing.cta": "Start with the context",
    "footer.tagline": "Juliani Consulting Company. Software consulting, internationally.",
    "footer.whatsapp": "WhatsApp",
  },
  pt: {
    "skipLink": "Pular para o conteúdo",
    "nav.capabilities": "Capacidades",
    "nav.approach": "Método",
    "nav.signalLab": "Signal Lab",
    "nav.contact": "Iniciar conversa",
    "hero.eyebrow": "JCC / Consultoria de software independente",
    "hero.title": "Construa a parte difícil<br /><span>antes dela endurecer.</span>",
    "hero.lede": "A Juliani Consulting Company trabalha com times que precisam de software decisivo: IA que roda dentro do negócio, produtos que sustentam um mercado e infraestrutura que merece confiança.",
    "hero.ctaPrimary": "Traga o problema difícil",
    "hero.ctaSecondary": "Mapear primeiro",
    "hero.proof1": "Internacional",
    "hero.proof2": "Liderança sênior",
    "hero.proof3": "Feito para transferir",
    "machine.signal": "SINAL DE IDENTIDADE AO VIVO",
    "machine.modeSignal": "Sinal",
    "machine.modeStructure": "Estrutura",
    "machine.modeEdge": "Mapa de borda",
    "machine.hint": "Mova o ponteiro pelo campo",
    "statement.body": "A maior parte do risco de software é criada antes da primeira sprint. Entramos onde a arquitetura, o modelo, a realidade operacional e quem decide deixaram de concordar.",
    "statement.tag": "não vende horas sem um ponto de vista.",
    "capabilities.eyebrow": "O que pode ser colocado em movimento",
    "capabilities.title": "O trabalho é amplo.<br />O padrão é específico.",
    "capabilities.lede": "Escolha uma área. O balanço mostra o resultado prático, não uma lista de substantivos da moda.",
    "cap.ai.label": "Sistemas de IA &amp; automação",
    "cap.saas.label": "SaaS &amp; plataformas internas",
    "cap.chat.label": "Sistemas conversacionais",
    "cap.security.label": "Arquitetura de segurança &amp; hardening",
    "cap.data.label": "Dados, analytics &amp; decisão",
    "cap.special.label": "O que ninguém ainda assume",
    "cap.detailContact": "Conversar sobre este trabalho",
    "approach.eyebrow": "Como o trabalho se sustenta",
    "approach.title": "Um projeto de consultoria deve deixar o sistema mais legível do que o encontrou.",
    "approach.step1.h": "Encontrar o problema estrutural",
    "approach.step1.p": "Separar o pedido visível da restrição que está, de fato, deixando o negócio lento, exposto ou parado.",
    "approach.step2.h": "Construir o menor sistema sério",
    "approach.step2.p": "Definir arquitetura, interfaces, controles e fatias de entrega em torno da decisão que precisa se tornar verdadeira primeiro.",
    "approach.step3.h": "Colocar sob pressão real",
    "approach.step3.p": "Testar comportamento, modos de falha, postura de segurança e entrega ao time nas condições que importam depois do go-live.",
    "approach.step4.h": "Deixar o próximo passo óbvio",
    "approach.step4.p": "Documentar as escolhas, transferir a capacidade e tornar o próximo investimento mais fácil de julgar.",
    "signal.eyebrow": "Signal Lab / 90 segundos",
    "signal.title": "Dê forma ao problema.",
    "signal.lede": "Não é um formulário de lead. É uma primeira posição técnica. Selecione as variáveis verdadeiras agora e receba um ponto de partida sensato para uma conversa real.",
    "signal.qChange": "O que precisa mudar?",
    "signal.change.ai": "Trabalho de especialista precisa de alavancagem",
    "signal.change.product": "Um produto precisa virar realidade",
    "signal.change.risk": "Risco está superando a confiança",
    "signal.qPressure": "Onde está a pressão?",
    "signal.pressure.revenue": "Receita ou experiência do cliente",
    "signal.pressure.operations": "Operações e fluxo interno",
    "signal.pressure.trust": "Segurança, confiabilidade ou compliance",
    "signal.qHorizon": "Com qual urgência?",
    "signal.horizon.weeks": "Em semanas",
    "signal.horizon.quarter": "Neste trimestre",
    "signal.horizon.foundation": "Primeiro, a fundação",
    "signal.outputHead": "POSIÇÃO DE TRABALHO",
    "signal.copy": "Copiar este brief",
    "signal.send": "Enviar para a JCC",
    "closing.title": "Se precisa funcionar fora do slide, traga para cá.",
    "closing.cta": "Comece pelo contexto",
    "footer.tagline": "Juliani Consulting Company. Consultoria de software, internacionalmente.",
    "footer.whatsapp": "WhatsApp",
  },
};

// Locale-specific capability detail and signal positions.
const capabilityData = {
  en: {
    ai: {
      code: "CAPABILITY / 01",
      title: "AI systems that belong to the operation.",
      copy: "Turn scattered expertise, documents, decisions, and workflows into AI systems with defined boundaries, human escalation, observability, and a reason to exist after the demo.",
      items: ["Knowledge and retrieval systems", "Agent workflows with controlled actions", "Automation that can be audited and improved"],
    },
    saas: {
      code: "CAPABILITY / 02",
      title: "A product surface with a real operating model behind it.",
      copy: "Shape and build SaaS products or internal platforms from the commercial pressure backward, so the product, data model, and service behavior agree before scale makes the shortcuts expensive.",
      items: ["Product and platform architecture", "High-leverage delivery slices", "Billing, permissions, and operational foundations"],
    },
    chat: {
      code: "CAPABILITY / 03",
      title: "Conversations that move work, not just messages.",
      copy: "Design chatbots and conversational systems that understand their role, take bounded action, keep context where it belongs, and hand off gracefully when a human should decide.",
      items: ["Business chat and messaging automation", "Tool-enabled assistants", "Quality controls and escalation paths"],
    },
    security: {
      code: "CAPABILITY / 04",
      title: "Security that makes decisions easier, not slower.",
      copy: "Clarify the threat model, security architecture, and controls around the parts of the system that carry real exposure. Then convert the findings into a delivery plan people can actually use.",
      items: ["Architecture and attack-surface review", "Identity, access, and data boundaries", "Practical hardening roadmaps"],
    },
    data: {
      code: "CAPABILITY / 05",
      title: "Data systems that produce a decision, not another dashboard.",
      copy: "Build the data flows, observability, and decision interfaces that make uncertainty visible and action possible for the people responsible for the outcome.",
      items: ["Data product architecture", "Operational analytics", "Decision-focused interfaces"],
    },
    special: {
      code: "CAPABILITY / 06",
      title: "The strategic software problem without an obvious owner.",
      copy: "Some work falls between product, engineering, operations, security, and AI. That is usually where the highest-leverage system change is hiding. JCC can frame it, make it buildable, and drive the first serious version.",
      items: ["Technical discovery under ambiguity", "System design across functions", "Senior execution when momentum matters"],
    },
  },
  pt: {
    ai: {
      code: "CAPACIDADE / 01",
      title: "Sistemas de IA que pertencem à operação.",
      copy: "Transformar especialização, documentos, decisões e fluxos dispersos em sistemas de IA com fronteiras definidas, escalonamento humano, observabilidade e um motivo para existir depois da demo.",
      items: ["Sistemas de conhecimento e recuperação", "Fluxos de agentes com ações controladas", "Automação auditável e aprimorável"],
    },
    saas: {
      code: "CAPACIDADE / 02",
      title: "Um produto com um modelo operacional real por trás.",
      copy: "Desenhar e construir produtos SaaS ou plataformas internas a partir da pressão comercial para trás, para que produto, modelo de dados e comportamento do serviço concordem antes que a escala torne os atalhos caros.",
      items: ["Arquitetura de produto e plataforma", "Fatias de entrega de alto impacto", "Cobrança, permissões e fundamentos operacionais"],
    },
    chat: {
      code: "CAPACIDADE / 03",
      title: "Conversas que movem trabalho, não só mensagens.",
      copy: "Desenhar chatbots e sistemas conversacionais que entendem seu papel, executam ações delimitadas, mantêm o contexto onde deve estar e passam a bola com elegância quando um humano deveria decidir.",
      items: ["Chat corporativo e automação de mensagens", "Assistentes com ferramentas", "Controles de qualidade e rotas de escalonamento"],
    },
    security: {
      code: "CAPACIDADE / 04",
      title: "Segurança que facilita decisões, em vez de atrasá-las.",
      copy: "Esclarecer o modelo de ameaça, a arquitetura de segurança e os controles ao redor das partes do sistema com exposição real. Depois converter achados em um plano de entrega que as pessoas conseguem usar.",
      items: ["Revisão de arquitetura e superfície de ataque", "Identidade, acesso e fronteiras de dados", "Roadmaps de hardening na prática"],
    },
    data: {
      code: "CAPACIDADE / 05",
      title: "Sistemas de dados que produzem uma decisão, não outro dashboard.",
      copy: "Construir os fluxos de dados, a observabilidade e as interfaces de decisão que tornam a incerteza visível e a ação possível para quem responde pelo resultado.",
      items: ["Arquitetura de produto de dados", "Analytics operacional", "Interfaces focadas em decisão"],
    },
    special: {
      code: "CAPACIDADE / 06",
      title: "O problema estratégico de software sem dono óbvio.",
      copy: "Algum trabalho cai entre produto, engenharia, operações, segurança e IA. É onde costuma estar a maior alavancagem de mudança de sistema. A JCC enquadra, torna construtível e conduz a primeira versão séria.",
      items: ["Discovery técnico sob ambiguidade", "Design de sistema entre funções", "Execução sênior quando o momento importa"],
    },
  },
};

const positions = {
  en: {
    "ai-revenue-weeks": {
      type: "AI REVENUE SYSTEM",
      title: "Start with a leverage map, then build one customer-facing workflow that earns its place.",
      copy: "Useful when valuable judgment is trapped in people, inboxes, long documents, or manual hand-offs close to the customer.",
      deliverables: ["Decision map", "System boundary", "One live workflow"],
    },
    "ai-operations-weeks": {
      type: "AI OPERATING SYSTEM",
      title: "Instrument the repetitive decision, then make one controlled workflow move work end to end.",
      copy: "Useful when operations depend on manual classification, document work, reconciliation, or coordination that should be visible and improvable.",
      deliverables: ["Workflow audit", "Control points", "Production automation"],
    },
    "risk-trust-foundation": {
      type: "TRUST FOUNDATION",
      title: "Map the exposure before adding features, then harden the boundaries that actually carry risk.",
      copy: "Useful when customers, regulation, reliability, or a growing platform make confidence a business constraint.",
      deliverables: ["Threat model", "Architecture review", "Hardening plan"],
    },
    "product-revenue-quarter": {
      type: "PRODUCT ACCELERATOR",
      title: "Turn the market hypothesis into a narrow product system that can carry a real customer.",
      copy: "Useful when the opportunity is clear but the product, implementation sequence, and operating model are still disconnected.",
      deliverables: ["Product frame", "System design", "First serious release"],
    },
    default: {
      type: "SENIOR BUILDING BLOCK",
      title: "Start with the system constraint, then choose the smallest serious engagement that changes it.",
      copy: "Useful when there is a meaningful outcome to unlock, but the right technical move still needs disciplined framing.",
      deliverables: ["Problem frame", "Technical position", "Delivery path"],
    },
  },
  pt: {
    "ai-revenue-weeks": {
      type: "SISTEMA DE IA PARA RECEITA",
      title: "Comece com um mapa de alavancagem e construa um fluxo voltado ao cliente que justifique seu lugar.",
      copy: "Útil quando julgamento valioso está preso em pessoas, inboxes, documentos longos ou entregas manuais próximas ao cliente.",
      deliverables: ["Mapa de decisão", "Fronteira do sistema", "Um fluxo em produção"],
    },
    "ai-operations-weeks": {
      type: "SISTEMA OPERACIONAL DE IA",
      title: "Instrumente a decisão repetitiva e faça um fluxo controlado mover trabalho de ponta a ponta.",
      copy: "Útil quando a operação depende de classificação manual, trabalho com documentos, reconciliação ou coordenação que deveria ser visível e aprimorável.",
      deliverables: ["Auditoria de fluxos", "Pontos de controle", "Automação em produção"],
    },
    "risk-trust-foundation": {
      type: "FUNDAÇÃO DE CONFIANÇA",
      title: "Mapeie a exposição antes de adicionar features e endureça as fronteiras que realmente carregam risco.",
      copy: "Útil quando clientes, regulação, confiabilidade ou uma plataforma crescente tornam a confiança uma restrição de negócio.",
      deliverables: ["Modelo de ameaça", "Revisão de arquitetura", "Plano de hardening"],
    },
    "product-revenue-quarter": {
      type: "ACELERADOR DE PRODUTO",
      title: "Transforme a hipótese de mercado em um sistema de produto estreito capaz de sustentar um cliente real.",
      copy: "Útil quando a oportunidade é clara, mas produto, sequência de implementação e modelo operacional ainda estão desconectados.",
      deliverables: ["Enquadramento de produto", "Design de sistema", "Primeiro release sério"],
    },
    default: {
      type: "BLOCO SÊNIOR DE PARTIDA",
      title: "Comece pela restrição do sistema e escolha o menor projeto sério que a modifica.",
      copy: "Útil quando há um resultado significativo a destravar, mas o movimento técnico certo ainda precisa de enquadramento disciplinado.",
      deliverables: ["Enquadramento do problema", "Posição técnica", "Caminho de entrega"],
    },
  },
};

const defaultMessages = {
  en: "Hello JCC, I would like to discuss a software consulting engagement.",
  pt: "Olá JCC, gostaria de conversar sobre um projeto de consultoria de software.",
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
  // HTML-bearing keys (line breaks, spans).
  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const key = node.getAttribute("data-i18n-html");
    if (dict[key] !== undefined) node.innerHTML = dict[key];
  });
};

let activeLocale = currentLocale();

const resolveLocale = async () => {
  // Sync pre-paint stamp already ran in <head>. Confirm against the edge.
  try {
    const response = await fetch(LOCALE_ENDPOINT, { credentials: "same-origin" });
    if (!response.ok) return;
    const data = await response.json();
    const edge = data.locale === "pt" ? "pt" : "en";
    // Only auto-correct from the edge if the user hasn't chosen manually.
    const chose = getCookie("jcc_locale");
    const params = new URLSearchParams(window.location.search);
    const forced = params.get("lang");
    if (!chose && !forced && edge !== activeLocale) {
      activeLocale = edge;
      applyLocale(activeLocale);
      // Re-run locale-dependent modules.
      setupCapabilities();
      setupSignalLab();
    }
  } catch {
    // Static hosts / offline: keep the pre-paint guess. No-op.
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
  // keepalive so the request survives navigation away.
  fetch(BUY_CLICK_ENDPOINT, { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
};

const wireBuyClicks = () => {
  document.querySelectorAll("[data-buy-source]").forEach((link) => {
    if (!link.matches("a")) return;
    link.addEventListener("click", (event) => {
      // Only plain left-clicks that will actually navigate.
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const source = link.getAttribute("data-buy-source");
      const text = link.textContent.trim().slice(0, 160);
      notifyBuyClick(source, text);
    });
  });
};

/* ====================== HERO: MORPHING WORDMARK ====================== */

const setupWordmark = () => {
  const wordmark = document.querySelector("[data-morph-wordmark]");
  const jcc = document.querySelector("[data-morph-jcc]");
  const full = document.querySelector("[data-morph-full]");
  const machineState = document.querySelector("[data-machine-state]");
  if (!wordmark || !jcc || !full) return;

  const fullName = "Juliani Consulting Company";
  // Split the full name into per-letter spans for a staggered reveal.
  full.replaceChildren();
  [...fullName].forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    if (char === " ") span.style.minWidth = ".28em";
    full.appendChild(span);
    span.style.transitionDelay = `${0.62 + (span.dataset.i || 0) * 22}ms`;
  });
  [...full.children].forEach((span, i) => { span.style.transitionDelay = `${620 + i * 22}ms`; });

  const morph = () => {
    if (reducedMotion) {
      wordmark.classList.add("is-morphed");
      machineState && (machineState.textContent = "IDENTITY LOCKED");
      revealCaption();
      return;
    }
    wordmark.classList.remove("is-morphed");
    wordmark.classList.add("is-spinning");
    machineState && (machineState.textContent = "MORPHING");
    window.setTimeout(() => {
      wordmark.classList.remove("is-spinning");
      wordmark.classList.add("is-morphed");
      machineState && (machineState.textContent = "IDENTITY LOCKED");
      revealCaption();
    }, 820);
  };

  wordmark.addEventListener("click", morph);

  // Pointer 3D parallax (perspective tilt). Reduced-motion users skip this.
  if (!reducedMotion) {
    const stage = document.querySelector("[data-wordmark-stage]");
    const tilt = (event) => {
      const rect = stage.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      wordmark.style.transform = `rotateY(${px * 18}deg) rotateX(${-py * 12}deg)`;
    };
    const reset = () => { wordmark.style.transform = ""; };
    stage?.addEventListener("pointermove", tilt);
    stage?.addEventListener("pointerleave", reset);
  }

  // Kick off the animation shortly after load.
  window.setTimeout(morph, reducedMotion ? 0 : 600);
};

const revealCaption = () => {
  const lines = [...document.querySelectorAll("[data-ident-line]")];
  lines.forEach((line, index) => {
    window.setTimeout(() => line.classList.add("is-revealed"), reducedMotion ? 0 : 140 + index * 320);
  });
};

/* ====================== HERO: ASCII GLYPH CANVAS ====================== */

const ASCII_CHARSETS = {
  signal: " .·:-=+*▒▓#%@",
  structure: " ─│┌┐└┘├┤┬┴┼═║╔╗╚╝",
  edge: "⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏",
};

const setupAsciiField = () => {
  const canvas = document.querySelector("[data-ascii-canvas]");
  const machine = document.querySelector("[data-machine]");
  const machineState = document.querySelector("[data-machine-state]");
  if (!canvas || !machine) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let cell = 13; // px per glyph cell
  let cols = 0;
  let rows = 0;
  let glyphs = []; // {x,y,char,phase,hue}
  let pointer = { x: -9999, y: -9999, active: false };
  let mode = "signal";
  let raf = 0;
  let startTime = performance.now();

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Scale cell size down on small screens for density.
    cell = width < 480 ? 10 : width < 720 ? 12 : 14;
    cols = Math.ceil(width / cell) + 1;
    rows = Math.ceil(height / cell) + 1;
    buildGlyphs();
  };

  const pickChar = (t, intensity) => {
    const set = ASCII_CHARSETS[mode];
    const idx = Math.max(0, Math.min(set.length - 1, Math.floor(intensity * (set.length - 1))));
    return set[idx];
  };

  const buildGlyphs = () => {
    glyphs = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        glyphs.push({
          x: c * cell + cell / 2,
          y: r * cell + cell / 2,
          phase: Math.random() * Math.PI * 2,
          freq: 0.6 + Math.random() * 0.9,
        });
      }
    }
  };

  // Hue cycles blue (248) -> violet (300) -> gold (80), matching the iridescent field.
  const hueAt = (x, y, t) => {
    const wave = (Math.sin((x / width) * Math.PI * 2 + t * 0.0004) + 1) / 2;
    const wave2 = (Math.cos((y / height) * Math.PI * 2 - t * 0.0003) + 1) / 2;
    const blend = (wave + wave2) / 2;
    // Map blend [0..1] across blue -> violet -> gold.
    let hue;
    if (blend < 0.5) {
      hue = 248 + (300 - 248) * (blend / 0.5);
    } else {
      // wrap gold (80) from the violet end by going forward through 360.
      hue = 300 + ((80 + 360 - 300) * ((blend - 0.5) / 0.5));
      hue = hue % 360;
    }
    return hue;
  };

  const draw = (now) => {
    const t = now - startTime;
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${Math.round(cell * 0.95)}px "JetBrains Mono", ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (const g of glyphs) {
      // Base wave intensity.
      let intensity = 0.35 + 0.3 * Math.sin(t * 0.001 * g.freq + g.phase + g.x * 0.01);

      // Pointer proximity boosts brightness + ripple.
      if (pointer.active) {
        const dx = g.x - pointer.x;
        const dy = g.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ripple = Math.max(0, 1 - dist / 180);
        intensity += ripple * 0.7;
        if (reducedMotion) intensity = Math.min(intensity, 0.85);
      }
      intensity = Math.max(0, Math.min(1, intensity));

      const char = pickChar(t, intensity);
      if (char === " " || char === "⠀") continue;

      const hue = hueAt(g.x, g.y, t);
      const light = 55 + intensity * 30;
      const alpha = 0.25 + intensity * 0.6;
      ctx.fillStyle = `hsla(${hue}, 85%, ${light}%, ${alpha})`;
      ctx.fillText(char, g.x, g.y);
    }

    raf = requestAnimationFrame(draw);
  };

  const onPointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  };
  const onPointerLeave = () => { pointer.active = false; };

  const start = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(draw);
  };
  const stop = () => cancelAnimationFrame(raf);

  resize();
  window.addEventListener("resize", resize, { passive: true });
  machine.addEventListener("pointermove", onPointerMove);
  machine.addEventListener("pointerleave", onPointerLeave);

  // Mode buttons switch the glyph charset + behavior.
  document.querySelectorAll("[data-ascii-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.asciiMode;
      document.querySelectorAll("[data-ascii-mode]").forEach((node) => node.setAttribute("aria-pressed", String(node === button)));
      machineState && (machineState.textContent = `${mode.toUpperCase()} MODE`);
    });
  });

  // Pause animation when the hero scrolls off-screen (saves CPU).
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) start();
      else stop();
    });
  }, { threshold: 0 });
  io.observe(machine);

  if (reducedMotion) {
    // Draw a single static frame; pointer interactivity still works on hover.
    start();
    window.setTimeout(stop, 400);
  }
};

/* ====================== CAPABILITIES ====================== */

const setupCapabilities = () => {
  const title = document.querySelector("[data-detail-title]");
  const code = document.querySelector("[data-detail-code]");
  const copy = document.querySelector("[data-detail-copy]");
  const list = document.querySelector("[data-detail-list]");
  const panel = document.querySelector("#capability-detail");
  const data = capabilityData[activeLocale] || capabilityData.en;

  // Seed the panel with the first (ai) capability so localized copy is correct.
  const firstButton = document.querySelector("[data-capability][aria-selected='true']") || document.querySelector("[data-capability]");
  if (firstButton) {
    const firstKey = firstButton.dataset.capability;
    const first = data[firstKey];
    if (first) {
      code.textContent = first.code;
      title.textContent = first.title;
      copy.textContent = first.copy;
      list.replaceChildren(...first.items.map((item) => {
        const node = document.createElement("li");
        node.textContent = item;
        return node;
      }));
      panel.setAttribute("aria-labelledby", firstButton.id);
    }
  }

  document.querySelectorAll("[data-capability]").forEach((button) => {
    // Replace listener cleanly by cloning when re-running on locale change.
    const fresh = button.cloneNode(true);
    button.replaceWith(fresh);
  });

  document.querySelectorAll("[data-capability]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.capability;
      const item = data[key];
      if (!item) return;
      document.querySelectorAll("[data-capability]").forEach((node) => node.setAttribute("aria-selected", String(node === button)));
      code.textContent = item.code;
      title.textContent = item.title;
      copy.textContent = item.copy;
      list.replaceChildren(...item.items.map((entry) => {
        const node = document.createElement("li");
        node.textContent = entry;
        return node;
      }));
      panel.setAttribute("aria-labelledby", button.id);
    });
  });
};

/* ====================== SIGNAL LAB ====================== */

const setupSignalLab = () => {
  const form = document.querySelector("[data-signal-form]");
  const type = document.querySelector("[data-signal-type]");
  const title = document.querySelector("[data-signal-title]");
  const copy = document.querySelector("[data-signal-copy]");
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
    const horizon = values.get("horizon");
    const position = table[`${change}-${pressure}-${horizon}`] || table.default;
    type.textContent = position.type;
    title.textContent = position.title;
    copy.textContent = position.copy;
    deliverables.replaceChildren(...position.deliverables.map((item) => {
      const tag = document.createElement("span");
      tag.textContent = item;
      return tag;
    }));
    status.textContent = activeLocale === "pt" ? "POSIÇÃO DEFINIDA" : "POSITION SET";
    brief = activeLocale === "pt"
      ? `Olá JCC, esta é a posição inicial que mapeei no seu site.%0A%0AMudança necessária: ${change}.%0APressão: ${pressure}.%0AHorizonte: ${horizon}.%0A%0APonto de partida recomendado: ${position.type}.%0A${position.title}`
      : `Hello JCC, here is the starting position I mapped on your site.%0A%0AChange needed: ${change}.%0APressure: ${pressure}.%0ATime horizon: ${horizon}.%0A%0ARecommended starting point: ${position.type}.%0A${position.title}`;
    setSignalContactLink(decodeURIComponent(brief));
  };

  form.addEventListener("change", render);
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const plainBrief = decodeURIComponent(brief).replace(/%0A/g, "\n");
      try {
        await navigator.clipboard.writeText(plainBrief);
        copyStatus.textContent = activeLocale === "pt"
          ? "Brief copiado. Cole na sua thread interna ou envie para a JCC."
          : "Brief copied. Paste it into your internal thread or send it to JCC.";
        copyButton.firstChild.textContent = activeLocale === "pt" ? "Brief copiado " : "Brief copied ";
      } catch {
        copyStatus.textContent = activeLocale === "pt"
          ? "Cópia indisponível aqui. Use “Enviar para a JCC” para abrir o brief no WhatsApp."
          : "Copy is unavailable here. Use \u201CSend it to JCC\u201D to open the brief in WhatsApp.";
      }
    });
  }
  render();
};

/* ====================== SCROLL BUTTONS ====================== */

document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => document.getElementById(button.dataset.scrollTo)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }));
});

/* ====================== BOOT ====================== */

applyLocale(activeLocale);
setContactLinks();
wireBuyClicks();
setupWordmark();
setupAsciiField();
setupCapabilities();
setupSignalLab();
resolveLocale(); // async edge confirmation, may refine locale post-load
