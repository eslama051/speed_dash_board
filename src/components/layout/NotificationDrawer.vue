<template>
  <div class="notification_drawer" @click.stop>
    <div class="notification_drawer_header">
      <h3 class="text-center">
        {{ NotificationsData.unread_notifications }} جديد
      </h3>
      <h4 class="text-center">اشعارت التطبيق</h4>
    </div>
    <ul class="notification_drawer_body">
      <li
        v-for="item in NotificationsData.data"
        :key="item.id"
        class="notification_item"
        :style="item.is_read ? `opacity: 0.5` : ''"
      >
        <div class="notification_icon_container">
          <i class="fa fa-plus"></i>
        </div>
        <div class="notification_text">
          <h4>{{ item.title }}</h4>
          <h5>{{ item.body }}</h5>
        </div>
        <div class="notification_date">
          <h4>{{ item.created_time }}</h4>
        </div>
      </li>
      <li class="notification_all_btn">
        <router-link to="/notifications"
          ><base-button>عرض الكل</base-button></router-link
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["NotificationsData"],
};
</script>
