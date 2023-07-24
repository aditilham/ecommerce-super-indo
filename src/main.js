import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import "bottom-sheet-vue3/css/style.css";


const app = createApp(App);
app.config.globalProperties.$filters = {
  rupiahFormat(value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  },
};
app.use(store);
app.use(router);
app.mount("#app");
