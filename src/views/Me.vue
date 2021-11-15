<template>
  <div class="me">
    <div class="header">
      <div class="header-box">
        <van-image
          class="avatar"
          fit="cover"
          round
          error-icon="../../public/me-img/me.png"
          src="../../public/me-img/me.png"
        >
        </van-image>
        <h3>{{ "userInfo.id" }}</h3>
        <h3>ID:00125</h3>
      </div>
      <div class="paid">
        <div class="my-purse">
          {{ $t("myPurse") }}
        </div>
        <div class="num">100000</div>
        <div class="balance">{{ $t("balance") }}</div>
      </div>
      <div class="cell">
        <van-cell
          icon="../../public/me-img/personal-Information.png"
          :title="$t('personalInformation')"
          is-link
          to="PersonalInformation"
          title-style="text-align: left"
        />
        <van-cell
          icon="../../public/me-img/address-book.png"
          :title="$t('addressBook')"
          is-link
          to="home"
          title-style="text-align: left"
        />
        <van-cell
          icon="../../public/me-img/billing-rules.png"
          :title="$t('billingRules')"
          is-link
          to="BillingRules"
          title-style="text-align: left"
        />
        <van-cell
          icon="../../public/me-img/about.png"
          :title="$t('aboutUs')"
          is-link
          to="home"
          title-style="text-align: left"
        />
      </div>
      <div class="sign-out">
        <van-button @click="logOut">{{ $t("signOut") }} </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { ORDER_MEAL_TOKEN } from "../store";
import { Image as VanImage, Cell, Button, Dialog } from "vant";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import { useRouter } from "vue-router";
export default {
  components: {
    [VanImage.name]: VanImage,
    [Cell.name]: Cell,
    [Button.name]: Button,
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const logOut = () => {
      Dialog.confirm({
        message: t("areSureWantLogOut"),
      })
        .then(() => {
          store.commit(ORDER_MEAL_TOKEN, "");
          router.push("/login");
        })
        .catch(() => {});
    };
    const userInfo = computed(() => store.state.userInfo);
    store.dispatch("getUserInfo");
    return {
      userInfo,
      logOut,
    };
  },
};
</script>

<style lang="less" scoped>
.me {
  .header {
    height: 180px;
    background: url(../../public/me-img/banner.png) center;
    // background-position: center center;
    .header-box {
      position: relative;
      margin: 0 10px;
      padding: 5px;
      top: 60px;
      height: 140px;
      border-radius: 10px;
      background-color: #fff;
      text-align: center;
      color: #555555;
      .avatar {
        width: 55px;
      }
    }
  }
  .paid {
    height: 100px;
    border-radius: 10px;
    margin: 70px 10px 10px;
    padding: 5px 20px;
    background-color: #fff;
    .my-purse {
      font-size: 20px;
      font-weight: 500;
      color: #555555;
    }
    .num {
      font-size: 25px;
      font-weight: 500;
      color: #2dc18c;
      margin: 5px 0px;
    }
    .balance {
      margin-left: 23px;
      color: #555555;
    }
  }
  .cell {
    padding: 3px;
    margin: 0px 10px;
    border-radius: 10px;
    background-color: #fff;
  }
  .sign-out {
    margin: 10px;
    .van-button {
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>