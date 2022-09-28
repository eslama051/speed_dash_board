<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form">
      <h3 class="form_title">تعديل</h3>
      <v-container>
        <v-row>
          <v-text-field class="input col-md-4" label="الاسم(عربي)" />
          <v-text-field class="input col-md-4" label="الاسم(انجليزي)" />
          <v-select class="input col-md-4" :items="items" label="الصلاحيات" />
        </v-row>
      </v-container>
      <base-button class="crud_form_btn">حفظ</base-button>
    </v-form>
  </section>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "الصلاحيات",
          disabled: false,
          href: "/permissions",
        },
        {
          text: "اضافة صلاحيه",
          disabled: true,
          href: "/",
        },
      ],
      items: ["brrr", "hrrrr", "crrrr"],
    };
  },
  methods: {},
};
</script>
