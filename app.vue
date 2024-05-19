<template>
  <div class="app">
    <site-header />
    <site-shop />
    <site-footer />
  </div>
</template>

<script>
import SiteHeader from "./components/header/SiteHeader.vue";
import SiteShop from "./components/shop/Shop.vue";
import SiteFooter from "./components/footer/SiteFooter.vue";

export default {
  components: {
    SiteHeader,
    SiteShop,
    SiteFooter,
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
  max-width: 1500px;
  margin: 0 auto;
}

@media screen and (min-width: 992px) {
  .app {
    padding: 40px;
  }
}

.action-button {
  @add-mixin reset-button;
  cursor: pointer;
  background-color: var(--very-dark-grey);
  color: white;
  height: 70px;
}
</style>
