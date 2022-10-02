import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authModule,
  },
  state: { isNavDrawer: null },
  getters: {
    isNavDrawer(state) {
      return state.isNavDrawer;
    },
  },
  mutations: {
    toggleNavDrawer(state) {
      state.isNavDrawer = !state.isNavDrawer;
    },
  },
  actions: {
    toggleNavDrawer(context) {
      context.commit("toggleNavDrawer");
    },
  },
});
