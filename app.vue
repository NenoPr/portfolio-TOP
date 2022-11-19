<template>
  <div class="main-container">
    <nav class="top-header">
      <h2 class="header">Hi, I'm Neno</h2>
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
  if (element.classList.contains("home")) {
    document
      .querySelector(".home-container")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  } else if (element.classList.contains("about")) {
    document.querySelector(".about-container").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  } else if (element.classList.contains("projects")) {
    document.querySelector(".projects-container").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  } else if (element.classList.contains("contact")) {
    document.querySelector(".contact-container").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
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
  if (isInViewport(document.querySelector(".about-container"))) {
    document.querySelector(".about").classList.add("in-view");
  }
  if (isInViewport(document.querySelector(".projects-container"))) {
    document.querySelector(".projects").classList.add("in-view");
  }
  if (isInViewport(document.querySelector(".projects-container"))) {
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
    #0b1317 50%,
    #0b1317f3 70%,
    #0b131772 100%
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
