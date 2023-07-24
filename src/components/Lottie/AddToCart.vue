<template>
  <div>
      <LottieAnimation :animationData="lottieFiles" :height="10" :width="10" />
  </div>
</template>

<script>
import { ref } from 'vue';
import AddToCart from '../../assets/json/add-to-cart.json';

export default {
  name: "AddToCartLottie",
  setup() {
    const lottieFiles = ref(AddToCart);

    return {
      lottieFiles
    }
  }

}
</script>

<style>

</style>
