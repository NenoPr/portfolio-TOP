<template>
    <div class="home-container mb-[2000px]">
      <h1 class="pr-[50%] text-[2rem]">Hello, my name is</h1>
      <h1 class="text-[2rem] pr-[40%]">Neno</h1>
      <h1 class="w-[50%] pr-[]">I am a self thought programer studying Web Developement, Machine Learning and Deep Learning</h1>
      <div class="nuxt-link">
        <!-- <h1 class="header">Portfolio TOP</h1> -->
        <NuxtLink to="/projects" class="font-bold hover:text-cyan-400 hover:underline">Click me to go to Projects Page!</NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border: 0.1rem solid rgb(199, 114, 114);
    border-radius: 0.5rem;
    border-top: rgb(199, 114, 114) solid 0.5rem;
    width: 50%;
    text-align: center;
    padding: .5rem;
  }
  
  .nuxt-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 50%;
    padding: 2rem;
  }
  </style>
  