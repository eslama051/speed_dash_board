import Vue from "vue";
import VueRouter from "vue-router";

//start ::app views
import AppWrapper from "../views/app/AppWrapper.vue";
import StatisticsView from "../views/app/StatisticsView.vue";

//start :: main Filters
import MainFilters from "../views/app/mainFilters/MainFilters.vue";
import AddMainFilter from "../views/app/mainFilters/AddMainFilter.vue";
import EditMainFilter from "../views/app/mainFilters/EditMainFilter.vue";
//end :: main Filters

//start :: sub filters
import SubFilters from "../views/app/supFilters/SupFilters.vue";
import AddSubFilter from "../views/app/supFilters/AddSupFilter.vue";
import EditSubFilter from "../views/app/supFilters/EditSupFilter.vue";
//end :: sub filters

//start :: sub filters
import MainSliders from "../views/app/mainSliders/MainSliders.vue";
import AddMainSlider from "../views/app/mainSliders/AddMainSlider.vue";
import EditMainSlider from "../views/app/mainSliders/EditMainSlider.vue";
//end :: sub filters

//start :: clients
import ClientsTabel from "../views/app/clients/ClientsTabel.vue";
import ShowClient from "../views/app/clients/ShowClient.vue";
import AddClient from "../views/app/clients/AddClient.vue";
import EditClient from "../views/app/clients/EditClient.vue";
//end :: clients

//start :: clients
import CountriesTabel from "../views/app/countries/CountriesTabel.vue";
import AddCountry from "../views/app/countries/AddCountry.vue";
import EditCountry from "../views/app/countries/EditCountry.vue";
//end :: clients

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
      //main filters
      { path: "mainFilters", component: MainFilters },
      { path: "mainFilters/add", component: AddMainFilter },
      { path: "mainFilters/edit/:id", component: EditMainFilter },
      //sup filters
      { path: "supFilters", component: SubFilters },
      { path: "supFilters/add", component: AddSubFilter },
      { path: "supFilters/edit/:id", component: EditSubFilter },
      //main sliders
      { path: "sliders", component: MainSliders },
      { path: "sliders/add", component: AddMainSlider },
      { path: "sliders/edit/:id", component: EditMainSlider },
      // clients
      { path: "clients", component: ClientsTabel },
      { path: "clients/show/:id", component: ShowClient },
      { path: "clients/add", component: AddClient },
      { path: "clients/edit/:id", component: EditClient },
      // countries
      { path: "countries", component: CountriesTabel },
      { path: "countries/add", component: AddCountry },
      { path: "countries/edit/:id", component: EditCountry },
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
