<template>
  <p class="text-xs font-thin">
    <span class="font-semibold">
      {{ text }}
    </span>
    Reviews
  </p>
</template>

<script>
export default {
  name: "TextReviews",
  props: ['text']
}
</script>
