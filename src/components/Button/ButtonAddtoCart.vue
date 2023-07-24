<template>
  <button class="w-full rounded-lg py-2"
    :class="input == 0 ? `bg-gray-100 text-black cursor-not-allowed` : `bg-primary-color text-white cursor-pointer`"
    :disabled="input == 0">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonAddtoCart",
  props: ['input', 'text']
}
</script>
