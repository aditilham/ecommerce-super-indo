<template>
  <button class="w-full rounded-lg py-2 bg-primary-color text-white cursor-pointer">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonPrimary",
  props: ['text']
}
</script>
