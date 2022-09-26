<template>
  <v-navigation-drawer
    v-model="drawerOpen"
    @input="onInput"
    right
    class="nav_drawer"
    style="height: 100vh"
    app
  >
    <button class="nav_drawer_close_btn" @click="closeNavDrawer">
      <i class="fa fa-xmark"></i>
    </button>
    <v-list-item class="mb-2 d-none d-lg-block">
      <v-img src="../../assets/media/logo/logo.svg" />
    </v-list-item>

    <v-divider class="d-none d-lg-block"></v-divider>

    <v-list>
      <v-list-item link>
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
      <v-list-item link>
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
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawerOpen: this.open,
      items: [
        {
          action: "",
          items: [{ showAll: "/homeFilters", addNew: "/homeFilters/add" }],
          title: "تصنيفات رئيسيه",
        },
        {
          action: "",
          items: [{ showAll: "/", addNew: "/" }],
          title: "تصنيفات فرعيه",
        },
        {
          action: "fa-hands-asl-interpreting",
          items: [{ showAll: "/", addNew: "/" }],
          title: "الاسليدر الرئيسي",
        },
        {
          action: "fa-users",
          items: [{ showAll: "/", addNew: "/" }],
          title: "المستخدمين",
        },
        {
          action: "fa-globe",
          items: [{ showAll: "/", addNew: "/" }],
          title: "الدول",
        },
        {
          action: "fa-city",
          items: [{ showAll: "/", addNew: "/" }],
          title: "المدن",
        },
        {
          action: "fa-allergies",
          items: [{ showAll: "/", addNew: "/" }],
          title: "الصلاحيات",
        },
        {
          action: "fa-ad",
          items: [{ showAll: "/", addNew: "/" }],
          title: "المنتجات",
        },
        {
          action: "fa-images",
          items: [{ showAll: "/", addNew: "/" }],
          title: "الاعلانات",
        },
        {
          action: "fa-database",
          items: [{ showAll: "/", addNew: "/" }],
          title: "الباقات",
        },
        {
          action: "fa-tags",
          items: [{ showAll: "/", addNew: "/" }],
          title: "برومو كود",
        },
        {
          action: "fa-chart-bar",
          items: [{ showAll: "/", addNew: "/" }],
          title: "الحالات",
        },
        {
          action: "fa-truck-moving",
          items: [{ showAll: "/", addNew: "/" }],
          title: "طرق الشحن",
        },
        {
          action: "fa-user-tie",
          items: [{ showAll: "/", addNew: "/" }],
          title: "مديرين اللوحه",
        },
        {
          action: "fa-atlas",
          items: [{ showAll: "/", addNew: "/" }],
          title: "الأسئله الشائعه",
        },
      ],
    };
  },
  watch: {
    open(newVal) {
      this.drawerOpen = newVal;
    },
  },
  methods: {
    onInput(isOpen) {
      this.$emit("drawerOpened", isOpen);
    },
    closeNavDrawer() {
      this.drawerOpen = false;
    },
  },
};
</script>
