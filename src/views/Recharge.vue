<template>
  <!-- 充值 -->
  <nav-bar :title="$t('recharge')" :needBack="ture"></nav-bar>
  <div class="recharge">
    <div class="title">
      {{ $t("pleaseSelectRechargeAmount") }}
    </div>
    <div class="amount-list">
      <van-button
        :style="
          form.expect_amount == item.value
            ? 'background-color: #2DC18C;border-color:#2DC18C;;color:#fff;'
            : ''
        "
        v-for="item in amountList"
        @click="form.expect_amount = item.value"
        :key="item.id"
        >{{ currencyUnit }} {{ item.value }}</van-button
      >
    </div>
    <div class="title">
      {{ $t("otherRechargeAmount") }}
    </div>
    <van-form @submit="onRecharge">
      <div class="recharge-input">
        <van-field
          :label="currencyUnit"
          label-width="50px"
          type="number"
          v-model="form.expect_amount"
          name="expect_amount"
          :placeholder="$t('pleaseEnterAnotherRechargeAmount')"
          :rules="[
            {
              required: true,
              validator: expectAmountValidator,
              message: $t('enterUpTo'),
            },
          ]"
        >
        </van-field>
      </div>
      <div class="payment-methods">
        <div class="title">{{ $t("paymentMethod") }}</div>
        <div class="radio-group">
          <van-radio-group v-model="form.pay_type">
            <van-cell-group
              v-for="(item, i) in onlinePayTypeList"
              :key="item.id"
              :border="false"
              :class="
                i === onlinePayTypeList.length - 1 ? 'radio-group-last' : ''
              "
            >
              <van-cell
                clickable
                @click="form.pay_type = item.id"
                :class="i === onlinePayTypeList.length - 1 ? 'radius-last' : ''"
              >
                <template #title>
                  <van-image
                    src="../../public/me-img/Paypal.png"
                    fit="cover"
                    class="img"
                  />
                  <span>{{ item.name }}</span>
                </template>
                <template #right-icon>
                  <van-radio :name="item.id" checked-color="#2DC18C" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>
      <div class="footer-btn">
        <van-button
          round
          block
          type="success"
          native-type="submit"
          :loading="rechargeLoading"
        >
          {{ $t("payImmediately") }}
        </van-button>
      </div>
    </van-form>
    <!-- <div class="bottom-btn">
      <van-button
        type="success"
        @click="onRecharge"
        class="recharge-btn public-btn-red"
        size="large"
        
      >
        {{ $t("payImmediately") }}
      </van-button>
    </div> -->
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import {
  Button,
  Field,
  Radio,
  RadioGroup,
  Cell,
  Image as VanImage,
  Form,
} from "vant";
import { ref, computed, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import $api from "../api/index";

export default {
  components: {
    NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Cell.name]: Cell,
    [VanImage.name]: VanImage,
    [Form.name]: Form,
  },
  setup() {
    const store = useStore();
    const currencyUnit = computed(() => store.state.currencyUnit);
    const rechargeLoading = ref(false);
    const form = ref({
      expect_amount: "",
      pay_type: "",
    });
    const onlinePayTypeList = ref([]);
    const amountList = ref([
      {
        value: 30,
        id: 1,
      },
      {
        value: 50,
        id: 2,
      },
      {
        value: 100,
        id: 3,
      },
      {
        value: 200,
        id: 4,
      },
      {
        value: 300,
        id: 5,
      },
      {
        value: 500,
        id: 5,
      },
    ]);
    const expectAmountValidator = (val) =>
      /^100000$|^(\d|[1-9]\d)(\.\d{1,4})*$/.test(val);
    const onRecharge = () => {
      if (!form.value) return;
      rechargeLoading.value = true;
      $api
        .recharge(form.value)
        .then((res) => {
          rechargeLoading.value = false;
          if (res && res.code == 200) {
            $api.paypal({ bill_no: res.data.bill_no }).then((res) => {
            });
          }
        })
        .catch(() => (rechargeLoading.value = false));
    };
    const getDictionary = () => {
      $api.getDictionary().then((res) => {
        onlinePayTypeList.value = res.data.onlinePayTypeList;
      });
    };
    onMounted(() => {
      getDictionary();
    });
    return {
      currencyUnit,
      amountList,
      onlinePayTypeList,
      form,
      rechargeLoading,
      onRecharge,
      expectAmountValidator,
    };
  },
};
</script>

<style lang="less" scoped>
.recharge {
  padding: 20px;
  min-height: calc(100vh - 86px);
  background-color: #fff;
  .title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .amount-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 10px;

    .van-button {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .recharge-input {
    margin-bottom: 10px;
    :deep(.van-cell__value),
    :deep(.van-cell__title) {
      font-size: 16px;
      color: #000000;
    }
    border-bottom: 1px solid #e2e2e2;
  }
  .payment-methods {
    margin: 10px;
    border-radius: 5px;
    .cell-title {
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    .radio-group-last {
      background-color: inherit;
    }
    .radius-last {
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .radio-group {
      :deep(.van-cell__title) {
        display: flex;
        align-items: center;
        .img {
          width: 40px;
          height: 40px;
        }
        span {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>