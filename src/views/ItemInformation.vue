<template>
  <!-- 物品信息 -->
  <nav-bar :title="$t('itemInformation')"></nav-bar>
  <div class="item-Information">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-cell>
          <template #title>
            <span class="custom-title">{{ $t("itemInformation") }}</span>
            <van-tag plain round type="warning">{{ $t("required") }} </van-tag>
            <!-- <van-field
              v-model="form.name"
              name="name"
              :placeholder="$t('pleaseEnterItemInformation')"
              :rules="[
                { required: true, message: $t('pleaseEnterItemInformation') },
              ]"
            /> -->
            <van-field
              v-model="form.express_first_no"
              name="express_first_no"
              :placeholder="$t('pleaseEnterTrackingNumber')"
              :rules="[
                { required: true, message: $t('pleaseEnterTrackingNumber') },
              ]"
            />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group inset>
        <div>
          <van-field
            name="stepper"
            :label="$t('estimatedWeight') + '(' + weightUnit + ')'"
            input-align="right"
          >
            <template #input>
              <van-stepper
                :decimal-length="1"
                v-model="form.weight"
                input-width="80px"
                button-size="32"
                max="999"
              />
            </template>
          </van-field>
        </div>
        <div class="underscore">
          {{ $t("weightSubjectVerificationPickup") }}
        </div>

        <div>
          <van-field
            name="stepper"
            :label="$t('numberofPieces') + '(件)'"
            input-align="right"
          >
            <template #input>
              <van-stepper
                :decimal-length="1"
                v-model="form.expect_quantity"
                input-width="80px"
                button-size="32"
                max="999"
              />
            </template>
          </van-field>
        </div>
      </van-cell-group>
      <van-cell-group inset>
        <van-cell>
          <template #title>
            <span class="custom-title">{{ $t("itemPhotos") }}</span>
            <van-field name="uploader">
              <template #input>
                <van-uploader
                  v-model="form.picture_list"
                  :max-count="1"
                  :after-read="onRead"
                />
              </template>
            </van-field>
          </template>
        </van-cell>
      </van-cell-group>

      <div style="margin: 16px">
        <van-button round block type="success " native-type="submit">
          {{ $t("save") }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import {
  Form,
  Field,
  CellGroup,
  Cell,
  Button,
  Stepper,
  Uploader,
  Tag,
} from "vant";
import { ref, computed, onActivated } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "ItemInformation",
  components: {
    NavBar,
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Stepper.name]: Stepper,
    [Uploader.name]: Uploader,
    [Tag.name]: Tag,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const weightUnit = computed(() => store.state.weightUnit);
    const form = ref({
      //   name: "",
      weight: route.query.weight || "",
      expect_quantity: route.query.expect_quantity || "",
      express_first_no: route.query.express_first_no || "",
      picture_list: [],
    });
    const onSubmit = () => {
      router.push({
        name: "ShipByAppointment",
        params: {
          //   name: form.value.name,
          weight: form.value.weight,
          expect_quantity: form.value.expect_quantity,
          express_first_no: form.value.express_first_no,
        },
      });
    };

    const onRead = (file) => {
      let formData = new FormData();
      formData.append("file", file.file);
      // $api.imageUpload(formData).then((res) => {});
    };
    return {
      weightUnit,
      form,
      onSubmit,
      onRead,
    };
  },
};
</script>

<style lang="less" scoped>
.item-Information {
  padding: 10px 0;
  .van-cell-group {
    margin-bottom: 20px;
  }
  .underscore {
    font-size: 10px;
    color: #ffa785;
    margin: 0 15px;
    border-bottom: 1px solid #eaeaea;
  }
}
</style>