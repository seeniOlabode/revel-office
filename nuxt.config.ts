import { searchForWorkspaceRoot } from "vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    server: {
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd()), "/Users/macbookpro/"],
      },
    },
  },
  css: ["~/styles/styles.css"],
  postcss: {
    plugins: {
      "postcss-mixins": {},
      "postcss-pxtorem": {},
    },
  },
  build: {
    transpile: ["gsap"],
  },
  modules: ["@pinia/nuxt"],
  routeRules: {
    "/": { prerender: true },
  },
});
