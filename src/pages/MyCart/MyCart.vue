<template>
  <div>
    <header-component class="fixed top-0 z-10" />
    <div class="p-5 pt-28 pb-28">
      <h1>
        <text-extra-large-semibold text="My Cart" />
      </h1>
      <div v-if="userCartList && userCartList.length > 0">
        <div class="flex justify-between w-full px-3 lg:px-10">
          <div class="w-6/12 flex items-center space-x-5">
            <input type="checkbox" v-model="selectAll" id="select_all">
            <label for="select_all">
              <text-large-semibold text="Pilih Semua" />
            </label>
          </div>
          <div v-if="selectItems.length > 0" class="w-6/12 flex justify-end">
            <text-large-semibold @click="prepareForDelete()"
              class="text-primary-color cursor-pointer" text="Remove" />
          </div>

        </div>
        <div v-for="(items, index) in userCartList" :key="index"
          class="pt-5 flex space-y-3">
          <div
            class="w-full px-3 lg:px-10 py-3 border rounded-lg flex space-x-5 justify-between relative">
            <input @click="setGrandTotal()" type="checkbox" v-model="selectItems"
              :value="items.id" :id="items.id">
            <img
              class="m-auto w-[70px] lg:w-[100px] h-[70px] lg:h-[100px] object-contain"
              :src="require('@/assets/img/' + items.img)" :alt="items.name">
            <div
              class="w-8/12 lg:w-10/12 justify-between flex flex-col lg:flex-row">
              <div class="w-full lg:w-6/12 flex flex-col space-y-1 items-start">
                <text-large-semibold :text="items.name" />
                <star-component :stars="items.star" />
                <text-reviews :text="items.review" />
                <text-stock :text="items.stock" />
                <div class="flex space-y-1"
                  :class="items.discount ? `flex-col` : `flex-col-reverse`">
                  <p
                    :class="items.discount ? `font-thin text-xs line-through text-primary-color` : `text-lg font-semibold`">
                    Rp {{ $filters.rupiahFormat(items.price) }}
                  </p>
                  <text-large-semibold v-if="items.discount"
                    :text="`Rp ` + $filters.rupiahFormat(items.discPrice)" />
                </div>
              </div>
              <div class="w-full lg:w-3/12 flex flex-col justify-between">
                <input-counter color="#D7130A"
                  @click="setInputItems(items, index)"
                  :disableButtonMinus="this.buttonStatus[index].minus"
                  :disableButtonPlus="this.buttonStatus[index].plus"
                  @minusValue="items.value--; this.tempStock++"
                  @plusValue="items.value++; this.tempStock--"
                  v-model="items.value" title="Add Items" />
                <div class="w-full flex justify-between text-primary-color">
                  <text-large-semibold text="Total Price : " />
                  <text-large-semibold
                    :text="items.value != 0 ? items.discount ? `Rp ` + $filters.rupiahFormat(items.value * items.discPrice) : `Rp ` + $filters.rupiahFormat(items.value * items.price) : `Rp ` + $filters.rupiahFormat(0)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <empty-cart class="w-96 m-auto py-5" />
        <text-large-semibold text="Oops.. Your cart is empty.." />
      </div>
      <div
        class="w-full left-0 fixed bottom-0 bg-primary-color py-5 px-3 lg:px-10 border-t shadow-md">
        <div class="w-full flex justify-between text-white">
          <text-large-semibold text="Grand Total : " />
          <text-large-semibold
            :text="`Rp ` + $filters.rupiahFormat(setGrandTotal())" />
        </div>
      </div>
      <Modal v-if="this.modalAreyousure" title="Are You Sure?"
        @toggle-modal="toggleModalAreyousure">
        <div class="p-5">
          <remove-item-cart class="w-56 h-56 m-auto" />
          <text-extra-large-semibold class="py-5" text="Are you sure want to remove this item?" />
          <div class="flex space-x-5">
            <button-primary-outline @click="toggleModalAreyousure" text="No" />
            <button-primary @click="deleteItems" text="Sure" />
          </div>
        </div>
      </Modal>
      <Modal v-if="this.modalSuccessRemove" title="Successfully Remove Item"
        @toggle-modal="toggleModalSuccessDelete">
        <div class="p-5">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_uvPY2t.json"
            class="w-60 h-60 mx-auto" speed="2" autoplay>
          </lottie-player>
          <button-primary @click="toggleModalSuccessDelete" text="Done" />
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import Modal from '@/components/Modal/Modal.vue';
import HeaderComponent from '@/components/Header/Header.vue';
import TextExtraLargeSemibold from '@/components/Text/TextExtraLargeSemibold.vue';
import EmptyCart from '@/components/Lottie/EmptyCart.vue';
import TextLargeSemibold from '@/components/Text/TextLargeSemibold.vue';
import StarComponent from '@/components/Star/StarComponent.vue';
import TextReviews from '@/components/Text/TextReviews.vue';
import TextStock from '@/components/Text/TextStock.vue';
import InputCounter from '@/components/Input/InputCounter.vue';
import ButtonPrimary from '@/components/Button/ButtonPrimary.vue';
import ButtonPrimaryOutline from '@/components/Button/ButtonPrimaryOutline.vue';
import RemoveItemCart from '@/components/Lottie/RemoveItemCart.vue';
export default {
  components: { HeaderComponent, Modal, TextExtraLargeSemibold, EmptyCart, TextLargeSemibold, StarComponent, TextReviews, TextStock, InputCounter, ButtonPrimary, ButtonPrimaryOutline, RemoveItemCart },
  name: "MyCart",
  setup() {
    const store = useStore();
    const selectItems = ref([]);
    const userCartList = computed(() => store.state.userCart);
    const selectAll = computed({
      get() {
        return selectItems.value.length === userCartList.value.length
      },
      set(val) {
        selectItems.value = []
        if (val) {
          for (let i = 0; i < userCartList.value.length; i++) {
            selectItems.value.push(userCartList.value[i].id)
          }
        }
      }
    });
    const buttonStatus = ref([]);
    const modalAreyousure = ref(false);
    const modalSuccessRemove = ref(false);


    function setInputItems(items, index) {
      if (items.value == 1) {
        buttonStatus.value[index].minus = false;
        buttonStatus.value[index].plus = true;
      } else if (items.stock == 0) {
        buttonStatus.value[index].minus = true;
        buttonStatus.value[index].plus = false;
      } else if (items.value > 0) {
        buttonStatus.value[index].minus = true;
        buttonStatus.value[index].plus = true;
      }
    }

    function setData() {
      let theButton = []
      if (userCartList.value !== null) {

        for (let i = 0; i < userCartList.value.length; i++) {
          let data = {
            plus: userCartList.value[i].stock == 0 ? false : true,
            minus: userCartList.value[i].value < 2 ? false : true
          }
          theButton.push(data)
        }
        buttonStatus.value = theButton
      }
    }

    function setGrandTotal() {
      let tempGrandtotal = 0
      let grandTotal = 0
      if (selectItems.value !== null) {
        for (let y = 0; y < selectItems.value.length; y++) {
          for (let i = 0; i < userCartList.value.length; i++) {
            if (selectItems.value[y] == userCartList.value[i].id) {
              tempGrandtotal = userCartList.value[i].value != 0 ? userCartList.value[i].discount ? userCartList.value[i].value * userCartList.value[i].discPrice : userCartList.value[i].value * userCartList.value[i].price : 0
              grandTotal = grandTotal + tempGrandtotal
            }
          }
        }
        return grandTotal;
      } else {
        return 0;
      }
    }

    function deleteItems() {
      if (selectAll.value == 1) {
        store.dispatch('deleteAll')
      } else {
        const filteredUserCart = userCartList.value.filter(itemA => !selectItems.value.find(itemB => itemB === itemA.id));
        console.info(filteredUserCart)
        store.dispatch('setNewProductLists', filteredUserCart)
        store.dispatch('changeUserCart', filteredUserCart);
        selectItems.value = []
      }
      modalAreyousure.value = false
      modalSuccessRemove.value = true
    }

    function prepareForDelete() {
      modalAreyousure.value = true
    }

    function toggleModalAreyousure() {
      modalAreyousure.value = false
      selectItems.value = []
    }

    function toggleModalSuccessDelete() {
      modalSuccessRemove.value = false
    }

    const onComponentMounted = () => {
      if (userCartList.value !== null) {
        store.dispatch('checkUserCart');
        setData();
      }
    };
    setData();

    onMounted(onComponentMounted);

    return {
      userCartList,
      selectItems,
      selectAll,
      buttonStatus,
      modalAreyousure,
      modalSuccessRemove,
      setInputItems,
      setGrandTotal,
      deleteItems,
      prepareForDelete,
      toggleModalAreyousure,
      toggleModalSuccessDelete
    }

  }

}
</script>
