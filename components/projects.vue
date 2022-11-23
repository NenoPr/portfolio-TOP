<template>
  <div class="projects-container">
    <h1 class="header-projects font-bold text-xl">
      Some Personal Projects I worked on!
    </h1>
    <div class="separator"></div>
    <div class="projects-list pt-4 pb-4">
      <ProjectsProjectInfo />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  border: 0.1rem solid rgb(199, 114, 114);
  border-radius: 0.5rem;
  border-top: rgb(199, 114, 114) solid 0.5rem;
  text-align: center;
  padding: 0.5rem;
}

.separator {
  width: 50%;
  height: 1rem;
  background: #1f94cf00;
  border-top: 0.5rem dotted #0a9ae7;
  margin-top: 1rem;
  align-self: center;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
