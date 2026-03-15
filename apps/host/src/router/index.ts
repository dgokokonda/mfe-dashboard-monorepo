import { createRouter, createWebHistory } from "vue-router";

// const Home = () => import("../views/Home.vue");
const Products = () => import("../views/Products.vue");
// const Cart = () => import("../views/Cart.vue");

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: Home,
    // },
    {
      path: "/",
      name: "products",
      component: Products,
    },
    // {
    //   path: "/cart",
    //   name: "cart",
    //   component: Cart,
    // },
  ],
});
