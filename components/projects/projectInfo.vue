<template>
  <template v-for="project in projects" :key="project.titleClass">
    <div class="project-holder-decoration">
      <!-- <div class="project-pink-decoration-holder"> -->
      <!-- <div class="project-pink-decoration-side-left"></div> -->
      <!-- <div class="project-pink-decoration"></div> -->
      <!-- <div class="project-pink-decoration-side-right"></div> -->
      <!-- </div> -->
      <div class="project-holder-decoration-2" loading="lazy">
        <!-- :style="{ 'background-image': 'url(img/' + project.image + ')' }" -->
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
                v-for="(image, index) in project.images"
                :key="image"
                v-bind:src="'img/' + image"
                :class="`project-details-image project-details-image-${
                  index + 1
                }`"
                :alt="image"
                loading="lazy"
              />
            </div>
            <!-- <div class="project-images-right">></div> -->
          </div>
          <div class="images-box-decoration-container">
            <div class="images-box-decoration box-1"></div>
            <div class="images-box-decoration box-2"></div>
            <div class="images-box-decoration box-3"></div>
            <div class="images-box-decoration box-4"></div>
            <div class="images-box-decoration box-5"></div>
            <div class="images-box-decoration box-6"></div>
            <div class="images-box-decoration box-7"></div>
            <div class="images-box-decoration box-8"></div>
            <div class="images-box-decoration box-9"></div>
            <div class="images-box-decoration box-10"></div>
          </div>
          <div class="quad-box-decoration-container">
            <div class="quad-box-decoration quad-box-1">
              <div class="quad"></div>
              <div class="quad"></div>
              <div class="quad"></div>
              <div class="quad"></div>
            </div>
            <div class="quad-box-decoration quad-box-2">
              <div class="quad"></div>
              <div class="quad"></div>
              <div class="quad"></div>
              <div class="quad"></div>
            </div>
            <div class="quad-box-decoration quad-box-3">
              <div class="quad"></div>
              <div class="quad"></div>
              <div class="quad"></div>
              <div class="quad"></div>
            </div>
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
    e.target.classList.add("project-details-image-zoom-in");
    setTimeout(() => {
      document
        .querySelector(".zoom-view-go-exit")
        .addEventListener("click", removeZoomDocument);
    }, "100");
  }
}
function removeZoomDocument() {
  document.querySelectorAll(".project-details-image").forEach((node) => {
    if (node.classList.contains("project-details-image-zoom-in")) {
      node.classList.remove("project-details-image-zoom-in");
      // document.getElementById("zoom-view").parentNode.removeChild(document.getElementById("zoom-view"))
    }
    document
      .querySelector(".zoom-view-go-exit")
      .removeEventListener("click", removeZoomDocument);
    // Remove images from image list
    document.querySelector(".zoom-view-list").childNodes.forEach((child) => {
      child.remove();
    });
    document.getElementById("zoom-view").style.scale = "20%";
    document.getElementById("zoom-view").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("zoom-view").style.visibility = "hidden";
    }, "300");
    window.onscroll = () => {};
  });
}

function zoomImageMode(e) {
  const ZoomView = document.getElementById("zoom-view");
  // document.getElementById("__nuxt").classList.add("stop-scrolling");
  // document.querySelector('body').bind('touchmove', function(e){e.preventDefault()})
  // document.body.style.overflow = "hidden";
  const scrollPosition =
    document.documentElement.scrollTop || document.body.scrollTop;
  console.log(document.documentElement.scrollTop || document.body.scrollTop);
  window.onscroll = () => {
    window.scroll(0, scrollPosition);
  };
  // ZoomView.style.height = "90vh";
  // ZoomView.style.width = "90vw";
  // ZoomView.style.position = "fixed";
  // ZoomView.style.top = "0";
  // ZoomView.style.left = "0";
  // ZoomView.style.zIndex = "99";
  // ZoomView.style.backgroundRepeat = "no-repeat";
  // ZoomView.style.backgroundPosition = "center";
  // ZoomView.style.backgroundSize = "cover";
  // ZoomView.style.cursor = "zoom-out"
  // ZoomView.id = "zoom-view"
  const imageNode = document.querySelector(".zoom-view-image");
  imageNode.src = e.target.src;
  imageNode.addEventListener("click", removeZoomDocument);
  ZoomView.style.visibility = "visible";
  document.getElementById("__nuxt").insertAdjacentElement("afterend", ZoomView);
  setTimeout(() => {
    ZoomView.style.scale = "100%";
    ZoomView.style.opacity = "1";
  }, "1");

  // Get images from document for the image list
  const imageList = [];
  e.target.parentNode.childNodes.forEach((child) => {
    if (child.src) imageList.push(child.src);
  });
  console.log(imageList);

  const ZoomList = document.querySelector(".zoom-view-list");
  // if (!ZoomList.hasChildNodes) {
  imageList.forEach((image) => {
    let imageNode = document.createElement("img");
    imageNode.src = image;
    imageNode.style.width = "fit-content";
    imageNode.style.backgroundSize = "contain";
    imageNode.style.backgroundRepeat = "no-repeat";
    imageNode.style.cursor = "pointer";
    imageNode.addEventListener("click", changeCurrentImageView);
    ZoomList.appendChild(imageNode);
    imageNode.className = "zoom-view-list-image";
    imageNode.style.border = ".2rem solid #cd2b2b00"
    imageNode.style.borderRadius = ".25rem"
    if (e.target.src === imageNode.src) {
      imageNode.classList.toggle("selected-image-zoom");
      imageNode.style.border = ".2rem solid #cd2b2b"
      imageNode.style.borderRadius = ".25rem"
    }
  });
  // }
  console.log(e.target.src);
}

function changeCurrentImageView(e) {
  document.querySelector(".zoom-view-image").src = e.target.src;
  document.querySelector(".selected-image-zoom").style.border = ".2rem solid #cd2b2b00"
  document.querySelector(".selected-image-zoom").style.borderRadius = ".25rem"
  document.querySelector(".selected-image-zoom").classList.toggle("selected-image-zoom")
  e.target.classList.toggle("selected-image-zoom");
  e.target.style.border = ".2rem solid #cd2b2b"
}

function disableScroll() {
  // Get the current page scroll position
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
    // if any scroll is attempted, set this to the previous value
    (window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    });
}

function enableScroll() {
  window.onscroll = function () {};
}

onMounted(() => {
  document.querySelectorAll(".project-details-image").forEach((node) => {
    node.addEventListener("click", toggleZoom);
  });
  document.querySelectorAll(".project-details-image").forEach((node) => {
    node.addEventListener("click", zoomImageMode);
  });
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/projects.css";
</style>
