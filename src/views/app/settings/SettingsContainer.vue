<template>
  <section class="settings_container">
    <v-card class="py-5 px-5">
      <div class="settings_nav">
        <router-link to="/settings"> من نحن </router-link>
        <router-link to="/settings/terms"> الشروط و الاحكام </router-link>
        <router-link to="/settings/privacyPolicy">سياسه الخصوصيه </router-link>
        <router-link to="/settings/contactUs">اتصل بنا </router-link>
      </div>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-card>
  </section>
</template>
