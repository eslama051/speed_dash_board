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
          v-if="imgSrc"
        />
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
      imgSrc: "",
      img: "",
      nameAr: "",
      nameEn: "",
      descAr: "",
      descEn: "",
      isLoading: false,
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "الاعلانات",
          disabled: false,
          href: "/advertisements",
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
    loadFile(event) {
      this.img = event.target.files[0];
      this.imgSrc = URL.createObjectURL(event.target.files[0]);
    },

    submitForm() {
      this.isLoading = true;
      if (!this.img) {
        this.$iziToast.error({
          message: "ادخل الصوره ",
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
          message: "ادخل المحتري يالعربي",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.descEn) {
        this.$iziToast.error({
          message: "ادخل المحتري بالانجليزي",
        });
        this.isLoading = false;
        return false;
      }
      const formData = new FormData();
      formData.append("ar[name]", this.nameAr);
      formData.append("en[name]", this.nameEn);
      formData.append("ar[desc]", this.descAr);
      formData.append("en[desc]", this.descEn);
      formData.append("image", this.img);

      server
        .post(`/dashboard/ad`, formData, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.isLoading = false;
          this.imgSrc = "";
          this.img = "";
          this.nameAr = "";
          this.nameEn = "";
          this.descAr = "";
          this.descEn = "";
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
  mounted() {},
};
</script>
