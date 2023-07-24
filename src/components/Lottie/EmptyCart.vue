<template>
  <div>
      <LottieAnimation :animationData="lottieFiles" :height="50" :width="50" />
  </div>
</template>

<script>
import { ref } from 'vue';
import EmptyCart from '../../assets/json/empty-cart.json';

export default {
  name: "EmptyCartLottie",
  setup() {
    const lottieFiles = ref(EmptyCart);

    return {
      lottieFiles
    }
  }

}
</script>

<style>

</style>
