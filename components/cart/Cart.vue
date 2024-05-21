<template>
  <div class="site-header__cart site-header__section" ref="cartEl">
    <ul class="cart__items-list">
      <li
        v-for="(item, i) in cartItems"
        :key="item.id"
        class="cart__item animate-cart-item"
        :style="{
          '--delay': `${i * 0.025}s`,
          '--negative-delay': `${(2 - i) * 0.025}s`,
        }"
      >
        <span class="item__thumbnail">
          <img :src="`/images/chairs/${item.slug}.png`" />
        </span>

        <span class="item__details">
          <span class="details__name">{{ item.name }}</span>
          <span class="detail__price">${{ item.price }}</span>
        </span>

        <QualityControl
          class="details__quantity-control"
          :quantity="item.quantity"
          :onDecrement="decrement"
          :onIncrement="increment"
          :index="i"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

import ActionButton from "../shared/ActionButton.vue";
import QualityControl from "../shared/QualityControl.vue";

import useStore from "~/store";

export default {
  components: {
    ActionButton,
    QualityControl,
  },
  expose: ["cartEl"],
  setup() {
    const cartEl = ref(null);
    const store = useStore();

    return { cartEl, store };
  },
  computed: {
    cartItems() {
      return this.store.cart;
    },
  },
  methods: {
    decrement(index) {
      this.store.decrementQuantityInCart(index);
    },
    increment(index) {
      this.store.incrementQuantityInCart(index);
    },
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
  overflow: scroll;
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

.site-header.open .animate-cart-item {
  opacity: 1;
  transform: translateY(0px);
  pointer-events: all;
}

.animate-cart-item {
  opacity: 0;
  transition: opacity var(--md-speed), transform var(--md-speed);
  transform: translateY(-1.25rem);
  pointer-events: none;
}

.site-header.open[data-expanding="true"] .site-header__cart {
  --transition-from: 1.25rem;
}

.site-header.open[data-expanding="false"] .site-header__cart {
  --transition-from: -1.25rem;
}

.site-header.open[data-expanding="true"] .site-header__cart .animate-cart-item {
  transition-delay: var(--negative-delay);
}

.site-header.open[data-expanding="false"]
  .site-header__cart
  .animate-cart-item {
  transition-delay: var(--delay);
}

.site-header.open:not([data-active="cart"]) .animate-cart-item {
  opacity: 0;
  transform: translateY(var(--transition-from));
}

.site-header.open[data-active="cart"] .animate-cart-item {
  opacity: 1;
  transform: translate(0);
}
</style>