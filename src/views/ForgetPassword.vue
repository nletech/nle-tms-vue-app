<template>
<!-- 忘记密码 -->
  <div class="forget-password" id="container">
    <div class="logo">
      <img src="../assets/login-logo.jpg" style="width: 100px" alt="" />
      <h1>红兔TMS</h1>
    </div>
    <van-form @submit="onRegister" class="form">
      <van-field
        v-model="state.email"
        left-icon="/login-icon/mail.png"
        name="email"
        :rules="[
          {
            required: true,
            message: $t('pleaseInputYourEmail'),
          },
        ]"
        :placeholder="$t('pleaseInputYourEmail')"
      >
        <template #button>
          <van-button
            size="small"
            type="success"
            round
            plain
            @click="sendEmailCode"
            :disabled="time !== 60"
            >{{ time !== 60 ? time : $t("verificationCode") }}</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="state.code"
        left-icon="/login-icon/verification-code.png"
        name="code"
        :rules="[
          {
            required: true,
            message: $t('pleaseEnterVerificationCode'),
          },
        ]"
        :placeholder="$t('pleaseEnterVerificationCode')"
      />
      <van-field
        v-model="state.new_password"
        left-icon="/login-icon/password.png"
        name="new_password"
        :type="viewType"
        :rules="[
          {
            required: true,
            message: $t('pleaseEnterNewPassword'),
          },
        ]"
        :placeholder="$t('pleaseEnterNewPassword')"
      />
      <van-field
        v-model="state.confirm_new_password"
        left-icon="/login-icon/password.png"
        name="confirm_new_password"
        :type="viewType"
        :rules="[
          {
            required: true,
            message: $t('pleaseConfirmNewPassword'),
          },
        ]"
        :placeholder="$t('pleaseConfirmNewPassword')"
      />

      <van-button
        class="btn"
        block
        type="success"
        round
        :loading="submitLoading"
        native-type="submit"
      >
        {{ $t("confirm") }}
      </van-button>
      <!-- <van-field
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
      </van-field> -->
    </van-form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Button, Toast, Field, Form, Icon, Checkbox } from "vant";
import NavBar from "../components/NavBar.vue";
import $api from "../api/index";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
export default {
  name: "register",
  components: {
    NavBar,
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
  },
  setup() {
    const { t } = useI18n();
    const time = ref(60);
    const router = useRouter();
    const interval = ref(null);
    const submitLoading = ref(false);
    const state = reactive({
      email: "",
      code: "",
      new_password: "",
      confirm_new_password: "",
    });
    const viewType = ref("password");
    const onRegister = async (values) => {
      submitLoading.value = true;
      try {
        const res = await $api.getResetPassword(state);
        if (res && res.code === 200) {
          Toast.success(t("successful"));
          router.push("/login");
        } else {
          Toast(res.msg);
        }
        submitLoading.value = false;
      } catch (error) {
        submitLoading.value = false;
      }
    };
    const sendEmailCode = async () => {
      // await formRef.value.validate("email");
      if (interval.value) {
        return;
      }
      try {
        const res = await $api.getResetPasswordEmailCode({
          email: state.email,
        });
        if (res && res.code === 200) {
          interval.value = setInterval(() => {
            if (time.value === 0) {
              time.value = 60;
              clearInterval(interval.value);
              interval.value = null;
            } else {
              time.value -= 1;
            }
          }, 1000);
          Toast.success(t("successful"));
        } else {
          Toast(res.msg);
        }
      } catch (error) {
        Toast.fail("Sent fail");
      }
    };

    return {
      viewType,
      state,
      time,
      onRegister,
      submitLoading,
      sendEmailCode,
    };
  },
};
</script>

<style lang="less" scoped>
.forget-password {
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
    //   margin: 10px 0;
    //   background-color: #f1f1f1;
    //   border-radius: 5px;
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
