<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">إضافه جديد</h3>

      <div class="img-edit">
        <img :src="imageSrc" id="account-detail-img-output" alt="" v-if="img" />
        <label for="file" class="img-input_label_text" v-else>Main Image</label>
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
          <v-text-field class="input col-md-6" label="الرابط" v-model="link" />
        </v-row>
      </v-container>

      <base-button class="crud_form_btn" :isLoading="isLoading"
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
          text: "الاسليدر الرئيسي",
          disabled: false,
          href: "/sliders",
        },
        {
          text: "اضافة سليدر",
          disabled: true,
          href: "/",
        },
      ],

      img: "",
      imageSrc: "",
      nameAr: "",
      nameEn: "",
      descAr: "",
      descEn: "",
      link: "",
      isLoading: false,
    };
  },
  methods: {
    loadFile(event) {
      this.img = event.target.files[0];
      this.imageSrc = URL.createObjectURL(event.target.files[0]);
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
      formData.append("image", this.img);
      formData.append("ar[desc]", this.descAr);
      formData.append("en[desc]", this.descEn);
      formData.append("link", this.link);
      server
        .post("/dashboard/slider", formData, {
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
          this.img = "";
          this.descAr = "";
          this.descEn = "";
          this.link = "";
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
