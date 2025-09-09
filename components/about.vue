<template>
  <div class="about-container-deco">
    <div class="about-container">
      <div class="about-header-deco">
        <h2 class="about-header">About Me</h2>  
      </div>
      <div class="about-info">
        <img src="~/assets/images/profile_image.jpg" class="profile-image" />
        <div class="profile-desc-deco">
          <p class="profile-desc">
            I am a hobbyist programmer, working on making it professional. My main
            areas of interest are Web development and AI (Machine Learning/Deep
            Learning).
          </p>
        </div>
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
            <div>jQuery</div>
            <div class="about-tool-image">
              <img src="../assets/images/logos/jQuery-logo.png" alt="" />
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
            <div>Node.js</div>
            <div class="about-tool-image">
              <img src="../assets/images/logos/node-js-icon.svg" alt="" />
            </div>
          </div>
          <!-- GAP -->
          <div class="about-tool-holder">
            <div>Express</div>
            <div class="about-tool-image">
              <img src="../assets/images/logos/express-icon.svg" alt="" />
            </div>
          </div>
          <!-- GAP -->
          <div class="about-tool-holder">
            <div>Postgresql</div>
            <div class="about-tool-image">
              <img src="../assets/images/logos/postgresql-icon.svg" alt="" />
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
  </div>
</template>

<script setup></script>

<style scoped>

.about-container-deco {
  /* background-image: url(~/public/img/rain.jpg); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: .5rem;
  width: 70%;
}

.about-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  row-gap: 2rem;
  align-items: center;
  border: 0.1rem solid rgb(199, 114, 114);
  border-radius: 0.5rem;
  border-top: rgb(199, 114, 114) solid 0.5rem;
  text-align: center;
  padding: 0.5rem;
  /* backdrop-filter: blur(.2rem); */
  padding-bottom: 2rem;
}

.about-header-deco {
  grid-row: 1;
  grid-column: 1 / 3;
  background-color: #0b131750;
  border-radius: .5rem;
  width: calc(50%);
  justify-self: center;
  position: relative;
  margin-bottom: 1rem;
}

.about-header {
  font-weight: bold;
  font-size: 2rem;
  background-color: #0b1317;
  border-radius: .5rem;
  position: relative;
  top: 1rem;
  right: 1rem;
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
  border: .2rem solid #0b131750;
}

.profile-desc-deco {
  background-color: #0b131750;
  border-radius: .5rem;
  position: relative;
  width: 90%;
  height: max-content;
}

.profile-desc {
  text-align: left;
  background-color: #0b1317;
  font-size: 1.25rem;
  padding: 1rem;
  border-radius: .5rem;
  position: relative;
  top: 1rem;
  right: 1rem;
}

.about-tools-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0b131750;
  border-radius: .5rem;
  padding: .5rem;
  padding-top: 1rem;
}

@media (max-width: 1300px) {
  .about-container-deco {
    width: 95%;
  }
  .about-container {
    grid-template-columns: auto;
    grid-template-rows: auto auto 1fr;
    gap: 0px;
    row-gap: 1rem;
  }

  .about-header {
    grid-row: 1;
  }

  .about-info {
    grid-row: 2;
    align-items: center;
  }

  .about-tools-holder {
    grid-row: 3;
  }
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
  border-radius: 0.25rem;
  gap: 0.5rem;
}

.about-tool-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: .5rem;
  border-radius: .5rem;
  width: 100%;
  flex-basis: 90%;
  width: 5rem;
}

@media (max-width: 800px) {
  .about-container-deco {
    width: 95%;
  }

  .about-tools {
    padding: 0rem;
  }

  .about-tools-holder {
    margin-top: 1rem;
  }
}
</style>
