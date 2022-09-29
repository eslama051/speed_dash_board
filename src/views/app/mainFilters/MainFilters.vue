<template>
  <section class="home_filter_all">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <div class="section_info">
      <h2>4</h2>
      <div><i class="fa fa-chart-bar"></i></div>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      class="elevation-1"
      :loading="isloading"
    >
      <template v-slot:top>
        <div class="tabel_add_btn_container">
          <router-link to="/mainFilters/add"
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
            <img :src="src" alt="" />
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
      src: "",
      id: "",
      isloading: false,
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "تصنيفات رئيسيه",
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
          text: "الصوره",
          value: "image",
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
      items: [
        // {
        //   image:
        //     " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
        //   nameAr: "إكسسوارات الهواتف",
        //   nameEn: "Phone Accessories",
        // },
        // {
        //   image:
        //     " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
        //   nameAr: "إكسسوارات الهواتف",
        //   nameEn: "Phone Accessories",
        // },
        // {
        //   image:
        //     " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
        //   nameAr: "إكسسوارات الهواتف",
        //   nameEn: "Phone Accessories",
        // },
        // {
        //   image:
        //     " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
        //   nameAr: "إكسسوارات الهواتف",
        //   nameEn: "Phone Accessories",
        // },
        // {
        //   image:
        //     " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
        //   nameAr: "إكسسوارات الهواتف",
        //   nameEn: "Phone Accessories",
        // },
        // {
        //   image:
        //     " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
        //   nameAr: "إكسسوارات الهواتف",
        //   nameEn: "Phone Accessories",
        // },
        // {
        //   image:
        //     " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
        //   nameAr: "إكسسوارات الهواتف",
        //   nameEn: "Phone Accessories",
        // },
        // {
        //   image:
        //     " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
        //   nameAr: "إكسسوارات الهواتف",
        //   nameEn: "Phone Accessories",
        // },
        // {
        //   image:
        //     " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
        //   nameAr: "إكسسوارات الهواتف",
        //   nameEn: "Phone Accessories",
        // },
        // {
        //   image:
        //     " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
        //   nameAr: "إكسسوارات الهواتف",
        //   nameEn: "Phone Accessories",
        // },
      ],
    };
  },
  methods: {
    closeDelete() {
      console.log("smth");
    },
    deleteItemConfirm() {
      server
        .delete(`/dashboard/category/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.getCategories();
        })
        .catch((res) => {
          this.$iziToast.error({
            message: res.response.message,
          });
        });
      this.dialogDelete = false;
    },
    deleteItem(id) {
      this.id = id;
      this.dialogDelete = "true";
    },

    editItem(id) {
      // console.log(item);
      this.$router.push(`/mainFilters/edit/${id}`);
    },
    opendialogimg(src) {
      this.dialogimg = true;
      this.src = src;
      console.log(src);
    },
    getCategories() {
      this.isloading = true;
      server
        .get("/dashboard/category", {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.items = res.data.data;
          this.isloading = false;
        });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>
