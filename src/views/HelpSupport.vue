<template>
  <!-- 帮助与支持 -->
  <nav-bar
    :title="$t('helpSupport')"
    
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
        <van-cell-group v-for="item in newsData" :key="item">
          <van-cell
            center
            :title="item.tittle"
            is-link
            to="articleDetails"
            :label="item.updated_at"
            title-style="text-align: left"
            @click="toArticleDetails(item)"
          />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import { CellGroup, Cell } from "vant";
import $api from "../api/index";
import { useRouter } from "vue-router";
import { ref, onMounted } from "@vue/runtime-core";

export default {
  components: {
    NavBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
  },
  setup() {
    const { t } = useI18n();
    const newsData = ref([]);
    const router = useRouter();

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
      $api.getArticle().then((res) => {
        let data = res.data.data;
        data.map((el) => {
          if (el.type == 1) {
            newsData.value.push(el);
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
      list,
      newsData,
      toArticleDetails,
    };
  },
};
</script>

<style lang="less" scoped>
.help-support {
  min-height: calc(100vh - 86px);
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
    padding: 0 5px;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>