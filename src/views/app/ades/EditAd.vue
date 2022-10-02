<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form class="curd_form" @submit.prevent="submitForm">
      <h3 class="form_title">تعديل</h3>

      <div class="img-edit">
        <img
          :src="imgSrc"
          id="account-detail-img-output"
          alt=""
          v-if="imgSrc"
        />
        <label for="file" class="img-input_label_text" v-else>Main Image</label>
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
          <v-text-field class="input col-md-12" label="الاسم" v-model="name" />
          <v-textarea class="input col-md-12" label="الوصف" v-model="desc" />
          <v-select
            class="input col-md-6"
            :items="statusItems"
            item-text="ar.name"
            item-value="id"
            label="الحاله"
            v-model="statusId"
          />
          <v-text-field
            class="input col-md-6"
            type="number"
            label="الكميه المتوفره"
            v-model="qty"
          />
          <v-select
            class="input col-md-12"
            label="صاحب الاعلان"
            :items="userItems"
            item-text="username"
            item-value="id"
            v-model="userId"
          />
          <v-select
            class="input col-md-6"
            label="التصنيف الرئيسي"
            :items="categoryItems"
            item-text="ar.name"
            item-value="id"
            v-model="categoryId"
          />
          <v-select
            class="input col-md-6"
            label="التصنيف الفرعي"
            :items="subCategoryItems"
            item-text="ar.name"
            item-value="id"
            v-model="subCategoryId"
            :disabled="subCategoryDisabled"
          />
          <v-select
            class="input col-md-6"
            label="الدوله"
            :items="countryItems"
            item-text="ar.name"
            item-value="id"
            v-model="countryId"
          />
          <v-select
            class="input col-md-6"
            label="المدينه"
            :items="cityItems"
            item-text="ar.name"
            item-value="id"
            v-model="cityId"
            :disabled="cityDisabled"
          />
          <v-select
            class="input col-md-12"
            label="طريقه الشحن"
            :items="shippingWayItems"
            item-text="ar.name"
            item-value="id"
            v-model="shippingWayId"
          />

          <v-radio-group v-model="isBid" class="col-12">
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
                      :disabled="!isBid"
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
                      :disabled="!isBid"
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
                  :disabled="!isBid"
                  v-model="bid_price"
                />
                <v-text-field
                  label="قيمه بد المزاد"
                  class="input col-md-6"
                  disabled
                  v-model="bid_price"
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
                  :disabled="isBid"
                  v-model="sellPrice"
                />
              </v-row>
            </v-container>
          </v-radio-group>
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
          text: "تعديل",
          disabled: true,
          href: "/",
        },
      ],
      isLoading: false,
      img: "",
      imgSrc: "",
      imgs: [],
      imgSrcs: [],
      menu: false,
      menu2: false,
      startDate: "",
      endDate: "",

      name: "",
      desc: "",
      statusId: "",
      qty: "",
      userId: "",
      categoryId: "",
      subCategoryId: "",
      countryId: "",
      cityId: "",
      shippingWayId: "",
      isBid: true,
      is_direct_sale: "",
      bid_price: "",
      bid_value: "",
      countryItems: [],
      cityItems: [],
      userItems: [],
      categoryItems: [],
      subCategoryItems: [],
      statusItems: [],
      shippingWayItems: [],
      cityDisabled: true,
      subCategoryDisabled: true,
      sellPrice: "",
    };
  },
  props: ["id"],
  watch: {
    countryId() {
      this.getCities();
    },
    categoryId() {
      this.getSubCategories();
    },
  },
  methods: {
    loadFile(event) {
      this.img = event.target.files[0];
      this.imgSrc = URL.createObjectURL(event.target.files[0]);
    },

    loadimgs(event) {
      console.log("fff");
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
    getCountries() {
      server
        .get("/dashboard/country", {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.countryItems = res.data.data;
        });
    },
    getCities() {
      server
        .get(`/dashboard/city/${this.countryId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);

          this.cityDisabled = false;
          this.cityItems = res.data.data;
        })
        .catch(() => {
          this.cityDisabled = true;
        });
    },
    getClients() {
      server
        .get(`/dashboard/help-services?type=client`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.userItems = res.data.data;
        })
        .catch(() => {
          this.cityDisabled = true;
        });
    },
    getShippingWay() {
      server
        .get(`/dashboard/shippingWay`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);

          this.shippingWayItems = res.data.data;
        })
        .catch(() => {});
    },
    getProductStatus() {
      server
        .get(`/dashboard/productStatus`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          // console.log(res.data.data);

          this.statusItems = res.data.data;
        })
        .catch(() => {});
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
          this.categoryItems = res.data.data;
        });
    },
    getSubCategories() {
      this.isloading = true;
      server
        .get(`/dashboard/subCategory/${this.categoryId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.subCategoryDisabled = false;
          this.subCategoryItems = res.data.data;
        });
    },
    submitForm() {
      this.isLoading = true;

      if (!this.imgSrc) {
        this.$iziToast.error({
          message: "ادخل الصوره الرئيسيه ",
        });
        this.isLoading = false;
        return false;
      }
      if (this.imgSrcs.length == 0) {
        this.$iziToast.error({
          message: "ادخل صور المنتج  ",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.name) {
        this.$iziToast.error({
          message: "ادخل الاسم ",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.desc) {
        this.$iziToast.error({
          message: "ادخل  الوصف",
        });
        this.isLoading = false;
        return false;
      }

      if (!this.statusId) {
        this.$iziToast.error({
          message: "اختر الحاله",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.qty) {
        this.$iziToast.error({
          message: "ادخل الكميه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.userId) {
        this.$iziToast.error({
          message: "اختر صاحب الاعلان",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.categoryId) {
        this.$iziToast.error({
          message: "اختر التصنيف الرئيسي",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.subCategoryId) {
        this.$iziToast.error({
          message: "اختر التصنيف الفرعي",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.countryId) {
        this.$iziToast.error({
          message: "اختر الدوله",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.cityId) {
        this.$iziToast.error({
          message: "اختر المدينه",
        });
        this.isLoading = false;
        return false;
      }
      if (!this.shippingWayId) {
        this.$iziToast.error({
          message: "اختر طريقه الشحن",
        });
        this.isLoading = false;
        return false;
      }
      if (this.isBid) {
        if (!this.startDate) {
          this.$iziToast.error({
            message: "اختر تاريخ البدء ",
          });
          this.isLoading = false;
          return false;
        }
        if (!this.endDate) {
          this.$iziToast.error({
            message: "اختر تاريخ الانتهاء ",
          });
          this.isLoading = false;
          return false;
        }
        if (!this.bid_price) {
          this.$iziToast.error({
            message: "اختر سعر بدا المزاد  ",
          });
          this.isLoading = false;
          return false;
        }
      } else {
        if (!this.sellPrice) {
          this.$iziToast.error({
            message: "اختر  سعر البيع ",
          });
          this.isLoading = false;
          return false;
        }
      }
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("desc", this.desc);
      formData.append("category_id", this.categoryId);
      formData.append("sub_category_id", this.subCategoryId);
      formData.append("country_id", this.countryId);
      formData.append("city_id", this.cityId);
      formData.append("_method", "PATCH");
      if (this.img) {
        formData.append("main_image", this.img);
      }
      if (this.imgs.length > 0) {
        formData.append("images[0]", this.imgs[0]);
      }
      // formData.append("images[0]", this.imgs);
      formData.append("shipping_way_id", this.shippingWayId);
      formData.append("product_status_id", this.statusId);
      formData.append("qty", this.qty);
      if (this.isBid) {
        formData.append(
          "start_bid_date",
          `${this.startDate} ${new Date().toLocaleTimeString()}`
        );
        formData.append(
          "end_bid_date",
          `${this.endDate} ${new Date().toLocaleTimeString()}`
        );
        formData.append("bid_value", this.bid_price);
        formData.append("bid_price", this.bid_price);
      } else {
        formData.append("product_price", this.sellPrice);
      }
      formData.append("user_id", this.userId);

      server
        .post(`/dashboard/product/${this.id}`, formData, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.$iziToast.success({
            message: res.data.message,
          });
          this.isLoading = false;
          this.name = "";
          this.isBid = true;
          this.desc = "";
          this.statusId = "";
          this.countryId = "";
          this.cityId = "";
          this.categoryId = "";
          this.subCategoryId = "";
          this.qty = "";
          this.shippingWayId = "";
          this.img = "";
          this.bid_price = "";
          this.sellPrice = "";
          this.userId = "";
          this.imgSrc = "";
          this.imgs = [];
          this.imgSrcs = [];
          this.startDate = "";
          this.endDate = "";
        })

        .catch((res) => {
          console.log(res);
          this.isLoading = false;
          this.$iziToast.error({
            message: res.response.data.message || "حصل امر خاطئ",
          });
        });
    },
    getProductToEdit() {
      server
        .get(`/dashboard/product/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          this.name = res.data.data.name;
          this.sellPrice = res.data.data.product_price;
          this.desc = res.data.data.desc;
          this.userId = res.data.data.user.id;
          this.categoryId = res.data.data.category.id;
          this.subCategoryId = res.data.data.subCategory.id;
          this.countryId = res.data.data.country.id;
          this.cityId = res.data.data.city.id;
          this.statusId = res.data.data.productStatus.id;
          this.shippingWayId = res.data.data.shippingWay.id;
          this.qty = res.data.data.qty;
          this.isBid = res.data.data.is_bid;
          this.bid_price = res.data.data.bid_value;
          this.startDate = res.data.data.start_bid_date;
          this.endDate = res.data.data.end_bid_date;
          this.imgSrc = res.data.data.main_image;
          res.data.data.images.forEach((item) => {
            this.imgSrcs.push(item.image_url);
          });
        });
    },
  },
  mounted() {
    this.getCountries();
    this.getShippingWay();
    this.getClients();
    this.getProductStatus();
    this.getCategories();
    this.getProductToEdit();
  },
};
</script>
