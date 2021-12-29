<template>
  <!-- 我的 -->
  <div class="me">
    <div class="header">
      <div class="header-box">
        <van-image
          class="avatar"
          fit="cover"
          round
          error-icon="/me-img/me.png"
          src="/me-img/me.png"
        >
        </van-image>
        <h3>{{ userForm.name }}</h3>
        <h3>ID:{{ userForm.code }}</h3>
      </div>
      <div class="paid">
        <div class="my-purse">
          {{ $t("myPurse") }}
        </div>
        <div class="num" @click="$router.push('/myBalance')">
          {{ balance || "0.00" }}
        </div>
        <div class="balance">{{ $t("balance") }}</div>
      </div>
      <div class="cell">
        <van-cell
          icon="/me-img/personal-Information.png"
          :title="$t('personalInformation')"
          is-link
          to="PersonalInformation"
          title-style="text-align: left"
        />
        <van-cell
          icon="/me-img/address-book.png"
          :title="$t('addressBook')"
          is-link
          to="AddressBook"
          title-style="text-align: left"
        />
        <van-cell
          icon="/me-img/billing-rules.png"
          :title="$t('billingRules')"
          is-link
          to="BillingRules"
          title-style="text-align: left"
        />
        <van-cell
          icon="/me-img/about.png"
          :title="$t('aboutUs')"
          is-link
          to="AboutUs"
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
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import {
  ORDER_MEAL_TOKEN,
  CURRENCY_UNIT,
  VOLNME_UNIT,
  WEIGHT_UNIT,
} from "../store";
import { Image as VanImage, Cell, Button, Dialog } from "vant";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import { useRouter } from "vue-router";
import $api from "../api/index";

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
    const balance = ref();
    const userInfo = computed(() => store.state.userInfo);
    const userForm = ref({});
    const logOut = () => {
      Dialog.confirm({
        message: t("areSureWantLogOut"),
      })
        .then(() => {
          store.commit(ORDER_MEAL_TOKEN, "");
          store.commit(CURRENCY_UNIT, "");
          store.commit(VOLNME_UNIT, "");
          store.commit(WEIGHT_UNIT, "");
          router.push("/login");
        })
        .catch(() => {});
    };
    const getLedger = () => {
      $api.getLedger().then((res) => {
        balance.value = res.data.balance;
      });
    };
    const getMerchant = () => {
      $api.getMerchant().then((res) => {
        userForm.value = res.data;
      });
    };
    onMounted(() => {
      getLedger();
      getMerchant();
    });
    return {
      userInfo,
      userForm,
      logOut,
      balance,
    };
  },
};
</script>

<style lang="less" scoped>
.me {
  .header {
    height: 180px;
    background: url(/me-img/banner.png) center;
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
      cursor: pointer;
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