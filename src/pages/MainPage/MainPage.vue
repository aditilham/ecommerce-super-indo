<template>
  <div>
    <header-component class="fixed top-0 z-10" />
    <div class="p-5 pt-28">
      <div class="flex justify-end px-5 space-x-2">
        <span>
          Sort By
        </span>
        <select @change="changeSort()" name="" id=""
          class="border border-gray-400 rounded-lg text-gray-500 px-4"
          v-model="selectSort">
          <option v-for="sortLst in sortList" :key="sortLst.id"
            :selected="selectSort == sortLst.id" :value="sortLst.id"> {{
              sortLst.name }}</option>
        </select>
      </div>
      <div
        class="hidden lg:grid lg:grid-cols-4 md:grid-cols-1 gap-x-5 gap-y-10 px-5 md:px-10 py-10">
        <div v-for="list in productsData" :key="list"
          class="w-full flex gap-2 p-2 md:p-4 relative rounded-lg h-auto">
          <card-product @click="list.stock != 0 ? chooseProduct(list) : ``" :list="list" />
        </div>
      </div>
      <div
        class="grid lg:hidden grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2 px-5 md:px-10 py-10">
        <div v-for="list in productsData" :key="list"
          class="w-full flex gap-2 p-2 md:p-4 relative rounded-lg h-auto">
          <card-product @click="list.stock != 0 ? chooseProductMobile(list): ``" :list="list" />
        </div>
      </div>
    </div>
    <Modal v-if="this.modal" :title="choosenProduct.name"
      @toggle-modal="toggleModal">
      <div class="flex p-5 space-x-3">
        <div class="w-5/12">
          <div class="relative py-2">
            <img class="m-auto w-[380px] h-[380px] object-contain"
              :src="require('@/assets/img/' + choosenProduct.img)" alt="">
          </div>
        </div>
        <div class="w-7/12 flex flex-col items-start justify-between">
          <div class="w-full flex flex-col items-start justify-start space-y-2">
            <div class="flex space-x-1">
              <icon-yellow-star v-for="star in choosenProduct.star" :key="star" />
              <icon-gray-star v-for="n in 5 - choosenProduct.star" :key="n" />
            </div>
            <p class="text-xs font-thin">
              <span class="font-semibold">
                {{ choosenProduct.review }}
              </span>
              Reviews
            </p>
            <p class="text-xs font-thin">
              Stock :
              <span class="font-semibold">
                {{ tempStock }}
              </span>
            </p>
            <input-counter color="#D7130A" @click="setInputItems()"
              :disableButtonMinus="this.buttonStatus.minus"
              :disableButtonPlus="this.buttonStatus.plus"
              @minusValue="this.inputItems--; this.tempStock++"
              @plusValue="this.inputItems++; this.tempStock--"
              v-model="inputItems" title="Add Items" label="Max. 20 Items" />
            <div class="flex space-y-1"
              :class="choosenProduct.discount ? `flex-col` : `flex-col-reverse`">
              <p
                :class="choosenProduct.discount ? `font-thin text-xs line-through text-primary-color text-left` : `text-lg font-semibold`">
                Rp {{ $filters.rupiahFormat(choosenProduct.price) }}
              </p>
              <text-large-semibold v-if="choosenProduct.discount"
                :text="`Rp ` + $filters.rupiahFormat(choosenProduct.discPrice)" />
            </div>
          </div>
          <div class="w-full flex flex-col space-y-2">
            <div class="w-full flex justify-between text-primary-color">
              <text-large-semibold text="Total Price : " />
              <text-large-semibold
                :text="inputItems != 0 ? chooseProduct.discount ? `Rp ` + $filters.rupiahFormat(inputItems * choosenProduct.discPrice) : `Rp ` + $filters.rupiahFormat(inputItems * choosenProduct.price) : `Rp ` + $filters.rupiahFormat(0)" />
            </div>
            <button-addto-cart @click="proccessAddToCart(choosenProduct, 'desktop')"
              :input="inputItems" text="Add To Cart" />
          </div>
        </div>
      </div>
    </Modal>
    <Modal v-if="this.modalAdded" title="Successfully Add to Cart"
      @toggle-modal="toggleModalAdded">
      <div class="flex p-5">
        Success
      </div>
    </Modal>
    <Sheet  height="90%" v-model:visible="modalMobile"
      :slideIcon="customIcon">
      <div class="h-full flex flex-col justify-between px-6 pb-6 space-y-3">
        <div class="w-full">
          <div class="relative py-2">
            <img class="m-auto w-[150px] h-[250px] lg:w-[380px] lg:h-[380px] object-contain"
              :src="require('@/assets/img/' + choosenProduct.img)" alt="">
          </div>
        </div>
        <div class="w-full flex flex-col items-start justify-between">
          <div class="w-full flex flex-col items-start justify-start space-y-2">
            <text-small-semibold class="block lg:hidden text-ellipsis" :text="choosenProduct.name" />
            <div class="flex space-x-1">
              <icon-yellow-star v-for="star in choosenProduct.star" :key="star" />
              <icon-gray-star v-for="n in 5 - choosenProduct.star" :key="n" />
            </div>
            <p class="text-xs font-thin">
              <span class="font-semibold">
                {{ choosenProduct.review }}
              </span>
              Reviews
            </p>
            <p class="text-xs font-thin">
              Stock :
              <span class="font-semibold">
                {{ tempStock }}
              </span>
            </p>
            <input-counter color="#D7130A" @click="setInputItems()"
              :disableButtonMinus="this.buttonStatus.minus"
              :disableButtonPlus="this.buttonStatus.plus"
              @minusValue="this.inputItems--; this.tempStock++"
              @plusValue="this.inputItems++; this.tempStock--"
              v-model="inputItems" title="Add Items" label="Max. 20 Items" />
            <div class="flex space-y-1"
              :class="choosenProduct.discount ? `flex-col` : `flex-col-reverse`">
              <p
                :class="choosenProduct.discount ? `font-thin text-xs line-through text-primary-color text-left` : `text-lg font-semibold`">
                Rp {{ $filters.rupiahFormat(choosenProduct.price) }}
              </p>
              <text-large-semibold v-if="choosenProduct.discount"
                :text="`Rp ` + $filters.rupiahFormat(choosenProduct.discPrice)" />
            </div>
          </div>
          <div class="w-full flex flex-col space-y-2">
            <div class="w-full flex justify-between text-primary-color">
              <text-large-semibold text="Total Price : " />
              <text-large-semibold
                :text="inputItems != 0 ? chooseProduct.discount ? `Rp ` + $filters.rupiahFormat(inputItems * choosenProduct.discPrice) : `Rp ` + $filters.rupiahFormat(inputItems * choosenProduct.price) : `Rp ` + $filters.rupiahFormat(0)" />
            </div>
            <button-addto-cart @click="proccessAddToCart(choosenProduct, 'mobile')"
              :input="inputItems" text="Add To Cart" />
          </div>
        </div>
      </div>
    </Sheet>
  </div>
