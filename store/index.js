import { defineStore } from "pinia";

import { AvailableChairs } from "~/data/available-chairs";

const useStore = defineStore("site-store", {
  state: () => ({
    chairs: AvailableChairs.map((chair) => {
      return { ...chair, inCart: false, quantity: 0 };
    }),
    cart: [],
  }),
  actions: {
    addToCart(chair) {
      this.cart.push(chair);
      chair.inCart = true;
      chair.quantity = 1;
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((chair) => Number(chair.id) !== Number(id));
      chair.inCart = false;
      chair.quantity = 0;
    },
    incrementQuantityInCart(index) {
      this.$state.cart[index].quantity++;
    },
    decrementQuantityInCart(index) {
      const chair = this.$state.cart[index];

      if (chair.quantity !== 0) {
        chair.quantity--;
      }
    },
  },
});

export default useStore;
