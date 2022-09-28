<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form">
      <h3 class="form_title">إضافه جديد</h3>

      <v-container>
        <v-row>
          <v-text-field class="input col-md-6" label="العنوان(عربي)" />
          <v-text-field class="input col-md-6" label="العنوان(انجليزي)" />
          <v-textarea class="input col-md-6" label="المجتوي(عربي)" />
          <v-textarea class="input col-md-6" label="المحتوي(انجليزي)" />
          <v-text-field
            type="number"
            class="input col-md-6"
            label="عدد الاعلانات"
          />
          <v-text-field type="number" class="input col-md-6" label="السعر" />
          <v-text-field type="number" class="input col-12" label="المده" />
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
          text: "الباقات",
          disabled: false,
          href: "/packages",
        },
        {
          text: "اضافة اعلان",
          disabled: true,
          href: "/",
        },
      ],
    };
  },
  methods: {},
};
</script>
