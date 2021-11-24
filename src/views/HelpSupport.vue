<template>
  <!-- 帮助与支持 -->
  <nav-bar
    :title="$t('helpSupport')"
    :needBack="ture"
    :onClickLeft="() => $router.push('/')"
  ></nav-bar>
  <div class="help-support">
    <img src="../../public/home-img/img.png" class="img" />
    <div class="list">
      <div v-for="item in list" :key="item" @click="$router.push(item.router)">
        <img :src="item.img" alt="" />
        <div class="list-title">{{ item.title }}</div>
      </div>
    </div>
    <div>
      <h4>{{ $t("newsAnnouncement") }}</h4>
      <div class="cell">
        <van-cell
          center
          :title="$t('addressBook')"
          is-link
          to="home"
          label="描述信息"
          title-style="text-align: left"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import { Cell } from "vant";
import $api from "../api/index";
import { onMounted } from "@vue/runtime-core";

export default {
  components: {
    NavBar,
    [Cell.name]: Cell,
  },
  setup() {
    const { t } = useI18n();
    const list = [
      {
        img: "../../public/home-img/getting-started.png",
        title: t("gettingStarted"),
        router: "/gettingStarted",
      },
      {
        img: "../../public/home-img/prohibited-items.png",
        title: t("prohibitedItems"),
        router: "/prohibitedItems",
      },
      {
        img: "../../public/home-img/common-problem.png",
        title: t("commonProblem"),
        router: "/commonProblem",
      },
    ];
    const getArticle = () => {
      $api.getArticle().then((res) => {});
    };
    onMounted(() => {
      getArticle();
    });
    return {
      list,
    };
  },
};
</script>

<style lang="less" scoped>
.help-support {
  min-height: 100vh;
  padding: 10px;
  .img {
    width: 100%;
    height: 180px;
  }
  .list {
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    background-color: #fff;
    margin: 10px 0;
    border-radius: 10px;
    img {
      width: 40px;
    }
    .list-title {
      font-size: 15px;
      font-weight: 500;
      color: #555555;
    }
  }
  .cell {
    padding: 3px;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>