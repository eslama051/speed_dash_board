<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">إضافه جديد</h3>

      <v-container>
        <v-row>
          <v-text-field class="input col-12" label="الكود" v-model="code" />
          <v-text-field
            class="input col-6"
            type="number"
            label="عدد مرات الاستخدام"
            v-model="numberOfUse"
          />
          <v-text-field
            class="input col-6"
            type="number"
            label="نسبه الخصم"
            v-model="discountPercentage"
          />
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
      <base-button :isLoading="isLoading" class="crud_form_btn"
        >حفظ</base-button
      >
    </v-form>
  </section>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton.vue";
import server from "@/apis/server";
export default {
  components: { BaseButton },
  data() {
    return {
      isLoading: false,
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
      code: "",
      numberOfuse: "",
      discountPercentage: "",
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    submitForm() {
      this.isLoading = true;

      if (!this.code) {
        this.$iziToast.error({
          message: "ادخل الكود",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.numberOfUse) {
        this.$iziToast.error({
          message: "ادخل عدد مرات الاستخدام",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.discountPercentage) {
        this.$iziToast.error({
          message: "ادخل نسبه الخصم ",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.startDate) {
        this.$iziToast.error({
          message: "ادخل تاريخ البدء ",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.endDate) {
        this.$iziToast.error({
          message: "ادخل تاريخ الانتهاء ",
        });
        this.isLoading = false;
        return false;
      }
      const formData = new FormData();
      formData.append("code", this.code);
      formData.append("start_date", this.startDate);
      formData.append("expire_date", this.endDate);
      formData.append("number_of_use", this.numberOfUse);
      formData.append("discount_percentage", this.discountPercentage);

      server
        .post(`/dashboard/coupon`, formData, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.isLoading = false;
          this.$router.push("/promoCode");
        })
        .catch((res) => {
          console.log(res);
          this.isLoading = false;
          this.$iziToast.error({
            message: res.response.data.message || "حصل امر خاطئ",
          });
        });
    },
  },
};
</script>
