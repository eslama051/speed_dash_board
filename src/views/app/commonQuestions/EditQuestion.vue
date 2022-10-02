<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">إضافه جديد</h3>
      <v-container>
        <v-row>
          <v-text-field
            class="input col-md-6"
            label="السؤال (عربي)"
            v-model="nameAr"
          />
          <v-text-field
            class="input col-md-6"
            label="السؤال (انجليزي)"
            v-model="nameEn"
          />
          <v-textarea
            class="input col-md-6"
            label="الاجابه (عربي)"
            v-model="descAr"
          />
          <v-textarea
            class="input col-md-6"
            label="الاجابه (انجليزي)"
            v-model="descEn"
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
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "الاسئله الشائعه",
          disabled: false,
          href: "/commonQuestions",
        },
        {
          text: "اضافه سؤال",
          disabled: true,
          href: "/",
        },
      ],
    };
  },
  props: ["id"],
  methods: {
    getFaqToEdit() {
      server
        .get(`/dashboard/faq/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.nameAr = res.data.data.ar.name;
          this.nameEn = res.data.data.en.name;
          this.descAr = res.data.data.ar.desc;
          this.descEn = res.data.data.en.desc;
        });
    },
    submitForm() {
      this.isLoading = true;
      if (!this.nameAr) {
        this.$iziToast.error({
          message: "ادخل السؤال بالعربيه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.nameEn) {
        this.$iziToast.error({
          message: "ادخل السوال بالانجليزيه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.descAr) {
        this.$iziToast.error({
          message: "ادخل الاجابه بالعربيه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.descAr) {
        this.$iziToast.error({
          message: "ادخل الاجابه الانحليزيه",
        });
        this.isLoading = false;
        return false;
      }
      const formData = new FormData();
      formData.append("ar[name]", this.nameAr);
      formData.append("en[name]", this.nameEn);
      formData.append("ar[desc]", this.descAr);
      formData.append("en[desc]", this.descEn);
      formData.append("_method", "PATCH");
      server
        .post(`/dashboard/faq/${this.id}`, formData, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.isLoading = false;
          this.$router.push("/commonQuestions");
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
    this.getFaqToEdit();
  },
};
</script>
