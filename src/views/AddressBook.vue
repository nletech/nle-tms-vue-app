<template>
  <div class="address">
    <nav-bar :title="$t('addressBook')"></nav-bar>
    <van-search
      v-model="value"
      shape="round"
      background="#fff"
      :placeholder="$t('enterOrderNumberQuery')"
    />
    <div class="record-list">
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
          <van-address-list
            v-model="chosenAddressId"
            :list="dataList"
            default-tag-text="Default"
            :add-button-text="$t('addAddressLibrary')"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
          />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { ref, reactive, onMounted, nextTick, computed } from "vue";
import { Button, AddressList, Toast, Tabs, Tab, Search } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import $api from "../api/index";
import { UPDATE_CHECKOUT_SELECTED_ADDRESS } from "../store";
import { useI18n } from "vue-i18n"; //要在js中使用国际化

export default {
  name: "balance",
  components: {
    NavBar,
    [Button.name]: Button,
    [Search.name]: Search,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [AddressList.name]: AddressList,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();
    const tabsList = reactive([
      {
        id: 1,
        name: t("shippingAddress"),
      },
      {
        id: 2,
        name: t("senderAddress"),
      },
    ]);

    const chosenAddressId = ref(store.state.checkoutSelectedAddress.id);
    const isFromCheckoutPage = computed(() => store.state.isFromCheckoutPage);
    const dataList = ref([
      { name: 1 },
      {
        name: 2,
      },
    ]);

    const onAdd = () => router.push({ name: "AddressDetail" });
    const onEdit = (item) => {
      router.push({ name: "AddressDetail", query: { id: item.id } });
    };
    const onSelect = (item) => {
      if (!isFromCheckoutPage.value) return;
      store.commit(UPDATE_CHECKOUT_SELECTED_ADDRESS, item);
      router.back();
    };
    const getList = async () => {
      try {
        Toast.loading({
          message: "Loading...",
          forbidClick: true,
          duration: 0,
        });
        const res = await $api.getAddress();
        if (res && res.status === 200) {
          dataList.value = res.data.map((i) => ({
            id: i.id,
            name: "",
            tel: i.mobile,
            address: `${i.city} ${i.street} ${i.postcode} ${i.door_no}`,
            postcode: i.postcode,
            door_no: i.door_no,
          }));
          isFromMe();
        }
        Toast.clear();
      } catch (error) {}
    };
    const isFromMe = () => {
      nextTick(() => {
        if (!isFromCheckoutPage.value) {
          const radioList = Array.from(
            document.getElementsByClassName("van-radio__icon")
          );
          radioList.forEach((i) => {
            i.style.display = "none";
          });
        }
      });
    };

    onMounted(() => {});
    getList();
    return {
      tabsList,
      onAdd,
      onEdit,
      onSelect,
      chosenAddressId,
      dataList,
    };
  },
};
</script>

<style lang="less" scoped>
.address {
  background-color: #f2f2f2;
  .record-list {
    :deep(.van-address-list__bottom) {
      .van-button {
        background-color: #2dc18c;
        border-color: #2dc18c;
        color: #fff;
      }
    }
    .record-item {
      text-align: left;
      margin: 10px;
      padding: 10px;
      background-color: #fff;
      h3 {
        margin: 0;
      }
    }
  }
}
</style>
