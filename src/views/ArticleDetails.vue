<template>
  <!-- 文章详情 -->
  <nav-bar :title="$t(' ')" :needBack="ture"></nav-bar>
  <div class="article-details">
    <h2>{{ tittle }}</h2>
    <div class="time">{{ time }}</div>
    <div v-html="text"></div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();
    const tittle = route.query.tittle;
    const time = route.query.time;
    const text = route.query.text;

    return {
      tittle,
      time,
      text,
    };
  },
};
</script>

<style lang="less" scoped>
.article-details {
  background-color: #fff;
  padding: 20px;
  min-height: calc(100vh - 86px);
  h2 {
    text-align: center;
  }
  .time {
    color: #919090;
    margin: 10px 0;
  }
}
</style>