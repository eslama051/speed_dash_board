<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">إضافه جديد</h3>
      <v-container>
        <v-row>
          <v-text-field
            class="input col-md-6"
            label="الاسم(عربي)"
            v-model="nameAr"
          />
          <v-text-field
            class="input col-md-6"
            label="الاسم(انجليزي)"
            v-model="nameEn"
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
      nameAr: "",
      nameEn: "",
      isLoading: false,
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "الحالات",
          disabled: false,
          href: "/status",
        },
        {
          text: "اضافة حاله",
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

      const formData = new FormData();
      formData.append("ar[name]", this.nameAr);
      formData.append("en[name]", this.nameEn);

      server
        .post(`/dashboard/productStatus`, formData, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.isLoading = false;
          this.$router.push("/status");
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
