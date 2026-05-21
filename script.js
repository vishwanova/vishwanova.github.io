const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("[data-page]").forEach((link) => {
  if (link.getAttribute("data-page") === currentPage) {
    link.classList.add("is-active");
  }
});

const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

const bloom = document.createElement("div");
bloom.className = "theme-bloom";
document.body.appendChild(bloom);

let glowX = window.innerWidth / 2;
let glowY = window.innerHeight / 2;
let pointerVisible = false;

const moveGlow = () => {
  glow.style.left = `${glowX}px`;
  glow.style.top = `${glowY}px`;
};

document.addEventListener("pointermove", (event) => {
  glowX = event.clientX;
  glowY = event.clientY;
  moveGlow();

  if (!pointerVisible) {
    pointerVisible = true;
    glow.classList.add("is-visible");
  }
});

document.addEventListener("pointerdown", (event) => {
  const interactive = event.target.closest("a, button, input, textarea, select, [role='button']");
  if (interactive) {
    glow.classList.add("is-active");
  }
});

document.addEventListener("pointerup", () => {
  glow.classList.remove("is-active");
});

document.addEventListener("pointerleave", () => {
  pointerVisible = false;
  glow.classList.remove("is-visible", "is-active");
});

document.querySelectorAll("[data-mode-switch]").forEach((switcher) => {
  const options = switcher.querySelectorAll(".mode-option");
  const activeMode = document.body.classList.contains("light") ? "personal" : "professional";

  options.forEach((option) => {
    const isSelected = option.dataset.mode === activeMode;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const nextMode = option.dataset.mode;
      if (nextMode === activeMode) {
        return;
      }

      const bounds = switcher.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const bloomSize = Math.hypot(window.innerWidth, window.innerHeight) * 2.2;
      const target = nextMode === "personal" ? "personal.html" : "index.html";

      bloom.style.setProperty("--bloom-x", `${centerX}px`);
      bloom.style.setProperty("--bloom-y", `${centerY}px`);
      bloom.style.setProperty("--bloom-size", `${bloomSize}px`);
      bloom.classList.remove("is-active");
      void bloom.offsetWidth;

      switcher.classList.add("is-animating");
      bloom.classList.add("is-active");

      window.setTimeout(() => {
        window.location.href = target;
      }, 720);
    });
  });
});
