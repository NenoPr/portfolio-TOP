<template>
  <div class="about-container">
    <h2 class="about-header">About Neno</h2>
    <div class="about-info">
      <img src="~/assets/images/profile_image.jpg" class="profile-image" />
      <p class="profile-desc">
        I dabble in programming mostly as to keep the deterioration of my
        brain at bay from not doing anything with myself, only staying in my
        room every day, all day, rotting my brain with hate, anger, pity, rage,
        fear, porn, loneliness, sadness, neglect.
      </p>
    </div>
    <div class="about-tools-holder">
      <div class="about-tools-header">
        Some technologies I have worked with
      </div>
      <div class="about-tools">
        <div class="about-tool-holder">
          <div>JavaScript</div>
          <div class="about-tool-image">
            <img src="~/assets/images/JavaScript_logo.png" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>Python</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/python-icon.svg" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>C++</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/c-plusplus.svg" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>Git</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/git-icon.svg" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>React</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/react.svg" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>Vue</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/Vue_Logo.png" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>Nuxt</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/nuxt-icon.svg" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>Tailwind</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/tailwindcss-icon.svg" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>Tensorflow</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/tensorflow.svg" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>Keras</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/keras.svg" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>Pytorch</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/pytorch-icon.svg" alt="" />
          </div>
        </div>
        <!-- GAP -->
        <div class="about-tool-holder">
          <div>Fast.ai</div>
          <div class="about-tool-image">
            <img src="../assets/images/logos/Fast.ai.png" alt="" />
          </div>
        </div>
        <!-- GAP -->
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.about-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 2rem;
  align-items: center;
  border: 0.1rem solid rgb(199, 114, 114);
  border-radius: 0.5rem;
  border-top: rgb(199, 114, 114) solid 0.5rem;
  text-align: center;
  padding: 0.5rem;
  width: 70%;
}

.about-header {
  grid-row: 1;
  grid-column: 1 / 3;
  font-weight: bold;
  font-size: 2rem;
}

.about-info {
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-start;
  gap: 2rem;
}

.profile-image {
  border-radius: 50%;
  object-fit: cover;
  object-position: 100%;
  width: 15rem;
  height: 15rem;
}

.profile-desc {
  text-align: left;
  width: 90%;
}

.about-tools-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-tools-header {
  font-weight: bold;
  font-size: 1.05rem;
  margin-bottom: 1rem;
}

.about-tools {
  grid-row: 2;
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5em, 100px)); */
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  justify-content: center;
  grid-gap: 1rem;
  padding: 1rem;
}

.about-tool-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  background-color: #111b3d;
  border-radius: 0.25rem;
  padding: 0.5rem;
  gap: 0.5rem;
}

.about-tool-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-basis: 90%;
  max-width: 5rem;
}
</style>
