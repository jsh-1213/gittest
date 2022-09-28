// https://next.router.vuejs.org/zh/introduction.html
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    // component: () => import(/* webpackChunkName: "index" */ "@/App.vue"),
    component: () => import(/* webpackChunkName: "index" */ "@/views/Home.vue"),
    // redirect: "/index",
    // children: [
    //   {
    //     path: "/index",
    //     name: "Home",
    //     component: () =>
    //       import(/* webpackChunkName: "index" */ "@/views/Home.vue"),
    //   },
    // ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
