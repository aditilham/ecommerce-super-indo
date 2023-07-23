<template>
  <div>
    <header-component class="fixed top-0 z-10" />
    <div class="p-5 pt-28">
      <div class="flex justify-end px-5 space-x-2">
        <span>
          Sort By
        </span>
        <select @change="changeSort()" name="" id="" class="border border-gray-400 rounded-lg text-gray-500 px-4" v-model="selectSort">
          <option v-for="sortLst in sortList" :key="sortLst.id" :selected="selectSort == sortLst.id" :value="sortLst.id"> {{ sortLst.name }}</option>
        </select>
      </div>
      <div class="grid lg:grid-cols-4 md:grid-cols-1 gap-x-5 gap-y-10 px-5 md:px-10 py-10">
        <div v-for="list in productsData" :key="list" class="w-full flex gap-2 p-2 md:p-4 relative rounded-lg h-auto">
          <card-product :list="list" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import productData from '../../plugins/productData.js';
import masterData from '../../assets/json/sampleData.json'
import HeaderComponent from '@/components/Header/Header.vue';
import CardProduct from '@/components/Card/CardProduct.vue';
export default {
  components: { HeaderComponent, CardProduct },
  name: "MainPage",
  setup() {
    const productsData = ref(null);
    const selectSort = ref(1)
    const sortList = ref(null);

    onMounted(() => {
      productsData.value = productData(() => {}).sort((a, b) => a.price - b.price);
      sortList.value = masterData.sortList;
    })

    function changeSort() {
      if (selectSort.value == 1) {
        productsData.value.sort((a, b) => a.price - b.price);
      } else if (selectSort.value == 2) {
        productsData.value.sort((a, b) => b.price - a.price);
      } else if (selectSort.value == 3) {
        productsData.value.sort((a, b) => a.name > b.name ? 1 : -1);
      } else if (selectSort.value == 4) {
        productsData.value.sort((a, b) => a.name < b.name ? 1 : -1);
      }

    }

    return {
      productsData,
      selectSort,
      sortList,
      changeSort
    }
  }
}
</script>
