<template>
  <p class="text-xs font-thin">
    Stock :
    <span class="font-semibold">
      {{ text }}
    </span>
  </p>
</template>

<script>
export default {
  name: "TextStock",
  props: ['text']
}
</script>
