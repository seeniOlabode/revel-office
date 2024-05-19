<template>
  <ul class="site-shop__products-list">
    <ChairCard v-for="i in 20" :key="i" />
  </ul>
</template>

<script>
import ChairCard from "./ChairCard.vue";

export default {
  components: {
    ChairCard,
  },
  data() {
    return {
      chairs: [],
    };
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