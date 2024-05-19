const path = require("path");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/styles/styles.css"],
  postcss: {
    plugins: {
      "postcss-mixins": {},
      "postcss-pxtorem": {},
    },
  },
});
