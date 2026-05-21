const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("[data-page]").forEach((link) => {
  if (link.getAttribute("data-page") === currentPage) {
    link.classList.add("is-active");
  }
});
