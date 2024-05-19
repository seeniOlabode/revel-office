<template>
  <div class="app">
    <site-header />
  </div>
</template>

<script>
import SiteHeader from "./components/header/SiteHeader.vue";

export default {
  components: {
    SiteHeader,
  },
  setup() {
    useHead({
      title: "Muzen",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: true,
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap",
          rel: "stylesheet",
        },
      ],
      script: [],
    });
  },
};
</script>

<style lang="pcss">
@import "~/styles/index.pcss";

body {
  background-color: var(--light-grey);
}

.app {
  @add-mixin absolute-screen;
  padding: 16px;
}

.action-button {
  @add-mixin reset-button;
  cursor: pointer;
  background-color: var(--very-dark-grey);
  color: white;
  height: 70px;
}
</style>
