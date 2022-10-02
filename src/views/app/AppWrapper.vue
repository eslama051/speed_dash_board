<template>
  <section class="App_wrapper d-flex">
    <side-bar />
    <div class="px-4">
      <nav class="main_nav">
        <div class="nav_content d-flex">
          <div class="dashName">
            <span class="_title">لوحة تحكم </span
            ><span class="name">Speed4Ever</span
            ><span class="icon"><i class="fas fa-shopping-cart"></i></span>
          </div>
          <v-spacer></v-spacer>
          <div class="nav_actions">
            <div class="nav_action_btn" @click="signOut">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
            <div class="notification nav_action_btn">
              <div @click.stop="toggleNotificationDrawer">
                <i class="fa-regular fa-bell"></i>
                <span class="notificiotns_unread">{{
                  NotificationsData.unread_notifications || 0
                }}</span>
              </div>
              <transition name="slide-fade">
                <NotificationDrawer
                  v-if="isNotificationDrawer"
                  :NotificationsData="NotificationsData"
                />
              </transition>
            </div>
            <div
              class="d-block d-lg-none nav_action_btn"
              @click.stop="toggelNavDrawer"
            >
              <div>
                <i class="fa fa-bars"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
import SideBar from "../../components/layout/SideBar.vue";
import NotificationDrawer from "../../components/layout/NotificationDrawer.vue";
import server from "@/apis/server";

export default {
  data() {
    return {
      openNavigationDrawer: null,
      isNotificationDrawer: false,
      NotificationsData: {},
    };
  },

  components: { SideBar, NotificationDrawer },
  computed: {
    authorization() {
      return this.$store.getters["auth/token"];
    },
  },
  methods: {
    handleDrawerChange(isOpen) {
      this.openNavigationDrawer = isOpen;
    },

    signOut() {
      this.$store.dispatch("auth/removeUserData");
    },
    toggleNotificationDrawer() {
      this.isNotificationDrawer = !this.isNotificationDrawer;
    },
    toggelNavDrawer() {
      this.$store.dispatch("toggleNavDrawer");
    },
    getnotifications() {
      server
        .get(`/dashboard/notification?page=1`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.NotificationsData = res.data;
          console.log(res.data);
        });
    },
  },
  mounted() {
    document.body.addEventListener("click", () => {
      this.isNotificationDrawer = false;
    });
    this.getnotifications();
  },
};
</script>
