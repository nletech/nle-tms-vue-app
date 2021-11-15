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
            v-model="username"
            input-align="right"
            :name="$t('name')"
            :label="$t('name')"
            :placeholder="$t('pleaseTypeYourName')"
            :rules="[{ required: true, message: $t('pleaseTypeYourName') }]"
          />
          <van-field
            v-model="password"
            input-align="right"
            :name="$t('contactNumber')"
            :label="$t('contactNumber')"
            :placeholder="$t('pleaseEnterPhoneNumber')"
            :rules="[{ required: true, message: $t('pleaseEnterPhoneNumber') }]"
          />
          <van-field
            v-model="password"
            input-align="right"
            :name="$t('mail')"
            :label="$t('mail')"
            :placeholder="$t('pleaseInputYourEmail')"
            :rules="[{ required: true, message: $t('pleaseInputYourEmail') }]"
          />

          <van-field
            v-model="sms"
            center
            clearable
            :label="$t('contactAddress')"
            :rules="[{ required: true, message: $t('pleaseInputYourEmail') }]"
          >
            <template #button>
              <van-button
                icon="../../public/me-img/position.png"
                type="primary"
                plain
                size="mini"
              >
                {{ $t("position") }}
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div class="footer-btn">
          <van-button round block type="success" native-type="submit">
            {{ $t("save") }}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { Form, Field, CellGroup, Button } from "vant";
export default {
  components: {
    NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
  },
};
</script>

<style lang="less" scoped>
.personal-information {
  .from {
    margin-top: 20px;
    .footer-btn {
      margin: 16px;
    }
  }
}
</style>