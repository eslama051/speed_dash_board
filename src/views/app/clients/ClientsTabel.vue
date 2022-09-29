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

      <template v-slot:[`item.active`]="{ item }">
        <v-chip :color="getColor(item.active)" dark>
          {{ item.active }}
        </v-chip>
      </template>
      <template v-slot:[`item.blocked`]="{ item }">
        <v-chip :color="getColorBlocked(item.blocked)" dark>
          {{ item.blocked }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <router-link to="/clients/show/1">
          <v-icon small> mdi-eye </v-icon>
        </router-link>
        <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </section>
</template>

<script>
// import DeleteModel from "@/components/ui/models/DeleteModel.vue";
export default {
  // components: { DeleteModel },
  data() {
    return {
      dialogDelete: false,
      dialogimg: false,
      dialogImgSrc: "",
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
          value: "name",
          //   sortable: false,
        },
        {
          text: "الهاتف",
          value: "phone",
        },
        {
          text: "مفعل؟",
          value: "active",
        },
        {
          text: "محظور؟",
          value: "blocked",
        },
        { text: "التحكم", value: "actions", sortable: false },
      ],
      items: [
        {
          image:
            " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
          name: "eslam",
          phone: "010134315",
          active: "مفعل",
          blocked: "غير محظور",
        },
        {
          image:
            " https://speed4ever.elsaed.aait-d.com/storage/images/category/FkyVbwrKjpHjv54KTweS4ZiCKz9Z2dCnRf0MyOPS.png",
          name: "eslam",
          phone: "010134315",
          active: "غير مفعل",
          blocked: "محظور",
        },
      ],
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
      this.$router.push("/clients/edit/1");
    },
    getColor(active) {
      if (active == "مفعل") return "green";
      else return "red";
    },
    getColorBlocked(blocked) {
      if (blocked == "غير محظور") return "green";
      else return "red";
    },
    opendialogimg(src) {
      this.dialogimg = true;
      this.dialogImgSrc = src;
      console.log(src);
    },
  },
};
</script>
