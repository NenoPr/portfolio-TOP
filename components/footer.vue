<template>
  <div class="footer-container">
    <div class="footer-links">
      <div>GitHub:</div>
      <a
        href="https://github.com/NenoPr"
        className="about-github-link"
        target="_blank"
        rel="noreferrer noopener"
      >
      <img
        src="public/img/GitHub-Mark-Light-32px.png"
        alt="GitHub Logo"
      />
      <p>Made by NenoPr</p>
    </a>
    </div>
    <div class="footer-sources">
      <div>Sources from FreePik By:</div>
      <a
        href="https://www.freepik.com/free-vector/sphere-explosion-background_18454078.htm#page=2&query=geometric&position=4&from_view=keyword"
        >GarryKillian</a
      >
      <!-- <a
        href="https://www.freepik.com/free-vector/abstract-3d-design-elements-collection-vector_18717379.htm#page=2&query=geometric&position=6&from_view=keyword"
        >rawpixel.com</a
      > -->
      <a
        href="https://www.freepik.com/free-vector/background-line-abstract-gradient-colorful-style_33780726.htm#page=5&query=geometric&position=12&from_view=keyword"
        >AndreaCharlesta</a
      >
      <!-- <a
        href="https://www.freepik.com/free-vector/phone-surrounded-by-messages-isometric-style_5453890.htm#query=contact&position=42&from_view=search&track=sph"
        >pikisuperstar</a
      > -->
      <!-- <a
        href="https://www.freepik.com/free-vector/new-message-concept-illustration_6183564.htm#query=mail&position=28&from_view=search&track=sph"
        >storyset</a
      > -->
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-top: 0.05rem solid #3f4a55;
  text-align: center;
  padding: 0.5rem;
  width: 100%;
  background-color: #0b1317;
  background: linear-gradient(
    to top,
    transparent,
    #0a3043 0%,
    #0a3043f3 40%,
    #0a304388 80%,
    #0a304300 100%
  );
}

.footer-links {
  display: flex;
  gap: .5rem;
  align-items: center;
  background-color: #0b1317;
  padding: 1rem;
  border-radius: .5rem;
}

.about-github-link {
  display: flex;
  align-items: center;
  gap: .5rem;
}

.footer-sources {
  display: flex;
  gap: 0.5rem;
  background-color: #0b1317;
  border-radius: .5rem;
  padding: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 800px) {
  .about-github-link {
    justify-content: center;
    flex-wrap: wrap;
  }

  .footer-links {
    justify-content: center;
    flex-wrap: wrap;
  }
}

img {
  display: inline-block;
}

a {
  text-decoration: underline;
}

a:hover {
  color: #1f94cf;
}
</style>
