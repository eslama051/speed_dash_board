<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list-item>
        <v-img src="./assets/media/logo/logo.svg"></v-img>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
  mounted() {
    document.body.dir = "rtl";
  },
};
</script>
