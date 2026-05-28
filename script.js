const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const packageViewer = document.querySelector("[data-package-viewer]");
const packageModel = document.querySelector("[data-package-model]");

if (packageViewer && packageModel) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let rotateX = 8;
  let rotateY = -18;

  const applyRotation = () => {
    packageModel.style.setProperty("--rotate-x", `${rotateX}deg`);
    packageModel.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  packageViewer.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    packageViewer.classList.add("is-dragging");
    packageViewer.setPointerCapture(event.pointerId);
  });

  packageViewer.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    startX = event.clientX;
    startY = event.clientY;
    rotateY += deltaX * 0.35;
    rotateX = Math.max(-22, Math.min(24, rotateX - deltaY * 0.25));
    applyRotation();
  });

  const stopDrag = () => {
    isDragging = false;
    packageViewer.classList.remove("is-dragging");
  };

  packageViewer.addEventListener("pointerup", stopDrag);
  packageViewer.addEventListener("pointercancel", stopDrag);

  packageViewer.addEventListener("keydown", (event) => {
    const step = 8;
    if (event.key === "ArrowLeft") rotateY -= step;
    if (event.key === "ArrowRight") rotateY += step;
    if (event.key === "ArrowUp") rotateX = Math.max(-22, rotateX - step);
    if (event.key === "ArrowDown") rotateX = Math.min(24, rotateX + step);
    applyRotation();
  });
}
