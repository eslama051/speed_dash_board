<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">إضافه جديد</h3>

      <v-container>
        <v-row>
          <v-text-field
            class="input col-md-6"
            label="العنوان(عربي)"
            v-model="nameAr"
          />
          <v-text-field
            class="input col-md-6"
            label="العنوان(انجليزي)"
            v-model="nameEn"
          />
          <v-textarea
            class="input col-md-6"
            label="المجتوي(عربي)"
            v-model="descAr"
          />
          <v-textarea
            class="input col-md-6"
            label="المحتوي(انجليزي)"
            v-model="descEn"
          />
          <v-text-field
            type="number"
            class="input col-md-6"
            label="عدد الاعلانات"
            v-model="numOfProducts"
          />
          <v-text-field
            type="number"
            class="input col-md-6"
            label="السعر"
            v-model="price"
          />
          <v-text-field
            type="number"
            class="input col-12"
            label="المده"
            v-model="duration"
          />
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
      nameAr: "",
      nameEn: "",
      descAr: "",
      descEn: "",
      price: "",
      numOfProducts: "",
      duration: "",
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
  methods: {
    submitForm() {
      this.isLoading = true;
      if (!this.nameAr) {
        this.$iziToast.error({
          message: "ادخل العنوان بالعربيه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.nameEn) {
        this.$iziToast.error({
          message: "ادخل العنوان بالانجليزيه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.descAr) {
        this.$iziToast.error({
          message: "ادخل المحتوي بالعربيه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.descEn) {
        this.$iziToast.error({
          message: "ادخل المحتوي بالانجليزيه",
        });
        this.isLoading = false;
        return false;
      }
      const formData = new FormData();
      formData.append("ar[name]", this.nameAr);
      formData.append("en[name]", this.nameEn);
      formData.append("ar[desc]", this.descAr);
      formData.append("en[desc]", this.descEn);
      formData.append("package_price", this.price);
      formData.append("number_of_products", this.numOfProducts);
      formData.append("duration", this.duration);
      server
        .post("/dashboard/package", formData, {
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
          this.descAr = "";
          this.descEn = "";
          this.price = "";
          this.numOfProducts = "";
          this.duration = "";
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
