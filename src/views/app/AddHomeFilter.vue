<template>
  <section class="home_filter_add_section">
    <v-breadcrumbs :items="breadItems" divider=">>" />
    <v-form> </v-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "تصنيفات رئيسيه",
          disabled: false,
          href: "/",
        },
        {
          text: "اضافة تصنيف",
          disabled: true,
          href: "/",
        },
      ],
    };
  },
};
</script>
