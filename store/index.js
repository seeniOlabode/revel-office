import { defineStore } from "pinia";

import { AvailableChairs } from "~/data/available-chairs";

const useStore = defineStore("site-store", {
  state: () => ({
    chairs: AvailableChairs.map((chair) => {
      return { ...chair, inCart: false };
    }),
    cart: [],
  }),
});

export default useStore;
