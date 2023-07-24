<template>
  <button class="w-full rounded-lg py-2 text-primary-color border border-primary-color bg-white cursor-pointer">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonPrimaryOutline",
  props: ['text']
}
</script>
