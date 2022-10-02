<template>
  <section class="home_filter_all">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <div class="section_info">
      <h2>{{ total }}</h2>
      <div><i class="fa fa-chart-bar"></i></div>
    </div>
    <v-data-table
      :headers="headers"
      :loading="isloading"
      :items-per-page="total"
      :items="items"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:top>
        <div class="tabel_add_btn_container">
          <router-link to="/sliders/add"
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
            <img :src="imgModelSrc" alt="" />
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
  </section>
</template>

<script>
import server from "@/apis/server";

export default {
  // components: { DeleteModel },
  data() {
    return {
      dialogDelete: false,
      dialogimg: false,
      imgModelSrc: "",
      deleteId: "",
      total: 0,
      isloading: false,
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "الاسليدر الرئيسي",
          disabled: true,
          href: "/sliders",
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
          text: "الاسم(انجيزي)",
          value: "en.name",
        },
        {
          text: "المحتوي(عريي)",
          value: "ar.desc",
          //   sortable: false,
        },
        {
          text: "المحتوي(انجليزي)",
          value: "en.desc",
          //   sortable: false,
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
      server
        .delete(`/dashboard/slider/${this.deleteId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.getSliderItems();
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
      this.$router.push(`/sliders/edit/${id}`);
    },
    opendialogimg(src) {
      this.dialogimg = true;
      this.imgModelSrc = src;
      console.log(src);
    },
    getSliderItems() {
      this.isloading = true;
      server
        .get("/dashboard/slider", {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.isloading = false;
          this.items = res.data.data;
          this.total = res.data.meta.total;
          this.isloading = false;
        })
        .catch((res) => {
          this.isloading = false;
          this.$iziToast.error({
            message: res.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getSliderItems();
  },
};
</script>
