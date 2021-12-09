<template>
  <!-- 地址薄 -->
  <div class="address">
    <nav-bar :title="$t('addressBook')"></nav-bar>
    <van-search
      v-model="form.keyword"
      shape="round"
      background="#fff"
      :placeholder="$t('PleaseEnterNameMobilePhoneNumber')"
      @search="search"
    />
    <div class="record-list">
      <van-tabs
        v-model:active="active"
        @change="onTabChange"
        color="#2DC18C"
        title-active-color="#2DC18C"
      >
        <van-tab
          v-for="itemList in tabsList"
          :key="itemList.id"
          :title="itemList.name"
          :name="itemList.id"
        >
          <van-list
            v-model:loading="itemList.loading"
            :finished="itemList.finished"
            :finished-text="$t('noMore')"
            @load="onLoad"
            class="list"
          >
            <div
              class="list-item"
              v-for="item in itemList.list"
              :key="item.id"
              @click="$route.query.type ? toShipAppointment(item) : ''"
            >
              <div class="item-box">
                <div class="item-font">
                  {{ item.place_fullname }}&nbsp;&nbsp;&nbsp;
                  {{ item.place_phone }}
                </div>
                <div class="item-address">
                  {{ item.place_address }}
                </div>
              </div>
              <div class="item-operate">
                <div>
                  <van-radio-group v-model="checked">
                    <van-radio
                      :name="item.id"
                      checked-color="#33D401"
                      @click="putAddressDefault"
                    >
                      {{
                        active == 0
                          ? $t("setDefaultRecipientAddress")
                          : $t("setDefaultSenderAddress")
                      }}</van-radio
                    >
                  </van-radio-group>
                </div>
                <div class="btn">
                  <div class="operate-btn" @click="onEdit(item)">
                    <van-icon name="records" color="#999999" />
                    {{ $t("edit") }}
                  </div>
                  <div class="operate-btn" @click="onDelete(item.id)">
                    <van-icon name="delete-o" color="#999999" />
                    {{ $t("delete") }}
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <div class="footer-btn">
      <van-button type="success" round block @click="onAdd"
        >{{ active == 0 ? $t("addRecipientAddress") : $t("addSenderAddress") }}
      </van-button>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { ref, reactive, onMounted } from "vue";
import {
  Button,
  Tabs,
  Tab,
  Search,
  List,
  RadioGroup,
  Radio,
  Icon,
  Toast,
  Dialog,
} from "vant";
import { useRouter, useRoute } from "vue-router";
import $api from "../api/index";
import { useI18n } from "vue-i18n"; //要在js中使用国际化

export default {
  name: "balance",
  components: {
    NavBar,
    [Button.name]: Button,
    [Search.name]: Search,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Icon.name]: Icon,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const active = ref(Number(route.query.type) || 0);
    const checked = ref();
    const form = ref({
      page: 1,
      per_page: 10,
      keyword: "",
    });
    const tabsList = reactive([
      // 收件
      {
        id: 0,
        name: t("shippingAddress"),
        list: [],
        loading: false,
        finished: false,
      },
      // 取件
      {
        id: 1,
        name: t("senderAddress"),
        list: [],
        loading: false,
        finished: false,
      },
    ]);

    const onLoad = () => {
      if (active.value == 0) {
        form.value = {
          ...form.value,
          type: 2,
        };
      } else {
        form.value = {
          ...form.value,
          type: 1,
        };
      }
      $api.getAddress(form.value).then((res) => {
        // tabsList[active.value]获取点击的索引
        tabsList[active.value].list.push(...res.data.data);
        tabsList[active.value].loading = false;
        form.value.page++;
        if (tabsList[active.value].list.length >= res.data.meta.total) {
          tabsList[active.value].finished = true;
        }
        res.data.data.map((item) => {
          if (item.is_default == 1) {
            checked.value = item.id;
          }
        });
      });
    };
    const onTabChange = (val) => {
      tabsList[active.value].list = []; //先置空会有历史记录
      tabsList[active.value].loading = true;
      tabsList[active.value].finished = false;
      active.value = val;
      form.value.page = 1;
      onLoad();
    };
    const search = () => {
      tabsList[active.value].list = []; //先置空会有历史记录
      tabsList[active.value].loading = true;
      tabsList[active.value].finished = false;
      form.value.page = 1;
      onLoad();
    };
    const putAddressDefault = () => {
      $api.putAddressDefault(checked.value).then((res) => {
        if (res.code == 200) {
          onLoad();
        }
      });
    };
    const onAdd = () => {
      // 判断类型
      let type = "";
      if (active.value == 0) {
        type = 2;
      } else {
        type = 1;
      }
      router.push({ name: "AddAddress", query: { active: type } });
    };
    // 编辑
    const onEdit = (item) => {
      router.push({
        name: "AddAddress",
        query: { id: item.id, active: item.type },
      });
    };
    // 删除
    const onDelete = (id) => {
      Dialog.confirm({
        message: t("confirmToDelete"),
      })
        .then(() => {
          $api.delAddress(id).then((res) => {
            if (res.code == 200) {
              Toast.success(t("successful"));
              onLoad();
            } else {
              Toast.fail(res.msg);
            }
          });
        })
        .catch(() => {});
    };
    const toShipAppointment = (item) => {
      router.push({
        name: "ShipByAppointment",
        params: {
          type: active.value,
          place_fullname: item.place_fullname,
          place_phone: item.place_phone,
          place_country: item.place_country,
          place_post_code: item.place_post_code,
          place_house_number: item.place_house_number,
          place_city: item.place_city,
          place_street: item.place_street,
          place_address: item.place_address,
          place_lat: item.place_lat,
          place_lon: item.place_lon,
        },
      });
    };
    onMounted(() => {});
    return {
      form,
      checked,
      active,
      tabsList,
      putAddressDefault,
      onLoad,
      onTabChange,
      search,
      onAdd,
      onEdit,
      onDelete,
      toShipAppointment,
    };
  },
};
</script>

<style lang="less" scoped>
.address {
  background-color: #f2f2f2;
  .list-item {
    border-radius: 10px;
    background-color: #fff;
    margin: 10px;
    padding: 10px;
    .item-box {
      min-height: 50px;
      border-bottom: 1px solid #eaeaea;
      color: #555555;
      margin-bottom: 10px;
      .item-font {
        font-size: 16px;
        font-weight: 500;
      }
      .item-address {
        margin-top: 5px;
      }
    }
    .item-operate {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn {
        display: flex;
        gap: 10px;
        .operate-btn {
          cursor: pointer;
        }
      }
    }
  }
  .record-list {
    min-height: calc(100vh - 160px);
  }
  .footer-btn {
    height: 40px;
    background-color: #fff;
    position: sticky;
    bottom: 0;
    padding: 10px;
  }
}
</style>
