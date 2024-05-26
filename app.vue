<template>
  <div class="app" ref="appEl" style="visibility: hidden">
    <site-header ref="siteHeader" />
    <site-shop v-if="loaded" />
    <!-- <site-footer /> -->
    <!-- <site-preloader /> -->
    <toast-manager />
  </div>
</template>

<script>
import { computed } from "vue";

import SiteHeader from "./components/header/SiteHeader.vue";
import SiteShop from "./components/shop/Shop.vue";
import SiteFooter from "./components/footer/SiteFooter.vue";
import SitePreloader from "./components/SitePreloader.vue";

import ToastManager from "./components/toast/ToastManager.vue";

export default {
  components: {
    SiteHeader,
    SiteShop,
    SiteFooter,
    SitePreloader,
    ToastManager,
  },
  provide() {
    return {
      getNotify: () => computed(() => this?.siteHeader?.notify),
    };
  },
  setup() {
    useHead({
      title: "Revel Office",
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
        {
          href: "/revel-office-favicon.png",
          type: "image/png",
          rel: "icon",
        },
      ],
      script: [],
    });
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    this.$refs.appEl.style.visibility = "visible";
    setTimeout(() => {
      this.loaded = true;
    }, 500);
  },
};
</script>

<style lang="pcss">
@import "~/styles/index.pcss";

body {
  background-color: var(--light-grey);
}

.fouc-hidden {
  visibility: hidden;
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
