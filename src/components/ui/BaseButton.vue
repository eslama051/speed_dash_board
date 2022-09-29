<template>
  <router-link v-if="link" :to="to" class="button"><slot /></router-link>
  <button v-else class="button">
    <slot v-if="!isLoading" />
    <div class="button_loading_spinner" v-else>
      <img src="../../assets/media/gifs/Spinner1.gif" alt="" />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
$color: #6c98a2;
.button {
  // display: inline-block;
  min-height: 46px;
  min-width: 150px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 2rem;
  border-radius: 10rem;
  color: #fff !important;
  text-transform: uppercase;
  font-size: 1rem;
  //   letter-spacing: 0.15rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $color;
    border-radius: 10rem;
    z-index: -2;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: darken($color, 15%);
    transition: all 0.3s;
    border-radius: 10rem;
    z-index: -1;
  }
  &:hover {
    color: #fff;
    &:before {
      width: 100%;
    }
  }
  .button_loading_spinner {
    height: 50px;
    width: 50px;
    position: absolute;
  }
  img {
    width: 100%;
    display: block;
    height: 100%;
  }
}
</style>
