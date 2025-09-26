// Fetch your JSON once and use it everywhere
const response = await fetch("../data.json");
const data = await response.json();

// Technology template
function loadTechnologyPaginations() {
  return `
        
          ${data.technology
            .map(
              (element, index) =>
                `<div class="large-pagination fs-4 ff-bellefair flex justify-center align-center" role="pagination">
                  ${index + 1}
                </div>`
            )
            .join("")}
        `;
}

// Grab possible containers from the DOM
var technologyParent = document.querySelector('[data-grid="technology"]');
var paginationList = technologyParent.querySelector('[role="paginationList"]');

paginationList.innerHTML = loadTechnologyPaginations();

const paginations = paginationList.querySelectorAll('[role="pagination"]');
const paginationsLength = paginations.length;
const defaultIndex = 0;

let paginationFocus = defaultIndex;

const keyDownUp = 38;
const keyDownBottom = 40;

function updateContent(index) {
  var element = data.technology[index];

  paginations.forEach((el, i) => el.classList.toggle("active", i === index));

  technologyParent.querySelector(".content-image.technology > img").src =
    "." + element.images.portrait;
  technologyParent.querySelector(".content-name").textContent = element.name;
  technologyParent.querySelector(".content-description").textContent =
    element.description;
  technologyParent.querySelector(".content-image.technology-mobile > img").src =
    "." + element.images.landscape;
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
  if (e.keyCode === keyDownUp || e.keyCode === keyDownBottom) {
    if (e.keyCode === keyDownUp) {
      leftFunctionality();
    } else if (e.keyCode === keyDownBottom) {
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
