<template>
  <nav class="site-header__nav site-header__section" ref="navEl">
    <ul class="nav__list" ref="navListEl">
      <li
        class="nav__item animate-nav-item"
        v-for="(link, i) in siteLinks"
        :key="link.text + link.path"
        :style="{
          '--delay': `${i * 0.015}s`,
          '--negative-delay': `${(siteLinks.length - i) * 0.015}s`,
        }"
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

    <form
      class="site-header__auth-form"
      style="display: none"
      onsubmit="return false"
      method="POST"
      ref="authFormEl"
    >
      <text-input
        placeholder="Your name"
        style="--delay: 0s; --negative-delay: 0.025s"
        class="animate-nav-item"
      />
      <text-input
        placeholder="Your email"
        style="--delay: 0.025s; --negative-delay: 0s"
        class="animate-nav-item"
      />
    </form>
  </nav>
</template>

<script>
import { ref, defineExpose } from "vue";

import ActionButton from "../shared/ActionButton.vue";

import TextInput from "../shared/TextInput.vue";

export default {
  components: {
    ActionButton,
    TextInput,
  },
  props: {
    showAuth: Boolean,
  },
  emits: ["storeState", "animateState"],
  setup() {
    const navEl = ref(null);
    console.log(defineExpose);
    defineExpose({
      navEl: navEl,
    });
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
  watch: {
    showAuth: {
      handler(value) {
        if (value) {
          this.$emit("storeState");
          this.$refs.authFormEl.style.display = "";
          this.$refs.navListEl.style.display = "none";
          this.$emit("animateState");
        } else {
          this.$refs.authFormEl.style.display = "none";
          this.$refs.navListEl.style.display = "";
        }
      },
    },
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
  transition: opacity var(--sm-speed), transform var(--sm-speed);
  transform: translateY(-1.25rem);
  pointer-events: none;
}

.site-header.open:not([data-expanding="false"]) .site-header__nav {
  --transition-from: 1.25rem;
}

.site-header.open:not([data-expanding="true"]) .site-header__nav {
  --transition-from: -1.25rem;
}

.site-header.open[data-expanding="true"] .site-header__nav .animate-nav-item {
  transition-delay: var(--negative-delay);
}

.site-header.open[data-expanding="false"] .site-header__nav .animate-nav-item {
  transition-delay: var(--delay);
}

.site-header.open:not([data-active="nav"]) .animate-nav-item {
  opacity: 0;
  transform: translateY(var(--transition-from));
}

.site-header.open[data-active="nav"] .animate-nav-item {
  opacity: 1;
  transform: translate(0);
}

.site-header__auth-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
}
</style>