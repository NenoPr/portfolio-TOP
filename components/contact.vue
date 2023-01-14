vue
<template>
  <div class="contact-container">
    <div class="contact-holder-deco">
      <div class="contact-holder">
        <h2 class="contact-header">Contact</h2>
        <div class="contact-mail">
          <p>Feel free to contact me at this email:</p>
          <p class="contact-plead">nenadpredan@gmail.com</p>
          <!-- <img
            src="img/contact_phone_green.jpg"
            alt="mail"
            class="contact-img"
          /> -->
          <!-- <p class="contact-plead">
            Please do not hesitate to contact me if you would like to work with
            me!
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.contact-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  min-height: 500px;
  padding: 2rem;
  border: 0.1rem solid rgb(199, 114, 114);
  border-radius: 0.5rem;
  border-top: rgb(199, 114, 114) solid 0.5rem;
  width: 50%;
  text-align: center;
  padding: 0.5rem;
  background-image: url(../assets/images/background_contact.jpg);
  background-position: 70% 50%;
  color: black;
}

.contact-holder-deco {
  /* background-image: url(~/public/img/contact_phone_blue_orange.jpg); */
  background-position: center;
  background-size: cover;
  border-radius: 0.5rem;
}

.contact-holder {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  border-radius: 0.5rem;
  /* backdrop-filter: blur(.2rem); */
}

.contact-header {
  font-size: 2rem;
  font-weight: bold;
  background-color: #ffffff;
  border-radius: 0.5rem;
  width: fit-content;
  padding-left: 1rem;
  padding-right: 1rem;
  border: .2rem solid rgb(30, 133, 211);
}

.contact-plead {
  font-size: 1.25rem;
  background-color: white;
  font-weight: bold;
  border-radius: 0.5rem;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: fit-content;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.5rem;
}

.contact-mail {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(255, 255, 255);
  border: .2rem solid rgb(30, 133, 211);
  border-radius: 0.5rem;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.contact-img {
  border-radius: 0.5rem;
  width: 50%;
}

@media (max-width: 1300px) {
  .contact-container {
    width: 95%;
  }
  .contact-mail {
    width: 90%;
  }
}
</style>
