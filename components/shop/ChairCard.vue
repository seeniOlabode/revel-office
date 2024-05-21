<template>
  <div class="site-chair-card">
    <div
      class="site-chair-card__top"
      :style="{
        '--chair-image': `url('/images/chairs/${chairData.slug}.png')`,
      }"
    ></div>
    <div class="site-chair-card__bottom">
      <div class="bottom__details">
        <h3 class="bottom__title">{{ chairData.name }}</h3>
        <span class="bottom__price">{{ chairData.price }} USD</span>
      </div>
      <action-button
        :onClick="addToCart"
        class="site-chair-card__add"
        variant="icon bg mini"
      >
        <img src="~/assets/icons/cart.svg" />
      </action-button>
    </div>
  </div>
</template>

<script>
import ActionButton from "../shared/ActionButton.vue";

import useStore from "~/store";

export default {
  components: {
    ActionButton,
  },
  inject: ["getNotify"],
  props: {
    chairData: {
      type: Object,
      default: {
        name: "Herman Miller Aeron",
        price: 189,
        slug: "herman-miller-aeron",
      },
    },
  },
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  methods: {
    addToCart() {
      this.store.addToCart(this.chairData);
      this.notify("Item added to cart");
    },
    removeFromCart() {
      this.store.removeFromCart(this.chairData.id);
      this.notify("Item removed from cart");
    },
    notify(text) {
      this.getNotify()(text);
    },
  },
};
</script>

<style lang="pcss" scoped>
@import "~/styles/index.pcss";

.site-chair-card {
  @add-mixin container;
  aspect-ratio: 458/540;
  padding: var(--xs-spacing);
  position: relative;
  padding: 10px;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto;
  transform-origin: 50% 100%;
}

.site-chair-card__bottom {
  border-top: solid 1px var(--stroke);
  left: var(--xs-spacing);
  right: var(--xs-spacing);
  padding: 5px 0 0 0;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  gap: 5px;
}

.bottom__details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
}

.bottom__title {
  font-size: var(--sm-font);
  color: var(--text-grey);
  font-weight: 400;
  line-height: 1;
}

.bottom__price {
  font-size: var(--sm-font);
  color: #959595;
  line-height: 1;
}

.site-chair-card__top {
  height: 100%;
  width: 100%;
  background-image: var(--chair-image);
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: 40% center;
}

.top__image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  height: 0;
}

.site-chair-card__add {
  margin-top: auto;
}

@media screen and (min-width: 576px) {
  .bottom__title {
    font-size: var(--x-base-font);
  }
  .site-chair-card__bottom {
    padding: 10px 0 0 0;
  }
}

@media screen and (min-width: 992px) {
  .bottom__title {
    font-size: var(--base-font);
  }
}
</style>