<template>
  <v-navigation-drawer
    v-model="drawerOpen"
    @input="onInput"
    right
    class="py-2"
    style="height: 100vh"
    app
  >
    <v-list-item class="mb-2">
      <v-img src="../../assets/media/logo/logo.svg" />
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
      items: [],
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
  },
};
</script>
