<template>
  <!-- 添加地址簿 -->
  <nav-bar
    :title="type == 2 ? $t('shippingAddress') : $t('senderAddress')"
  ></nav-bar>
  <div class="add-address">
    <div class="address">
      <div class="address-icon">
        <div class="icon">
          {{ type == 2 ? $t("receive") : $t("send") }}
        </div>
        <div>
          {{ type == 2 ? $t("recipient") : $t("sender") }}
        </div>
      </div>

      <div>
        <van-icon name="manager" />
        {{ $t("addressBook") }}
      </div>
      <div>
        <van-button
          icon="/me-img/position.png"
          type="primary"
          plain
          size="mini"
          @click="$router.push('/googleMap')"
        >
          {{ $t("position") }}
        </van-button>
      </div>
    </div>
    <van-form @submit="onSubmit">
      <div class="form-box">
        <!-- 姓名 -->
        <van-field
          required
          v-model="state.place_fullname"
          name="place_fullname"
          :label="$t('name')"
          :placeholder="$t('pleaseTypeYourName')"
          :rules="[{ required: true, message: $t('pleaseTypeYourName') }]"
        />
        <!-- 国家 -->
        <van-field
          required
          v-model="state.place_country_name"
          is-link
          readonly
          name="place_country"
          :label="$t('country')"
          :placeholder="$t('pleaseSelectCountry')"
          :rules="[
            {
              required: true,
              message: $t('pleaseSelectCountry'),
              trigger: 'onChange',
            },
          ]"
          @click="showCountry = true"
        />
        <div
          v-if="countryFirst"
          style="margin-left: 110px; color: red; font-size: 10px"
        >
          {{ $t("pleaseSelectCountryFirst") }}
        </div>
        <van-popup v-model:show="showCountry" position="bottom">
          <van-picker
            value-key="name"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showCountry = false"
          />
        </van-popup>
        <!-- 电话 -->
        <van-field
          required
          v-model="state.place_phone"
          name="place_phone"
          :label="$t('telephone')"
          :placeholder="$t('pleaseEnterThePhone')"
          :rules="[{ required: true, message: $t('pleaseEnterThePhone') }]"
        />
        <!-- 邮编 -->
        <van-field
          required
          v-model="state.place_post_code"
          name="place_post_code"
          :rules="[{ required: true, message: $t('pleaseEnterZipCode') }]"
          :label="$t('zipCode')"
          :placeholder="$t('pleaseEnterZipCode')"
          @blur="getLocation"
        />
        <!-- 门牌号 -->
        <van-field
          required
          v-model="state.place_house_number"
          name="place_house_number"
          :rules="[{ required: true, message: $t('pleaseEnterHouseNumber') }]"
          :label="$t('houseNumber')"
          :placeholder="$t('pleaseEnterHouseNumber')"
          @blur="getLocation"
        />
        <!-- 城市 -->
        <van-field
          required
          v-model="state.place_city"
          name="place_city"
          :label="$t('city')"
          :rules="[{ required: true, message: $t('pleaseEnterCity') }]"
          :placeholder="$t('pleaseEnterCity')"
          :disabled="disabledBtnByCountry"
          @blur="getLocation"
        />
        <!-- 街道 -->
        <van-field
          required
          v-model="state.place_street"
          name="place_street"
          :rules="[{ required: true, message: $t('pleaseEnterStreet') }]"
          :label="$t('street')"
          :placeholder="$t('pleaseEnterStreet')"
          :disabled="disabledBtnByCountry"
          @blur="getLocation"
        />
        <div class="empty-box">
          <van-checkbox v-model="is_default" checked-color="#33D401">
            {{
              type == 2
                ? $t("setDefaultRecipientAddress")
                : $t("setDefaultSenderAddress")
            }}</van-checkbox
          >
          <div class="empty" @click="empty">
            {{ $t("empty") }}
          </div>
        </div>
      </div>

      <div class="bottom-btn">
        <van-button
          :loading="submitLoading"
          round
          block
          native-type="submit"
          type="success"
          class="public-btn"
        >
          {{ $t("save") }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { ref, reactive, onMounted, computed } from "vue";
import {
  Button,
  Toast,
  Checkbox,
  Field,
  Form,
  Icon,
  Popup,
  Picker,
} from "vant";
import { useRoute, useRouter } from "vue-router";
import $api from "../api/index";

export default {
  components: {
    NavBar,
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Checkbox.name]: Checkbox,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const showCountry = ref(false); //国家下拉
    const countryFirst = ref(false); //国家显隐
    const submitLoading = ref(false);
    const is_default = ref(false);
    const type = route.query.active;
    const state = ref({
      type: route.query.active,
      place_fullname: "",
      place_phone: "",
      place_country: "",
      place_country_name: "",
      place_post_code: "",
      place_house_number: "",
      place_city: "",
      place_street: "",
      place_lon: "",
      place_lat: "",
      is_default: "",
    });
    const columns = ref([]);
    // 国家
    const getCountry = () => {
      $api.getCountry().then((res) => {
        columns.value = res.data;
      });
    };
    const onConfirm = (val) => {
      state.value.place_country = val.short;
      state.value.place_country_name = val.name;
      showCountry.value = false;
      // 改变国家
      countryFirst.value = false;
      state.value = {
        ...state.value,
        place_post_code: "",
        place_house_number: "",
        place_city: "",
        place_street: "",
        place_lon: "",
        place_lat: "",
      };
    };
    const disabledBtnByCountry = computed(() => {
      return state.value.place_country === "NL";
    });
    // 拉取经纬度
    const getLocation = () => {
      if (state.value.place_country_name == "") {
        countryFirst.value = true;
      } else {
        countryFirst.value = false;
      }
      if (
        state.value.place_post_code &&
        state.value.place_house_number &&
        state.value.place_country === "NL"
      ) {
        $api
          .getLocation({
            country: state.value.place_country,
            post_code: state.value.place_post_code,
            house_number: state.value.place_house_number,
          })
          .then((res) => {
            if (res.code == 200) {
              state.value.place_lat = res.data.lat;
              state.value.place_lon = res.data.lon;
              state.value.place_city = res.data.city;
              state.value.place_street = res.data.street;
            } else {
              Toast.fail(res.msg);
            }
          });
      } else if (
        state.value.place_post_code &&
        state.value.place_house_number &&
        state.value.place_city &&
        state.value.place_street
      ) {
        $api
          .getLocation({
            country: state.value.place_country,
            post_code: state.value.place_post_code,
            house_number: state.value.place_house_number,
            city: state.value.place_city,
            street: state.value.place_street,
          })
          .then((res) => {
            if (res.code == 200) {
              state.value.place_lat = res.data.lat;
              state.value.place_lon = res.data.lon;
            } else {
              Toast.fail(res.msg);
            }
          });
      }
    };
    const onSubmit = () => {
      submitLoading.value = true;
      if (is_default.value == true) {
        state.value.is_default = 1;
      } else {
        state.value.is_default = 2;
      }
      if (route.query.id) {
        $api.putAddress(state.value, { id: route.query.id }).then((res) => {
          if (res.code == 200) {
            submitLoading.value = false;
            router.go(-1);
          } else {
            Toast.fail(res.msg);
            submitLoading.value = false;
          }
        });
      } else {
        $api.address(state.value).then((res) => {
          if (res.code == 200) {
            submitLoading.value = false;
            router.go(-1);
          } else {
            Toast.fail(res.msg);
            submitLoading.value = false;
          }
        });
      }
    };
    const getDetailsAddress = () => {
      $api.getDetailsAddress(route.query.id).then((res) => {
        state.value = res.data;
        if (res.data.is_default == 1) {
          is_default.value = true;
        } else {
          is_default.value = false;
        }
      });
    };
    const empty = () => {
      state.value = {
        type: route.query.active,
        place_fullname: "",
        place_phone: "",
        place_country: "",
        place_country_name: "",
        place_post_code: "",
        place_house_number: "",
        place_city: "",
        place_street: "",
        place_lon: "",
        place_lat: "",
        is_default: "",
      };
    };
    onMounted(() => {
      getCountry();
      if (route.query.id) {
        getDetailsAddress();
      }
    });
    return {
      state,
      type,
      showCountry,
      countryFirst,
      columns,
      disabledBtnByCountry,
      submitLoading,
      is_default,
      onConfirm,
      getLocation,
      onSubmit,
      empty,
    };
  },
};
</script>

<style lang="less" scoped>
.add-address {
  padding: 10px;
  background-color: #fff;
  min-height: calc(100vh - 67px);
  .address {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .address-icon {
      display: flex;
      align-items: center;
      gap: 5px;
      .icon {
        width: 30px;
        height: 30px;
        background-color: #2dc18c;
        border-radius: 5px;
        text-align: center;
        line-height: 30px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
  .empty-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 0 10px;
    .empty {
      color: #2dc18c;
      cursor: pointer;
    }
  }
  .form-box {
    min-height: calc(100vh - 200px);
  }
  .bottom-btn {
    margin-top: 50px;
  }
}
</style>