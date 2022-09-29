<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">إضافه جديد</h3>
      <div class="img-edit">
        <img
          :src="imgSrc"
          id="account-detail-img-output"
          alt=""
          :class="show ? 'show' : ''"
        />
        <label for="file" class="img-input_label_text">Main Image</label>
        <label for="file" class="img-input"><i class="fa fa-edit"></i></label>
        <input
          type="file"
          accept="image/gif, image/jpeg, image/png"
          name="image"
          id="file"
          @change="(e) => loadFile(e)"
          style="display: none"
        />
      </div>
      <v-text-field class="input" v-model="nameAr" label="الاسم(عربي)" />
      <v-text-field class="input" v-model="nameEn" label="الاسم(انجليزي)" />
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
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "تصنيفات رئيسيه",
          disabled: false,
          href: "/mainFilters",
        },
        {
          text: "اضافة تصنيف",
          disabled: true,
          href: "/",
        },
      ],

      img: "",
      imgSrc: "",
      nameAr: "",
      nameEn: "",
      show: false,
      isLoading: false,
    };
  },
  methods: {
    loadFile(event) {
      this.img = event.target.files[0];
      this.show = true;
      this.imgSrc = URL.createObjectURL(event.target.files[0]);
    },
    submitForm() {
      this.isLoading = true;
      if (!this.img) {
        this.$iziToast.error({
          message: "الحق الصوره اولا",
        });
        this.isLoading = false;
        return false;
      }
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
      formData.append("image", this.img);
      server
        .post("/dashboard/category", formData, {
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
          this.imgSrc = "";
          this.show = false;
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
