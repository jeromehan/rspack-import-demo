import Vue from "vue";
import Router from "vue-router";
import routerData from "./index";
import PageNotFound from "../components/404.vue";

Vue.use(Router);

const router = new Router({
  routes: routerData.routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
