<template>
  <div class="w-full pt-4">
    <text-small class="text-center" :text="title" />
    <text-extra-small class="text-center text-gray-400" :text="label" />
    <div class="flex space-x-2 mt-2">
      <button
        :style="
          disableButtonMinus === false
            ? 'background-color: #9ca3af'
            : `background-color: ${color};`
        "
        :disabled="disableButtonMinus === false"
        class="text-white rounded-md px-2 py-1 text-sm"
        @click="minusUpdate"
      >
        <icon-minus class="w-2" />
      </button>
      <input
        class="border-b border-gray-500 w-full text-center text-black bg-transparent"
        disabled
        :value="modelValue"
      />
      <button
        :style="
          disableButtonPlus === false
            ? 'background-color: #9ca3af'
            : `background-color: ${color};`
        "
        :disabled="disableButtonPlus === false"
        class="text-white rounded-md px-2 py-1 text-sm"
        @click="plusUpdate"
      >
        <icon-plus class="w-2" />
      </button>
    </div>
  </div>
</template>

<script>
import IconMinus from "../Icons/IconMinus.vue";
import IconPlus from "../Icons/IconPlus.vue";
import TextSmall from "../Text/TextSmall.vue";
import TextExtraSmall from "../Text/TextExtraSmall.vue";
export default {
  components: {
    IconMinus,
    IconPlus,
    TextSmall,
    TextExtraSmall
  },
  name: "InputCounter",
  props: {
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String
    },
    color: String,
    modelValue: Number,
    disableButtonMinus: Boolean,
    disableButtonPlus: Boolean,
  },
  methods: {
    minusUpdate(event) {
      this.$emit("minusValue", event.target.value);
    },
    plusUpdate(event) {
      this.$emit("plusValue", event.target.value);
    },
  },
};
</script>
