<template>
  <div class="projects-container">
    <h1 class="header-projects">Some personal Projects I worked on!</h1>
    <div class="projects-list pt-4 pb-4">
      <div class="project-holder">
        <div>Memory Game</div>
        <p>A memory based game where the goal is to click every unique image once. Clicking the same image twice will reset the game score and the game will reset. Clicking every unique image in succesion will result in a Win!</p>
        <p>Tools Used</p>
        <div>
          <p>HTML, CSS, Javascript, React</p>
        </div>
        <a
          href="https://nenopr.github.io/memory-card-OdinProject/"
          target="_blank"
          rel="noreferrer noopener"
          >Try it Out</a
        >
        <img src="../assets/images/Memory Game 1080p.png" alt="" />
      </div>
      <div class="project-holder">
        <div>Small E-commerce Store</div>
        <p>A small fan based shop of a popular video game. The website features multiple products and categories, along with sizes, colors, quantity and reviews for each product. The website also has a cart feature with a checkout functionality, along with some smaller features.</p>
        <p>Tools Used</p>
        <div>
          <p>HTML, CSS, Javascript, React</p>
        </div>
        <a
          href="https://nenopr.github.io/shopping-cart-OdinProject/#/"
          target="_blank"
          rel="noreferrer noopener"
          >Try it Out</a
        >
        <img src="../assets/images/ecomerce_frontpage.png" alt="" />
      </div>

      <div class="project-holder">
        <div>Battleships game</div>
        <p>The classic Battleship Game where the victory objective is to sink your enemy ships before thy sink yours, while taking turns to take your shots. Rotate and place your own ships on the board and keep firing until you discover hidden enemy ships and sink them all.</p>
        <p>Tools Used</p>
        <div>
          <p>HTML, CSS, Javascript</p>
        </div>
        <a
          href="https://nenopr.github.io/battleship-TheOdinProject/"
          target="_blank"
          rel="noreferrer noopener"
          >Try it Out</a
        >
        <img src="../assets/images/battleship_game.png" alt="" />
      </div>

      <div class="project-holder">
        <div>Image Tagging Game</div>
        <p>A game where the goal is to find the right given character in an image filled with various characters. Find them as fast as possible and submit your sore to the global leaderboards.</p>
        <p>Tools Used</p>
        <div>
          <p>HTML, CSS, Javascript, React</p>
        </div>
        <a
          href="https://nenopr.github.io/find-me-image-tagging-game/"
          target="_blank"
          rel="noreferrer noopener"
          >Try it Out</a
        >
        <img src="../assets/images/imagetagging_game.png" alt="" />
      </div>

      <div class="project-holder">
        <div>CV Maker</div>
        <p>Custom CV Maker where you can add your work experience, education, skills, photo ect. After filling your CV export it in a pdf file or print it.</p>
        <p>Tools Used</p>
        <div>
          <p>HTML, CSS, Javascript, React</p>
        </div>
        <a
          href="https://nenopr.github.io/cv-project-TheOdinProject/"
          target="_blank"
          rel="noreferrer noopener"
          >Try it Out</a
        >
        <img src="../assets/images/CV_maker.png" alt="" />
      </div>
      <div class="project-holder">
        <div>Tic-Tac-Toe Game</div>
        <p>A basic Tic-Tac-Toe game. Align three of your markers first and win the game.</p>
        <p>Tools Used</p>
        <div>
          <p>HTML, CSS, Javascript</p>
        </div>
        <a
          href="https://nenopr.github.io/tic-tac-toe-project-The-Odin-Project/"
          target="_blank"
          rel="noreferrer noopener"
          >Try it Out</a
        >
        <img src="../assets/images/tictactoe_game.png" alt="" />
      </div>
      <div class="project-holder">
        <div>Responsive Website</div>
        <p>A website with a responsive design, marketing disenfection robots. Accessing /user in the url bar leads to a small demo of the dummyapi users, it list all the available users in difrent designs and gives specific user details per user.</p>
        <p>Tools Used</p>
        <div>
          <p>HTML, CSS, Tailwind, JavaScript, Vue, Nuxt</p>
        </div>
        <a
          href="https://nenopr.github.io/tic-tac-toe-project-The-Odin-Project/"
          target="_blank"
          rel="noreferrer noopener"
          >Try it Out</a
        >
        <img src="../assets/images/lloyds-verdas.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  border: 0.1rem solid rgb(199, 114, 114);
  border-radius: 0.5rem;
  border-top: rgb(199, 114, 114) solid 0.5rem;
  text-align: center;
  padding: 0.5rem;
}

img {
  border-radius: 0.5rem;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-weight: bold;
}

a {
  text-decoration: underline;
}

a:hover {
  color: #1f94cf;
}
</style>
