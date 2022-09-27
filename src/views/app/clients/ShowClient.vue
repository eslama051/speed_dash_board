<template>
  <section class="show_client">
    <div class="show_client_header">
      <div id="particles-js"></div>
      <div class="show_client_header_user">
        <div class="show_client_header_user_img">
          <img
            src="https://speed4ever.elsaed.aait-d.com/dashboardAssets/images/backgrounds/avatar.jpg"
            alt=""
          />
        </div>
        <h4 class="show_client_header_user_name">eslama@gmail.com</h4>
      </div>
    </div>
    <div class="show_client_body">
      <div class="show_client_card">
        <div class="show_client_card_content">
          <div class="user_icon">
            <i class="fa fa-user"></i>
          </div>
        </div>
        <h3>المعلومات الشخصيه</h3>
      </div>
    </div>
  </section>
</template>

<script>
import "particles.js";
export default {
  // ...
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
  },
  mounted() {
    this.initParticles();
  },
};
</script>
<style scoped>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: #00356b; */
}
</style>
