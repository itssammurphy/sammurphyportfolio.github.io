const menu_toggle = document.querySelector(".menu__toggle");
const menu = document.querySelector(".menu");

menu_toggle.addEventListener("click", () => {
  menu_toggle.classList.toggle('active');
  menu.classList.toggle('active');
});
