<template>
  <div class="main-container">
    <nav class="top-header">
      <div class="top-header-nav">
        <h2 class="header title-header">Hi, I'm Neno</h2>
        <h2 class="header-space-fill"></h2>
        <h2 class="header home" @click="FocusToElement">Home</h2>
        <h2 class="header about" @click="FocusToElement">About Neno</h2>
        <h2
          class="header projects projects-hover"
          @click="FocusToElement"
          @mouseenter="showProjectsNavBar"
        >
          Projects
        </h2>
        <h2 class="header contact" @click="FocusToElement">Contact</h2>
      </div>
      <!-- <div class="opacity-header"></div> -->
      <div class="top-header-projects-selection">
        <template v-for="project in projects">
          <div
            class="projects-selection-project"
            :class="project.titleClass + '-header'"
            @click="FocusToProject"
          >
            {{ project.title }}
          </div>
        </template>
      </div>
    </nav>
    <Home />
    <About />
    <Projects />
    <Contact />
    <Footer />
    <!-- <NuxtWelcome /> -->
  </div>
</template>

<script setup>
import projects from "~/assets/json/projects.json";
function FocusToElement(e) {
  let element = e.target;
  let headerHeight = document.querySelector(".top-header").offsetHeight;
  let toFocusElement = false;
  if (element.classList.contains("home")) {
    toFocusElement = "home-container";
  } else if (element.classList.contains("about")) {
    toFocusElement = "about-container";
  } else if (element.classList.contains("projects")) {
    toFocusElement = "projects-container";
  } else if (element.classList.contains("contact")) {
    toFocusElement = "contact-container";
  }

  if (toFocusElement) {
    let TargetedElement = document.querySelector(`.${toFocusElement}`);
    let headerOffset = headerHeight + 10;
    let elementPosition = TargetedElement.getBoundingClientRect().top;
    let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

function FocusToProject(e) {
  let element = e.target;
  let headerHeight = document.querySelector(".top-header").offsetHeight;
  let toFocusElement = false;
  for (const project in projects) {
    if (element.classList.contains(`${projects[project].titleClass}-header`)) {
      toFocusElement = projects[project].titleClass;
      console.log("toFocusElement", toFocusElement);
      break;
    }
  }
  if (toFocusElement) {
    let TargetedElement = document.querySelector(`.${toFocusElement}`);
    console.log(TargetedElement);
    let headerOffset = headerHeight + 10;
    let elementPosition = TargetedElement.getBoundingClientRect().top;
    let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

function isInViewport(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height - 400 > window.pageYOffset &&
    left + width > window.pageXOffset
  );
}

function setNavStyleIfInViewport() {
  document.querySelector(".home").classList.remove("in-view");
  document.querySelector(".about").classList.remove("in-view");
  document.querySelector(".projects").classList.remove("in-view");
  document.querySelector(".contact").classList.remove("in-view");

  if (isInViewport(document.querySelector(".home-container"))) {
    document.querySelector(".home").classList.add("in-view");
  } else if (isInViewport(document.querySelector(".about-container"))) {
    document.querySelector(".about").classList.add("in-view");
  } else if (isInViewport(document.querySelector(".projects-container"))) {
    document.querySelector(".projects").classList.add("in-view");
    isProjectInView();
    if (
      document
        .querySelector(".top-header-projects-selection")
        .classList.contains("show-top-header-projects-selection")
    ) {
      return;
    } else {
      document
        .querySelector(".top-header-projects-selection")
        .classList.add("show-top-header-projects-selection");
      // document
      //   .querySelector(".top-header")
      //   .classList.add("top-header-smooth-transition");
    }
    return;
  } else {
    document.querySelector(".contact").classList.add("in-view");
  }

  document
    .querySelector(".top-header-projects-selection")
    .classList.remove("show-top-header-projects-selection");
  // document
  //   .querySelector(".top-header")
  //   .classList.remove("top-header-smooth-transition");
}

function isProjectInView() {
  document.querySelectorAll(".projects-selection-project").forEach((node) => {
    node.classList.remove("in-view");
  });
  for (const project in projects) {
    // console.log(`${projects[project].titleClass}-header`);
    if (
      isInViewport(document.querySelector(`.${projects[project].titleClass}`))
    ) {
      document
        .querySelector(`.${projects[project].titleClass}-header`)
        .classList.add("in-view");
      break;
    }
  }
  return;
}

function showProjectsNavBar() {
  document
    .querySelector(".top-header-projects-selection")
    .classList.add("show-top-header-projects-selection-hover");
  // document
  //   .querySelector(".top-header")
  //   .classList.add("top-header-smooth-transition");
  console.log(document.querySelector(".top-header-projects-selection-hover"));
}

function closeProjectsNavBar() {
  document
    .querySelector(".top-header-projects-selection")
    .classList.remove("show-top-header-projects-selection-hover");
  // document
  //   .querySelector(".top-header")
  //   .classList.remove("top-header-smooth-transition");
  console.log(document.querySelector(".top-header-projects-selection-hover"));
}

onMounted(() => {
  window.addEventListener("scroll", setNavStyleIfInViewport, {
    passive: true,
  });
  document.querySelectorAll(".header").forEach((node) => {
    if (!node.classList.contains("projects")) {
      node.addEventListener("mouseenter", closeProjectsNavBar, {
        passive: true,
      });
    }
  });
  setNavStyleIfInViewport();
  document
    .querySelector(".top-header")
    .addEventListener("mouseleave", closeProjectsNavBar, {
      passive: true,
    });
});
</script>

<style>
/* width */
::-webkit-scrollbar {
  background: #0b1317;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 0.5rem;
  background: #0b1317;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1f94cf;
  border-radius: 0.5rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #88d523;
}

:root {
  font-family: "Roboto", sans-serif;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 100vh;
  background-color: #0b1317;
  color: white;
  font-family: "Roboto", sans-serif;
}

.top-header {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  position: sticky;
  position: -webkit-sticky;
  position: fixed;
  top: 0px;
  background-color: #0b1317;
  background: linear-gradient(
    to bottom,
    transparent,
    #0b1317 0%,
    #0b1317f3 40%,
    #0b131788 80%,
    #0b131700 100%
  );
  border-bottom: 0.02rem solid #3f4a55;
  flex-wrap: wrap;
  z-index: 10;
  /* transition: margin-bottom 0.4s ease-out;
  margin-bottom: calc(2.2em + 1rem); */
}

/* .top-header-smooth-transition {
  margin-bottom: 0px;
} */

.top-header-nav {
  grid-row: 1;
  display: flex;
  justify-content: center;
}

.header-space-fill {
  width: 30%;
}

.top-header-projects-selection {
  display: none;
  justify-content: center;
  grid-row: 2;
  /* position: relative; */
  top: 0px;
  gap: 1rem;
  margin-top: 0;
  font-weight: bold;
  opacity: 0;
  height: 0px;
  transition: height 0.4s ease-out, opacity 0.4s ease-out,
    margin-top 0.4s ease-out;
  font-size: 1rem;
}

.show-top-header-projects-selection-hover {
  display: flex;
  margin-top: 1rem;
  height: 2.2em;
  opacity: 1;
}

.show-top-header-projects-selection {
  display: flex;
  margin-top: 1rem;
  height: 2.2em;
  opacity: 1;
}

.projects-selection-project {
  border: 0.1rem solid #a5e05d00;
  border-bottom: #a5e05d00 solid 0.5rem;
  border-radius: 0.5rem;
  padding-top: 0.1rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  /* background-color: #141518; */
}

@media (hover: hover) {
  .projects-selection-project:hover {
    border-color: #5daee0;
  }
}

.header {
  border: 0.1rem solid #a5e05d;
  /* border: 0.1rem solid rgb(114, 188, 199); */
  border-bottom: #a5e05d solid 0.5rem;
  border-radius: 0.5rem;
  border-color: #0b131700;
  text-align: center;
  padding: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  /* transition: padding 0.2s, margin 0.2s; */
}

@media (hover: hover) {
  .header:hover {
    border-color: #41b3cc;
  }
}

.header:active {
  padding: 0.6rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin: 0.4rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.title-header {
  border: #8bdf25 solid .1rem;
  border-bottom: #8bdf25 solid 0.5rem;
}

.in-view {
  border-bottom: #e05d5d solid 0.5rem;
}

.opacity-header {
  position: sticky;
  position: -webkit-sticky;
  height: 1rem;
  width: 100%;
  flex-basis: 100%;
  background-color: #0b1317;
  background: linear-gradient(to bottom, transparent, #0d3346);
}

@media (max-width: 800px) {
  .top-header {
    padding: 3%;
    padding-bottom: 1%;
  }
  .top-header-nav {
  }
  .header {
    text-align: center;
    padding: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    font-size: 12px;
  }
  .header:active {
    padding: 0.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    margin: 0px;
  }
  .header.focus {
    outline: none;
  }
  .header-space-fill {
    width: 0px;
  }
  .top-header-projects-selection {
    margin: 0px;
    overflow-x: auto;
    justify-content: flex-start;
  }
  .projects-selection-project {
    font-size: 12px;
    flex: 0 0 auto;
  }

  .top-header-projects-selection::-webkit-scrollbar {
    background: transparent;
    height: 2px;
  }

  .top-header-projects-selection::-webkit-scrollbar-thumb {
    background: #1f94cf;
    border-radius: 0.5rem;
    height: 1px;
  }
}
</style>
