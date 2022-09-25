import Vue from "vue";
import VueRouter from "vue-router";

// login
import LogIn from "../views/auth/LogIn.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: null },
  { path: "/login", component: LogIn },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
