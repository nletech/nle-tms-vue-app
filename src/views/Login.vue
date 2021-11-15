<template>
  <div class="login" id="container">
    <div class="logo">
      <img src="../assets/login-logo.jpg" style="width: 100px" alt="" />
      <h1>红兔TMS</h1>
    </div>
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="state.username"
        left-icon="../../public/login-icon/mail.png"
        name="username"
        :rules="[
          {
            required: true,
            message: $t('pleaseInputYourEmail'),
          },
        ]"
        :label="$t('mail')"
        :placeholder="$t('pleaseInputYourEmail')"
      />
      <van-field
        v-model="state.password"
        left-icon="../../public/login-icon/password.png"
        name="password"
        :type="viewType"
        :rules="[
          {
            required: true,
            message: $t('pleaseEnterThePassword'),
          },
        ]"
        :label="$t('password')"
        :placeholder="$t('pleaseEnterThePassword')"
      >
        <template #right-icon>
          <van-icon
            @click="viewType = viewType === 'password' ? 'text' : 'password'"
            :name="viewType === 'password' ? 'closed-eye' : 'eye-o'"
          />
        </template>
      </van-field>
      <div class="forget">
        <van-button class="forget-btn" size="small" to="forget_Password">{{
          $t("retrievePassword")
        }}</van-button>
      </div>
      <van-button
        class="btn"
        block
        type="success"
        round
        :loading="submitLoading"
        native-type="submit"
      >
        {{ $t("loginIn") }}
      </van-button>
      <van-button
        class="btn"
        block
        type="success"
        plain
        round
        :loading="submitLoading"
        to="register"
      >
        {{ $t("newUserRegistration") }}
      </van-button>
      <van-field
        name="checkbox"
        class="checkbox"
        :rules="[
          {
            required: true,
            message: $t('pleaseCheckAgreement'),
          },
        ]"
      >
        <template #input>
          <van-checkbox v-model="state.checked" checked-color="#58be6a">
            {{ $t("haveReadAgree") }}
            <span style="color: rgb(17, 117, 170)"
              >《{{ $t("redRabbitRegistrationService") }} 》
            </span>
          </van-checkbox>
        </template>
      </van-field>
    </van-form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { Button, Toast, Field, Form, Icon, Checkbox } from "vant";
import NavBar from "../components/NavBar.vue";
import $api from "../api/index";
import { ORDER_MEAL_TOKEN } from "../store";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
export default {
  name: "login",
  components: {
    NavBar,
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name === "ForgetPassword") {
        vm.routerIsFrom = true;
      } else {
        vm.routerIsFrom = false;
      }
    });
  },
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const submitLoading = ref(false);
    const routerIsFrom = ref(false);
    const emailValidator = (val) =>
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val);

    const passValidator = (val) =>
      // 最少6位字符
      new RegExp(/^\S{6,}$/).test(val);
    const state = reactive({
      username: "",
      password: "",
      checked: false,
    });
    const viewType = ref("password");//判断密码 显示
    const onSubmit = async (values) => {
      submitLoading.value = true;
      try {
        const res = await $api.login(values);
        if (res && res.code === 200) {
          Toast.success(t("loginSuccessful"));
          store.commit(ORDER_MEAL_TOKEN, res.data.access_token);
          store.dispatch("initCart", res.data);
          store.dispatch("getUserInfo");
          routerIsFrom.value;
          if (routerIsFrom.value) {
            router.push("/");
          } else {
            router.back();
          }
        }
        submitLoading.value = false;
      } catch (error) {
        submitLoading.value = false;
      }
    };
    return {
      routerIsFrom,
      emailValidator,
      passValidator,
      viewType,
      state,
      onSubmit,
      submitLoading,
    };
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  .logo {
    margin: 50px 0;
    text-align: center;
  }
  .form {
    width: 90%;
    margin: 0 auto;
    // :deep(.van-cell) {
      // margin: 10px 0;
      // background-color: #f1f1f1;
      // border-radius: 5px;
    // }
    .forget {
      text-align: right;
      .forget-btn {
        border: none;
      }
    }
    .btn {
      margin: 0 auto;
      width: 90%;
      margin-top: 20px;
    }
    .checkbox {
      position: absolute;
      bottom: 0;
      font-size: 10px;
    }
  }
}
</style>