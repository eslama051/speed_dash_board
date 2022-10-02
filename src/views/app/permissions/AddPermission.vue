<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">إضافه جديد</h3>
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
          <v-combobox
            v-model="model"
            :items="roleItems"
            :search-input.sync="search"
            hide-selected
            item-text="ar.name"
            item-value="id"
            class="input col-md-4"
            label="الصلاحيات"
            multiple
            persistent-hint
            small-chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No results matching "<strong>{{ search }}</strong
                    >". Press <kbd>enter</kbd> to create a new one
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
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
      nameAr: "",
      nameEn: "",
      roleId: "",
      search: null,
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "الصلاحيات",
          disabled: false,
          href: "/permissions",
        },
        {
          text: "اضافة صلاحيه",
          disabled: true,
          href: "/",
        },
      ],
      roleItems: [],
    };
  },
  methods: {
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

      server
        .post(
          "/dashboard/country",
          {
            role: {
              ar: {
                name: `${this.nameAr}`,
              },
              en: {
                name: `${this.nameEn}`,
              },
            },
            permissions: [
              {
                route_name: "/sliders",
                name: "الاسليدر الرئيسي",
                is_show: { url: "/show", status: true },
                is_create: { url: "/create", status: true },
                is_edit: { url: "/edit", status: true },
                is_destroy: { url: "/delete", status: true },
              },
              {
                route_name: "/clients",
                name: "العملاء",
                is_show: { url: "/show", status: true },
                is_create: { url: "/show", status: true },
                is_edit: { url: "/show", status: true },
                is_destroy: { url: "/show", status: true },
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
            },
          }
        )
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.isLoading = false;
          this.nameAr = "";
          this.nameEn = "";
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
  },
};
</script>
