<template>
  <button class="site-button" :class="variant" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "icon",
    },
    onClick: {
      type: Function,
      default: function () {
        console.log("Clicked");
      },
    },
  },
};
</script>

<style scoped lang="pcss">
@import "~/styles/index.pcss";

.site-button {
  @add-mixin reset-button;
  @add-mixin flex-centered;
  cursor: pointer;
}

.site-button.primary {
  background-color: var(--very-dark-grey);
  color: white;
  border-radius: var(--sm-radius);
  width: 100%;
  height: 2.5rem;
  min-height: 2.5rem;
  font-size: 0.875rem;
  display: block;
  cursor: pointer;
  text-align: left;
  padding-left: 0.625rem;
}

.site-button.primary.mini {
  height: 35px;
  min-height: 35px;
  font-size: 10px;
  width: auto;
  padding: 5px;
  border-radius: 6px;
}

.site-button.primary:hover {
  opacity: 0.95;
}

.site-button.icon {
  aspect-ratio: 1;
  border-radius: var(--sm-radius);
  height: 2.5rem;
}

.site-button.icon.mini {
  height: 35px;
  border-radius: 6px;
}

.site-button.icon.bg {
  background-color: var(--faded-grey);
}

:global(.site-button.icon.mini img) {
  width: 16px;
}

:global(.site-button.icon img) {
  width: 20px;
}

.site-button.icon:hover {
  background-color: var(--light-grey);
}
</style>