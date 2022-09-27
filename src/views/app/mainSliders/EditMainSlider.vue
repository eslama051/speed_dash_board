<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form">
      <h3 class="form_title">تعديل</h3>

      <div class="img-edit">
        <img
          src=""
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
      <v-container>
        <v-row>
          <v-text-field class="input col-md-6" label="العنوان(عربي)" />
          <v-text-field class="input col-md-6" label="العنوان(انجليزي)" />
          <v-textarea class="input col-md-6" label="المجتوي(عربي)" />
          <v-textarea class="input col-md-6" label="المحتوي(انجليزي)" />
          <v-text-field class="input col-md-6" label="الرابط" />
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
          text: "الاسليدر الرئيسي",
          disabled: false,
          href: "/sliders",
        },
        {
          text: "تعديل سليدر",
          disabled: true,
          href: "/",
        },
      ],

      img: "",
      show: false,
    };
  },
  methods: {
    loadFile(event) {
      let image = document.getElementById("account-detail-img-output");
      this.img = event.target.files[0];
      this.show = true;
      image.src = URL.createObjectURL(event.target.files[0]);
      console.log(this.img);
    },
  },
};
</script>
