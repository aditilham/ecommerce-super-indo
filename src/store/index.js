import { createStore } from "vuex";
import UserCart from "../plugins/userCart.js";

export default new createStore({
  state() {
    return {
      userCart: [],
      productList: null,
    };
  },
  getters: {
    getUserCart(state) {
      return state.userCart;
    },
    // getCounter(state) {
    //   return state.counter;
    // },
  },
  mutations: {
    setListProduct(state, payload) {
      state.productList = payload;
    },
    setUserCart(state, payload) {
      state.userCart = payload;
    },
    // increment(state, payload) {
    //   state.counter = state.counter + payload;
    // },
  },
  actions: {
    checkUserCart(context) {
      context.commit(
        "setUserCart",
        UserCart(() => {})
      );
    },
    setNewProduct(context, payload) {
      let tempData = context.state.productList;
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].id == payload.id) {
          tempData[i].stock = payload.stock;
        }
      }
      context.dispatch("addListProduct", tempData);
    },
    addListProduct(context, payload) {
      localStorage.setItem("esiProduct", window.btoa(JSON.stringify(payload)));
      context.commit("setListProduct", payload);
    },
    setNewUserCart(context, payload) {
      if (context.state.userCart == null || context.state.userCart.length < 1) {
        let newItem = [];
        newItem.push(payload);
        context.commit("setUserCart", newItem);
        localStorage.setItem("userCart", window.btoa(JSON.stringify(newItem)));
      } else {
        let tempData = context.state.userCart;
        let found = false;
        for (let i = 0; i < tempData.length; i++) {
          if (tempData[i].id === payload.id) {
            tempData[i].value += payload.value;
            found = true;
            break;
          }
        }

        if (!found) {
          tempData.push(payload);
        }
        context.commit('setUserCart', tempData);
        localStorage.setItem("userCart", window.btoa(JSON.stringify(tempData)));
      }
    },
  },
});
