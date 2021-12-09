<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['Home', 'ShipByAppointment', 'Me']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <van-tabbar v-show="$route.meta.tabbar" route active-color="#282828">
    <van-tabbar-item replace to="/">
      <span>{{ $t("home") }} </span>
      <template #icon="props">
        <img
          :src="props.active ? icon.active : icon.inactive"
          style="height: 30px"
        />
      </template>
      <!-- <div>Home</div> -->
    </van-tabbar-item>
    <van-tabbar-item replace to="/expressQuery" icon="shopping-cart-o">
      <span>{{ $t("expressQuery") }}</span>
      <template #icon="props">
        <img
          :src="props.active ? icon2.active : icon2.inactive"
          style="height: 30px"
        /> </template
    ></van-tabbar-item>
    <van-tabbar-item replace to="/me" icon="manager-o">
      <span>{{ $t("me") }}</span>
      <template #icon="props">
        <img
          :src="props.active ? icon3.active : icon3.inactive"
          style="height: 30px"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
// import { useStore } from "vuex";
import { Tabbar, TabbarItem } from "vant";

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  setup() {
    // const store = useStore();
    // store.dispatch("getShopInfo");
    const icon = {
      inactive: "/home-img/home.png",
      active: "/home-img/home-active.png",
    };
    const icon2 = {
      inactive: "/home-img/query.png",
      active: "/home-img/query-active.png",
    };
    const icon3 = {
      inactive: "/home-img/me.png",
      active: "/home-img/me-active.png",
    };
    return {
      icon,
      icon2,
      icon3,
    };
  },
};
</script>
<style>
.van-tabbar-item--active {
  font-weight: bold;
}
h2,
p {
  margin: 0;
}
html,
body {
  max-width: 768px;
  margin: 0 auto;
}
#app {
  min-height: 100vh;
  max-width: 768px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
  background-color: #f2f2f2;
}
.van-tabbar {
  max-width: 768px;
  margin: 0 auto;
  z-index: 110;
  left: inherit !important;
}
</style>
