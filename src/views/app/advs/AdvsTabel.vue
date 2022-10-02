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
      :loading="isLoading"
      :items-per-page="total"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:top>
        <div class="tabel_add_btn_container">
          <router-link to="/advertisements/add"
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
        <v-dialog v-model="dialogImg" max-width="700px">
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
// import DeleteModel from "@/components/ui/models/DeleteModel.vue";
export default {
  // components: { DeleteModel },
  data() {
    return {
      dialogDelete: false,
      dialogImg: false,
      page: 1,
      pageCount: 1,
      total: 0,
      deleteId: "",
      isLoading: false,
      dialogImgSrc: "",
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "الاعلانات",
          disabled: true,
          href: "/advertisements",
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
          text: "العنوان(عريي)",
          value: "ar.name",
          //   sortable: false,
        },
        {
          text: "العنوان(انجيزي)",
          value: "en.name",
        },
        {
          text: "المحتوي(عربي)",
          value: "ar.desc",
        },
        {
          text: "المحتوي(انجليزي)",
          value: "en.desc",
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
      this.dialogDelete = false;
    },
    opendialogimg(src) {
      this.dialogImg = true;
      this.dialogImgSrc = src;
      console.log(src);
    },
    deleteItem(id) {
      this.deleteId = id;
      this.dialogDelete = "true";
    },
    deleteItemConfirm() {
      server
        .delete(`/dashboard/ad/${this.deleteId}`, {
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
    editItem(id) {
      this.$router.push(`/advertisements/edit/${id}`);
    },
    getitesmPerPage() {
      this.isLoading = true;
      server
        .get(`/dashboard/ad?page=${this.page}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.items = res.data.data;
          this.total = res.data.meta.total;
          this.page = res.data.meta.current_page;
          this.pageCount = res.data.meta.last_page;
          this.isLoading = false;
        });
    },
  },

  mounted() {
    this.getitesmPerPage();
  },
};
</script>
