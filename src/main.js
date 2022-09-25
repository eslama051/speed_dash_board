import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

//start :: import main.scss
import "./assets/scss/main.scss";
//end :: import main.scss

//start :: base button
import BaseButton from "./components/ui/BaseButton.vue";
Vue.component("base-button", BaseButton);
//end :: base

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
