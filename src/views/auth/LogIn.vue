<template>
  <section class="login_view">
    <v-form class="login_form">
      <div class="login_logo">
        <img src="../../assets/media/logo/logo.svg" alt="" />
      </div>
      <h2>تسجيل الدخول</h2>
      <h3>تسجيل دخول علي لوحة التحكم</h3>
      <v-text-field class="input" label="البريد الإلكتروني" type="text" />
      <v-text-field
        class="input"
        label="كلمة المرور"
        :type="!showPassword ? 'password' : 'text'"
        :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
      />

      <base-button>تسجيل الدخول</base-button>
    </v-form>
    <div class="login_img">
      <img src="../../assets/media/login/login_img.jpg" alt="" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
    };
  },
};
</script>
