<template>
  <div class="main-container">
    <nav class="top-header">
      <h2 class="header title-header">Hi, I'm Neno</h2>
      <h2 class="w-[30%]"></h2>
      <h2 class="header home" @click="FocusToElement">Home</h2>
      <h2 class="header about" @click="FocusToElement">About Neno</h2>
      <h2 class="header projects" @click="FocusToElement">Projects</h2>
      <h2 class="header contact" @click="FocusToElement">Contact</h2>
      <!-- <div class="opacity-header"></div> -->
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
  if(toFocusElement) {
    let Targetelement = document.querySelector(`.${toFocusElement}`);
    let headerOffset = headerHeight + 10;
    let elementPosition = Targetelement.getBoundingClientRect().top;
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

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height - 400) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

function setNavStyleIfInViewport() {
  document.querySelector(".home").classList.remove("in-view");
  document.querySelector(".about").classList.remove("in-view");
  document.querySelector(".projects").classList.remove("in-view");
  document.querySelector(".contact").classList.remove("in-view");
  if (isInViewport(document.querySelector(".home-container"))) {
    document.querySelector(".home").classList.add("in-view");
  }
  else if (isInViewport(document.querySelector(".about-container"))) {
    document.querySelector(".about").classList.add("in-view");
  }
  else if (isInViewport(document.querySelector(".projects-container"))) {
    document.querySelector(".projects").classList.add("in-view");
  }
  else {
    document.querySelector(".contact").classList.add("in-view");
  }
}
onMounted(() => {
  setNavStyleIfInViewport();
});

if (process.client) {
  document.addEventListener("scroll", setNavStyleIfInViewport, {
    passive: true,
  });
}
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
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 100vh;
  background-color: #0b1317;
  color: white;
}

.top-header {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  position: sticky;
  position: -webkit-sticky;
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
  transition: padding 0.2s, margin 0.2s;
}

.header:hover {
  border-color: #41b3cc;
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
</style>
