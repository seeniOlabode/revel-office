<template>
  <footer class="site-footer"></footer>
</template>

<script>
export default {};
</script>

<style lang="pcss" scoped>
@import "~/styles/index.pcss";

.site-footer {
  @add-mixin container;
  height: 50vh;
  border-radius: 30px 30px 0 0;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  transform: translateY(100%);
}
</style>