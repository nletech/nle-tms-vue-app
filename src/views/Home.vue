<template>
  <!-- 首页 -->
  <nav-bar title="TMS" :needBack="false"></nav-bar>
  <div class="home-box">
    <van-swipe
      :autoplay="rollingTime"
      lazy-render
      indicator-color="white"
      style="height: 180px"
    >
      <van-swipe-item v-for="item in images" :key="item">
        <img
          v-if="item.jump_type == 1"
          :src="item.picture_url"
          class="home-img"
          @click="toRouter(item)"
        />
        <a :href="item.outside_jump_url" v-else>
          <img :src="item.picture_url" class="home-img" />
        </a>
      </van-swipe-item>
    </van-swipe>
    <div class="notice-title">
      <van-notice-bar
        left-icon="volume-o"
        background="#fff"
        class="notice"
        @click="toArticleDetails(news)"
      >
        {{ news.tittle }}
      </van-notice-bar>
      <div class="more" @click="$router.push('/helpSupport')">
        {{ $t("more") }}
      </div>
    </div>

    <div class="ship-appointment" @click="$router.push('/shipByAppointment')">
      <div class="appointment">
        <img src="../../public/home-img/send.png" alt="" />
        <div>
          <div class="ship-title">
            {{ $t("shipByAppointment") }}
          </div>
          <div class="ship-introduce">
            {{ $t("salesmanPicksUp") }}
          </div>
        </div>
      </div>
      <div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="list">
      <div v-for="item in list" :key="item" @click="$router.push(item.router)">
        <img :src="item.img" alt="" />
        <div class="list-title">{{ item.title }}</div>
        <div class="list-introduce">{{ item.introduce }}</div>
      </div>
    </div>
  </div>
</template>

<script >
import { Swipe, SwipeItem, NoticeBar, Icon } from "vant";
import NavBar from "../components/NavBar.vue";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import $api from "../api/index";
export default {
  components: {
    NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [NoticeBar.name]: NoticeBar,
    [Icon.name]: Icon,
  },
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const images = ref([]);
    const rollingTime = ref("");
    const news = ref({});
    const list = [
      {
        img: "../../public/home-img/img-1.png",
        title: t("freightEstimate"),
        introduce: t("userEstimateShipping"),
        router: "/",
      },
      {
        img: "../../public/home-img/img-2.png",
        title: t("onlineEnquiry"),
        introduce: t("userNetworkQuery"),
        router: "/",
      },
      {
        img: "../../public/home-img/img-3.png",
        title: t("helpAndSupport"),
        introduce: t("understandShippingConsiderations"),
        router: "/helpSupport",
      },
    ];
    // 跳转路由
    const toRouter = (item) => {
      if (item.inside_jump_type == 1) {
        router.push("/helpSupport");
      } else if (item.inside_jump_type == 2) {
        router.push("/gettingStarted");
      } else if (item.inside_jump_type == 3) {
        router.push("/prohibitedItems");
      } else if (item.inside_jump_type == 4) {
        router.push("/commonProblem");
      }
    };
    //轮播图
    const getCarousel = () => {
      $api.getCarousel().then((res) => {
        images.value = res.data.data;
        // 获取滚动时长
        res.data.data.map((el) => {
          if (el.rolling_time == 1) {
            return (rollingTime.value = 1000);
          } else if (el.rolling_time == 2) {
            return (rollingTime.value = 2000);
          } else if (el.rolling_time == 3) {
            return (rollingTime.value = 3000);
          } else if (el.rolling_time == 4) {
            return (rollingTime.value = 4000);
          } else if (el.rolling_time == 5) {
            return (rollingTime.value = 5000);
          }
        });
      });
    };
    const getArticle = () => {
      $api.getArticle().then((res) => {
        let data = [];
        res.data.data.map((el) => {
          if (el.type == 1) {
            data.push(el);
            news.value = data[0];
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
      getCarousel();
      getArticle();
    });
    return {
      toRouter,
      rollingTime,
      images,
      list,
      router,
      news,
      toArticleDetails,
    };
  },
};
</script>

<style lang="less" scoped>
.home-box {
  min-height: calc(100vh - 70px);
  background-color: #fff;
  padding: 10px;
  .home-img {
    width: 100%;
    height: 180px;
  }
  /deep/.van-notice-bar {
    width: 80% !important;
  }
  .notice-title {
    display: flex;
    align-items: center;
    .notice {
      cursor: pointer;
    }
    .more {
      cursor: pointer;
      color: #ed6a0c;
    }
  }

  .ship-appointment {
    height: 100px;
    background-color: #f5f9f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    .appointment {
      display: flex;
      align-items: center;
    }
    img {
      width: 80px;
      margin-right: 10px;
    }
    .ship-title {
      font-size: 20px;
      font-weight: 500;
      color: #555555;
    }
    .ship-introduce {
      color: #999999;
    }
  }
  .list {
    height: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    img {
      width: 40px;
    }
    .list-title {
      font-size: 16px;
      font-weight: 500;
      color: #555555;
    }
    .list-introduce {
      font-size: 10px;
      color: #999999;
    }
  }
  /deep/.van-swipe__indicator {
    margin-bottom: 5px;
    width: 7px;
    height: 7px;
  }
}
</style>