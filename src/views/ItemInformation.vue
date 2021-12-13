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
                <van-image
                  class="list-img"
                  v-for="(item, index) in form.picture_list"
                  :key="index"
                  :src="item"
                  @click="previewImage(item, index)"
                >
                </van-image>
                <van-icon
                  v-if="form.picture_list.length >= 1"
                  name="cross"
                  @click="onDelImage(index)"
                />
                <van-uploader
                  v-if="form.picture_list.length < 1"
                  :max-count="1"
                  :after-read="afterRead"
                  :preview-image="false"
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
import axios from "axios";
import baseApi from "../api/baseApi";

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
  ImagePreview,
  Image as VanImage,
  Icon,
} from "vant";
import { ref, computed, onActivated, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import $api from "../api/index";
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
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
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
      let picture_list = "";
      form.value.picture_list.map((item) => {
        picture_list = item;
      });
      router.push({
        name: "ShipByAppointment",
        params: {
          //   name: form.value.name,
          weight: form.value.weight,
          expect_quantity: form.value.expect_quantity,
          express_first_no: form.value.express_first_no,
          picture_list: picture_list,
        },
      });
    };
    //点击图片放大浏览
    const previewImage = (url, index) => {
      ImagePreview([url]);
    };
    //删除图片
    const onDelImage = (index) => {
      form.value.picture_list.splice(index, 1);
    };
    const afterRead = (file) => {
      let formData = new FormData();
      formData.append("image", file.file);
      let fileConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // 自定义传参
        transformRequest: [
          function (data) {
            return data;
          },
        ],
      };
      $api.imageUpload(formData, fileConfig).then((res) => {
        let img = res.data.path;
        form.value.picture_list.push(img);
      });
      // let config = {
      //   headers: {
      //     //添加请求头
      //     // "content-type": "multipart/form-data",
      //     Authorization: `Bearer ${store.state.token}`,
      //   },
      // };
      // 请求参数传不过去，使用原生可以
      // axios
      //   .post(baseApi + "merchant_h5/upload/image", formData, config)
      //   .then((res) => {
      //     let img = res.data.data.path;
      //     form.value.picture_list.push(img);
      //   });
    };
    onMounted(() => {
      if (route.query.picture_list) {
        let img = route.query.picture_list;
        form.value.picture_list.push(img);
      }
    });
    return {
      weightUnit,
      form,
      onSubmit,
      afterRead,
      previewImage,
      onDelImage,
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
  .list-img {
    width: 80px;
    height: 80px;
  }
  .van-icon {
    margin-top: -60px;
    margin-left: -15px;
  }
}
</style>