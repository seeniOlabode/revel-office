<template>
  <div class="site-header__cart site-header__section" ref="cartEl">
    <ul class="cart__items-list">
      <li
        v-for="i in 10"
        :key="i"
        class="cart__item animate-cart-item"
        :style="{ 'transition-delay': `${i * 0.015}s` }"
      >
        <span class="item__thumbnail">
          <img src="~/assets/chairs/herman-miller-aeron.png" />
        </span>

        <span class="item__details">
          <span class="details__name">Herman Miller Aeron</span>
          <span class="detail__price">$249</span>
        </span>

        <QualityControl class="details__quantity-control" />
      </li>
    </ul>
    <action-button
      :style="{ 'transition-delay': `${cartItems.length * 0.02}s` }"
      class="nav__button animate-cart-item"
      variant="primary"
    >
      Checkout
    </action-button>
  </div>
</template>

<script>
import { ref } from "vue";

import ActionButton from "../shared/ActionButton.vue";

export default {
  components: {
    ActionButton,
  },
  expose: ["cartEl"],
  setup() {
    const cartEl = ref(null);

    return { cartEl };
  },
  data() {
    return {
      cartItems: [],
    };
  },
};
</script>

<style lang="pcss" scoped>
@import "~/styles/index.pcss";

.cart__items-list {
  @add-mixin reset-list;
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-height: 300px;
  /* overflow: scroll; */
}

.cart__item {
  display: flex;
  align-items: center;
}

.cart__item:not(:last-child) {
  /* border-bottom: solid 1px var(--stroke); */
  padding-bottom: 5px;
}

.item__details {
  margin-left: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  justify-content: center;
  gap: 5px;
}

.details__name {
  font-size: 12px;
  color: var(--grey);
  font-weight: 500;
  line-height: 1;
}

.detail__price {
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  color: var(--very-dark-grey);
}

.item__thumbnail {
  border-radius: var(--sm-radius);
  width: 60px;
  height: 60px;
  overflow: hidden;
  padding: 15px;
  @add-mixin flex-centered;
  @add-mixin border;
  background-color: var(--stroke);
}

.cart__item img {
  object-fit: cover;
}

.details__quantity-control {
  margin-left: auto;
  margin-right: 10px;
}
</style>