<template>
  <div class="about-container">
    <div class="about-info">
      <h1 class="about-header">About Neno</h1>
      <img src="~/assets/images/profile_image.jpg" class="profile-image" />
      <p class="profile-desc">
        I dabble in programming mostly as to keep the deterioration of my
        brain at bay from not doing anything with myself, only staying in my
        room every day, all day, rotting my brain with hate, anger, pity, rage,
        fear, porn, loneliness, sadness, neglect.
      </p>
    </div>
    <div>
      <div class="about-tools-header">
        Some technologies I have worked with:
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
  grid-template-rows: 1fr;
  gap: 2rem;
  align-items: center;
  border: 0.1rem solid rgb(199, 114, 114);
  border-radius: 0.5rem;
  border-top: rgb(199, 114, 114) solid 0.5rem;
  text-align: center;
  padding: 0.5rem;
  padding-top: 3rem;
  width: 50%;
}

.about-header {
  position: relative;
  left: 50%;
  bottom: 3rem;
  font-weight: bold;
  font-size: larger;
}

.about-info {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.about-tools-header {
  position: relative;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.about-tools {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  justify-content: center;
  align-content: center;
  gap: 1rem;
  padding: 1rem;
}

.about-tool-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #656c82;
  border-radius: 0.25rem;
  padding: 0.5rem;
  gap: 0.5rem;
  width: 5rem;
}

.about-tool-image {
  width: 100%;
}
</style>
