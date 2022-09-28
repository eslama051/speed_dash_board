<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent>
      <h3 class="form_title">إضافه جديد</h3>

      <div class="img-edit">
        <img
          src=""
          id="account-detail-img-output"
          alt=""
          :class="showimg ? 'show' : ''"
        />
        <label for="file" class="img-input_label_text">Main Image</label>
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
          <div class="upload_imgs">
            <label class="upload_imgs_btn" for="imgs_upload">
              <div>
                <p>product Images</p>
                <div class="upload_imgs_btn_icons">
                  <i class="fa fa-image"></i>
                  <i class="fa fa-image"></i>
                  <i class="fa fa-image"></i>
                </div>
              </div>
            </label>
            <div class="uploaded_imgs" v-if="imgSrcs.length > 0">
              <div
                v-for="(src, index) in imgSrcs"
                :key="index"
                class="uploaded_img_container"
              >
                <button
                  class="uploaded_img_del_btn"
                  @click="removeUploadedImg(index)"
                >
                  <i class="fa fa-xmark"></i>
                </button>
                <img :src="src" alt="" />
              </div>
            </div>
            <input
              type="file"
              accept="image/gif, image/jpeg, image/png"
              name="image"
              id="imgs_upload"
              @change="(e) => loadimgs(e)"
              style="display: none"
            />
          </div>
          <v-text-field class="input col-md-12" label="الاسم" />
          <v-textarea class="input col-md-12" label="الوصف" />
          <v-select
            class="input col-md-6"
            :items="['brr', 'frr']"
            label="الحاله"
          />
          <v-text-field
            class="input col-md-6"
            type="number"
            label="الكميه المتوفره"
          />
          <v-select class="input col-md-12" label="صاحب الاعلان" />
          <v-select class="input col-md-6" label="التصنيف الرئيسي" />
          <v-select class="input col-md-6" label="التصنيف الفرعي" />
          <v-select class="input col-md-6" label="الدوله" />
          <v-select class="input col-md-6" label="المدينه" />
          <v-select class="input col-md-12" label="طريقه الشحن" />

          <v-radio-group v-model="isAuction" class="col-12">
            <v-container>
              <v-row>
                <v-radio
                  label="إضافه المنتج كمزاد"
                  name="auction"
                  :value="true"
                  class="col-12"
                />

                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="startDate"
                      label="تاريخ البدء"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="input col-md-6"
                      :disabled="!isAuction"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    @input="menu = false"
                    no-title
                  ></v-date-picker>
                </v-menu>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="endDate"
                      label="تاريخ الانتهاء"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      class="input col-md-6"
                      :disabled="!isAuction"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    @input="menu2 = false"
                    no-title
                  ></v-date-picker>
                </v-menu>
                <v-text-field
                  label="سعر بدا المزاد"
                  type="number"
                  class="input col-md-6"
                  :disabled="!isAuction"
                />
                <v-text-field
                  label="قيمه بد المزاد"
                  class="input col-md-6"
                  :disabled="!isAuction"
                />

                <v-radio
                  label="إضافه المنتج كبيع مباشر"
                  :value="false"
                  name="auction"
                  class="col-12"
                />
                <v-text-field
                  class="input col-12"
                  label="سعر البيع"
                  :disabled="isAuction"
                />
              </v-row>
            </v-container>
          </v-radio-group>
        </v-row>
      </v-container>

      <base-button class="crud_form_btn">حفظ</base-button>
    </v-form>
  </section>
</template>

<script>
import BaseButton from "@/components/ui/BaseButton.vue";
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
          text: "المنتجات",
          disabled: false,
          href: "/ades",
        },
        {
          text: "اضافة منتج",
          disabled: true,
          href: "/",
        },
      ],

      img: "",
      imgs: [],
      imgSrcs: [],
      showimg: false,
      menu: false,
      menu2: false,
      startDate: "",
      endDate: "",
      isAuction: true,
    };
  },

  methods: {
    loadFile(event) {
      let image = document.getElementById("account-detail-img-output");
      this.img = event.target.files[0];
      this.showimg = true;
      image.src = URL.createObjectURL(event.target.files[0]);
      console.log(this.img);
    },

    loadimgs(event) {
      console.log();
      let imagesArray = Array.from(event.target.files);

      imagesArray.forEach((element) => {
        this.imgs.push(element);
        this.imgSrcs.push(URL.createObjectURL(element));
      });
    },
    removeUploadedImg(index) {
      this.imgs.splice(index, 1);
      this.imgSrcs.splice(index, 1);
    },
  },
};
</script>
