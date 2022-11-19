<template>
  <div class="index-container">
    <h1 class="header-pages">
      Some personal Projects I worked on!
      <div class="projects-list pt-4 pb-4">
        <div>Memory Game</div>
        <div>Small E-commerce Store</div>
        <div>Battleshps game</div>
        <div>Image Tagging Game</div>
      </div>
    </h1>
    <nuxt-link to="/" class="font-bold hover:text-cyan-400 hover:underline mt-4">Click me to go back to Home Page!</nuxt-link>
  </div>
</template>

<script setup></script>

<style scoped>
.index-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
}

.header-pages {
  border: 0.1rem solid rgb(199, 114, 114);
  border-radius: 0.5rem;
  border-top: rgb(199, 114, 114) solid 0.5rem;
  width: 50%;
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
