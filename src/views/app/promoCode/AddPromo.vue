<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form">
      <h3 class="form_title">إضافه جديد</h3>

      <v-container>
        <v-row>
          <v-text-field class="input col-12" label="الكود" />
          <v-text-field
            class="input col-6"
            type="number"
            label="عدد مرات الاستخدام"
          />
          <v-text-field class="input col-6" type="number" label="نسبه الخصم" />
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                label="تاريخ البدء"
                readonly
                v-bind="attrs"
                v-on="on"
                class="input col-md-6"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
              @input="menu = false"
              no-title
            ></v-date-picker>
          </v-menu>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                label="تاريخ الانتهاء"
                readonly
                v-bind="attrs"
                v-on="on"
                class="input col-md-6"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              @input="menu2 = false"
              no-title
            ></v-date-picker>
          </v-menu>
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
          text: "البرومو كود",
          disabled: false,
          href: "/promoCode",
        },
        {
          text: "اضافة برومو كود",
          disabled: true,
          href: "/",
        },
      ],
      menu: false,
      menu2: false,
      startDate: "",
      endDate: "",
    };
  },
  methods: {},
};
</script>
