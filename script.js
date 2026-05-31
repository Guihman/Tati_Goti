const CONFIG = {
  brandName: "Aurora Velas",
  whatsappNumber: "5500000000000", 
  instagramUrl: "https://instagram.com/" 
};

const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const cursorGlow = document.querySelector(".cursor-glow");
const year = document.querySelector("#year");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const normalizedWhatsAppNumber = CONFIG.whatsappNumber.replace(/\D/g, "");

if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll("a[href='https://instagram.com/']").forEach((link) => {
  if (CONFIG.instagramUrl) link.href = CONFIG.instagramUrl;
});

function makeWhatsAppUrl(message) {
  return `https://wa.me/${normalizedWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}

function bindWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach((element) => {
    const message = element.getAttribute("data-whatsapp") || `Olá! Vim pelo site da ${CONFIG.brandName}.`;
    element.href = makeWhatsAppUrl(message);
  });

  document.querySelectorAll("[data-product-whatsapp]").forEach((element) => {
    const product = element.getAttribute("data-product-whatsapp");
    const message = `Olá! Vim pelo site da ${CONFIG.brandName} e gostaria de saber mais sobre a vela ${product}.`;

    element.addEventListener("click", () => {
      window.open(makeWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    });
  });
}

bindWhatsAppLinks();

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}, { passive: true });

menuToggle?.addEventListener("click", () => {
  const opened = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", opened ? "true" : "false");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const sectionLinks = Array.from(navLinks?.querySelectorAll("a[href^='#']") || []);
const linkedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNavLink(sectionId) {
  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if (linkedSections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) setActiveNavLink(visibleEntry.target.id);
    },
    { threshold: 0.42, rootMargin: "-18% 0px -54% 0px" }
  );

  linkedSections.forEach((section) => navObserver.observe(section));
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      const finalNumber = Number(target.dataset.count);
      const duration = 1250;
      const start = performance.now();

      function animate(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        target.textContent = Math.round(finalNumber * eased);
        if (progress < 1) requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
      countObserver.unobserve(target);
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll("[data-count]").forEach((element) => countObserver.observe(element));

const magneticElements = document.querySelectorAll(".magnetic");

magneticElements.forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    if (prefersReducedMotion) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    element.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "";
  });
});

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (prefersReducedMotion || window.innerWidth < 900) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

window.addEventListener("pointermove", (event) => {
  if (!cursorGlow || prefersReducedMotion || window.innerWidth < 900) return;

  cursorGlow.style.opacity = "1";
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

window.addEventListener("pointerleave", () => {
  if (cursorGlow) cursorGlow.style.opacity = "0";
});

document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const content = button.nextElementSibling;

    document.querySelectorAll(".accordion-button").forEach((otherButton) => {
      if (otherButton === button) return;
      otherButton.setAttribute("aria-expanded", "false");
      otherButton.nextElementSibling.style.maxHeight = 0;
    });

    button.setAttribute("aria-expanded", String(!expanded));
    content.style.maxHeight = expanded ? 0 : `${content.scrollHeight}px`;
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");

    productCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !shouldShow);
      card.setAttribute("aria-hidden", String(!shouldShow));
      card.querySelectorAll("a, button").forEach((control) => {
        if (shouldShow) {
          control.removeAttribute("tabindex");
        } else {
          control.setAttribute("tabindex", "-1");
        }
      });
    });
  });
});

function initEmberCanvas() {
  const canvas = document.querySelector("#emberCanvas");
  if (!canvas || prefersReducedMotion) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let width = 0;
  let height = 0;
  let animationFrame = null;

  function setup() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = width < 760 ? 42 : 86;
    particles = Array.from({ length: count }, (_, index) => {
      const warm = index % 4 !== 0;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (warm ? 2.5 : 1.3) + 0.5,
        speedX: (Math.random() - 0.5) * 0.22,
        speedY: -(Math.random() * 0.42 + 0.08),
        alpha: Math.random() * 0.45 + 0.08,
        hue: warm ? 34 + Math.random() * 16 : 26,
        drift: Math.random() * Math.PI * 2
      };
    });
  }

  function drawGradient() {
    const g1 = ctx.createRadialGradient(width * 0.28, height * 0.2, 0, width * 0.28, height * 0.2, width * 0.75);
    g1.addColorStop(0, "rgba(255, 151, 58, 0.14)");
    g1.addColorStop(1, "rgba(255, 151, 58, 0)");

    const g2 = ctx.createRadialGradient(width * 0.78, height * 0.52, 0, width * 0.78, height * 0.52, width * 0.6);
    g2.addColorStop(0, "rgba(255, 212, 126, 0.10)");
    g2.addColorStop(1, "rgba(255, 212, 126, 0)");

    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, width, height);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    drawGradient();

    particles.forEach((particle) => {
      particle.drift += 0.008;
      particle.x += particle.speedX + Math.sin(particle.drift) * 0.18;
      particle.y += particle.speedY;

      if (particle.y < -12) {
        particle.y = height + 12;
        particle.x = Math.random() * width;
      }
      if (particle.x < -12) particle.x = width + 12;
      if (particle.x > width + 12) particle.x = -12;

      const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 7);
      glow.addColorStop(0, `hsla(${particle.hue}, 100%, 72%, ${particle.alpha})`);
      glow.addColorStop(1, `hsla(${particle.hue}, 100%, 72%, 0)`);

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(255, 239, 198, ${Math.min(particle.alpha + 0.12, 0.7)})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrame = requestAnimationFrame(draw);
  }

  setup();
  draw();

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationFrame);
    setup();
    draw();
  });
}

initEmberCanvas();

(() => {
  const quizQuestions = [
    {
      label: "Intenção",
      question: "Qual sensação você quer criar com a vela?",
      options: ["Relaxar depois de um dia cheio", "Deixar a casa mais elegante", "Presentear alguém especial", "Renovar a energia do ambiente"]
    },
    {
      label: "Família olfativa",
      question: "Qual tipo de aroma combina mais com você?",
      options: ["Doce e cremoso", "Floral e delicado", "Cítrico e fresco", "Amadeirado e sofisticado"]
    },
    {
      label: "Ambiente",
      question: "Onde você pretende usar a vela?",
      options: ["Quarto", "Sala", "Banheiro/lavabo", "Mesa posta ou presente"]
    },
    {
      label: "Intensidade",
      question: "Como você prefere a presença do aroma?",
      options: ["Bem suave", "Equilibrada", "Marcante", "Ainda não sei"]
    },
    {
      label: "Compra",
      question: "Você está buscando uma vela para qual ocasião?",
      options: ["Para mim", "Para presentear", "Para decoração", "Para montar um kit"]
    }
  ];

  const quizCard = document.querySelector(".quiz-card");
  const quizQuestion = document.querySelector("[data-quiz-question]");
  const quizQuestionTitle = quizQuestion?.querySelector("h3");
  const quizOverline = quizQuestion?.querySelector(".quiz-overline");
  const quizOptions = document.querySelector("[data-quiz-options]");
  const quizBack = document.querySelector("[data-quiz-back]");
  const quizNext = document.querySelector("[data-quiz-next]");
  const quizStepLabel = document.querySelector("[data-quiz-step-label]");
  const quizBar = document.querySelector("[data-quiz-bar]");
  const quizResult = document.querySelector("[data-quiz-result]");
  const quizSummary = document.querySelector("[data-quiz-summary]");
  const quizWhatsapp = document.querySelector("[data-quiz-whatsapp]");
  const quizRestart = document.querySelector("[data-quiz-restart]");
  const quizActions = document.querySelector("[data-quiz-actions]");

  let quizStep = 0;
  const quizAnswers = [];

  function renderQuizStep() {
    if (!quizCard || !quizQuestion || !quizOptions || !quizQuestionTitle || !quizOverline) return;

    const current = quizQuestions[quizStep];

    quizQuestion.hidden = false;
    if (quizResult) quizResult.hidden = true;
    if (quizActions) quizActions.hidden = false;
    if (quizBack) quizBack.hidden = false;
    if (quizNext) quizNext.hidden = false;

    quizQuestionTitle.textContent = current.question;
    quizOverline.textContent = current.label;
    quizOptions.innerHTML = "";

    current.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option;
      button.setAttribute("aria-pressed", quizAnswers[quizStep] === option ? "true" : "false");

      if (quizAnswers[quizStep] === option) button.classList.add("is-selected");

      button.addEventListener("click", () => {
        quizAnswers[quizStep] = option;

        quizOptions.querySelectorAll(".quiz-option").forEach((other) => {
          other.classList.remove("is-selected");
          other.setAttribute("aria-pressed", "false");
        });

        button.classList.add("is-selected");
        button.setAttribute("aria-pressed", "true");
        if (quizNext) quizNext.disabled = false;
      });

      quizOptions.appendChild(button);
    });

    if (quizStepLabel) quizStepLabel.textContent = `Etapa ${quizStep + 1} de ${quizQuestions.length}`;
    if (quizBar) quizBar.style.width = `${((quizStep + 1) / quizQuestions.length) * 100}%`;
    if (quizBack) quizBack.disabled = quizStep === 0;
    if (quizNext) {
      quizNext.textContent = quizStep === quizQuestions.length - 1 ? "Ver resultado" : "Continuar";
      quizNext.disabled = !quizAnswers[quizStep];
    }
  }

  function showQuizResult() {
    if (!quizQuestion || !quizResult || !quizSummary || !quizWhatsapp || !quizStepLabel || !quizBar) return;

    quizQuestion.hidden = true;
    quizResult.hidden = false;
    if (quizActions) quizActions.hidden = true;

    quizStepLabel.textContent = "Quiz concluído";
    quizBar.style.width = "100%";

    quizSummary.innerHTML = quizQuestions
      .map((item, index) => `<p><strong>${item.label}:</strong> ${quizAnswers[index]}</p>`)
      .join("");

    const messageLines = [
      `Olá! Vim pelo site da ${CONFIG.brandName} e respondi ao quiz de aroma.`,
      "Quero uma sugestão de vela para o meu momento.",
      "",
      ...quizQuestions.map((item, index) => `${item.label}: ${quizAnswers[index]}`)
    ];

    quizWhatsapp.href = makeWhatsAppUrl(messageLines.join("\n"));
  }

  if (quizCard && quizNext && quizBack) {
    renderQuizStep();

    quizNext.addEventListener("click", () => {
      if (!quizAnswers[quizStep]) return;

      if (quizStep < quizQuestions.length - 1) {
        quizStep += 1;
        renderQuizStep();
        quizCard.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
        return;
      }

      showQuizResult();
      quizCard.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    });

    quizBack.addEventListener("click", () => {
      if (quizStep === 0) return;
      quizStep -= 1;
      renderQuizStep();
    });
  }

  quizRestart?.addEventListener("click", () => {
    quizStep = 0;
    quizAnswers.length = 0;
    renderQuizStep();
  });
})();
