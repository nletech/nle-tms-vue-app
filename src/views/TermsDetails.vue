<template>
  <!-- 条款详情 -->
  <nav-bar :title="$t(' ')"></nav-bar>
  <div class="terms-details">
    <h2>{{ form.tittle }}</h2>
    <div class="time">{{ form.updated_at }}</div>
    <div v-html="form.text"></div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { onMounted, ref } from "vue";
import $api from "../api/index";

export default {
  components: {
    NavBar,
  },
  setup() {
    const form = ref({});
    const getService = () => {
      $api.getService().then((res) => {
        res.data.data.map((el) => {
          if (el.type == 2) {
            form.value = el;
          }
        });
      });
    };
    onMounted(() => {
      getService();
    });
    return {
      form,
    };
  },
};
</script>

<style lang="less" scoped>
.terms-details {
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