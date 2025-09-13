// ✅ Fetch your JSON once and use it everywhere
const response = await fetch("../data.json");
const data = await response.json();

// ✅ Grab possible containers from the DOM
var defaultIndex = 0;

var homeParent = document.querySelector("#home");
var destinationParent = document.querySelector("#contentDestination");
var crewParent = document.querySelector("#contentCrew");
var technologyParent = document.querySelector("#contentTechnology");

// ✅ Home content
function home() {
  return `
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
        <div
          class="content-button index flex justify-self-end align-self-center"
        >
          <a href="html/destination.html"
            class="button flex justify-center align-center bg-white fs-4 ff-bellefair text-dark uppercase"
          >
            Explore
          </a>
        </div>
      `;
}

if (homeParent) {
  homeParent.innerHTML = home();
}

// ✅ Destination template
function loadDestinationContent() {
  return `
        <h5 class="numbered-title" style="grid-column: 2/4">
          <span>01</span> PICK YOUR DESTINATION
        </h5>
        <div class="content-image destination align-self-center">
          <img
            src=""
            style="width: 100%; height: 100%"
          />
        </div>
        <div class="content-block destination flex column align-self-center">
          <div class="tabs-menu-container flex">
          ${data.destinations
            .map(
              (element) =>
                `<div 
                    class="tabs-menu flex fs-8 ff-barlow-cond letter-spacing-2 uppercase">
                    ${element.name}
                </div>`
            )
            .join("")}
          </div>
          <div class="flex column">
            <h2 class="content-name fs-2 ff-bellefair uppercase text-white"></h2>
            <p class="content-description fs-9 ff-barlow text-light"></p>
          </div>
          <div class="divider-white" style="--o: 25%"></div>
          <div class="grid" style="grid-template-columns: 1fr 1fr">
            <div class="flex column" style="gap: 0.75rem">
              <p
                class="fs-7 ff-barlow-cond letter-spacing-2 text-light uppercase"
              >
                AVG. DISTANCE
              </p>
              <h6 class="content-distance fs-6 ff-bellefair text-white uppercase"></h6>
            </div>
            <div class="flex column" style="gap: 0.75rem">
              <p
                class="fs-7 ff-barlow-cond letter-spacing-2 text-light uppercase"
              >
                Est. travel time
              </p>
              <h6 class="content-travel fs-6 ff-bellefair text-white uppercase"></h6>
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
function loadCrewContent() {
  return `
        <h5 class="numbered-title" style="grid-column: 2/4">
          <span>02</span>MEET YOUR CREW
        </h5>
        <div class="content-block crew flex column">
          <div
            class="flex column justify-center"
            style="gap: 2.5rem; flex-grow: 1"
          >
            <div class="flex column">
              <h4 class="content-role fs-4 ff-bellefair uppercase text-white" style="opacity:50.42%"></h4>
              <h3 class="content-name fs-3 ff-bellefair uppercase text-white"></h3>
            </div>
            <p class="content-bio fs-9 ff-barlow text-light"></p>
          </div>
          <div class="small-pagination-container flex">
           ${data.destinations
             .map((element) => `<div class="small-pagination bg-white"></div>`)
             .join("")}
          </div>
        </div>
        <div class="content-image crew justify-self-center align-self-end">
          <img src="" />
        </div>`;
}

function updateCrew(index) {
  const element = data.crew[index];

  document.querySelector("#contentCrew .content-image > img").src =
    "." + element.images.webp;
  document.querySelector("#contentCrew .content-name").textContent =
    element.name;
  document.querySelector("#contentCrew .content-role").textContent =
    element.role;
  document.querySelector("#contentCrew .content-bio").textContent = element.bio;
}

// ✅ Technology template
function loadTechnologyContent() {
  return `
        <h5 class="numbered-title" style="grid-column: 2/4">
          <span>03</span> Space Launch 101
        </h5>
        <div class="content-image technology-mobile flex">
          <img
            src=""
            style="width: 100%; height: 100%"
          />
        </div>
        <div class="content-block-container flex align-center">
          <div class="large-pagination-container flex column justify-between align-center">
          ${data.technology
            .map(
              (element, index) =>
                `<div class="large-pagination fs-4 ff-bellefair flex justify-center align-center">
                  ${index + 1}
                </div>`
            )
            .join("")}
        </div>
        <div class="content-block technology flex column">
            <h4 class="fs-4 ff-bellefair uppercase text-light" style="opacity: 50.42%">
              THE TERMINOLOGY…
            </h4>
            <div class="flex column">
              <h3 class="content-name fs-3 ff-bellefair uppercase text-white"></h3>
              <p class="content-description fs-9 ff-barlow text-light"></p>
            </div>
          </div>
      </div>
      <div class="content-image technology justify-self-end align-self-center">
        <img src="" style="width: 100%; height: 100%" />
  </div>`;
}

function updateTechnology(index) {
  var element = data.technology[index];

  document.querySelector(
    "#contentTechnology .content-image.technology > img"
  ).src = "." + element.images.portrait;
  document.querySelector("#contentTechnology .content-name").textContent =
    element.name;
  document.querySelector(
    "#contentTechnology .content-description"
  ).textContent = element.description;
  document.querySelector(
    "#contentTechnology .content-image.technology-mobile > img"
  ).src = "." + element.images.landscape;
}

// ✅ Inject correct content depending on which container exists
if (destinationParent) {
  // Step 1: Render layout once
  destinationParent.innerHTML = loadDestinationContent();

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
  // Step 1: Render layout once
  crewParent.innerHTML = loadCrewContent();

  // Step 2: Load default content
  updateCrew(defaultIndex);

  // Step 3: Add active class to default tab
  var smallPagination = document.querySelectorAll(".small-pagination");
  smallPagination[defaultIndex].classList.add("active");

  smallPagination.forEach((element, index) => {
    element.addEventListener("click", (event) => {
      smallPagination.forEach((element, index) => {
        element.classList.remove("active");
      });
      element.classList.add("active");
      updateCrew(index);
    });
  });
} else if (technologyParent) {
  // Step 1: Render layout once
  technologyParent.innerHTML = loadTechnologyContent();

  // Step 2: Load default content
  updateTechnology(defaultIndex);

  // Step 3: Add active class to default tab
  var largePagination = document.querySelectorAll(".large-pagination");
  largePagination[defaultIndex].classList.add("active");

  largePagination.forEach((element, index) => {
    element.addEventListener("click", () => {
      largePagination.forEach((element, index) => {
        element.classList.remove("active");
      });
      element.classList.add("active");
      updateTechnology(index);
    });
  });
}
