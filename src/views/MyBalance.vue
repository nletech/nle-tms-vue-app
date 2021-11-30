<template>
  <!-- 我的余额 -->
  <nav-bar
    :title="$t('myBalance')"
    :needBack="ture"
    :onClickLeft="() => $router.push('/me')"
  ></nav-bar>
  <div class="my-balance">
    <div class="balance">
      <div>
        <div class="available-balance">
          {{ $t("availableBalance") }}({{ currencyUnit }})
        </div>
        <div class="available-balance">{{ info.balance }}</div>
        <div>{{ $t("credits") }}({{ currencyUnit }}):{{ info.credit }}</div>
      </div>
      <div>
        <van-button
          round
          size="small"
          type="default"
          style="width: 80px"
          to="Recharge"
          >{{ $t("recharge") }}</van-button
        >
      </div>
    </div>
    <van-tabs
      v-model:active="activeName"
      @change="onTabChange"
      color="#2DC18C"
      title-active-color="#2DC18C"
    >
      <van-tab
        v-for="item in tabsList"
        :key="item.id"
        :title="item.name"
        :name="item.id"
      >
        <div v-for="item in billRecharge" :key="item">
          <div class="income-box">
            <div>
              <div class="headline">{{ item.mode_name }}</div>
              <div class="subtitle">{{ item.updated_at }}</div>
            </div>
            <div>
              <div class="headline">{{ item.actual_amount }}</div>
              <div class="subtitle">{{ $t("paymentCompleted") }}</div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import NavBar from "../components/NavBar.vue";
import { useStore } from "vuex";
import { Button, Tab, Tabs } from "vant";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import $api from "../api/index";
// import cn from "../lib/i18n/cn";

export default {
  components: {
    NavBar,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const currencyUnit = computed(() => store.state.currencyUnit);
    const info = ref({});
    const billRecharge = ref([]);
    const activeName = ref(1);
    const tabsList = reactive([
      {
        id: 1,
        name: t("expenditure"),
      },
      {
        id: 2,
        name: t("income"),
      },
    ]);
    const onTabChange = (val) => {
      if (val == 1) {
        getBillVerify();
      } else {
        getBillRecharge();
      }
    };
    const getLedger = () => {
      $api.getLedger().then((res) => {
        info.value = res.data;
      });
    }; //财务记录
    const getBillVerify = () => {
      $api.getBillVerify().then((res) => {
        billRecharge.value = res.data.data;
      });
    }; //对账账单
    const getBillRecharge = () => {
      $api.getBillRecharge({ status: 2 }).then((res) => {
        billRecharge.value = res.data.data;
      });
    }; //充值记录

    onMounted(() => {
      getLedger();
      getBillVerify();
    });
    return {
      onTabChange,
      billRecharge,
      currencyUnit,
      tabsList,
      info,
      activeName,
    };
  },
};
</script>

<style lang="less" scoped>
.my-balance {
  padding: 10px;
  .balance {
    padding: 10px 20px;
    margin-bottom: 10px;
    background-color: #2dc18c;
    height: 120px;
    border-radius: 10px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .available-balance {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }
  .income-box {
    display: flex;
    justify-content: space-between;
    height: 70px;
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    .headline {
      margin: 10px 0;
      font-size: 20px;
    }
    .subtitle {
      color: #999999;
    }
  }
}
</style>