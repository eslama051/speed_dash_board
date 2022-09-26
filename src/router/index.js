import Vue from "vue";
import VueRouter from "vue-router";

//start ::app views
import AppWrapper from "../views/app/AppWrapper.vue";
import StatisticsView from "../views/app/StatisticsView.vue";
import HomeFilters from "../views/app/HomeFilters.vue";
import AddHomeFilter from "../views/app/AddHomeFilter.vue";
//end ::app views

// login
import LogIn from "../views/auth/LogIn.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: AppWrapper,
    children: [
      { path: "", component: StatisticsView },
      { path: "homeFilters", component: HomeFilters },
      { path: "homeFilters/add", component: AddHomeFilter },
    ],
  },
  { path: "/login", component: LogIn },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
