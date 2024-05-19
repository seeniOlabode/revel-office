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

      <div class="site-header__bottom">
        <SiteNav ref="siteNavRef" />
        <Cart ref="cartRef" />

        <div class="bottom__button-container">
          <action-button
            class="nav__button animate-nav-item"
            :style="{ 'transition-delay': `${siteLinks.length * 0.02}s` }"
            variant="primary"
          >
            {{ mode === "nav" ? "Create Account" : "Checkout" }}
          </action-button>
        </div>
      </div>
    </header>

    <div class="wrapper__backdrop" @click="closeHeader"></div>
  </div>
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
      headerState: null,
      headerLastHeight: 0,
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
</style>