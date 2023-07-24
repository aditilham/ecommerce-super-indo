<template>
  <div class="absolute">
    <div class="opacity-80 bg-black fixed inset-0 z-50">
    </div>
    <div class="fixed inset-0 z-[90] flex justify-center items-center"
      @click="closeModal">
      <div class="flex flex-col max-w-5xl rounded-2xl shadow-lg bg-white"
        @click.stop>
        <div class="p-5">
          <div class="flex justify-between items-center text-gray-600">
            <h3 class="text-xl font-semibold">{{ title }}</h3>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalTemplate",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    function closeModal() {
      emit('toggle-modal');
    }

    return {
      closeModal
    }
  }
}
</script>

<style>
</style>
