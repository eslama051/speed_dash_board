<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form">
      <h3 class="form_title">إضافه جديد</h3>
      <v-container>
        <v-row>
          <v-text-field class="input col-md-4" label="الاسم(عربي)" />
          <v-text-field class="input col-md-4" label="الاسم(انجليزي)" />
          <v-select
            class="input col-md-4"
            :items="items"
            label="التصنيف الرئيسي"
          ></v-select>
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
          text: "تصنيفات فرعيه",
          disabled: false,
          href: "/supFilters",
        },
        {
          text: "اضافة تصنيف",
          disabled: true,
          href: "/",
        },
      ],

      items: ["Foo", "Bar", "Fizz", "Buzz"],

      img: "",
      show: false,
      selecetedItem: {
        name: "التصنيف الرئيسي",
        value: "0",
      },
    };
  },
  methods: {},
};
</script>
