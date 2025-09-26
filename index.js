// ✅ Fetch your JSON once and use it everywhere
const response = await fetch("../data.json");
const data = await response.json();

var homeParent = document.querySelector("#home");

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
