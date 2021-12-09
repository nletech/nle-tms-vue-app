<template>
  <!-- 订单支付 -->
  <nav-bar :title="$t('pay')"></nav-bar>
  <div class="to-pay">
    <div class="order-number">
      <div class="order">{{ $t("orderNumber") }} : {{ details.order_no }}</div>
      <h2>{{ currencyUnit }} {{ details.count_settlement_amount }}</h2>
    </div>
    <div class="payee-box">
      <div class="payee">
        <div class="title">{{ $t("payee") }}</div>
        <div>{{ userInfo.name }}</div>
      </div>
      <div class="payee">
        <div class="title">{{ $t("payby") }}</div>
        <div>余额</div>
      </div>
    </div>
    <div class="btn">
      <van-button type="success" block @click="orderPay"
        >{{ $t("payImmediately") }}
      </van-button>
      <div
        class="pay-later"
        @click="
          $router.push({
            name: 'ExpressQuery',
            query: {
              active: 1,
            },
          })
        "
      >
        {{ $t("payLater") }}
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, computed } from "vue";
import NavBar from "../components/NavBar.vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import $api from "../api/index";
import { Button, Toast } from "vant";

export default {
  components: {
    NavBar,
    [Button.name]: Button,
  },
  setup() {
    const userInfo = computed(() => store.state.userInfo);
    const details = ref({});
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const currencyUnit = computed(() => store.state.currencyUnit);
    const getDetailsOrder = () => {
      $api.getDetailsOrder(route.query.id).then((res) => {
        details.value = res.data;
      });
    };
    const orderPay = () => {
      $api.orderPay({ order_no: details.value.order_no }).then((res) => {
        if (res.code == 200) {
          router.push({
            name: "SuccessfullyOrdered",
            query: {
              id: route.query.id,
            },
          });
        } else {
          Toast.fail(res.msg);
        }
      });
    };

    onMounted(() => {
      getDetailsOrder();
    });
    return {
      userInfo,
      currencyUnit,
      details,
      orderPay,
    };
  },
};
</script>

<style lang="less" scoped>
.to-pay {
  .order-number {
    background-color: #fff;
    height: 90px;
    text-align: center;
    padding-top: 20px;
    .order {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 20px;
    }
  }
  .payee-box {
    margin-top: 2px;
    height: 90px;
    background-color: #fff;
    .payee {
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      .title {
        color: #999;
      }
    }
  }
  .btn {
    padding: 20px;
    .pay-later {
      margin-top: 10px;
      font-size: 15px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>