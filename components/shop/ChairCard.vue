<template>
  <div class="site-chair-card">
    <div class="site-chair-card__top">
      <img class="top__image" src="" />
    </div>
    <div class="site-chair-card__bottom">
      <div class="bottom__details">
        <h3 class="bottom__title">Herman Miller Aeron</h3>
        <span class="bottom__price">189 USD</span>
      </div>
      <action-button class="site-chair-card__add" variant="icon bg mini">
        <img src="~/assets/icons/cart.svg" />
      </action-button>
    </div>
  </div>
</template>

<script>
import ActionButton from "../shared/ActionButton.vue";

export default {
  components: {
    ActionButton,
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
  background-image: url(~/assets/chairs/herman-miller-aeron.png);
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
  .site-chair-card__bottom {
    padding: 10px 0 0 0;
  }
  .bottom__title {
    font-size: var(--base-font);
  }
}
</style>