/**
 * TSTS Design System — Navigation
 * Mobile nav toggle with accessible state management.
 */
(function () {
  "use strict";

  const toggle = document.querySelector("[data-nav-toggle]");
  const navList = document.querySelector("[data-nav-list]");

  if (!toggle || !navList) return;

  // Ensure initial state
  navList.setAttribute("data-open", "false");
  toggle.setAttribute("aria-expanded", "false");

  toggle.addEventListener("click", function () {
    const isOpen = navList.getAttribute("data-open") === "true";
    navList.setAttribute("data-open", String(!isOpen));
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navList.getAttribute("data-open") === "true") {
      navList.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });

  // Close on outside click
  document.addEventListener("click", function (e) {
    if (
      navList.getAttribute("data-open") === "true" &&
      !toggle.contains(e.target) &&
      !navList.contains(e.target)
    ) {
      navList.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
