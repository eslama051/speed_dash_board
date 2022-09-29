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

//start :: countries
import CountriesTabel from "../views/app/countries/CountriesTabel.vue";
import AddCountry from "../views/app/countries/AddCountry.vue";
import EditCountry from "../views/app/countries/EditCountry.vue";
//end :: countries

//start :: cities
import CitiesTabel from "../views/app/cities/CitiesTabel.vue";
import AddCity from "../views/app/cities/AddCity.vue";
import EditCity from "../views/app/cities/EditCity.vue";
//end :: cities

//start :: Permissions
import PermissionsTabel from "../views/app/permissions/PermissionsTabel.vue";
import AddPermission from "../views/app/permissions/AddPermission.vue";
import EditPermission from "../views/app/permissions/EditPermission.vue";
//end :: Permissions

//start :: Permissions
import AdesTabel from "../views/app/ades/AdesTabel.vue";
import AddAd from "../views/app/ades/AddAd.vue";
import EditAd from "../views/app/ades/EditAd.vue";
//end :: Permissions

//start :: Permissions
import AdvsTabel from "../views/app/advs/AdvsTabel.vue";
import AddAdv from "../views/app/advs/AddAdv.vue";
import EditAdv from "../views/app/advs/EditAdv.vue";
//end :: Permissions

//start :: packages
import PackagesTabel from "../views/app/packages/PackagesTabel.vue";
import AddPackage from "../views/app/packages/AddPackage.vue";
import EditPackage from "../views/app/packages/EditPackage.vue";
//end :: packages

//start :: promocode
import PromoCode from "../views/app/promoCode/PromoCode.vue";
import AddPromo from "../views/app/promoCode/AddPromo.vue";
import EditPromo from "../views/app/promoCode/EditPromo.vue";
//end :: promocode

//start :: status
import StatusTabel from "../views/app/status/StatusTabel.vue";
import AddStatus from "../views/app/status/AddStatus.vue";
import EditStatus from "../views/app/status/EditStatus.vue";
//end :: status

//start :: shipping
import ShippingTabel from "../views/app/shipping/ShippingTabel.vue";
import AddShipping from "../views/app/shipping/AddShipping.vue";
import EditShipping from "../views/app/shipping/EditShipping.vue";
//end :: shipping

//start :: admins
import AdminsTabel from "../views/app/admins/AdminsTabel.vue";
import ShowAdmin from "../views/app/admins/ShowAdmin.vue";
import AddAdmin from "../views/app/admins/AddAdmin.vue";
import EditAdmin from "../views/app/admins/EditAdmin.vue";
//end :: admins

//start :: commonQuestions
import CommonQuestions from "../views/app/commonQuestions/CommonQuestions.vue";
import AddQuestion from "../views/app/commonQuestions/AddQuestion.vue";
import EditQuestion from "../views/app/commonQuestions/EditQuestion.vue";
//end :: commonQuestions

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
      // cities
      { path: "cities", component: CitiesTabel },
      { path: "cities/add", component: AddCity },
      { path: "cities/edit/:id", component: EditCity },
      // permissions
      { path: "permissions", component: PermissionsTabel },
      { path: "permissions/add", component: AddPermission },
      { path: "permissions/edit/:id", component: EditPermission },
      // ades
      { path: "ades", component: AdesTabel },
      { path: "ades/add", component: AddAd },
      { path: "ades/edit/:id", component: EditAd },
      // advertisements
      { path: "advertisements", component: AdvsTabel },
      { path: "advertisements/add", component: AddAdv },
      { path: "advertisements/edit/:id", component: EditAdv },
      // packages
      { path: "packages", component: PackagesTabel },
      { path: "packages/add", component: AddPackage },
      { path: "packages/edit/:id", component: EditPackage },
      // promoCode
      { path: "promoCode", component: PromoCode },
      { path: "promoCode/add", component: AddPromo },
      { path: "promoCode/edit/:id", component: EditPromo },
      // status
      { path: "status", component: StatusTabel },
      { path: "status/add", component: AddStatus },
      { path: "status/edit/:id", component: EditStatus },
      // shipping
      { path: "shipping", component: ShippingTabel },
      { path: "shipping/add", component: AddShipping },
      { path: "shipping/edit/:id", component: EditShipping },
      // admins
      { path: "admins", component: AdminsTabel },
      { path: "admins/show/:id", component: ShowAdmin },
      { path: "admins/add", component: AddAdmin },
      { path: "admins/edit/:id", component: EditAdmin },
      // commonQuestions
      { path: "commonQuestions", component: CommonQuestions },
      { path: "commonQuestions/add", component: AddQuestion },
      { path: "commonQuestions/edit/:id", component: EditQuestion },
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
