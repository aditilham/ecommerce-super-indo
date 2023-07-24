import { createStore } from "vuex";
import UserCart from "../plugins/userCart.js";
import masterData from "../assets/json/sampleData.json";

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
  },
  mutations: {
    setListProduct(state, payload) {
      state.productList = payload;
    },
    setUserCart(state, payload) {
      state.userCart = payload;
    },
    deleteUserCart(state) {
      state.userCart = [];
    },
    deleteProductList(state) {
      state.productList = null;
    },
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
        context.commit("setUserCart", tempData);
        localStorage.setItem("userCart", window.btoa(JSON.stringify(tempData)));
      }
    },
    changeUserCart(context, payload) {
      context.commit("setUserCart", payload);
      localStorage.setItem("userCart", window.btoa(JSON.stringify(payload)));
    },

    async deleteAll(context) {
      localStorage.removeItem("userCart");
      localStorage.removeItem("esiProduct");
      context.commit("deleteUserCart");
      context.commit("deleteProductList");
    },
    setNewProductLists(context, payload) {
      const newData = masterData.shoppingData.map(item => {
        const matchingItem = payload.find(bItem => bItem.id === item.id);
        return matchingItem ? {...item, ...matchingItem} : item;
      });
      localStorage.setItem("esiProduct", window.btoa(JSON.stringify(newData)));
      context.commit("setListProduct", newData);

    }
  },
});
