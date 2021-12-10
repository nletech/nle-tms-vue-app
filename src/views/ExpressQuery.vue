<template>
  <!-- 快件查询 -->
  <div class="express-query">
    <nav-bar :title="$t('expressQuery')" :needBack="false"></nav-bar>

    <van-search
      v-model="form.keyword"
      shape="round"
      background="#fff"
      :placeholder="$t('enterOrderNumberQuery')"
      @search="search"
    />
    <van-tabs
      v-model:active="active"
      @change="onTabChange"
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
            :finished-text="$t('noMore')"
            @load="onLoad"
            class="list"
          >
            <div class="list-item" v-for="item in itemList.list" :key="item.id">
              <div class="item-top">
                <div class="item-font">
                  {{ $t("orderNumber") }}: {{ item.order_no }}
                </div>
                <div
                  v-if="item.status == 3 && item.pay_status !== 1"
                  @click="toDelete(item.id)"
                  style="cursor: pointer"
                >
                  <van-icon name="delete-o" />
                </div>
              </div>
              <div class="item">
                <div>{{ item.place_city }}</div>
                <div>
                  <img
                    v-if="item.status == 3 && item.pay_status !== 1"
                    src="/query-img/arrow-tangerine.png"
                    alt=""
                  />
                  <img
                    v-else
                    src="/query-img/arrow-green.png"
                    alt=""
                  />
                </div>
                <div>{{ item.second_place_city }}</div>
              </div>
              <div class="item font">
                <div>{{ item.place_fullname }}</div>
                <div v-if="item.pay_status == 1" style="color: #2dc18c">
                  {{ item.pay_status_name }}
                </div>
                <div v-else>
                  {{ item.status_name }}
                </div>
                <!-- <div>
                  {{ $t("pickingUp") }}
                </div>
                <div>
                  {{ $t("haveBeenReceived") }}
                </div> -->
                <div>{{ item.second_place_fullname }}</div>
              </div>
              <div class="footer footer-font">
                <div>
                  <div v-if="item.pay_status == 1" style="margin-bottom: 10px">
                    {{ $t("orderStatus") }}: {{ item.pay_status_name }}
                  </div>
                  <div style="margin-bottom: 10px" v-else>
                    {{ $t("orderStatus") }}: {{ item.status_name }}
                  </div>
                  <div v-if="item.status == 1">
                    {{ $t("estimatedPickupTime") }}: {{ item.execution_date }}
                  </div>
                  <div v-if="item.status == 2">
                    {{ $t("estimatedDeliveryTime") }}: {{ item.execution_date }}
                  </div>
                  <div v-if="item.status == 3">
                    {{ $t("submissionTime") }}: {{ item.execution_date }}
                  </div>
                </div>
                <div>
                  <van-button
                    v-if="item.pay_status == 1"
                    round
                    size="small"
                    type="success"
                    plain
                    @click="
                      $router.push({
                        name: 'ToPay',
                        query: {
                          id: item.id,
                        },
                      })
                    "
                    >{{ $t("toPay") }}</van-button
                  >
                  <van-button
                    v-if="item.status == 3 && item.pay_status !== 1"
                    round
                    size="small"
                    plain
                    type="warning"
                    @click="
                      $router.push({
                        name: 'ShipByAppointment',
                        query: {
                          id: item.id,
                        },
                      })
                    "
                    >{{ $t("anotherOrder") }}</van-button
                  >
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
import {
  Tab,
  Tabs,
  Search,
  List,
  PullRefresh,
  Button,
  Icon,
  Toast,
} from "vant";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import { useRoute } from "vue-router";
import $api from "../api/index";

export default {
  components: {
    NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Search.name]: Search,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  setup() {
    const route = useRoute();
    const active = ref(Number(route.query.active) || 0);
    const { t } = useI18n();
    const form = ref({
      page: 1,
      per_page: 10,
      keyword: "",
    });
    const tabsList = reactive([
      {
        id: 0,
        name: t("all"),
        list: [],
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
    const onLoad = () => {
      if (active.value == 0) {
        form.value = {
          ...form.value,
          pay_status: null,
          status: null,
        };
      } else if (active.value == 1) {
        form.value = {
          ...form.value,
          status: null,
          pay_status: 1,
        };
      } else if (active.value == 2) {
        form.value = {
          ...form.value,
          status: 1,
          pay_status: 2,
        };
      } else if (active.value == 3) {
        form.value = {
          ...form.value,
          status: 2,
          pay_status: 2,
        };
      } else if (active.value == 4) {
        form.value = {
          ...form.value,
          status: 3,
          pay_status: 2,
        };
      }
      $api.getOrder(form.value).then((res) => {
        if (tabsList[active.value].refreshing) {
          tabsList[active.value].list = [];
          tabsList[active.value].refreshing = false;
        }
        tabsList[active.value].list.push(...res.data.data);
        form.value.page++;
        tabsList[active.value].loading = false;
        if (tabsList[active.value].list.length >= res.data.meta.total) {
          tabsList[active.value].finished = true;
        }
      });
    };
    const onRefresh = () => {
      tabsList[active.value].refreshing = true;
      tabsList[active.value].finished = false;
      tabsList[active.value].loading = true;
      form.value.page = 1;
      onLoad();
    };
    const onTabChange = (val) => {
      tabsList[active.value].refreshing = true;
      tabsList[active.value].finished = false;
      tabsList[active.value].loading = true;
      form.value.page = 1;
      active.value = val;
      onLoad();
    };
    const search = () => {
      tabsList[active.value].refreshing = true;
      tabsList[active.value].finished = false;
      tabsList[active.value].loading = true;
      form.value.page = 1;

      onLoad();
    };
    const toDelete = (id) => {
      $api.delOrder(id).then((res) => {
        if (res.code == 200) {
          Toast.success(t("successful"));
        } else {
          Toast.fail(res.msg);
        }
      });
    };
    return {
      form,
      active,
      tabsList,
      onRefresh,
      onLoad,
      onTabChange,
      search,
      toDelete,
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
      .item-top {
        display: flex;
        justify-content: space-between;
      }
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