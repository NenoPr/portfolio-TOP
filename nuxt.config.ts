// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // mode: "static",
  // router: {
  //   base: "/portfolio-Top",
  // },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
