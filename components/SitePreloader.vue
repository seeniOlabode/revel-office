<template>
  <div class="site-loader">
    <div class="underliner">
      <div class="underliner__inner"></div>
    </div>
    <div class="site-loader__image-wrapper">
      <img class="site-loader__image" src="~/assets/revel-office-logo.svg" />
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  mounted() {
    gsap
      .timeline()
      .addLabel("start")
      .to(
        ".underliner__inner",
        {
          y: 0,
          ease: "back.out(1)",
        },
        "start"
      )
      .from(
        ".site-loader__image-wrapper",
        {
          yPercent: 100,
          duration: 0.3,
          ease: "back.out(2)",
        },
        "start+=0.3"
      );
  },
};
</script>

<style scoped lang="pcss">
@import "~/styles/index.pcss";

.site-loader {
  @add-mixin absolute-screen;
  @add-mixin flex-centered;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 20;
  position: fixed;
  background-color: white;
  gap: 20px;
}

.site-loader__image-wrapper {
  padding: 5px;
}

.site-loader__image {
  width: 100vw;
  transform-origin: 0% 100%;
  width: 100vw;
}

.underliner {
  width: 100%;
  height: 100%;
  position: relative;
}

.underliner__inner {
  background-color: var(--very-dark-grey);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: -50vh;
  transform: translateY(-100%);
}
</style>