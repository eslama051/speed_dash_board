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
          <router-link to="/permissions/add"
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
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination dir="ltr" v-model="page" :length="pageCount"></v-pagination>
    </div>
  </section>
</template>

<script>
import server from "@/apis/server";
// import DeleteModel from "@/components/ui/models/DeleteModel.vue";
export default {
  // components: { DeleteModel },
  data() {
    return {
      dialogDelete: false,
      page: 1,
      pageCount: 1,
      total: 0,
      deleleteId: "",
      isloading: false,
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "الصلاحيات",
          disabled: true,
          href: "/",
        },
        {
          text: "عرض الكل",
          disabled: true,
          href: "/",
        },
      ],

      headers: [
        {
          text: "اسم الصلاحيه (عريي)",
          value: "ar.name",
          //   sortable: false,
        },
        {
          text: "اسم الصلاحيه (انجيزي)",
          value: "en.name",
        },
        { text: "التحكم", value: "actions", sortable: false },
      ],
      items: [],
    };
  },
  methods: {
    closeDelete() {
      console.log("smth");
    },
    deleteItemConfirm() {
      console.log("smth");
    },
    deleteItem() {
      this.dialogDelete = "true";
    },
    editItem(item) {
      console.log(item);
      this.$router.push("/permissions/edit/1");
    },
    getitesmPerPage() {
      this.isloading = true;
      server
        .get(`/dashboard/role?page=${this.page}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);
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
