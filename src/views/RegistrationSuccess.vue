<template>
  <div class="registration-success">
    <div class="logo">
      <img src="../assets/login-logo.jpg" style="width: 100px" alt="" />
      <h1>红兔TMS</h1>
    </div>
    <h1 class="success">{{ $t("registrationSuccess") }}</h1>
    <van-button class="btn" block type="success" round to="login">
      {{ $t("goLogin") }}
    </van-button>
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
.registration-success {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  text-align: center;
  .logo {
    margin: 50px 0 0;
  }
  .success {
    margin: 150px 0;
  }
  .btn {
    margin: 0 auto;
    width: 90%;
  }
}
</style>