<template>
  <div
    class="site-header__wrapper"
    :class="{ 'header-open': headerCurrentState !== 'closed' }"
  >
    <header
      class="site-header"
      ref="headerEl"
      data-expanding="nil"
      data-active="nav"
    >
      <div class="site-header__top">
        <action-button :onClick="() => handleHeaderEvent('clickCart')">
          <img src="~/assets/icons/cart.svg" />
        </action-button>
        <img src="~/assets/revel-office-logo.svg" />
        <action-button :onClick="() => handleHeaderEvent('clickNav')">
          <img src="~/assets/icons/menu.svg" />
        </action-button>
      </div>

      <div class="site-header__bottom" ref="headerBottomEl">
        <SiteNav ref="navRef" :showAuth="false" />
        <Cart ref="cartRef" />

        <div class="bottom__button-container">
          <action-button class="nav__button animate-nav-item" variant="primary">
            {{
              headerCurrentState === "navOpen" ? "Create Account" : "Checkout"
            }}
          </action-button>
        </div>
      </div>
    </header>

    <div
      class="wrapper__backdrop"
      @click="() => handleHeaderEvent('clickClose')"
    ></div>
  </div>
</template>

<script>
import { ref } from "vue";

import { gsap } from "gsap";

import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);

import QualityControl from "../shared/QualityControl.vue";
import ActionButton from "../shared/ActionButton.vue";
import Cart from "../cart/Cart.vue";
import SiteNav from "./SiteNav.vue";

import StateMachine from "~/utils/StateMachine";

export default {
  components: {
    QualityControl,
    ActionButton,
    Cart,
    SiteNav,
  },
  setup() {
    // elementRefs
    const headerEl = ref(null);
    const headerBottomEl = ref(null);
    const cartRef = ref(null);
    const navRef = ref(null);

    // state
    let lastHeaderHeight = 0;
    let headerSnapshot = null;

    // methods
    function updateHeaderSnapshot() {
      headerSnapshot = Flip.getState(headerEl.value);
      lastHeaderHeight = headerEl.value.clientHeight;
    }

    function setupElementDisplays(nextState) {
      cartRef.value.cartEl.style.display =
        nextState === "cartOpen" ? "" : "none";
      navRef.value.navEl.style.display = nextState === "navOpen" ? "" : "none";
    }

    function setupActiveDataSet(nextState) {
      headerEl.value.dataset.active = { navOpen: "nav", cartOpen: "cart" }[
        nextState
      ];
    }

    function isHeaderExpanding() {
      headerEl.value.dataset.expanding =
        headerEl.value.clientHeight > lastHeaderHeight;
    }

    function animateHeaderFromSnapShot() {
      Flip.from(headerSnapshot, { duration: 0.5, ease: "power4.out" });
    }

    function beforeHeaderTransition({ currentState, nextState }) {
      updateHeaderSnapshot();
      setupElementDisplays(nextState);
      if (currentState === "closed" || nextState === "closed") {
        toggleHeader();
      }
      isHeaderExpanding();
      setupActiveDataSet(nextState);
    }

    function afterHeaderTransition({ currentState, nextState }) {
      animateHeaderFromSnapShot();
    }

    function toggleHeader() {
      headerEl.value.classList.toggle("open");
    }

    function handleHeaderEvent(event) {
      headerStateMachine.transition(event);
    }

    // state
    const headerTransitions = {
      closed: {
        clickNav: "navOpen",
        clickCart: "cartOpen",
      },
      navOpen: {
        clickClose: "closed",
        clickCart: "cartOpen",
        clickNav: "closed",
      },
      cartOpen: {
        clickClose: "closed",
        clickCart: "closed",
        clickNav: "navOpen",
      },
    };

    const headerStateMachine = new StateMachine({
      initialState: "closed",
      transitions: headerTransitions,
      _before: beforeHeaderTransition,
      _after: afterHeaderTransition,
    });

    const headerCurrentState = headerStateMachine.getStateRef();

    return {
      // ref elements
      headerEl,
      headerBottomEl,
      cartRef,
      navRef,
      headerCurrentState,

      // methods
      handleHeaderEvent,
    };
  },
  data() {
    return {
      siteLinks: [
        { text: "Shop", path: "/", available: true },
        { text: "Track Orders", path: "/", available: false },
        { text: "Collection", path: "/", available: false },
        { text: "Contact", path: "/", available: true },
      ],
    };
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