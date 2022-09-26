<template>
  <section class="statistics_section">
    <v-breadcrumbs :items="breadItems" divider="-"></v-breadcrumbs>
    <div class="statistics_container">
      <div class="statistics_item" v-for="(item, index) in items" :key="index">
        <div class="statistics_item_info">
          <h3 class="statistics_item_num">{{ item.num }}</h3>
          <h3>{{ item.name }}</h3>
        </div>
        <div class="statistics_item_icon">
          <i class="fa fa-chart-bar"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      breadItems: [
        {
          text: "الصفحه الرئيسيه",
          disabled: true,
          href: "/",
        },
      ],

      items: [
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
        {
          num: 44,
          name: "العملاء",
        },
      ],
    };
  },
};
</script>
