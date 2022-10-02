<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">تعديل</h3>
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
            label="التصنيف الرئيسي"
            v-model="selecetedId"
          ></v-select>
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
          text: "تعديل تصنيف",
          disabled: true,
          href: "/",
        },
      ],
      items: [],
      nameAr: "",
      nameEn: "",
      img: "",
      selecetedId: "",
    };
  },
  props: ["id"],
  methods: {
    getMianCategories() {
      server
        .get("/dashboard/category", {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.items = res.data.data;
        });
    },
    getItemDataToEdit() {
      server
        .get(`/dashboard/subCategory/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.selecetedId = res.data.data.category.id;
          this.nameAr = res.data.data.ar.name;
          this.nameEn = res.data.data.en.name;
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
      if (!this.selecetedId) {
        this.$iziToast.error({
          message: "لم اختيار تصنيف رئيسي",
        });
        this.isLoading = false;
        return false;
      }
      const formData = new FormData();
      formData.append("ar[name]", this.nameAr);
      formData.append("en[name]", this.nameEn);
      formData.append("category_id", this.selecetedId);
      formData.append("_method", "PATCH");

      server
        .post(`/dashboard/subCategory/${this.id}`, formData, {
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
          this.selecetedId = "";
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
    this.getMianCategories();
    this.getItemDataToEdit();
  },
};
</script>
