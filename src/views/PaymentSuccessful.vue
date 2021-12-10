<template>
  <!-- 支付完成 -->
  <div class="payment-successful">
    <div class="successful">
      <img src="/home-img/success.png" alt="" width="30" />
      <h2>{{ $t("paymentCompleted") }}</h2>
    </div>
    <div class="btn">
      <van-button type="success" block>{{ $t("completePayment") }} </van-button>
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  components: {
    [Button.name]: Button,
  },
};
</script>

<style lang="less" scoped>
.payment-successful {
  height: 100vh;
  .successful {
    padding-top: 200px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn {
    padding: 20px;
  }
}
</style>