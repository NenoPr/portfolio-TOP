<template>
  <div class="home-container">
    <h1 class="home-hello">Hello, my name is</h1>
    <div class="home-name-deco">
      <h1 class="home-name">Neno</h1>
    </div>
    <div class="home-introduction-deco">
      <h1 class="home-introduction">
        I am a self thought programer studying Web Developement, Machine
        Learning and Deep Learning
      </h1>
    </div>
    <img src="" alt="" />
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
  height: 700px;
  margin-top: 7rem;
  --color-one: #c77272;
  --color-two: #39becd;
  --color-main: #0b1317;
  --color-main-tran: #0b131750;
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

.home-hello {
  padding-right: 50%;
  font-size: 2rem;
  margin-top: 2rem;
}

.home-name-deco {
  margin-top: 2rem;
  background-color: var(--color-main-tran);
  border-radius: 0.5rem;
  margin-right: 40%;
  position: relative;
}

.home-name {
  font-size: 4rem;
  background-color: var(--color-main);
  border-radius: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  position: relative;
  top: 1rem;
  right: 1rem;
}

.home-introduction-deco {
  margin-top: 5%;
  padding: 1rem;
  background-color: var(--color-main-tran);
  border-radius: 0.5rem;
  position: relative;
}

.home-introduction {
  width: 50%;
  font-size: 1.5rem;
  background-color: var(--color-main);
  border-radius: 0.5rem;
  padding: 1rem;
  width: fit-content;
  height: fit-content;
  position: relative;
  top: 2rem;
  right: 1rem;
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
