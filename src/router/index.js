import Vue from "vue";
import VueRouter from "vue-router";

//start ::app views
import AppWrapper from "../views/app/AppWrapper.vue";
//end ::app views

// login
import LogIn from "../views/auth/LogIn.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: AppWrapper },
  { path: "/login", component: LogIn },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
