<template>
  <div class="flex space-x-1">
    <icon-yellow-star v-for="star in stars" :key="star" />
    <icon-gray-star v-for="n in 5 - stars" :key="n" />
  </div>
</template>

<script>
import IconGrayStar from '../Icons/IconGrayStar.vue'
import IconYellowStar from '../Icons/IconYellowStar.vue'
export default {
  name: "StarComponent",
  components: { IconYellowStar, IconGrayStar },
  props: ['stars']
}
</script>
