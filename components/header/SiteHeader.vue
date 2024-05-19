<template>
  <header class="site-header" ref="siteHeader">
    <div class="site-header__top">
      <action-button :onClick="handleCartClick">
        <img src="~/assets/icons/cart.svg" />
      </action-button>
      <img src="~/assets/revel-office-logo.svg" />
      <action-button :onClick="handleNavClick">
        <img src="~/assets/icons/menu.svg" />
      </action-button>
    </div>

    <!-- <Transition @beforeEnter="storeHeaderState" @onEnter="animateHeader"> -->
    <SiteNav ref="siteNavRef" />
    <!-- </Transition> -->
    <!-- <Transition @onEnter="animateHeader"> -->
    <Cart ref="cartRef" />
    <!-- </Transition> -->
  </header>
</template>

<script>
import { gsap } from "gsap";

import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

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
      state: null,
    };
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
      this.storeHeaderState();
      this.openHeader();
      this.animateFromHeaderState();
    },
    handleCartClick() {
      this.cartEl.style.display = "";
      this.navEl.style.display = "none";
      if (this.open && this.mode === "nav") {
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
        this.animateFromHeaderState();
      } else {
        this.toggleMenu();
      }
      this.mode = "nav";
    },
    openCart() {
      this.mode = "cart";
      this.toggleMenu();
    },
    switchToNav() {
      this.mode = "nav";
    },
    openNav() {
      // this.mode = "nav";
      this.toggleMenu();
    },
    switchToCart() {
      this.mode = "cart";
    },
    storeHeaderState() {
      this.state = Flip.getState(this.$refs.siteHeader);
    },
    openHeader() {
      this.$refs.siteHeader.classList.toggle("open");
    },
    animateFromHeaderState() {
      Flip.from(this.state, { duration: 0.5, ease: "power4.out" });
    },
  },
  computed: {
    cartEl() {
      return this.$refs?.cartRef?.cartEl;
    },
    navEl() {
      return this.$refs?.siteNavRef?.navEl;
    },
  },
};
</script>

<style lang="pcss">
@import "~/styles/index.pcss";

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
</style>