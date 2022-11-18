<template>
  <div class="index-container">
    <h1 class="header-pages">Hello from the index of pages!</h1>
    <div class="main-header">
      <!-- <h1 class="header">Portfolio TOP</h1> -->
      <NuxtLink to="/projects" class="font-bold hover:text-cyan-400 hover:underline">Click me to go to Projects Page!</NuxtLink>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.index-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  width: 100%;
}

.header-pages {
  border: 0.1rem solid rgb(199, 114, 114);
  border-radius: 0.5rem;
  border-top: rgb(199, 114, 114) solid 0.5rem;
  width: 50%;
  text-align: center;
  padding: .5rem;
}

.main-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 50%;
  margin: 2rem;
}

.header {
  border: 0.1rem solid rgb(161, 199, 114);
  border-radius: 0.5rem;
  border-top: rgb(161, 199, 114) solid 0.5rem;
  width: 100%;
  text-align: center;
  padding: 0.5rem;
}
</style>
