<template>
  <div class="site-shop">
    <div class="site-shop__intro">
      <div class="site-shop__top">
        <h1 class="top__title">Our Seating Outlet</h1>
        <p class="site-shop__bread-crumb">Home \ Store \ Chair</p>
      </div>
      <div class="site-shop__middle">
        <p class="middle__copy">
          Elevate your seating experience with our curated collection of premium
          chairs designed for ultimate comfort and style.
        </p>
      </div>
    </div>

    <!-- <div class="site-shop__search">
      <img src="~/assets/icons/search.svg" />
    </div> -->

    <!-- <hr class="site-shop__divider" /> -->

    <ProductsList />
  </div>
</template>

<script>
import ProductsList from "./ProductsList.vue";
import { gsap } from "gsap";

export default {
  components: {
    ProductsList,
  },
  mounted() {
    gsap.from(".site-shop__intro", {
      opacity: 0,
      duration: 0.6,
      y: 100,
      scale: 0.8,
      ease: "power2.inOut",
    });
  },
};
</script>

<style lang="pcss" scoped>
@import "~/styles/index.pcss";

.site-shop {
  width: 100%;
  margin-top: 68px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 100px;
}

.site-shop__intro {
  @add-mixin container;
  padding: var(--xs-spacing);
  transform-origin: 50% 100%;
}

.site-shop__search {
  @add-mixin container;
  padding: var(--xs-spacing);
  margin-top: 16px;
}

.site-shop__top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
}

.top__title {
  font-weight: 400;
  font-size: 25px;
  line-height: 1;
  margin-top: 5px;
}

.site-shop__bread-crumb {
  color: var(--grey);
  font-size: 10px;
  order: -1;
}

.middle__copy {
  color: var(--dark-fade);
  font-size: var(--sm-font);
  margin-top: 5px;
}

.site-shop__divider {
  margin: 20px 0;
  border-color: var(--stroke);
  border-style: solid;
  border-bottom: 0;
}

@media screen and (min-width: 576px) {
  .site-shop__intro {
    display: flex;
    justify-content: space-between;
    align-items: start;
    flex-direction: row;
    padding: var(--sm-spacing);
    gap: 16px;
  }

  .top__title {
    font-size: 35px;
  }

  .site-shop__bread-crumb {
    font-size: 12px;
  }

  .middle__copy {
    max-width: 250px;
    margin-top: 50px;
  }
}

/* Large devices (desktops, 992px and up) */
@media screen and (min-width: 992px) {
  .site-shop__intro {
    padding: var(--lg-spacing);
  }
  .site-shop__top {
    gap: 20px;
  }
  .top__title {
    font-size: 48px;
  }

  .middle__copy {
    font-size: 18px;
    max-width: 400px;
    margin-bottom: 20px;
  }

  .site-shop__bread-crumb {
    font-size: 14px;
  }
}
</style>