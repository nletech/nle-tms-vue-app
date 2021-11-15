<template>
  <!-- 快件查询 -->
  <div class="express-query">
    <nav-bar :title="$t('expressQuery')" :needBack="false"></nav-bar>
    <van-search
      v-model="value"
      shape="round"
      background="#fff"
      :placeholder="$t('enterOrderNumberQuery')"
    />
    <van-tabs
      v-model:active="active"
      color="#2DC18C"
      title-active-color="#2DC18C"
      sticky
    >
      <van-tab
        v-for="itemList in tabsList"
        :key="itemList.id"
        :title="itemList.name"
        :name="itemList.id"
      >
        <van-pull-refresh v-model="itemList.refreshing" @refresh="onRefresh">
          <van-list
            v-model:loading="itemList.loading"
            :finished="itemList.finished"
            finished-text="No more"
            @load="onLoad"
            class="list"
          >
            <div class="list-item" v-for="item in itemList.list" :key="item">
              <div class="item-font">
                {{ $t("orderNumber") }}: {{ item.order_no }}
              </div>
              <div class="item">
                <div>{{ "Amstelveen" }}</div>
                <div>
                  <img
                    src="../../public/query-img/arrow-green.png"
                    alt=""
                    width="35"
                  />
                  <!-- <img
                    src="../../public/query-img/arrow-tangerine.png"
                    alt=""
                  /> -->
                </div>
                <div>{{ "Amstelveen" }}</div>
              </div>
              <div class="item font">
                <div>{{ "sujian" }}</div>
                <div>
                  {{ $t("待分配") }}
                </div>
                <!-- <div>
                  {{ $t("pickingUp") }}
                </div>
                <div>
                  {{ $t("haveBeenReceived") }}
                </div> -->
                <div>{{ "sujian" }}</div>
              </div>
              <div class="footer footer-font">
                <div>
                  <div style="margin-bottom: 10px">
                    {{ $t("orderStatus") }}: {{ "已签收" }}
                  </div>
                  <div>{{ $t("estimatedPickupTime") }}: {{ "2021-20-2" }}</div>
                  <!-- <div>{{ $t("estimatedDeliveryTime") }}: {{ "214131" }}</div>
                  <div>{{ $t("submissionTime") }}: {{ "214131" }}</div> -->
                </div>
                <div>
                  <van-button round size="small" type="default">{{
                    $t("cancelOrder")
                  }}</van-button>
                  <!-- <van-button round size="small" plain type="warning">{{
                    $t("anotherOrder")
                  }}</van-button> -->
                 
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import NavBar from "../components/NavBar.vue";
import { Tab, Tabs, Search, List, PullRefresh, Button } from "vant";
import { useI18n } from "vue-i18n"; //要在js中使用国际化

export default {
  components: {
    NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Button.name]: Button,
  },
  setup() {
    const { t } = useI18n();

    const tabsList = reactive([
      {
        id: 0,
        name: t("all"),
        list: [
          { order_no: "r14132442" },
          { order_no: "r14132442" },
          { order_no: "r14132442" },
        ],
        loading: false,
        finished: false,
        refreshing: false,
      },
      {
        id: 1,
        name: t("toBePaid"),
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
      },
      {
        id: 2,
        name: t("assigned"),
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
      },
      {
        id: 3,
        name: t("pickingUp"),
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
      },
      {
        id: 4,
        name: t("haveBeenReceived"),
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
      },
    ]);
    const onLoad = () => {};
    const onRefresh = () => {
      tabsList[active.value].refreshing = true;
      tabsList[active.value].finished = false;
      tabsList[active.value].loading = true;
      onLoad();
    };
    return {
      tabsList,
      onRefresh,
    };
  },
};
</script>

<style lang="less" scoped>
.express-query {
  .list {
    min-height: calc("100vh - 144px");
    overflow: hidden;
    .list-item {
      border-radius: 10px;
      background-color: #fff;
      margin: 10px;
      padding: 10px;
      .item-font {
        color: #555555;
      }
      .item {
        display: grid;
        grid-template-columns: 1fr 50px 1fr;
        text-align: center;
        align-items: center;
        font-size: 18px;
        font-weight: 500;
      }
      .font {
        font-size: 13px;
        color: #999999;
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999999;
      margin: 10px 0px;
    }
  }
}
</style>