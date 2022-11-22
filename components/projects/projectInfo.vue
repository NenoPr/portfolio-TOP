<template>
  <template v-for="project in projects" :key="project.titleClass">
    <div class="project-holder" :class="project.titleClass">
      <div class="project-details-name">{{ project.title}}</div>
      <p class="project-details-description">
        {{ project.desc }}
      </p>
      <p class="project-details-tool-header">Tools Used</p>
      <div class="project-details-tools-holder">
        <template v-for="item in project.tools" :key="item.tool">
          <div class="project-details-tool">
            <div class="project-details-tool-name">{{item.tool}}</div>
            <div class="project-details-logo">
              <img v-bind:src="'_nuxt/assets/images/' + item.image" :alt="item.tool" />
            </div>
          </div>
        </template>
      </div>
      <a
        :href="`${project.webLink}`"
        target="_blank"
        rel="noreferrer noopener"
        class="tryit-link"
        >Try it Out</a
      >
      <img
        v-bind:src="'_nuxt/assets/images/'+ project.image"
        class="project-details-image"
        alt=""
      />
    </div>
    <div class="separator"></div>
  </template>
</template>

<script setup>
import projects from "~/assets/json/projects.json";


console.log(projects);
</script>

<style lang="scss" scoped>
@import "~/assets/css/projects.css";
</style>
