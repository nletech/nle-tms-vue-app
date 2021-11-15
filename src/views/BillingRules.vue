<template>
  <!-- 计费规则 -->
  <div class="billing-rules">
    <nav-bar
      :title="$t('billingRules')"
      :needBack="ture"
      :onClickLeft="() => $router.push('/me')"
    ></nav-bar>
    <div class="billing">
      <h3>{{ $t("fixedCosts") }} : {{ "$11.00" }}</h3>
      <h3>{{ $t("weightCharge") }}</h3>
      <div>
        <table border="1" cellpadding="10" cellspacing="0" class="table">
          <thead>
            <tr>
              <th>{{ $t("weightRange") }}</th>
              <th>{{ $t("cost") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in productList" :key="index">
              <td :colspan="1">
                {{ item.name }}
              </td>
              <td>{{ item.attrs }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>{{ $t("mileageFee") }}</h3>
      <div>
        <table border="1" cellpadding="10" cellspacing="0" class="table">
          <thead>
            <tr>
              <th>{{ $t("mileageRange") }}</th>
              <th>{{ $t("cost") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in productList" :key="index" class="table">
              <td :colspan="1">
                {{ item.name }}
              </td>
              <td>{{ item.attrs }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>{{ $t("billingMethod") }} : {{ "阶梯乘积值计算" }}</h3>
      <h6>
        {{
          $t(
            "（固定费用+(每单位重量价格*重量价格）*（每单位里程价格*里程价格））"
          )
        }}
      </h6>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import NavBar from "../components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  setup() {
    const productList = reactive([
      { name: "41", attrs: "4Î" },
      { name: "41", attrs: "4Î" },
    ]);
    return {
      productList,
    };
  },
};
</script>

<style lang="less" scoped>
.billing-rules {
  min-height: 100vh;
  background-color: #fff;
  .billing {
    padding: 10px;
  }
  .table {
    width: 80%;
    background-color: #f5f9f7;
    border-color: #fff;
  }
}
th {
  border-color: #fff;
}
</style>