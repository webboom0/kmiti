const menuToggleButton = document.querySelector(".menu-toggle");
const gnb = document.querySelector(".gnb");
const submenuToggleButtons = document.querySelectorAll(".submenu-toggle");
const loginDropdown = document.querySelector(".login-dropdown");
const loginToggleButton = document.querySelector(".header-login-btn");
const mobileQuery = window.matchMedia("(max-width: 960px)");

function closeAllSubmenus() {
  submenuToggleButtons.forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.closest(".menu-item")?.classList.remove("is-open");
  });
}

function handleMobileMenuToggle() {
  if (!gnb || !menuToggleButton) return;

  const isExpanded = menuToggleButton.getAttribute("aria-expanded") === "true";
  menuToggleButton.setAttribute("aria-expanded", String(!isExpanded));
  gnb.classList.toggle("is-open", !isExpanded);

  if (isExpanded) {
    closeAllSubmenus();
  }
}

function closeLoginDropdown() {
  if (!loginDropdown || !loginToggleButton) return;
  loginDropdown.classList.remove("is-open");
  loginToggleButton.setAttribute("aria-expanded", "false");
}

function handleLoginDropdownToggle(event) {
  if (!loginDropdown || !loginToggleButton) return;
  event.stopPropagation();
  const isOpen = loginDropdown.classList.contains("is-open");
  loginDropdown.classList.toggle("is-open", !isOpen);
  loginToggleButton.setAttribute("aria-expanded", String(!isOpen));
}

function bindSubmenuToggle(button) {
  button.addEventListener("click", () => {
    if (!mobileQuery.matches) return;

    const item = button.closest(".menu-item");
    if (!item) return;

    const isOpen = item.classList.contains("is-open");
    closeAllSubmenus();

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
}

if (menuToggleButton) {
  menuToggleButton.addEventListener("click", handleMobileMenuToggle);
}

if (loginToggleButton) {
  loginToggleButton.addEventListener("click", handleLoginDropdownToggle);
}

document.addEventListener("click", (event) => {
  if (!loginDropdown) return;
  if (!(event.target instanceof Node)) return;
  if (!loginDropdown.contains(event.target)) {
    closeLoginDropdown();
  }
});

submenuToggleButtons.forEach(bindSubmenuToggle);

mobileQuery.addEventListener("change", (event) => {
  if (event.matches) return;
  gnb?.classList.remove("is-open");
  menuToggleButton?.setAttribute("aria-expanded", "false");
  closeAllSubmenus();
  closeLoginDropdown();
});
