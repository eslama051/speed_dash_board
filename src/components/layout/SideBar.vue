<template>
  <v-navigation-drawer
    v-model="isNavDrawer"
    @click="closeNav"
    right
    class="nav_drawer"
    style="height: 100vh"
    app
  >
    <button class="nav_drawer_close_btn" @click="closeNav">
      <i class="fa fa-xmark"></i>
    </button>
    <v-list-item class="mb-2 d-none d-lg-block">
      <v-img
        src="../../assets/media/logo/logo.svg"
        max-width="210px"
        class="mb-3 mx-auto"
      />
    </v-list-item>

    <v-divider class="d-none d-lg-block"></v-divider>

    <v-list>
      <v-list-item class="side_bar_route_link" link to="/">
        <v-list-item-icon>
          <v-icon>fa-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>الاحصائيات</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
        class="nav_drawer_group_list"
      >
        <template v-slot:activator>
          <v-list-item-content style="width: 100%">
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="child in item.items" :key="child.title">
          <ul class="group_list_dropdown_items">
            <li><router-link :to="child.showAll">عرض الكل</router-link></li>
            <li><router-link :to="child.addNew">إضافه جديد</router-link></li>
          </ul>
        </v-list-item>
      </v-list-group>

      <v-list-item class="side_bar_route_link" link to="/settings">
        <v-list-item-icon>
          <v-icon>fa-cog</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>الاعدادت العامه</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  data() {
    return {
      items: [
        {
          action: "",
          items: [{ showAll: "/mainFilters", addNew: "/mainFilters/add" }],
          title: "تصنيفات رئيسيه",
        },
        {
          action: "",
          items: [{ showAll: "/supFilters", addNew: "/supFilters/add" }],
          title: "تصنيفات فرعيه",
        },
        {
          action: "fa-hands-asl-interpreting",
          items: [{ showAll: "/sliders", addNew: "/sliders/add" }],
          title: "الاسليدر الرئيسي",
        },
        {
          action: "fa-users",
          items: [{ showAll: "/clients", addNew: "/clients/add" }],
          title: "المستخدمين",
        },
        {
          action: "fa-globe",
          items: [{ showAll: "/countries", addNew: "/countries/add" }],
          title: "الدول",
        },
        {
          action: "fa-city",
          items: [{ showAll: "/cities", addNew: "/cities/add" }],
          title: "المدن",
        },
        {
          action: "fa-allergies",
          items: [{ showAll: "/permissions", addNew: "/permissions/add" }],
          title: "الصلاحيات",
        },
        {
          action: "fa-ad",
          items: [{ showAll: "/ades", addNew: "/ades/add" }],
          title: "المنتجات",
        },
        {
          action: "fa-images",
          items: [
            { showAll: "/advertisements", addNew: "/advertisements/add" },
          ],
          title: "الاعلانات",
        },
        {
          action: "fa-database",
          items: [{ showAll: "/packages", addNew: "/packages/add" }],
          title: "الباقات",
        },
        {
          action: "fa-tags",
          items: [{ showAll: "/promoCode", addNew: "/promoCode/add" }],
          title: "برومو كود",
        },
        {
          action: "fa-chart-bar",
          items: [{ showAll: "/status", addNew: "/status/add" }],
          title: "الحالات",
        },
        {
          action: "fa-truck-moving",
          items: [{ showAll: "/shipping", addNew: "/shipping/add" }],
          title: "طرق الشحن",
        },
        {
          action: "fa-user-tie",
          items: [{ showAll: "/admins", addNew: "/admins/add" }],
          title: "مديرين اللوحه",
        },
        {
          action: "fa-atlas",
          items: [
            { showAll: "/commonQuestions", addNew: "/commonQuestions/add" },
          ],
          title: "الأسئله الشائعه",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isNavDrawer: "isNavDrawer",
    }),
  },

  watch: {
    // drawerOpen() {
    //   // this.$store.dispatch("toggleNavDrawer");
    // },
  },
  methods: {
    closeNav() {
      this.$store.dispatch("toggleNavDrawer");
    },
  },
};
</script>
