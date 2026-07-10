const dialog = document.querySelector(".menu-container");
const toggleBtn = document.querySelector(".menu-toggle");
const closeBtn = document.querySelector(".menu-container .close");

toggleBtn.addEventListener("click", () => dialog.showModal());
closeBtn.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
