<template>
  <li class="toast" @drag="(e) => handleDrag" @dragstart="handleDrag">
    <span class="toast__title">{{ toast.title }}</span>
    <span class="toast__description" v-html="toast.description"></span>
  </li>
</template>

<script>
import ActionButton from "../shared/ActionButton.vue";

export default {
  components: {
    ActionButton,
  },
  props: {
    toast: {
      type: Object,
      default: {
        title: "This is a Sonner toast",
        description: "This is some description",
      },
    },
  },
  data() {
    return {
      hovering: false,
      dragging: false,
    };
  },
  methods: {
    handleDrag(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped>
.toast .toast__description :deep(.chair-name) {
  /* color: var(--dark-fade); */
  display: inline;
}
</style>