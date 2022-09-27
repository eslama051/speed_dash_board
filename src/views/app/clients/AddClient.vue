<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form">
      <h3 class="form_title">إضافه جديد</h3>

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
          <v-text-field class="input col-md-6" label="الاسم" />
          <v-text-field class="input col-md-6" label="الهاتف" />
          <v-text-field
            type="email"
            class="input col-md-6"
            label="البريد الالكتروني"
          />
          <v-text-field
            class="input col-md-6"
            label="كلمة المرور"
            :type="!showPassword ? 'password' : 'text'"
            :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-checkbox label="حظر" class="col-md-6" v-model="blocked" />
          <v-checkbox label="مفعل" class="col-md-6" />
          <v-textarea class="input" label="سبب الحظر" :disabled="!blocked" />
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
          text: "المستخدمين",
          disabled: false,
          href: "/clients",
        },
        {
          text: "اضافة مستخدم",
          disabled: true,
          href: "/",
        },
      ],

      img: "",
      show: false,
      showPassword: false,
      blocked: false,
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
