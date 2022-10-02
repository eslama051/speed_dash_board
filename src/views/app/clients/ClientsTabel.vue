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
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:top>
        <div class="tabel_add_btn_container">
          <router-link to="/clients/add"
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
        <v-dialog v-model="dialogimg" max-width="700px">
          <div class="img_model">
            <img :src="dialogImgSrc" alt="" />
          </div>
        </v-dialog>
      </template>
      <template v-slot:[`item.image`]="{ item }">
        <div class="img-container" @click="opendialogimg(item.image)">
          <img :src="item.image" alt="" />
        </div>
      </template>

      <template v-slot:[`item.is_active`]="{ item }">
        <v-chip :color="getColor(item.is_active)" dark>
          {{ item.is_active ? "مفعل" : "غير مفعل" }}
        </v-chip>
      </template>
      <template v-slot:[`item.is_ban`]="{ item }">
        <v-chip :color="getColorBlocked(item.is_ban)" dark>
          {{ item.is_ban ? "محظور" : "غيرمحظور" }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="showItem(item.id)"> mdi-eye </v-icon>
        <v-icon small @click="editItem(item.id)"> mdi-pencil </v-icon>
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
// import DeleteModel from "@/components/ui/models/DeleteModel.vue";
export default {
  // components: { DeleteModel },
  data() {
    return {
      dialogDelete: false,
      dialogimg: false,
      dialogImgSrc: "",
      page: 0,
      pageCount: 0,
      total: 0,
      deleteId: "",
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "المستخدمين",
          disabled: true,
          href: "/clients",
        },
        {
          text: "عرض الكل",
          disabled: true,
          href: "/",
        },
      ],

      headers: [
        {
          text: "الصوره",
          value: "image",
          //   sortable: false,
        },
        {
          text: "الاسم",
          value: "username",
          //   sortable: false,
        },
        {
          text: "الهاتف",
          value: "phone",
        },
        {
          text: "مفعل؟",
          value: "is_active",
        },
        {
          text: "محظور؟",
          value: "is_ban",
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
        .delete(`/dashboard/client/${this.deleteId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.getitesmPerPage(this.page);
        })
        .catch((res) => {
          this.$iziToast.error({
            message: res.response.message,
          });
        });
      this.dialogDelete = false;
    },
    deleteItem(id) {
      this.deleteId = id;
      this.dialogDelete = "true";
    },
    editItem(id) {
      this.$router.push(`/clients/edit/${id}`);
    },
    showItem(id) {
      this.$router.push(`/clients/show/${id}`);
    },
    getColor(active) {
      if (active) return "green";
      else return "red";
    },
    getColorBlocked(blocked) {
      if (!blocked) return "green";
      else return "red";
    },
    opendialogimg(src) {
      this.dialogimg = true;
      this.dialogImgSrc = src;
      console.log(src);
    },
    getitesmPerPage(currPage) {
      server
        .get(`/dashboard/client?page=${currPage}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.items = res.data.data;
          this.total = res.data.meta.total;
          this.page = res.data.meta.current_page;
          this.pageCount = res.data.meta.last_page;
        });
    },
  },
  mounted() {
    this.getitesmPerPage(1);
  },
};
</script>
