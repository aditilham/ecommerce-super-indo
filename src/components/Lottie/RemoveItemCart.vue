<template>
  <div>
      <LottieAnimation :animationData="lottieFiles" :height="50" :width="50" />
  </div>
</template>

<script>
import { ref } from 'vue';
import RemoveItemCart from '../../assets/json/remove-item-cart.json';

export default {
  name: "RemoveItemCartLottie",
  setup() {
    const lottieFiles = ref(RemoveItemCart);

    return {
      lottieFiles
    }
  }

}
</script>

<style>

</style>
