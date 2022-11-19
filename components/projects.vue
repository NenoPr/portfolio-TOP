<template>
  <div class="projects-container">
    <h1 class="header-projects">Some personal Projects I worked on!</h1>
    <div class="projects-list pt-4 pb-4">
      <div>Memory Game</div>
      <div>Small E-commerce Store</div>
      <div>Battleshps game</div>
      <div>Image Tagging Game</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  border: 0.1rem solid rgb(199, 114, 114);
  border-radius: 0.5rem;
  border-top: rgb(199, 114, 114) solid 0.5rem;
  text-align: center;
  padding: 0.5rem;

}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-weight: bold;
}
</style>
