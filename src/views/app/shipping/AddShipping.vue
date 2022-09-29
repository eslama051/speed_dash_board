<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form">
      <h3 class="form_title">إضافه جديد</h3>
      <v-container>
        <v-row>
          <v-text-field class="input col-md-6" label="الاسم(عربي)" />
          <v-text-field class="input col-md-6" label="الاسم(انجليزي)" />
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
          text: "طرق الشحن",
          disabled: false,
          href: "/shipping",
        },
        {
          text: "اضافة طريقه شحن",
          disabled: true,
          href: "/",
        },
      ],
    };
  },
  methods: {},
};
</script>
