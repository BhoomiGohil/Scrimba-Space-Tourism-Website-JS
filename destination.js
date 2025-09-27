// Fetch your JSON once and use it everywhere
const response = await fetch("../data.json");
const data = await response.json();

// Destination Tabs template
function loadDestinationTabs() {
  return `
          ${data.destinations
            .map(
              (element) =>
                `<a 
                    class="tabs-menu flex fs-8 ff-barlow-cond letter-spacing-2 uppercase" 
                    role="tab" aria-label="Show ${element.name} destination profile">
                    ${element.name}
                </a>`
            )
            .join("")}
       `;
}

// Grab possible containers from the DOM
const destinationParent = document.querySelector('[data-grid="destination"]');
const tabList = destinationParent.querySelector('[role="tabList"]');

tabList.innerHTML = loadDestinationTabs();

const tabs = tabList.querySelectorAll('[role="tab"]');
const tabsLength = tabs.length;
const defaultIndex = 0;

let tabFocus = defaultIndex;

const keyDownLeft = 37;
const keyDownRight = 39;

// Function for update Tab Content
function updateContent(index) {
  var element = data.destinations[index];

  tabs.forEach((el, i) => el.classList.toggle("active", i === index));

  destinationParent.querySelector(".content-image > img").src =
    "." + element.images.webp;
  destinationParent.querySelector(".content-image > img").alt =
    element.images.alt;
  destinationParent.querySelector(".content-name").textContent = element.name;
  destinationParent.querySelector(".content-description").textContent =
    element.description;
  destinationParent.querySelector(".content-distance").textContent =
    element.distance;
  destinationParent.querySelector(".content-travel").textContent =
    element.travel;
}

// Load default content
updateContent(defaultIndex);

// Left key Functionality
function leftFunctionality() {
  tabFocus = tabFocus - 1;
  if (tabFocus < 0) tabFocus = tabsLength - 1;
  updateContent(tabFocus);
}

// Right key Functionality
function rightFunctionality() {
  tabFocus = tabFocus + 1;
  if (tabFocus > tabsLength - 1) tabFocus = 0;
  updateContent(tabFocus);
}

// Keydown Event
document.addEventListener("keydown", (e) => {
  if (e.keyCode === keyDownLeft || e.keyCode === keyDownRight) {
    if (e.keyCode === keyDownLeft) {
      leftFunctionality();
    } else if (e.keyCode === keyDownRight) {
      rightFunctionality();
    }
  }
});

// Click Event
tabs.forEach((element, index) => {
  element.addEventListener("click", (event) => {
    updateContent(index);
  });
});
