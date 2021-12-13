<template>
  <!-- 支付完成 -->
  <nav-bar :title="$t('paymentCompleted')"></nav-bar>
  <div class="payment-successful">
    <div class="successful">
      <img src="/home-img/success.png" alt="" width="30" />
      <h2>{{ $t("paymentCompleted") }}</h2>
    </div>
    <div class="btn">
      <van-button type="success" block @click="completePayment"
        >{{ $t("completePayment") }}
      </van-button>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { Button, Toast } from "vant";
import { onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import $api from "../api/index";
export default {
  components: {
    NavBar,
    [Button.name]: Button,
  },
  setup() {
    const url = ref();
    const router = useRouter();
    const completePayment = () => {
      // 解析参数
      let arrUrl = url.value.split("?");
      let para = arrUrl[1];
      let cs_arr = para.split("&");
      let cs = {};
      for (let i = 0; i < cs_arr.length; i++) {
        //遍历数组，拿到json对象
        cs[cs_arr[i].split("=")[0]] = cs_arr[i].split("=")[1];
      }
      // 参数赋值
      let obj = {
        payment_id: cs.paymentId,
        status: cs.status,
        payer_id: cs.PayerID,
      };
      $api.putPaypal(obj).then((res) => {
        if (res.code == 200) {
          router.push("/myBalance");
        } else {
          Toast.fail(res.msg);
        }
      });
    };
    onMounted(() => {
      url.value = document.location.toString(); //获取网址参数
    });
    return {
      url,
      completePayment,
    };
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