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
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
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
          value: "name",
          //   sortable: false,
        },
        {
          text: "الاسم(عريي)",
          value: "nameAr",
          //   sortable: false,
        },
        {
          text: "الاسم(انجيزي)",
          value: "nameEn",
        },
        { text: "التحكم", value: "actions", sortable: false },
      ],
      items: [
        {
          name: "الساعات الذكية - smart watches",
          nameAr: "ساعة آبل Apple Watch 7",
          nameEn: "Apple Watch 7",
        },
        {
          name: "الساعات الذكية - smart watches",
          nameAr: "ساعة آبل Apple Watch 7",
          nameEn: "Apple Watch 7",
        },
        {
          name: "الساعات الذكية - smart watches",
          nameAr: "ساعة آبل Apple Watch 7",
          nameEn: "Apple Watch 7",
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
      this.$router.push("/supFilters/edit/1");
    },
  },
};
</script>
