<template>
  <section class="home_filter_all">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <div class="section_info">
      <h2>{{ total }}</h2>
      <div><i class="fa fa-chart-bar"></i></div>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="total"
      :loading="isloading"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:top>
        <div class="tabel_add_btn_container">
          <router-link to="/supFilters/add"
            ><i class="fa fa-plus"></i> إضافه جديد
          </router-link>
        </div>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="delete_model">
            <v-card-title class="text-h5">هل أنت متاكد من الحذف ؟</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="model_cancel_btn" text @click="closeDelete"
                >إلغاء</v-btn
              >
              <v-btn class="model_delete_btn" text @click="deleteItemConfirm"
                >موافق</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.image`]="{ item }">
        <div class="img-container">
          <img :src="item.image" alt="" />
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item.id)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination dir="ltr" v-model="page" :length="pageCount"></v-pagination>
    </div>
  </section>
</template>

<script>
import server from "@/apis/server";
export default {
  data() {
    return {
      dialogDelete: false,
      page: 0,
      pageCount: 0,
      selecetedItemId: "",
      total: 0,
      delId: "",
      isloading: false,
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "تصنيفات فرعية ",
          disabled: true,
          href: "/mainFilters",
        },
        {
          text: "عرض الكل",
          disabled: true,
          href: "/",
        },
      ],

      headers: [
        {
          text: "اسم الغئه الأب",
          value: "category.ar.name",
          //   sortable: false,
        },
        {
          text: "الاسم(عريي)",
          value: "ar.name",
          //   sortable: false,
        },
        {
          text: "الاسم(انجيزي)",
          value: "en.name",
        },
        { text: "التحكم", value: "actions", sortable: false },
      ],
      items: [],
    };
  },
  watch: {
    page() {
      this.getitesmPerPage(this.page);
    },
  },
  methods: {
    closeDelete() {
      console.log("smth");
    },
    deleteItemConfirm() {
      server
        .delete(`/dashboard/subCategory/${this.delId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.getitesmPerPage();
        })
        .catch((res) => {
          this.$iziToast.error({
            message: res.response.message,
          });
        });
      this.dialogDelete = false;
    },
    deleteItem(id) {
      this.delId = id;
      this.dialogDelete = "true";
    },
    editItem(id) {
      this.$router.push(`/supFilters/edit/${id}`);
    },
    getitesmPerPage(currPage) {
      this.isloading = true;
      server
        .get(`/dashboard/subCategory?page=${currPage}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.items = res.data.data;
          this.total = res.data.meta.total;
          this.page = res.data.meta.current_page;
          this.pageCount = res.data.meta.last_page;
          this.isloading = false;
        });
    },
  },
  mounted() {
    this.getitesmPerPage();
  },
};
</script>
