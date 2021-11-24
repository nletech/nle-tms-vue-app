<template>
  <nav-bar
    :title="$t('position')"
    :needBack="ture"
    :onClickLeft="() => $router.go(-1)"
  ></nav-bar>

  <div class="google-map">
    <div class="control-box">
      <div class="control-panel">
        <van-field
          clearable
          v-model="value"
          label="文本"
          placeholder="请输入用户名"
          id="pac_input"
        />
      </div>
    </div>
    <GoogleMap
      ref="mapRef"
      id="map"
      :api-key="key"
      style="width: 100%; height: 500px"
      :zoom="12"
      :center="center"
      language="zh-CN"
    >
      <!-- <Marker :options="{ position: shopLat }" /> -->
      <!-- <Marker :options="{ position: clientLat }" /> -->
    </GoogleMap>
  </div>
</template>

<script>
import { Field } from "vant";
import NavBar from "../components/NavBar.vue";
import { GoogleMap, Marker, Polyline } from "vue3-google-map";

export default {
  components: {
    NavBar,
    [Field.name]: Field,
    GoogleMap,
    Marker,
    Polyline,
  },
  setup() {
    const key = "AIzaSyADSJjhz-C62Kp69blJBBo71fqNyC7oZkY";
    return {
      key,
    };
  },
};
</script>

<style lang="less" scoped>
.google-map {
  position: relative;
  // width: 100%;
  height: 80.6vh;
  padding: 10px;
  .control-box {
    position: relative;
    .control-panel {
      font-size: 13px;
      cursor: pointer;
      color: #53d9a9;
    }
    #pac_input {
      // 禁止搜索框的位置移动
      position: absolute;
      left: 20px !important;
    }
  }
}
</style>
