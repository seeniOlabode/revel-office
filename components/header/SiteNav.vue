<template>
  <nav class="site-header__nav site-header__section" ref="navEl">
    <ul class="nav__list">
      <li
        class="nav__item animate-nav-item"
        v-for="(link, i) in siteLinks"
        :key="link.text + link.path"
        :style="{ 'transition-delay': `${i * 0.015}s` }"
      >
        {{ link.text }}
        <span v-if="!link.available" class="item__availability">
          Coming Soon
        </span>
        <span class="item__availability" v-else>
          <img class="availability__icon" src="~/assets/icons/up-right.svg" />
        </span>
      </li>
    </ul>
    <action-button
      class="nav__button animate-nav-item"
      :style="{ 'transition-delay': `${siteLinks.length * 0.02}s` }"
      variant="primary"
    >
      Create Account
    </action-button>
  </nav>
</template>

<script>
import { ref } from "vue";

import ActionButton from "../shared/ActionButton.vue";

export default {
  components: {
    ActionButton,
  },
  expose: ["navEl"],
  setup() {
    const navEl = ref(null);

    return { navEl };
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

<style lang="pcss" scoped>
@import "~/styles/index.pcss";

.nav__list {
  @add-mixin reset-list;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
}

.nav__item {
  padding: 0.625rem;
  border-radius: var(--sm-radius);
  color: var(--grey);
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item__availability {
  font-size: 0.75rem;
  transition: opacity 100ms;
  display: inline-block;
  color: var(--grey);
  opacity: 0;
  padding-right: 0.313rem;
}

.availability__icon {
  width: 0.875rem;
  height: 0.875rem;
  margin-right: 0.313rem;
}

.nav__item:hover {
  background-color: var(--light-grey);
  color: var(--very-dark-grey);
}

.nav__item:hover .item__availability {
  opacity: 0.6;
}

.site-header.open .animate-nav-item {
  opacity: 1;
  transform: translateY(0px);
  pointer-events: all;
}

.animate-nav-item {
  opacity: 0;
  transition: opacity var(--md-speed), transform var(--md-speed);
  transform: translateY(-1.25rem);
  pointer-events: none;
}
</style>