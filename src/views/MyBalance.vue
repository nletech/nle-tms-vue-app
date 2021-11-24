<template>
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
        <div class="available-balance"></div>
        <div>{{ $t("credits") }}({{ currencyUnit }}):</div>
      </div>
      <div>
        <van-button round size="small" type="default" style="width: 80px">{{
          $t("recharge")
        }}</van-button>
      </div>
    </div>
    <van-tabs
      v-model:active="activeName"
      color="#2DC18C"
      title-active-color="#2DC18C"
    >
      <van-tab
        v-for="item in tabsList"
        :key="item.id"
        :title="item.name"
        :name="item.id"
      >
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import NavBar from "../components/NavBar.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { Button, Tab, Tabs } from "vant";
import { useI18n } from "vue-i18n"; //要在js中使用国际化

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

    return {
      currencyUnit,
      tabsList,
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
}
</style>