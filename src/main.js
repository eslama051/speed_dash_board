import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

//start :: import main.scss
import "./assets/scss/main.scss";
//end :: import main.scss

// START:: IMPORTING FONT AWESOME
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
// END:: IMPORTING FONT AWESOME

//start :: base button
import BaseButton from "./components/ui/BaseButton.vue";
Vue.component("base-button", BaseButton);
//end :: base

// START:: IMPORTING IZI TOAST
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
Vue.use(iziToast);
Vue.prototype.$iziToast = iziToast;
// END:: IMPORTING IZI TOAST

//start :: button spinner importing
import ButtonSpinner from "vue-button-spinner";
Vue.component("button-spinner", ButtonSpinner);
//end :: button spinner

// start :: Particles
// import Particles from "particles.vue";
// Vue.use(Particles);
// end :: Particles

//start :: base del model
import DeleteModel from "./components/ui/models/DeleteModel.vue";
Vue.component("delete-model", DeleteModel);
//end :: base del model
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
