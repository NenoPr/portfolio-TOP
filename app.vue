<template>
  <div class="main-container">
    <div class="main-header">
      <h1 class="header">Portfolio TOP</h1>
    </div>
    <NuxtPage />
    <!-- <NuxtWelcome /> -->
  </div>
</template>

<style>
.main-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin: 2rem;
}

.header {
  border: 0.1rem solid rgb(161, 199, 114);
  border-radius: 0.5rem;
  border-top: rgb(161, 199, 114) solid 0.5rem;
  width: 50%;
  text-align: center;
  padding: 0.5rem;
}
</style>
