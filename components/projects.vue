<template>
  <div class="projects-container-deco">
    <div class="projects-container">
      <h1 class="header-projects">
        Some Personal Projects I worked on!
      </h1>
      <div class="separator"></div>
      <div class="projects-list pt-4 pb-4">
        <ProjectsProjectInfo />
      </div>
      <div id="zoom-view">
        <button class="zoom-view-go-exit">&times;</button>
        <div class="zoom-view-images-container">
          <!-- <div class="zoom-view-go-left"></div> -->
          <img class="zoom-view-image">
          <!-- <div class="zoom-view-go-right"></div> -->
        </div>
        <div class="zoom-view-list"></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
@import "~/assets/css/projects.css";

.projects-container-deco {
  /* background-image: url(/public/img/background_objects.jpg); */
  width: 100%;
}
.projects-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #0b1317c0; */
  backdrop-filter: blur(0.5rem);
  /* border: 0.1rem solid rgb(199, 114, 114); */
  border-radius: 0.5rem;
  /* border-top: rgb(199, 114, 114) solid 0.5rem; */
  text-align: center;
  padding: 0.5rem;
}

.separator {
  width: 50%;
  height: 1rem;
  background: #1f94cf00;
  border-top: 0.5rem double #0a9ae7;
  margin-top: 1rem;
  align-self: center;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header-projects {
  font-weight: bolder;
  font-size: 1.5rem;
}

@media (max-width: 1300px) {
  .projects-container-deco {
    width: 95%;
  }
}
</style>
