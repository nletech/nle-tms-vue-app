<template>
  <!-- 首页 -->
  <nav-bar title="TMS" :needBack="false"></nav-bar>
  <div class="home-box">
    <van-swipe :autoplay="3000" lazy-render indicator-color="white">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image.img" class="home-img" />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar left-icon="volume-o" background="#fff" class="notice-title">
      <div class="notice">
        <div>技术是开发它的人的共同灵魂。</div>
        <div>更多</div>
      </div>
    </van-notice-bar>
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
      <div v-for="item in list" :key="item">
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
    const images = [
      {
        img: "../../public/home-img/img.png",
      },
      {
        img: "../../public/home-img/img.png",
      },
      {
        img: "../../public/home-img/img.png",
      },
    ];
    const list = [
      {
        img: "../../public/home-img/img-1.png",
        title: t("freightEstimate"),
        introduce: t("userEstimateShipping"),
      },
      {
        img: "../../public/home-img/img-2.png",
        title: t("onlineEnquiry"),
        introduce: t("userNetworkQuery"),
      },
      {
        img: "../../public/home-img/img-3.png",
        title: t("helpAndSupport"),
        introduce: t("understandShippingConsiderations"),
      },
    ];
    return {
      images,
      list,
      router,
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
  .notice-title {
    .notice {
      display: flex;
      justify-content: space-between;
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
    margin-bottom: 10px;
    width: 10px;
    height: 10px;
  }
}
</style>