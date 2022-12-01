<template>
  <div class="home-container h-[700px] mt-[7rem]">
    <h1 class="pr-[50%] text-[2rem]">Hello, my name is</h1>
    <h1 class="text-[2rem] pr-[40%]">Neno</h1>
    <h1 class="w-[50%] pr-[]">
      I am a self thought programer studying Web Developement, Machine Learning
      and Deep Learning
    </h1>
    <img src="" alt="">
    <!-- <div class="nuxt-link">
      <NuxtLink
        to="/projects"
        class="font-bold hover:text-cyan-400 hover:underline"
        >Click me to go to Projects Page!</NuxtLink
      >
    </div> -->
  </div>
</template>

<script setup></script>

<style scoped>
.home-container {
  --color-one: #c77272;
  --color-two: #39becd;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border: 0.1rem solid var(--color-two);
  border-radius: 0.5rem;
  border-top: var(--color-two) solid 0.5rem;
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  background-image: url(../assets/images/background_thread_ball.jpg);
  background-repeat: repeat-y;
  background-size: cover;
}

@media (max-width: 1280px) {
  .home-container {
    width: 95%;
  }
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
