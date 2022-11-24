vue<template>
    <div class="contact-container m-[2rem]">
      <h2 class="m-[2rem] text-lg font-bold">Contact me</h2>
      <p class="m-[1rem]">Please do not hesitate to contact me if you would like to work with me!</p>
      <div>Feel free to contact me at this email:</div>
      <p>nenadpredan@gmail.com</p>
      <img src="../assets/images/contact_phone_green.jpg" alt="">
    </div>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
  .contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border: 0.1rem solid rgb(199, 114, 114);
    border-radius: 0.5rem;
    border-top: rgb(199, 114, 114) solid 0.5rem;
    text-align: center;
    padding: 0.5rem;
    width: 50%;
    background-image: url(../assets/images/background_contact.jpg);
    background-position: 70% 50%;
  }

  @media (max-width: 1300px) {
    .contact-container {
      width: 95%;
    }
  }

  img {
    border-radius: .5rem;
    width: 50%;
    margin: 2rem;
  }
  </style>
  