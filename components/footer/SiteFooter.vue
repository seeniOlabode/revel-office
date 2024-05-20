<template>
  <!-- <div class="site-footer__scroll-prompt">
    <span class="scroll-prompt__icon">
      <span class="scroll-prompt__icons-wrapper">
        <img src="~/assets/icons/chevrons-down.svg" />
        <img src="~/assets/icons/chevrons-down.svg" />
      </span>
    </span>
    <span class="scroll-prompt__text">Scroll to reveal footer.</span>
  </div> -->
  <footer class="site-footer" ref="siteFooterEl">
    <div class="site-footer__content"></div>
  </footer>
</template>

<script>
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

export default {
  data() {
    return {
      promptDisplayed: false,
      observer: null,
    };
  },
  mounted() {
    gsap.set(".site-footer", {
      y: window.innerHeight,
    });
    // this.observer = Observer.create({
    //   target: window,
    //   type: "wheel,touch",
    //   onDown: function () {
    //     gsap.to(".site-footer", {
    //       y: 0,
    //     });
    //   },
    //   onUp: function () {
    //     gsap.to(".site-footer", {
    //       y: window.innerHeight,
    //     });
    //   },
    // });
    // this.observer.disable();
    // ScrollTrigger.create({
    //   trigger: ".site-shop",
    //   start: "bottom 101%",
    //   onEnter: function () {
    //     gsap.set(".site-footer__scroll-prompt", {
    //       y: 0,
    //     });
    //     setTimeout(() => {
    //       this.promptDisplayed = true;
    //     }, 5000);
    //   }.bind(this),
    //   onLeaveBack: function () {
    //     gsap.set(".site-footer__scroll-prompt", {
    //       y: 42,
    //     });
    //     setTimeout(() => {
    //       this.promptDisplayed = false;
    //     }, 5000);
    //   }.bind(this),
    // });
  },
  watch: {
    promptDisplayed(value) {
      if (value) {
        this.observer.enable();
      } else {
        this.observer.disable();
      }
    },
  },
};
</script>

<style lang="pcss" scoped>
@import "~/styles/index.pcss";

.site-footer__scroll-prompt {
  border-top: solid 1px var(--stroke);
  padding: var(--xs-spacing) var(--sm-spacing);
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform var(--md-speed);
  transform: translateY(100%);
}

.scroll-prompt__icon {
  height: 20px;
  overflow: hidden;
}

.scroll-prompt__icons-wrapper {
  animation: scroll-animation infinite var(--xl-speed);
  display: block;
}

.scroll-prompt__icon img {
  height: 20px;
}

.scroll-prompt__text {
  color: var(--dark-fade);
  font-size: var(--x-base-font);
}

.site-footer {
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
}

.site-footer__content {
  @add-mixin container;
  border-radius: 30px 30px 0 0;
  position: absolute;
  left: 0%;
  right: 0%;
  bottom: 0;
  height: 50vh;
}

@keyframes scroll-animation {
  from {
    transform: translateY(-50%);
  }

  to {
    transform: translateY(0%);
  }
}
</style>