// Fetch your JSON once and use it everywhere
const response = await fetch("../data.json");
const data = await response.json();

// Crew template
function loadCrewPagination() {
  return `
           ${data.destinations
             .map(
               (element) =>
                 `<div class="small-pagination bg-white" role="pagination"></div>`
             )
             .join("")}
          `;
}

// Grab possible containers from the DOM
var crewParent = document.querySelector('[data-grid="crew"]');
var paginationList = crewParent.querySelector('[role="paginationList"]');

paginationList.innerHTML = loadCrewPagination();

const paginations = paginationList.querySelectorAll('[role="pagination"]');
const paginationsLength = paginations.length;
const defaultIndex = 0;

let paginationFocus = defaultIndex;

const keyDownLeft = 37;
const keyDownRight = 39;

// Function for update Tab Content
function updateContent(index) {
  const element = data.crew[index];

  paginations.forEach((el, i) => el.classList.toggle("active", i === index));

  crewParent.querySelector(".content-image > img").src =
    "." + element.images.webp;
  crewParent.querySelector(".content-name").textContent = element.name;
  crewParent.querySelector(".content-role").textContent = element.role;
  crewParent.querySelector(".content-bio").textContent = element.bio;
}

// Load default content
updateContent(defaultIndex);

// Left key Functionality
function leftFunctionality() {
  paginationFocus = paginationFocus - 1;
  if (paginationFocus < 0) paginationFocus = paginationsLength - 1;
  updateContent(paginationFocus);
}

// Right key Functionality
function rightFunctionality() {
  paginationFocus = paginationFocus + 1;
  if (paginationFocus > paginationsLength - 1) paginationFocus = 0;
  updateContent(paginationFocus);
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
paginations.forEach((element, index) => {
  element.addEventListener("click", (event) => {
    updateContent(index);
  });
});
