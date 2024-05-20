<template>
  <div class="site-loader">
    <img
      class="site-loader__image"
      ref="preloaderImageEl"
      src="~/assets/revel-office-logo.svg"
    />
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  mounted() {
    gsap.from(this.$refs.preloaderImageEl, {
      scale: 0,
      duration: 4,
      ease: "expo.out",
      //   repeat: -1,
    });
  },
};
</script>

<style scoped lang="pcss">
@import "~/styles/index.pcss";

.site-loader {
  @add-mixin absolute-screen;
  @add-mixin flex-centered;
  align-items: end;
  z-index: 20;
  position: fixed;
  background-color: white;
  padding: 5px;
}

.site-loader__image {
  width: 100vw;
  transform-origin: 0% 100%;
}
</style>