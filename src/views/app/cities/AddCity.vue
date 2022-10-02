<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">إضافه جديد</h3>
      <v-container>
        <v-row>
          <v-text-field
            class="input col-md-4"
            label="الاسم(عربي)"
            v-model="nameAr"
          />
          <v-text-field
            class="input col-md-4"
            label="الاسم(انجليزي)"
            v-model="nameEn"
          />
          <v-select
            class="input col-md-4"
            :items="items"
            item-text="ar.name"
            item-value="id"
            label="الدوله"
            v-model="countryId"
          />
        </v-row>
      </v-container>
      <base-button class="crud_form_btn">حفظ</base-button>
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
      nameAr: "",
      nameEn: "",
      countryId: "",
      isLoading: false,
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "المدن",
          disabled: false,
          href: "/cities",
        },
        {
          text: "اضافة مدينه",
          disabled: true,
          href: "/",
        },
      ],
      items: ["brrr", "hrrrr", "crrrr"],
    };
  },
  methods: {
    getCountries() {
      server
        .get("/dashboard/country", {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.items = res.data.data;
        });
    },
    submitForm() {
      this.isLoading = true;
      if (!this.nameAr) {
        this.$iziToast.error({
          message: "ادخل الاسم بالعربيه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.nameEn) {
        this.$iziToast.error({
          message: "ادخل الاسم بالانجليزيه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.countryId) {
        this.$iziToast.error({
          message: "اختر الدوله",
        });
        this.isLoading = false;
        return false;
      }
      const formData = new FormData();
      formData.append("ar[name]", this.nameAr);
      formData.append("en[name]", this.nameEn);
      formData.append("country_id", this.countryId);
      server
        .post("/dashboard/city", formData, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.isLoading = false;
          this.nameAr = "";
          this.nameEn = "";
          this.countryId = "";
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
  mounted() {
    this.getCountries();
  },
};
</script>
