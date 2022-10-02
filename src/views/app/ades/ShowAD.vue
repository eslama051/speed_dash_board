<template>
  <section class="show_client">
    <div class="show_client_header">
      <div id="particles-js"></div>
    </div>
    <div class="show_client_body">
      <v-divider></v-divider>
      <h3 class="divider_title text-center">صور النتج</h3>
      <div class="porduct_imgs_container">
        <div
          class="single-img-container"
          v-for="image in images"
          :key="image.id"
        >
          <img :src="image.image_url" alt="" />
        </div>
      </div>
      <v-divider></v-divider>
      <h3 class="divider_title text-center">تفاصيل المنتج</h3>
      <div class="product_details">
        <div>
          <h3 class="title">اسم المنتج</h3>
          <h3>{{ name }}</h3>
        </div>
        <div>
          <h3 class="title">وصف المنتج</h3>
          <h3>{{ desc }}</h3>
        </div>
        <div>
          <h3 class="title">حاله المنتج</h3>
          <h3>{{ productStatus }}</h3>
        </div>
        <div>
          <h3 class="title">القسم الدئيسي</h3>
          <h3>{{ category }}</h3>
        </div>
        <div>
          <h3 class="title">القسم الفرعي</h3>
          <h3>{{ subCategory }}</h3>
        </div>
        <div>
          <h3 class="title">القسم الفرعي</h3>
          <h3>{{ subCategory }}</h3>
        </div>
        <div>
          <h3 class="title">طريقه الشحن</h3>
          <h3>{{ shippingWay }}</h3>
        </div>
        <div>
          <h3 class="title">تقييم المنتج</h3>
          <h3>{{ rate }}</h3>
        </div>
        <div>
          <h3 class="title">الدولة</h3>
          <h3>{{ country }}</h3>
        </div>
        <div>
          <h3 class="title">المدينه</h3>
          <h3>{{ city }}</h3>
        </div>
        <div>
          <h3 class="title">السعر</h3>
          <h3>{{ product_price }}</h3>
        </div>
        <div>
          <h3 class="title">الكمية المتاحة في المخزن</h3>
          <h3>{{ qty }}</h3>
        </div>
      </div>
      <v-divider></v-divider>
      <h3 class="divider_title text-center">بيانات العميل</h3>
      <div class="product_details">
        <div>
          <h3 class="title">اسم العميل</h3>
          <h3>{{ username }}</h3>
        </div>
        <div>
          <h3 class="title">رقم الهاتف</h3>
          <h3>{{ phone }}</h3>
        </div>
        <div>
          <h3 class="title">البريد الالكتروني</h3>
          <h3>{{ email }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "particles.js";
import server from "@/apis/server";
export default {
  data() {
    return {
      email: "",
      clientDetails: false,
      name: "",
      images: [],
    };
  },
  props: ["id"],
  methods: {
    initParticles() {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#46b393" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#46b393" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#46b393",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
    },
    getProductData() {
      server
        .get(`/dashboard/product/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.images = res.data.data.images;
          this.name = res.data.data.name;
          this.rate = res.data.data.rate;
          this.qty = res.data.data.qty;
          this.product_price = res.data.data.product_price;
          this.desc = res.data.data.desc;
          this.category = res.data.data.category.ar.name;
          this.subCategory = res.data.data.subCategory.ar.name;
          this.product_price = res.data.data.product_price;
          this.productStatus = res.data.data.productStatus.ar.name;
          this.shippingWay = res.data.data.shippingWay.ar.name;
          this.country = res.data.data.country.ar.name;
          this.city = res.data.data.city.ar.name;
          this.username = res.data.data.user.username;
          this.phone = res.data.data.user.phone;
          this.email = res.data.data.user.email;
        });
    },
    showClientDetails() {
      this.clientDetails = true;
    },
  },
  mounted() {
    this.initParticles();
    this.getProductData();
  },
};
</script>
<style lang="scss" scoped>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: #00356b; */
}
.divider_title {
  transform: translateY(-22px);
  color: var(--main_theme_clr);
}
.porduct_imgs_container {
  display: flex;
  flex-wrap: wrap;
  padding: 4rem 0rem;
  gap: 1rem;

  > div {
    max-width: 300px;
    border-radius: 1rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.product_details {
  display: grid;
  gap: 1rem;
  align-items: flex-start;
  padding-bottom: 2rem;
  > div {
    background: white;
    padding: 1rem;
    border: 1px solid var(--main_theme_clr);
    border-bottom-left-radius: 2rem;
    border-top-right-radius: 2rem;
    font-size: 1rem !important;
    .title {
      color: var(--main_theme_clr);
      font-family: inherit !important;
    }
  }
  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
