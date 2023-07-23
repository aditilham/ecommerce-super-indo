<template>
  <header class="w-full flex">
    <div class="bg-primary-color  w-full flex-auto max-h-20 min-h-20 h-20 shadow-inner border-b">
      <div class="flex flex-row justify-between items-center px-5 md:px-10 py-3 h-full">
        <div class="flex lg:flex flex-row justify-between items-center w-full px-1 lg:px-5">
          <div class="lg:w-full md:w-full relative">
            <img class="w-14 h-14" src="../../assets/img/logo-superindo.webp" alt="">
          </div>
          <div class="lg:w-full md:w-full relative flex justify-end">
            <div class="cursor-pointer" @click="goToCart()">
              <icon-fill-cart v-if="isCartNotEmpty" class="w-8 h-8" />
              <icon-empty-cart v-else class="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import UserCart from '../../plugins/userCart.js'
import IconEmptyCart from '../Icons/IconEmptyCart.vue';
import IconFillCart from '../Icons/IconFillCart.vue';

export default {
  name: 'HeaderComponent',
  components: {
    IconEmptyCart,
    IconFillCart
  },
  setup() {
    const router = useRouter();

    const isCartNotEmpty = ref(false);
    const myCartData = ref(null);

    onMounted(() => {
      myCartData.value = UserCart(() => {});
      if (myCartData.value == null) {
        isCartNotEmpty.value = false;
      } else {
        isCartNotEmpty.value = true;
      }
    })

    function goToCart() {
      router.push({ name: "MyCart" });
    }

    return {
      isCartNotEmpty,
      myCartData,
      goToCart
    }
  }
}
</script>

<style>

</style>
