<template>
  <div class="site-header__wrapper" :class="{ 'header-open': open }">
    <header
      class="site-header"
      ref="siteHeader"
      data-expanding="nil"
      data-active="nav"
    >
      <div class="site-header__top">
        <action-button :onClick="handleCartClick">
          <img src="~/assets/icons/cart.svg" />
        </action-button>
        <img src="~/assets/revel-office-logo.svg" />
        <action-button :onClick="handleNavClick">
          <img src="~/assets/icons/menu.svg" />
        </action-button>
      </div>

      <div class="site-header__bottom" ref="headerBottomEl">
        <SiteNav ref="siteNavRef" />
        <Cart ref="cartRef" />

        <div class="bottom__button-container">
          <action-button class="nav__button animate-nav-item" variant="primary">
            {{ mode === "nav" ? "Create Account" : "Checkout" }}
          </action-button>
        </div>
      </div>

      <!-- <div
        class="site-header__notifications"
        ref="notificationsEl"
        style="display: none"
      >
        <div class="scroll-prompt">
          <span class="scroll-prompt__text">
            Keep scrolling to reveal footer
          </span>
          <span class="scroll-prompt__icon">
            <span class="scroll-prompt__icons-wrapper">
              <img src="~/assets/icons/chevrons-down.svg" />
              <img src="~/assets/icons/chevrons-down.svg" />
            </span>
          </span>
        </div>

        <span class="backdrop"></span>
      </div> -->
    </header>

    <div class="wrapper__backdrop" @click="closeHeader"></div>
  </div>
</template>

<script>
import { gsap } from "gsap";

import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);

import QualityControl from "../shared/QualityControl.vue";
import ActionButton from "../shared/ActionButton.vue";
import Cart from "../cart/Cart.vue";
import SiteNav from "./SiteNav.vue";

export default {
  components: {
    QualityControl,
    ActionButton,
    Cart,
    SiteNav,
  },
  data() {
    return {
      open: false,
      mode: "nav",
      siteLinks: [
        { text: "Shop", path: "/", available: true },
        { text: "Track Orders", path: "/", available: false },
        { text: "Collection", path: "/", available: false },
        { text: "Contact", path: "/", available: true },
      ],
      cartItems: [],
      headerState: null,
      headerLastHeight: 0,
    };
  },
  methods: {
    toggleNotification() {
      this.storeHeaderState();
      this.$refs.notificationsEl.style.display = "";
      this.$refs.headerBottomEl.style.display = "none";
      this.headerEl.classList.toggle("open");
      this.animateFromHeaderState();
      this.mode = "notification";
    },
    toggleMenu() {
      this.open = !this.open;
      this.storeHeaderState();
      this.openHeader();
      this.animateFromHeaderState();
    },
    handleCartClick() {
      this.storeHeaderState();
      this.cartEl.style.display = "";
      this.navEl.style.display = "none";
      if (this.open && this.mode === "nav") {
        this.headerEl.dataset.expanding =
          this.headerEl.clientHeight > this.headerLastHeight;
        this.animateFromHeaderState();
      } else {
        this.toggleMenu();
      }
      this.mode = "cart";
    },
    handleNavClick() {
      this.storeHeaderState();
      this.cartEl.style.display = "none";
      this.navEl.style.display = "";
      if (this.open && this.mode === "cart") {
        this.headerEl.dataset.expanding =
          this.headerEl.clientHeight > this.headerLastHeight;
        this.animateFromHeaderState();
      } else {
        this.toggleMenu();
      }
      this.mode = "nav";
    },
    storeHeaderState() {
      this.headerState = Flip.getState(this.$refs.siteHeader);
      this.headerLastHeight = this.headerEl.clientHeight;
    },
    openHeader() {
      this.$refs.siteHeader.classList.toggle("open");
    },
    animateFromHeaderState() {
      Flip.from(this.headerState, { duration: 0.5, ease: "power4.out" });
    },
    closeHeader() {
      if (this.mode === "nav") {
        this.handleNavClick();
      } else if (this.mode === "cart") {
        this.handleCartClick();
      }
    },
  },
  computed: {
    cartEl() {
      return this.$refs?.cartRef?.cartEl;
    },
    navEl() {
      return this.$refs?.siteNavRef?.navEl;
    },
    headerEl() {
      return this.$refs.siteHeader;
    },
  },
  watch: {
    mode: {
      handler(newValue) {
        if (this.headerEl) {
          this.headerEl.dataset.active = newValue;
        }
      },
    },
  },
  mounted() {
    // ScrollTrigger.create({
    //   trigger: ".site-shop",
    //   start: "bottom 101%",
    //   onEnter: function () {
    //     this.toggleNotification();
    //   }.bind(this),
    //   onLeaveBack: function () {
    //     this.toggleNotification();
    //   }.bind(this),
    // });
  },
};
</script>

<style lang="pcss">
@import "~/styles/index.pcss";

.site-header__wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  /* bottom: 0; */
  padding: 16px;
  z-index: 1;
}

.wrapper__backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
}

.header-open .wrapper__backdrop {
  display: block;
}

.header-open {
  bottom: 0;
}

.site-header {
  background-color: white;
  border-radius: var(--lg-radius);
  height: auto;
  @add-mixin border;
  width: 18.75rem;
  margin: 0 auto;
  overflow: hidden;
  display: grid;
  grid-template-rows: 3.125rem 0;
  max-width: 31.25rem;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.site-header__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.313rem;
  height: 3.125rem;
}

.site-header.open {
  width: 100%;
  grid-template-rows: 3.125rem 1fr;
}

.site-header__section {
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
}

.site-header__bottom {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 49px;
  margin-top: auto;
}

.bottom__button-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0.25rem 0.25rem 0.25rem;
  margin-top: auto;
  opacity: 0;
  pointer-events: none;
}

.site-header.open .bottom__button-container {
  opacity: 1;
  pointer-events: all;
  transition: opacity 1s;
}

.nav__button {
  margin-top: 0.313rem;
}

.site-header__notifications {
  position: relative;
}

.site-header__notifications .backdrop {
  position: absolute;
  left: -5px;
  right: -5px;
  background-color: red;
  top: 0;
  bottom: 0;
  background-color: var(--very-dark-grey);
}

.scroll-prompt {
  position: relative;
  z-index: 1;
  padding: var(--sm-spacing) var(--sm-spacing);
  border-top: solid 1px var(--stroke);
  background-color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform var(--md-speed);
  justify-content: space-between;
  text-transform: uppercase;
  /* background-color: var(--very-dark-grey); */
}

.scroll-prompt__icon {
  height: 18px;
  overflow: hidden;
}

.scroll-prompt__icons-wrapper {
  animation: scroll-animation infinite var(--xl-speed);
  display: block;
}

.scroll-prompt__icon img {
  height: 18px;
}

.scroll-prompt__text {
  color: var(--dark-fade);
  font-size: var(--sm-font);
  font-weight: 600;
  /* color: white; */
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