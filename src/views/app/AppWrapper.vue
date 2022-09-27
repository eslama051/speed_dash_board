<template>
  <section class="App_wrapper d-flex">
    <side-bar
      :open="openNavigationDrawer"
      @drawer-opened="handleDrawerChange($event)"
    />
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
            <div class="nav_action_btn">
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </div>
            <div class="notifaction nav_action_btn">
              <div><i class="fa-regular fa-bell"></i></div>
            </div>
            <div
              class="d-block d-lg-none nav_action_btn"
              @click.stop="openNavigationDrawer = !openNavigationDrawer"
            >
              <i class="fa fa-bars"></i>
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
export default {
  data() {
    return {
      openNavigationDrawer: null,
    };
  },

  components: { SideBar },
  methods: {
    handleDrawerChange(isOpen) {
      this.openNavigationDrawer = isOpen;
    },
  },
};
</script>
