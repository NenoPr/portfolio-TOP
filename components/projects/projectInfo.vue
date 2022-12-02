<template>
  <template v-for="project in projects" :key="project.titleClass">
    <div class="project-holder-decoration">
      <div
        class="project-holder-decoration-2"
        :style="{ 'background-image': 'url(img/' + project.image + ')' }"
        loading="lazy"
      >
        <div class="project-holder" :class="project.titleClass">
          <div class="project-details-name-deco">
            <div class="project-details-name">{{ project.title }}</div>
          </div>
          <div class="project-details-holder">
            <div class="project-info-holder-decoration">
              <div class="project-info-holder">
                <div class="font-bold text-xl">Description:</div>
                <p class="project-details-description">
                  {{ project.desc }}
                </p>
              </div>
            </div>
            <div class="project-tools-holder-deco">
              <div class="project-tools-holder">
                <p class="project-details-tool-header">Tools Used</p>
                <div class="project-details-tools-holder">
                  <template v-for="item in project.tools" :key="item.tool">
                    <div class="project-details-tool">
                      <div class="project-details-tool-name">
                        {{ item.tool }}
                      </div>
                      <div class="project-details-logo">
                        <img
                          :src="`img/${item.image}`"
                          :alt="item.tool"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="tryit-link-deco">
            <a
              :href="`${project.webLink}`"
              target="_blank"
              rel="noreferrer noopener"
              class="tryit-link"
              >PROJECT LINK</a
            >
          </div>
          <div class="project-images-slider-container">
            <!-- <div class="project-images-left">&lt</div> -->

            <div class="project-images-holder">
              <img
                v-bind:src="'img/' + project.image"
                class="project-details-image"
                alt=""
                loading="lazy"
              />
              <img
                v-bind:src="'img/' + project.image2"
                class="project-details-image"
                alt=""
                loading="lazy"
              />
            </div>
            <!-- <div class="project-images-right">></div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="separator"></div>
  </template>
</template>

<script setup>
import projects from "~/assets/json/projects.json";

function imageUrl(image) {
  return new URL(`/public/img/${image}`, import.meta.url);
}

function toggleZoom(e) {
  if (!e.target.classList.contains("project-details-image-zoom-in")) {
    window.addEventListener("click", removeZoomDocument);
    setTimeout(() => {
      e.target.classList.add("project-details-image-zoom-in");
    }, "100");
  }
}
function removeZoomDocument() {
  document.querySelectorAll(".project-details-image").forEach((node) => {
    if (node.classList.contains("project-details-image-zoom-in")) {
      node.classList.remove("project-details-image-zoom-in");
      window.removeEventListener("click", removeZoomDocument);
    }
  });
}

onMounted(() => {
  document.querySelectorAll(".project-details-image").forEach((node) => {
    node.addEventListener("click", toggleZoom);
  });
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/projects.css";
</style>
