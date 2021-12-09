<template>
  <!-- 常见问题 -->
  <nav-bar :title="$t('commonProblem')"></nav-bar>
  <div class="common-problem">
    <div
      class="box"
      v-for="item in data"
      :key="item"
      @click="toArticleDetails(item)"
    >
      <div>
        <img
          :src="item.picture_url"
          alt=""
          style="width: 120px; height: 60px"
        />
      </div>
      <div class="tittle">
        <div>{{ item.tittle }}</div>
        <div style="color: #999999">{{ item.updated_at }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { ref, onMounted } from "@vue/runtime-core";
import $api from "../api/index";
import { useRouter } from "vue-router";

export default {
  components: {
    NavBar,
  },
  setup() {
    const data = ref([]);
    const router = useRouter();
    const getArticle = () => {
      $api.getArticle().then((res) => {
        res.data.data.map((el) => {
          if (el.type == 4) {
            data.value.push(el);
          }
        });
      });
    };
    const toArticleDetails = (item) => {
      router.push({
        name: "ArticleDetails",
        query: {
          tittle: item.tittle,
          time: item.updated_at,
          text: item.text,
        },
      });
    };
    onMounted(() => {
      getArticle();
    });
    return {
      data,
      toArticleDetails,
    };
  },
};
</script>

<style lang="less" scoped>
.common-problem {
  padding: 10px;
  min-height: 100vh;
  background-color: #fff;
  .box {
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: solid 1px #eaeaea;
  }
  .tittle {
    margin-left: 10px;
  }
}
</style>