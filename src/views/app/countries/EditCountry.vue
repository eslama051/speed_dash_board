<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form">
      <h3 class="form_title">إضافه جديد</h3>

      <v-text-field class="input" label="الاسم(عربي)" />
      <v-text-field class="input" label="الاسم(انجليزي)" />
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
          text: "الدول",
          disabled: false,
          href: "/countries",
        },
        {
          text: "تعديل الدوله",
          disabled: true,
          href: "/",
        },
      ],
    };
  },
  methods: {},
};
</script>
