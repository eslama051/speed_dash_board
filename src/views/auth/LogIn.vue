<template>
  <section class="login_view">
    <v-form class="login_form" @submit.prevent="submitForm">
      <div class="login_logo">
        <img src="../../assets/media/logo/logo.svg" alt="" />
      </div>
      <h2>تسجيل الدخول</h2>
      <h3>تسجيل دخول علي لوحة التحكم</h3>
      <v-text-field
        class="input"
        label="البريد الإلكتروني"
        type="text"
        v-model="email"
      />
      <v-text-field
        class="input"
        label="كلمة المرور"
        :type="!showPassword ? 'password' : 'text'"
        :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        v-model="password"
      />

      <base-button :isLoading="isLoading">تسجيل الدخول</base-button>
    </v-form>
    <div class="login_img d-none d-md-block">
      <img src="../../assets/media/login/login_img.jpg" alt="" />
    </div>
  </section>
</template>

<script>
import server from "../../apis/server.js";
export default {
  data() {
    return {
      showPassword: false,
      isLoading: false,
      email: "",
      password: "",
    };
  },

  methods: {
    submitForm() {
      this.isLoading = true;
      if (!this.email) {
        (this.isLoading = false),
          this.$iziToast.error({
            message: "يرجي ادخال البريد",
          });
        return;
      }
      if (!this.password) {
        (this.isLoading = false),
          this.$iziToast.error({
            message: "يرجي ادخال كلمه المرور",
          });
        return;
      }
      const formData = new FormData();
      formData.append("username", this.email);
      formData.append("password", this.password);
      server.post("/dashboard/login", formData).then((res) => {
        this.isLoading = false;
        this.$iziToast.success({
          message: "تم تسجيل الدخول بنجاح",
        });
        this.$store.dispatch("auth/getUserAuthData", res.data.data);
        console.log(res.data.data);
      });
      // this.$router.push("/");
    },
  },
};
</script>
<style scoped></style>
