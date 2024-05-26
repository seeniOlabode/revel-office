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
        :active="chairData.inCart"
      >
        <svg
          width="19"
          height="20"
          viewBox="0 0 19 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.53125 16.5312C6.85917 16.5312 7.125 16.2654 7.125 15.9375C7.125 15.6096 6.85917 15.3438 6.53125 15.3438C6.20333 15.3438 5.9375 15.6096 5.9375 15.9375C5.9375 16.2654 6.20333 16.5312 6.53125 16.5312Z"
            stroke="var(--chair-icon-color)"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.8438 16.5312C15.1717 16.5312 15.4375 16.2654 15.4375 15.9375C15.4375 15.6096 15.1717 15.3438 14.8438 15.3438C14.5158 15.3438 14.25 15.6096 14.25 15.9375C14.25 16.2654 14.5158 16.5312 14.8438 16.5312Z"
            stroke="var(--chair-icon-color)"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.78125 3.46875H4.15625L5.9375 13.5625H15.4375"
            stroke="var(--chair-icon-color)"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.9375 11.1875H15.1941C15.2627 11.1875 15.3293 11.1638 15.3824 11.1203C15.4355 11.0768 15.4719 11.0162 15.4854 10.9489L16.5541 5.60514C16.5627 5.56205 16.5617 5.51758 16.551 5.47495C16.5404 5.43231 16.5204 5.39257 16.4926 5.3586C16.4647 5.32462 16.4296 5.29725 16.3899 5.27847C16.3502 5.25969 16.3068 5.24997 16.2628 5.25H4.75"
            stroke="var(--chair-icon-color)"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
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
      this.$bus.emit("toast", {
        title: `Item added to cart`,
        description: `<span class="chair-name">${this.chairData.name}</span> has been added to your cart. Check your cart to view all your selected products!`,
      });
      this.store.addToCart(this.chairData);
    },
    removeFromCart() {
      this.store.removeFromCart(this.chairData.id);
    },
    handleButtonClick() {},
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
  --chair-icon-color: var(--grey);
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

.site-chair-card__add.active {
  --chair-icon-color: var(--faded-grey);
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