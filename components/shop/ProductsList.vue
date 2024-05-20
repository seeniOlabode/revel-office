<template>
  <ul class="site-shop__products-list">
    <ChairCard
      v-for="chair in store.chairs"
      :key="chair.name"
      :chairData="chair"
    />
  </ul>
</template>

<script>
import ChairCard from "./ChairCard.vue";

import useStore from "~/store";

import { gsap } from "gsap";

export default {
  components: {
    ChairCard,
  },
  data() {
    return {
      chairs: [],
    };
  },
  setup() {
    const store = useStore();

    return {
      store,
    };
  },

  mounted() {
    this.animateChairsIn();
  },

  methods: {
    animateChairsIn() {
      gsap.from(".site-chair-card", {
        opacity: 0,
        duration: 0.5,
        y: 100,
        scale: 0.8,
        ease: "power2.inOut",
        delay: 0.15,
        stagger: {
          each: 0.1,
          from: "start",
          grid: "auto",
          axis: "y",
          ease: "linear",
        },
      });
    },
  },
};
</script>

<style lang="pcss" scoped>
@import "~/styles/index.pcss";

.site-shop__products-list {
  @add-mixin reset-list;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

/* Small devices (landscape phones, 576px and up) */
@media screen and (min-width: 576px) {
  .site-shop__products-list {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }
}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 992px) {
  .site-shop__products-list {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>