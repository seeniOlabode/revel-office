<template>
  <div>
    <label></label>
    <input
      class="text-input"
      type="text"
      :placeholder="placeholder"
      @focus="selectAll"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Your name",
    },
  },
  methods: {
    selectAll(e) {
      e.target.select();
    },
  },
};
</script>

<style scoped lang="pcss">
@import "~/styles/index.pcss";

.text-input {
  @add-mixin border;
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: var(--sm-radius);
  color: var(--very-dark-grey);
  font-size: var(--x-base-font);
}

.text-input:focus {
  outline: none;
  background-color: var(--stroke);
}

.text-input::selection {
  background-color: var(--faded-grey);
}

.text-input:focus::selection {
  background-color: rgba(76, 77, 81, 0.2);
}
</style>