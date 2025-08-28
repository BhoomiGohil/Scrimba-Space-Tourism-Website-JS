// ✅ Fetch your JSON once and use it everywhere
const response = await fetch("../data.json");
const data = await response.json();

// ✅ Grab possible containers from the DOM
var defaultIndex = 0;

var navigationParent = document.querySelector("#navigation");

var homeParent = document.querySelector("#home");
var destinationParent = document.querySelector("#contentDestination");
var crewParent = document.querySelector("#contentCrew");
var technologyParent = document.querySelector("#contentTechnology");

// ✅ Navigation builder
function loadNav() {
  return `
  <div class="navigation flex align-center justify-between">
    <img src="../assets/shared/logo.svg" class="logo" />
    <div
      class="navigation-divider divider-white"
      style="--o: 25%; z-index: 1"
    ></div>
    <input type="checkbox" id="navigation-mobile-menu-button" />
    <label
      for="navigation-mobile-menu-button"
      class="navigation-mobile-menu"
    ></label>
    <div class="navigation-menu-container flex align-center">
      ${data.navItems
        .map(
          (element, index) =>
            `
                <a
                    class="navigation-menu flex align-center fs-8 ff-barlow-cond letter-spacing-2 uppercase text-white"
                    href="${element.url}"
                >
                    <span class="bold letter-spacing-207"> ${String(
                      index
                    ).padStart(2, "0")} 
                    </span> 
                    ${element.name}
                </a>
            `
        )
        .join("")}
    </div>
  </div>
  `;
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

// ✅ Home content
function home() {
  return `
    <div class="content index flex justify-center align-end">
      <div class="content-grid index flex justify-between">
        <div class="content-block index flex column">
          <h5 class="fs-5 ff-barlow-cond letter-spacing-4 uppercase text-light">
            So, you want to travel to
          </h5>
          <h1 class="fs-1 ff-bellefair uppercase text-white">Space</h1>
          <p class="fs-9 ff-barlow text-light">
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </p>
        </div>
        <div class="content-button index flex align-self">
          <a class="button flex justify-center align-center bg-white fs-4 ff-bellefair text-dark uppercase">
            Explore
          </a>
        </div>
      </div>
    </div>
  `;
}

if (homeParent) {
  homeParent.innerHTML = home();
}

// ✅ Destination template
function loadDestinationContent(index) {
  return `
  <div class="content destination flex column justify-center">
    <h5 class="numbered-title">
      <span>01</span> PICK YOUR DESTINATION
    </h5>
    <div class="content-grid destination flex align-center justify-between">
      <div class="content-image destination flex">
        <img src="" style="width: 100%; height: 100%" />
      </div>
      <div class="content-block destination flex column justify-center">
        <div class="tabs-menu-container flex align-center">
          ${data.destinations
            .map(
              (element) =>
                `<div 
                    class="tabs-menu flex fs-8 ff-barlow-cond letter-spacing-2 uppercase text-white">
                    ${element.name}
                </div>`
            )
            .join("")}
        </div>
        <div class="flex column">
          <h1 class="content-name fs-2 ff-bellefair uppercase text-white"></h1>
          <p class="content-description fs-9 ff-barlow text-light"></p>
        </div>
        <div class="divider-white" style="--o: 25%"></div>
        <div class="grid align-center" style="grid-template-columns: 1fr 1fr">
          <div class="flex column" style="gap: 0.75rem">
            <p class="fs-7 ff-barlow-cond letter-spacing-2 text-light uppercase">
              AVG. DISTANCE
            </p>
            <h6 class="content-distance fs-6 ff-bellefair text-white uppercase"></h6>
          </div>
          <div class="flex column" style="gap: 0.75rem">
            <p class="fs-7 ff-barlow-cond letter-spacing-2 text-light uppercase">
              Est. travel time
            </p>
            <h6 class="content-travel fs-6 ff-bellefair text-white uppercase"></h6>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function updateDestination(index) {
  var element = data.destinations[index];

  document.querySelector("#contentDestination .content-image > img").src =
    "." + element.images.webp;
  document.querySelector("#contentDestination .content-name").textContent =
    element.name;
  document.querySelector(
    "#contentDestination .content-description"
  ).textContent = element.description;
  document.querySelector("#contentDestination .content-distance").textContent =
    element.distance;
  document.querySelector("#contentDestination .content-travel").textContent =
    element.travel;
}

// ✅ Crew template
function loadCrew() {
  return `
    <div class="content crew flex column justify-center">
      <h5 class="numbered-title">
        <span>02</span>MEET YOUR CREW
      </h5>
      ${data.crew
        .map((element) => {
          return `
          <div class="content-grid crew flex align-stretch justify-between">
            <div class="content-block crew flex column">
              <div
                class="flex column justify-center"
                style="gap: 2.5rem; flex-grow: 1"
              >
                <div class="flex column">
                  <h4 class="fs-4 ff-bellefair uppercase text-white">
                    ${element.role}
                  </h4>
                  <h3 class="fs-3 ff-bellefair uppercase text-white">
                    ${element.name}
                  </h3>
                </div>
                <p class="fs-9 ff-barlow text-light">
                  ${element.bio}
                </p>
              </div>
              <div class="small-pagination-container flex">
                ${data.destinations
                  .map(
                    (element) =>
                      `<div class="small-pagination bg-white">
                      </div>`
                  )
                  .join("")}
              </div>
            </div>
            <div class="content-image crew flex justify-center align-end">
              <img src="${"." + element.images.webp}" />
            </div>
          </div>`;
        })
        .join("")}
    </div>
  `;
}

// ✅ Technology template
function loadTechnology() {
  return `
    <div class="content technology flex column justify-center">
      <h5 class="numbered-title">
        <span>03</span> Space Launch 101
      </h5>
      ${data.technology
        .map((element) => {
          return `
              <div class="content-image technology-mobile flex">
                <img
                  src="${"." + element.images.landscape}"
                  style="width: 100%; height: 100%"
                />
              </div>
              <div class="content-grid technology flex align-center justify-between">
                <div class="content-block-container flex">
                  <div class="large-pagination-container flex column">
                    ${data.technology
                      .map(
                        (element, index) =>
                          `<div
                            class="large-pagination fs-4 ff-bellefair flex justify-center align-center"
                          >
                          ${index + 1}
                          </div>`
                      )
                      .join("")}
                  </div>
                  <div class="content-block technology flex column justify-center">
                    <h4 class="fs-4 ff-bellefair uppercase text-light">
                      THE TERMINOLOGY…
                    </h4>
                    <div class="flex column">
                      <h3 class="fs-3 ff-bellefair uppercase text-white">
                        ${element.name}
                      </h3>
                      <p class="fs-9 ff-barlow text-light">
                        ${element.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="content-image technology flex">
                  <img
                    src="${"." + element.images.portrait}"
                    style="width: 100%; height: 100%"
                  />
                  </div>
                </div>`;
        })
        .join("")}
    </div>
  </div>`;
}

// ✅ Inject correct content depending on which container exists
if (destinationParent) {
  // Step 1: Render layout once
  destinationParent.innerHTML = loadDestinationContent(defaultIndex);

  // Step 2: Load default content
  updateDestination(defaultIndex);

  // Step 3: Add active class to default tab
  var tabsMenu = document.querySelectorAll(".tabs-menu");
  tabsMenu[defaultIndex].classList.add("active");

  tabsMenu.forEach((element, index) => {
    element.addEventListener("click", () => {
      tabsMenu.forEach((element, index) => {
        element.classList.remove("active");
      });
      element.classList.add("active");
      updateDestination(index);
    });
  });
} else if (crewParent) {
  crewParent.innerHTML = loadCrew();
} else if (technologyParent) {
  technologyParent.innerHTML = loadTechnology();
}
