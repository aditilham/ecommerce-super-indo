import { createRouter, createWebHistory } from "vue-router";

import MainPage from '../pages/MainPage/MainPage.vue'


const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage
  },
  {
    path: "/my-cart",
    name: "MyCart",
    // component: MyCart
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: "/",
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        selector: window.scrollTo(0, 0),
        behavior: "smooth",
      };
    }
  },
});

export default router;
