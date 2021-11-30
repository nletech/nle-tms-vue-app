<template>
  <!-- 个人信息 -->
  <div class="personal-information">
    <nav-bar
      :title="$t('personalInformation')"
      :needBack="ture"
      :onClickLeft="() => $router.push('/me')"
    ></nav-bar>
    <div class="from">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.contacter"
            input-align="right"
            name="contacter"
            :label="$t('name')"
            :placeholder="$t('pleaseTypeYourName')"
            :rules="[{ required: true, message: $t('pleaseTypeYourName') }]"
          />
          <van-field
            v-model="form.phone"
            input-align="right"
            name="phone"
            :label="$t('contactNumber')"
            :placeholder="$t('pleaseEnterPhoneNumber')"
            :rules="[{ required: true, message: $t('pleaseEnterPhoneNumber') }]"
          />
          <van-field
            v-model="form.email"
            input-align="right"
            name="email"
            :label="$t('mail')"
            :placeholder="$t('pleaseInputYourEmail')"
            :rules="[{ required: true, message: $t('pleaseInputYourEmail') }]"
          />

          <van-field
            v-model="form.address"
            name="address"
            input-align="right"
            :label="$t('contactAddress')"
          >
            <template #button>
              <van-button
                icon="../../public/me-img/position.png"
                type="primary"
                plain
                size="mini"
                @click="$router.push('/googleMap')"
              >
                {{ $t("position") }}
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="footer-btn">
          <van-button
            round
            block
            type="success"
            native-type="submit"
            :loading="submitLoading"
          >
            {{ $t("save") }}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import NavBar from "../components/NavBar.vue";
import { Form, Field, CellGroup, Button, Toast } from "vant";
import $api from "../api/index";
import { useI18n } from "vue-i18n"; //要在js中使用国际化

export default {
  components: {
    NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
  },
  setup() {
    const { t } = useI18n();
    const form = ref({});
    const submitLoading = ref(false);
    const getMerchant = () => {
      $api.getMerchant().then((res) => {
        form.value = res.data;
      });
    };
    const onSubmit = async (values) => {
      submitLoading.value = true;
      try {
        const res = await $api.putMerchant(form.value);
        if (res && res.code == 200) {
          getMerchant();
          submitLoading.value = false;

          Toast.success(t("successful"));
        }
      } catch (error) {
        submitLoading.value = false;
      }
    };
    onMounted(() => {
      getMerchant();
    });
    return {
      form,
      onSubmit,
      submitLoading,
    };
  },
};
</script>

<style lang="less" scoped>
.personal-information {
  .from {
    margin-top: 20px;
    .footer-btn {
      margin: 16px;
      // position: fixed;
      bottom: 10px;
    }
  }
}
</style>