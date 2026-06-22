import { AsciiPlayer } from "https://cdn.jsdelivr.net/npm/ascii-video-js@0.2.6/+esm";

const CONTACT_PHONE = "5541998880068";
const CONTACT_BASE = `https://wa.me/${CONTACT_PHONE}`;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const capabilityData = {
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
};

const setContactLinks = (brief = "") => {
  const message = brief || "Hello JCC, I would like to discuss a software consulting engagement.";
  document.querySelectorAll("[data-contact-link]").forEach((link) => {
    link.href = `${CONTACT_BASE}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
};

setContactLinks();

const setSignalContactLink = (brief) => {
  const link = document.querySelector("[data-signal-output] [data-contact-link]");
  if (!link) return;
  link.href = `${CONTACT_BASE}?text=${encodeURIComponent(brief)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
};

const setupIdentity = () => {
  const playerElement = document.querySelector("#ascii-player");
  const machineState = document.querySelector("[data-machine-state]");
  const lineNodes = [...document.querySelectorAll("[data-ident-line]")];
  let player;

  try {
    player = new AsciiPlayer(playerElement, {
      src: "/assets/jcc-ident.mp4",
      cols: 112,
      charset: "Shade",
      autoPlay: !reducedMotion,
      loop: true,
      muted: true,
      colorMode: "monochrome",
      brightness: 8,
      contrast: 24,
      fontSize: "auto",
      textColor: "#f1f4f8",
      bgColor: "#111827",
    });
    machineState.textContent = reducedMotion ? "STILL FRAME" : "RENDERING";
  } catch {
    machineState.textContent = "STATIC IDENTITY";
  }

  lineNodes.forEach((line, index) => {
    window.setTimeout(() => line.classList.add("is-revealed"), reducedMotion ? 0 : 940 + index * 700);
  });

  document.querySelectorAll("[data-ascii-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.asciiMode;
      document.querySelectorAll("[data-ascii-mode]").forEach((node) => node.setAttribute("aria-pressed", String(node === button)));
      if (!player) return;
      const config = {
        signal: { charset: "Shade", edgeDetection: false, contrast: 24, brightness: 8 },
        structure: { charset: "Pipes", edgeDetection: false, contrast: 38, brightness: 3 },
        edge: { charset: "Braille", edgeDetection: true, contrast: 46, brightness: 14 },
      }[mode];
      player.configure(config);
      machineState.textContent = `${mode.toUpperCase()} MODE`;
    });
  });

  const machine = document.querySelector("[data-machine]");
  machine?.addEventListener("pointermove", (event) => {
    const rect = machine.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    playerElement.style.transform = `translate(${x * 6}px, ${y * 6}px) scale(1.035)`;
  });
  machine?.addEventListener("pointerleave", () => { playerElement.style.transform = ""; });
};

const setupCapabilities = () => {
  const title = document.querySelector("[data-detail-title]");
  const code = document.querySelector("[data-detail-code]");
  const copy = document.querySelector("[data-detail-copy]");
  const list = document.querySelector("[data-detail-list]");
  const panel = document.querySelector("#capability-detail");

  document.querySelectorAll("[data-capability]").forEach((button) => {
    button.addEventListener("click", () => {
      const data = capabilityData[button.dataset.capability];
      document.querySelectorAll("[data-capability]").forEach((node) => node.setAttribute("aria-selected", String(node === button)));
      code.textContent = data.code;
      title.textContent = data.title;
      copy.textContent = data.copy;
      list.replaceChildren(...data.items.map((item) => {
        const node = document.createElement("li");
        node.textContent = item;
        return node;
      }));
      panel.setAttribute("aria-labelledby", button.id);
    });
  });
};

const positions = {
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
};

const setupSignalLab = () => {
  const form = document.querySelector("[data-signal-form]");
  const type = document.querySelector("[data-signal-type]");
  const title = document.querySelector("[data-signal-title]");
  const copy = document.querySelector("[data-signal-copy]");
  const deliverables = document.querySelector("[data-signal-deliverables]");
  const status = document.querySelector("[data-signal-status]");
  const copyButton = document.querySelector("[data-copy-brief]");
  const copyStatus = document.querySelector("[data-copy-status]");
  let brief = "";

  const render = () => {
    const values = new FormData(form);
    const change = values.get("change");
    const pressure = values.get("pressure");
    const horizon = values.get("horizon");
    const position = positions[`${change}-${pressure}-${horizon}`] || positions.default;
    type.textContent = position.type;
    title.textContent = position.title;
    copy.textContent = position.copy;
    deliverables.replaceChildren(...position.deliverables.map((item) => {
      const tag = document.createElement("span");
      tag.textContent = item;
      return tag;
    }));
    status.textContent = "POSITION SET";
    brief = `Hello JCC, here is the starting position I mapped on your site.%0A%0AChange needed: ${change}.%0APressure: ${pressure}.%0ATime horizon: ${horizon}.%0A%0ARecommended starting point: ${position.type}.%0A${position.title}`;
    setSignalContactLink(decodeURIComponent(brief));
  };

  form.addEventListener("change", render);
  copyButton.addEventListener("click", async () => {
    const plainBrief = decodeURIComponent(brief).replace(/%0A/g, "\n");
    try {
      await navigator.clipboard.writeText(plainBrief);
      copyStatus.textContent = "Brief copied. Paste it into your internal thread or send it to JCC.";
      copyButton.firstChild.textContent = "Brief copied ";
    } catch {
      copyStatus.textContent = "Copy is unavailable here. Use “Send it to JCC” to open the brief in WhatsApp.";
    }
  });
  render();
};

document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => document.getElementById(button.dataset.scrollTo)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }));
});

setupIdentity();
setupCapabilities();
setupSignalLab();
