<template>
  <div class="w-full border rounded-lg flex flex-col space-y-2"
    :class="list.stock == 0 ? `cursor-not-allowed bg-gray-100 opacity-50` : `cursor-pointer bg-white group transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-md`">
    <div class="relative py-2">
      <img
        class="m-auto w-[110px] lg:w-[100px] h-[110px] lg:h-[100px] object-contain"
        :src="require('@/assets/img/' + list.img)" alt="">
    </div>
    <div class="flex flex-col space-y-1 items-start px-1 lg:px-5 pb-2 lg:pb-5">
      <text-small-semibold class="block lg:hidden" :text="list.name" />
      <text-large-semibold class="hidden lg:block" :text="list.name" />
      <text-stock :text="list.stock" />
      <star-component :stars="list.star" />
      <div class="flex space-y-1"
        :class="list.discount ? `flex-col` : `flex-col-reverse`">
        <p
          :class="list.discount ? `font-thin text-xs line-through text-primary-color` : `text-lg font-semibold`">
          Rp {{ $filters.rupiahFormat(list.price) }}
        </p>
        <text-large-semibold v-if="list.discount"
          :text="`Rp ` + $filters.rupiahFormat(list.discPrice)" />
        <p v-else>
          <br>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import StarComponent from '../Star/StarComponent.vue'
import TextLargeSemibold from '../Text/TextLargeSemibold.vue'
import TextSmallSemibold from '../Text/TextSmallSemibold.vue'
import TextStock from '../Text/TextStock.vue'
export default {
  components: { TextLargeSemibold, TextSmallSemibold, StarComponent, TextStock },
  name: "CardProduct",
  props: ['list']
}
</script>