</template>

<script>
import { h, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Sheet } from "bottom-sheet-vue3";
import IconSwipe from '@/components/Icons/IconSwipe.vue'
import productData from '@/plugins/productData.js';
import masterData from '@/assets/json/sampleData.json'
import HeaderComponent from '@/components/Header/Header.vue';
import CardProduct from '@/components/Card/CardProduct.vue';
import Modal from '@/components/Modal/Modal.vue';
import IconYellowStar from '@/components/Icons/IconYellowStar.vue';
import IconGrayStar from '@/components/Icons/IconGrayStar.vue';
import InputCounter from '@/components/Input/InputCounter.vue';
import ButtonAddtoCart from '@/components/Button/ButtonAddtoCart.vue';
import TextLargeSemibold from '@/components/Text/TextLargeSemibold.vue';
export default {
  components: { HeaderComponent, Sheet, CardProduct, Modal, IconYellowStar, IconGrayStar, InputCounter, ButtonAddtoCart, TextLargeSemibold },
  name: "MainPage",
  setup() {
    const store = useStore();
    const customIcon = ref(h(IconSwipe), { class: "w-4" });
    const productsData = ref(null);
    const selectSort = ref(1)
    const sortList = ref(null);
    const modal = ref(false);
    const modalMobile = ref(false);
    const modalAdded = ref(false);
    const choosenProduct = ref(null);
    const tempStock = ref(null);
    const buttonStatus = ref({
      minus: false,
      plus: true,
    });
    const inputItems = ref(0);

    onMounted(() => {
      productsData.value = productData(() => { }).sort((a, b) => a.price - b.price);
      store.dispatch('checkUserCart')
      store.dispatch('addListProduct', productsData.value)
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

    function toggleModal() {
      modal.value = false;
      choosenProduct.value = null;
      tempStock.value = null;
      inputItems.value = 0;
    }

    function toggleModalMobile() {
      modalMobile.value = false;
      setTimeout(() => {
        choosenProduct.value = null;
        tempStock.value = null;
        inputItems.value = 0;
      }, 1000);
    }

    function toggleModalAdded() {
      modalAdded.value = false;
      inputItems.value = 0;
    }

    function chooseProduct(val) {
      choosenProduct.value = val;
      tempStock.value = choosenProduct.value.stock;
      modal.value = true;
    }

    function chooseProductMobile(val) {
      choosenProduct.value = val;
      tempStock.value = choosenProduct.value.stock;
      modalMobile.value = true;
    }

    function setInputItems() {
      if (inputItems.value == 20) {
        buttonStatus.value.minus = true;
        buttonStatus.value.plus = false;
      } else if (inputItems.value == 0) {
        buttonStatus.value.minus = false;
        buttonStatus.value.plus = true;
      } else if (inputItems.value > 0) {
        buttonStatus.value.minus = true;
        buttonStatus.value.plus = true;
      }
    }

    function proccessAddToCart(val, gadget) {
      let data = {
        "id": val.id,
        "name": val.name,
        "review": val.review,
        "star": val.star,
        "stock": tempStock.value,
        "img": val.img,
        "price": val.price,
        "discPrice": val.discPrice,
        "discount": val.discount
      }
      let addingToCart = {
        "id": val.id,
        "name": val.name,
        "review": val.review,
        "star": val.star,
        "stock": tempStock.value,
        "img": val.img,
        "price": val.price,
        "discPrice": val.discPrice,
        "discount": val.discount,
        "value": inputItems.value,
        "totalPrice": val.discount ? val.discPrice * inputItems.value : val.price * inputItems.value
      }

      store.dispatch('setNewProduct', data)
      store.dispatch('setNewUserCart', addingToCart)
      if (gadget == 'desktop') {
        toggleModal();
      } else {
        toggleModalMobile();
      }
      modalAdded.value = true
    }

    return {
      customIcon,
      productsData,
      selectSort,
      sortList,
      modal,
      modalMobile,
      modalAdded,
      choosenProduct,
      chooseProductMobile,
      tempStock,
      buttonStatus,
      inputItems,
      changeSort,
      toggleModal,
      toggleModalMobile,
      toggleModalAdded,
      chooseProduct,
      setInputItems,
      proccessAddToCart
    }
  }
}
</script>
