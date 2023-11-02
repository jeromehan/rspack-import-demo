import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import App from "./App.vue";
import router from "./router/router";

if (!window.IntersectionObserver) require("intersection-observer");

Vue.use(VueCompositionAPI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

function tryCatch(fn) {
  try {
    fn();
  } catch (err) {
    console.error(err);
  }
}
