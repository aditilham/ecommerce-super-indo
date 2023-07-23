<template>
  <div class="w-full border rounded-lg flex flex-col space-y-2" :class="list.stock == 0 ? `cursor-not-allowed bg-gray-100 opacity-50` : `cursor-pointer bg-white group transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-md`">
    <img class="m-auto" :src="require('@/assets/img/' + list.img)" width="100" height="100" alt="">
    <div class="flex flex-col space-y-1 items-start px-5 pb-5">
      <text-large-semibold :text="list.name" />
      <div class="flex space-x-1">
        <icon-yellow-star v-for="star in list.star" :key="star" />
        <icon-gray-star v-for="n in 5-list.star" :key="n"/>
      </div>
      <p class="text-xs font-thin">
        Stock :
        <span class="font-semibold">
          {{ list.stock }}
        </span>
      </p>
      <div class="flex space-y-1" :class="list.discount ? `flex-col` : `flex-col-reverse`">
        <p :class="list.discount ? `font-thin text-xs line-through text-primary-color` : `text-lg font-semibold`">
          Rp {{ $filters.rupiahFormat(list.price) }}
        </p>
        <text-large-semibold v-if="list.discount" :text="`Rp ` + $filters.rupiahFormat(list.discPrice)" />
        <p v-else>
          <br>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import IconGrayStar from '../Icons/IconGrayStar.vue'
import IconYellowStar from '../Icons/IconYellowStar.vue'
import TextLargeSemibold from '../Text/TextLargeSemibold.vue'
export default {
  components: { IconYellowStar, IconGrayStar, TextLargeSemibold },
  name: "CardProduct",
  props: ['list']
}
</script>
