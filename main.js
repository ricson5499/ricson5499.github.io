const menuToggle = (action) => {
  document.body.classList.toggle("menu-open", action === "open");
};

document.querySelector(".menu-toggle").addEventListener("click", (e) => {
  menuToggle("open");
  e.stopPropagation();
});

document.querySelector(".menu-container .close").addEventListener("click", () => {
  menuToggle("close");
});

document.body.addEventListener("click", () => {
  menuToggle("close");
});

document.querySelector(".menu-container").addEventListener("click", (e) => {
  e.stopPropagation();
});