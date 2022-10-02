<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">إضافه جديد</h3>

      <div class="img-edit">
        <img
          :src="imageSrc"
          id="account-detail-img-output"
          alt=""
          v-if="imageSrc"
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
          <v-text-field class="input col-12" label="الاسم" v-model="name" />
          <v-text-field class="input col-12" label="الهاتف" v-model="phone" />
          <v-text-field
            type="email"
            class="input col-12"
            label="البريد الالكتروني"
            v-model="email"
          />
          <v-select
            class="input col-12"
            :items="roleItems"
            item-text="ar.name"
            item-value="id"
            label="الصلاحيات"
            v-model="role_id"
          />
          <v-text-field
            class="input col-12"
            label="كلمة المرور"
            :type="!showPassword ? 'password' : 'text'"
            :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
          />
          <v-checkbox label="حظر" class="col-md-6" v-model="is_ban" />
          <v-checkbox label="مفعل" class="col-md-6" v-model="is_active" />
          <v-textarea
            class="input"
            label="سبب الحظر"
            :disabled="!is_ban"
            v-model="banReason"
          />
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
          text: "المديرن",
          disabled: false,
          href: "/admins",
        },
        {
          text: "اضافة مستخدم",
          disabled: true,
          href: "/",
        },
      ],

      img: "",
      imageSrc: "",
      name: "",
      phone: "",
      email: "",
      password: "",
      showPassword: false,
      is_active: false,
      is_ban: false,
      banReason: "",
      isLoading: false,
      roleItems: [],
      role_id: "",
    };
  },
  props: ["id"],
  methods: {
    loadFile(event) {
      this.img = event.target.files[0];
      this.imageSrc = URL.createObjectURL(event.target.files[0]);
    },
    getRoles() {
      server
        .get("/dashboard/role", {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.roleItems = res.data.data;
        });
    },
    getAdminToEdit() {
      server
        .get(`/dashboard/admin/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.imageSrc = res.data.data.image;
          this.name = res.data.data.fullname;
          this.phone = res.data.data.phone;
          this.email = res.data.data.email;
          this.role_id = res.data.data.role.id;
          this.is_active = res.data.data.is_active;
          this.is_ban = res.data.data.is_ban;
          this.banReason = res.data.data.ban_reason;
        });
    },
    submitForm() {
      this.isLoading = true;
      if (!this.imageSrc) {
        this.$iziToast.error({
          message: "الحق الصوره اولا",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.name) {
        this.$iziToast.error({
          message: "ادخل الاسم ",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.phone) {
        this.$iziToast.error({
          message: "ادخل الهاتف ",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.email) {
        this.$iziToast.error({
          message: "ادخل البريد ",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.role_id) {
        this.$iziToast.error({
          message: "اختر الصلاحيه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.password) {
        this.$iziToast.error({
          message: "ادخل كلمه المرور' ",
        });
        this.isLoading = false;
        return false;
      }
      if (this.is_ban) {
        if (!this.banReason) {
          this.$iziToast.error({
            message: "ادخل سبب الحظر ",
          });
          this.isLoading = false;
          return false;
        }
      }
      const formData = new FormData();
      formData.append("fullname", this.name);
      formData.append("phone", this.phone);
      formData.append("email", this.email);
      formData.append("role_id", this.role_id);
      formData.append("password", this.password);
      formData.append("is_active", this.is_active ? "1" : "0");
      formData.append("is_ban", this.is_ban ? "1" : "0");
      formData.append("_method", "PATCH");

      if (this.is_ban) {
        formData.append("ban_reason", this.banReason);
      }
      formData.append("image", this.img);
      server
        .post(`/dashboard/admin/${this.id}`, formData, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.isLoading = false;
          this.$router.push("/admins");
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
    this.getRoles();
    this.getAdminToEdit();
  },
};
</script>
