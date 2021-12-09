   <template>
  <!-- 预约寄件 -->
  <nav-bar
    :title="$t('shipByAppointment')"
    :onClickLeft="() => $router.push('/')"
  ></nav-bar>
  <div class="ship-appointment">
    <div class="appointment-head">
      <div class="head">
        <div class="send">{{ $t("send") }}</div>
        <div class="border"></div>
        <div class="receive">{{ $t("receive") }}</div>
      </div>
      <div>
        <div>
          <div class="address-library">
            <div>
              <div class="address font">
                {{ form.place_fullname }}&nbsp;&nbsp;&nbsp;
                {{ form.place_phone }}
              </div>
              <div class="information">
                {{ form.place_address }}
              </div>
            </div>
            <div class="address-border"></div>
            <div
              class="address"
              @click="
                $router.push({
                  name: 'AddressBook',
                  query: {
                    type: 1,
                  },
                })
              "
            >
              {{ $t("addressBook") }}
            </div>
          </div>
        </div>
        <van-divider />
        <div>
          <div class="address-library">
            <div>
              <div class="address font">
                {{ form.second_place_fullname }}&nbsp;&nbsp;&nbsp;
                {{ form.second_place_phone }}
              </div>
              <div class="information">
                {{ form.second_place_address }}
              </div>
            </div>
            <div class="address-border"></div>
            <div
              class="address"
              @click="
                $router.push({
                  name: 'AddressBook',
                  query: {
                    type: 0,
                  },
                })
              "
            >
              {{ $t("addressBook") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="required" v-if="requireHead">{{ $t("required") }}</div>
    <div class="cell">
      <!-- 物品 -->
      <van-cell
        is-link
        @click="toItemInformation"
        title-style="text-align: left"
        :value="val"
      >
        <template #title>
          <span class="custom-title">{{ $t("thing") }} </span>
          <van-tag plain round type="warning">{{ $t("required") }} </van-tag>
        </template>
      </van-cell>
      <div class="required" v-if="requiredItem">{{ $t("required") }}</div>

      <!-- 期望上门日期 -->
      <van-field
        v-model="form.execution_date"
        is-link
        readonly
        name="place_country"
        :label="$t('expectedTimeVisit')"
        :placeholder="$t('pleaseSelectDate')"
        input-align="right"
        :rules="[
          {
            required: true,
            message: $t('pleaseSelectDate'),
            trigger: 'onChange',
          },
        ]"
        @click="showDate = true"
      />
      <div class="required" v-if="requiredDate">{{ $t("required") }}</div>

      <van-popup v-model:show="showDate" position="bottom">
        <van-picker
          value-key="name"
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showDate = false"
        />
      </van-popup>
      <!-- 付款方式 -->
      <van-cell
        title-style="text-align: left"
        :value="form.settlement_type_name"
        is-link
      >
        <template #title>
          <span class="custom-title">{{ $t("paymentMethod") }}</span>
        </template>
      </van-cell>
    </div>
    <div class="cell">
      <!-- 保价 -->
      <!-- <van-cell is-link to="home" title-style="text-align: left">
        <template #title>
          <span class="custom-title">{{ $t("insured") }} </span>
          <van-tag plain round type="warning">{{ $t("required") }} </van-tag>
        </template>
      </van-cell> -->
      <!-- 增值服务 -->
      <!-- <van-cell is-link title-style="text-align: left">
        <template #title>
          <span class="custom-title">{{ $t("valueAddedServices") }}</span>
        </template>
      </van-cell> -->
      <!-- 备注 -->
      <van-field
        v-model="form.remark"
        rows="2"
        autosize
        :label="$t('remark')"
        type="textarea"
        maxlength="30"
        show-word-limit
      />
      <van-button
        class="btn"
        plain
        hairline
        round
        type="primary"
        size="small"
        @click="toRemark"
        >{{ $t("contactBeforeYouCome") }}</van-button
      >
    </div>
    <van-checkbox
      v-model="form.checked"
      checked-color="#58be6a"
      style="margin-left: 10px; margin-bottom: 10px"
      label-disabled
      @click="requiredcheckbox = false"
    >
      {{ $t("haveReadAgree") }}
      <span style="color: #2dc18c" @click="$router.push('/termsDetails')">
        《{{ $t("expressServiceTerms") }} 》
      </span>
    </van-checkbox>
    <div class="required" v-if="requiredcheckbox">{{ $t("required") }}</div>
  </div>
  <!-- 遮罩层 -->
  <van-overlay :show="show" />
  <!-- 明细详情 -->
  <div class="box" v-if="show">
    <div class="box-title">
      <div>
        {{ $t("detail") }}
      </div>
      <div>
        <van-icon name="cross" @click="show = false" />
      </div>
    </div>
    <div class="box-illustrate">
      <div>
        <div class="basic-freight">{{ $t("basicFreight") }}</div>
        <div class="fixed-costs">{{ $t("fixedCosts") }}</div>
        <div>{{ $t("weightMileageFee") }}</div>
      </div>
      <div>
        <div class="basic-freight">
          {{ currencyUnit }} {{ form.count_settlement_amount }}
        </div>
        <div class="fixed-costs">
          {{ currencyUnit }} {{ form.starting_price }}
        </div>
        <div>
          {{ currencyUnit }} {{ form.package_list[0].settlement_amount }}
        </div>
      </div>
    </div>
  </div>
  <!-- 下单 -->
  <div class="footer-btn">
    <div class="fee">
      <div class="total-cost">
        <div>{{ $t("estimatedTotalCost") }}</div>
        <div style="color: #ffa785">
          {{ currencyUnit }}{{ form.count_settlement_amount }}
        </div>
        <div class="cost-border"></div>
        <div @click="show = true" style="cursor: pointer">
          {{ $t("detail") }}
          <van-icon
            color="#DFDFDF"
            :name="show == true ? 'arrow-down' : 'arrow-up'"
          />
        </div>
      </div>
      <div class="illustrate">
        {{ $t("theActualTotalFeeVerificationPickup") }}
      </div>
    </div>
    <div>
      <van-button
        round
        type="success"
        style="min-width: 80px"
        @click="placeOrder"
        >{{ $t("placeOrder") }}</van-button
      >
    </div>
  </div>
</template>

<script>
import {
  Divider,
  Cell,
  Tag,
  Popup,
  Picker,
  Field,
  Button,
  Checkbox,
  Overlay,
  Icon,
  Toast,
} from "vant";
import NavBar from "../components/NavBar.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, onActivated, computed } from "vue";
import { useStore } from "vuex";
import $api from "../api/index";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import router from "../router";

export default {
  name: "ShipByAppointment",
  components: {
    NavBar,
    [Divider.name]: Divider,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
    [Overlay.name]: Overlay,
    [Icon.name]: Icon,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const weightUnit = computed(() => store.state.weightUnit);
    const currencyUnit = computed(() => store.state.currencyUnit);
    const val = ref("");
    const columns = ref([]);
    const showDate = ref(false);
    const { t } = useI18n();
    const show = ref(false);
    const requireHead = ref(false);
    const requiredItem = ref(false);
    const requiredDate = ref(false);
    const requiredcheckbox = ref(false);
    const form = ref({
      checked: "",
      type: 3,
      settlement_type: 1,
      settlement_type_name: "票结",
      // 发件人
      place_fullname: "",
      place_phone: "",
      place_country: "",
      place_post_code: "",
      place_house_number: "",
      place_city: "",
      place_street: "",
      place_address: "",
      place_lat: "",
      place_lon: "",
      execution_date: "",
      // 收件人
      second_place_fullname: "",
      second_place_phone: "",
      second_place_country: "",
      second_place_post_code: "",
      second_place_house_number: "",
      second_place_city: "",
      second_place_street: "",
      second_place_address: "",
      second_place_lat: "",
      second_place_lon: "",
      second_execution_date: "",
      // 包裹
      package_list: [],
      // 备注
      remark: "",
      count_settlement_amount: null, //估算运费
      starting_price: null, //固定费用
      package_settlement_amount: null, //重量里程费用
    });
    // 收发人信息
    const toShipAppointment = () => {
      if (route.params.type == 1) {
        form.value = {
          ...form.value,
          place_fullname: route.params.place_fullname,
          place_phone: route.params.place_phone,
          place_country: route.params.place_country,
          place_post_code: route.params.place_post_code,
          place_house_number: route.params.place_house_number,
          place_city: route.params.place_city,
          place_street: route.params.place_street,
          place_address: route.params.place_address,
          place_lat: route.params.place_lat,
          place_lon: route.params.place_lon,
        };
      } else if (route.params.type == 0) {
        form.value = {
          ...form.value,
          second_place_fullname: route.params.place_fullname,
          second_place_phone: route.params.place_phone,
          second_place_country: route.params.place_country,
          second_place_post_code: route.params.place_post_code,
          second_place_house_number: route.params.place_house_number,
          second_place_city: route.params.place_city,
          second_place_street: route.params.place_street,
          second_place_address: route.params.place_address,
          second_place_lat: route.params.place_lat,
          second_place_lon: route.params.place_lon,
        };
      }
      if (
        form.value.place_fullname != "" &&
        form.value.second_place_fullname != ""
      ) {
        requireHead.value = false;
        getOrderDate();
        getOrderPriceCount();
      }
    };
    // 获取日期
    const getOrderDate = () => {
      let data = {
        type: 1,
        place_country: form.value.place_country,
        place_post_code: form.value.place_post_code,
        place_house_number: form.value.place_house_number,
        place_city: form.value.place_city,
        place_street: form.value.place_street,
        place_lat: form.value.place_lat,
        place_lon: form.value.place_lon,
      };
      $api.getOrderDate(data).then((res) => {
        columns.value = res.data;
        if (!route.query.id) {
          form.value.execution_date = res.data[0];
          form.value.second_execution_date = res.data[0];
        }
      });
      if (form.value.execution_date != "") {
        requiredDate.value = false;
      }
      getOrderPriceCount();
    };
    // 物品
    const itemInformation = () => {
      form.value.package_list = []; //默认先清空
      let obj = {
        // name: route.params.name,
        weight: route.params.weight,
        expect_quantity: route.params.weight,
        express_first_no: route.params.express_first_no,
        picture_list: route.params.picture_list,
      };
      val.value = `${route.params.express_first_no},${route.params.weight}(${weightUnit.value}) ,${route.params.expect_quantity}(件)`;
      form.value.package_list.push(obj);
      if (form.value.package_list.length > 0) {
        requiredItem.value = false;
      }
      getOrderPriceCount();
    };
    const toItemInformation = () => {
      if (route.query.type || form.value.package_list.length <= 0) {
        router.push("/itemInformation");
      } else {
        router.push({
          name: "ItemInformation",
          query: {
            weight: form.value.package_list[0].weight,
            expect_quantity: form.value.package_list[0].expect_quantity,
            express_first_no: form.value.package_list[0].express_first_no,
          },
        });
      }
    };
    // 日期
    const onConfirm = (val) => {
      showDate.value = false;
      form.value.execution_date = val;
    };
    // 估算运价
    const getOrderPriceCount = () => {
      if (
        form.value.place_fullname != "" &&
        form.value.second_place_fullname != "" &&
        form.value.package_list.length >= 1
      ) {
        $api.getOrderPriceCount(form.value).then((res) => {
          if (res.code == 200) {
            form.value = res.data;
            form.value = res.data;
          } else {
            Toast.fail(res.msg);
          }
        });
      }
    };
    const toRemark = () => {
      form.value.remark = t("contactBeforeYouCome");
    };
    // 下单
    const placeOrder = () => {
      if (
        form.value.place_fullname == "" &&
        form.value.second_place_fullname == "" &&
        form.value.package_list.length < 1 &&
        form.value.execution_date == "" &&
        form.value.checked == ""
      ) {
        requireHead.value = true;
        requiredItem.value = true;
        requiredDate.value = true;
        requiredcheckbox.value = true;
      } else if (form.value.package_list.length < 1) {
        requiredItem.value = true;
      } else if (form.value.execution_date == "") {
        requiredDate.value = true;
      } else if (form.value.checked == "") {
        requiredcheckbox.value = true;
      } else {
        $api.order(form.value).then((res) => {
          if (res.code == 200) {
            router.push({
              name: "ToPay",
              query: {
                id: res.data.id,
              },
            });
          } else {
            Toast.fail(res.msg);
          }
        });
      }
    };
    // 再来一单
    const anotherOrder = () => {
      $api.getDetailsOrder(route.query.id).then((res) => {
        form.value = res.data;
        res.data.package_list.map((el) => {
          val.value = `${el.express_first_no},${el.weight}(${weightUnit.value}) ,${el.expect_quantity}(件)`;
          getOrderDate();
        });
      });
    };
    onActivated(() => {
      // 清空重置
      if (route.query.type) {
        val.value = "";
        form.value = {
          checked: "",
          type: 3,
          settlement_type: 1,
          settlement_type_name: "票结",
          // 发件人
          place_fullname: "",
          place_phone: "",
          place_country: "",
          place_post_code: "",
          place_house_number: "",
          place_city: "",
          place_street: "",
          place_address: "",
          place_lat: "",
          place_lon: "",
          execution_date: "",
          // 收件人
          second_place_fullname: "",
          second_place_phone: "",
          second_place_country: "",
          second_place_post_code: "",
          second_place_house_number: "",
          second_place_city: "",
          second_place_street: "",
          second_place_address: "",
          second_place_lat: "",
          second_place_lon: "",
          // 包裹
          package_list: [],
          // 备注
          remark: "",
          count_settlement_amount: null, //估算运费
          starting_price: null, //固定费用
          package_settlement_amount: null, //重量里程费用
        };
      }
      // 收发件人
      if (route.params.type) {
        toShipAppointment();
      }
      // 物品
      if (route.params.express_first_no) {
        itemInformation();
      }
      if (route.query.id) {
        anotherOrder();
      }
    });

    return {
      requireHead,
      requiredItem,
      requiredDate,
      requiredcheckbox,
      currencyUnit,
      weightUnit,
      form,
      val,
      columns,
      showDate,
      show,
      toShipAppointment,
      itemInformation,
      onConfirm,
      toRemark,
      placeOrder,
      toItemInformation,
    };
  },
};
</script>

<style lang="less" scoped>
.ship-appointment {
  min-height: calc(100vh - 117px);
  .appointment-head {
    margin: 10px;
    padding: 15px 15px;
    background-color: #fff;
    display: grid;
    grid-template-columns: 50px 1fr;
    border-radius: 5px;
    .head {
      width: 25px;
      .send {
        width: 25px;
        height: 25px;
        border-radius: 5px;
        line-height: 25px;
        background-color: #2dc18c;
        color: #fff;
        text-align: center;
      }
      .border {
        width: 1px;
        min-height: 50px;
        text-align: center;
        border-left: 1px dashed #eaeaea;
        margin: 0 auto;
      }
      .receive {
        width: 25px;
        height: 25px;
        border-radius: 5px;
        line-height: 25px;
        background-color: #ffa785;
        color: #fff;
        text-align: center;
      }
    }

    .address {
      font-size: 15px;
      color: #555555;
    }
    .font {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .address-library {
      display: grid;
      grid-template-columns: 1fr 10px 60px;
      align-items: center;
      .address-border {
        min-height: 30px;
        border-left: 1px solid #eaeaea;
      }
      .information {
        font-size: 13px;
        color: #999999;
      }
    }
  }
  .cell {
    margin: 20px 10px;
    padding: 5px;
    border-radius: 5px;
    background-color: #fff;
    .btn {
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}
.footer-btn {
  position: sticky;
  bottom: 0;
  height: 50px;
  background-color: #fff;
  padding: 5px 10px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .fee {
    margin-top: 10px;
    .total-cost {
      display: flex;
      gap: 5px;
      align-items: center;
      font-size: 15px;
      color: #555555;
      .cost-border {
        width: 1px;
        height: 10px;
        border-right: 1px solid #dfdfdf;
      }
    }
    .illustrate {
      font-size: 10px;
      color: #999999;
    }
  }
}
.box {
  padding: 10px;
  position: sticky;
  bottom: 50px;
  min-height: 150px;
  background-color: #fff;
  z-index: 1;
  .box-title {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 16px;
  }
  .box-illustrate {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    .basic-freight {
      font-weight: 600;
    }
    .fixed-costs {
      margin: 10px 0;
    }
  }
}
.required {
  font-size: 10px;
  color: red;
  margin-left: 15px;
}
</style>