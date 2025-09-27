// ✅ Fetch your JSON once and use it everywhere
const response = await fetch("../data.json");
const data = await response.json();

var navigationParent = document.querySelector("#navigation");

// ✅ Navigation builder
function loadNav() {
  return `
  <nav class="navigation flex justify-between align-center" aria-label="Main navigation">
    <a href="/index.html" class="logo" aria-label="Link to homepage"></a>
    <div class="navigation-divider divider-white"></div>
    <div class="navigation-menu-container flex justify-center" data-visible="false">
      ${data.navItems
        .map(
          (element, index) =>
            `
                <a
                    class="navigation-menu flex align-center fs-8 ff-barlow-cond letter-spacing-2 uppercase text-white"
                    href="${element.url}"
                >
                    <span class="bold letter-spacing-207"> 
                      ${String(index).padStart(2, "0")} 
                    </span> 
                    ${element.name}
                </a>
            `
        )
        .join("")}
    </div>
    <div class="navigation-mobile-menu column justify-between">
      <div class="menu-lines divider-white"></div>
      <div class="menu-lines divider-white"></div>
      <div class="menu-lines divider-white"></div>
    </div>
  </nav>`;
}

// ✅ Inject nav only if container exists
if (navigationParent) {
  navigationParent.innerHTML = loadNav();

  const current = location.pathname;

  document.querySelectorAll(".navigation-menu").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
}

var menu = document.querySelector(".navigation-menu-container");
var mobileMenu = document.querySelector(".navigation-mobile-menu");

mobileMenu.addEventListener("click", (element) => {
  if (menu.getAttribute("data-visible") === "true") {
    menu.setAttribute("data-visible", false);
  } else if (menu.getAttribute("data-visible") === "false") {
    menu.setAttribute("data-visible", true);
  }
});
