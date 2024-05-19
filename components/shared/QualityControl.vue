<template>
  <div class="quantity-control">
    <button class="quantity-control__button" @click="decrement">
      <img src="~/assets/icons/minus.svg" />
    </button>
    <span class="quantity-control__value">{{ quantity }}</span>
    <button class="quantity-control__button" @click="increment">
      <img src="~/assets/icons/add.svg" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    increment() {
      this.quantity = this.quantity + 1;
    },
    decrement() {
      this.quantity = this.quantity > 0 ? this.quantity - 1 : this.quantity;
    },
  },
};
</script>

<style lang="pcss">
@import "~/styles/index.pcss";

.quantity-control {
  @add-mixin border;
  border-radius: var(--sm-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 40px;
  color: var(--dark-grey);
  overflow: hidden;
  padding: 3px;
}

.quantity-control__button {
  @add-mixin reset-button;
  width: 40px;
  height: 100%;
  @add-mixin flex-centered;
  border-radius: 5px;
}

.quantity-control__button:hover {
  background-color: var(--light-grey);
}

.quantity-control__value {
  width: 30px;
  text-align: center;
}

.quantity-control__button img {
  width: 20px;
  height: 20px;
}
</style>