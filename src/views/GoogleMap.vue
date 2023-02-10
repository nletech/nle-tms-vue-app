<template>
  <nav-bar
    :title="$t('position')"
    :onClickLeft="() => $router.go(-1)"
  ></nav-bar>
  <div class="google-map-box">
    <div class="google-map">
      <div class="control-box">
        <van-field
          id="pac_input"
          size="small"
          v-model="searchBoxValue"
          :placeholder="$t('pleaseEnterAddress')"
        />
      </div>
      <GoogleMap
        ref="mapRef"
        id="map"
        :api-key="key"
        style="width: 100%; height: 100%"
        :zoom="12"
        :center="center"
        :disableDefaultUi="true"
        language="zh-CN"
      >
        <Marker :options="{ position: shopLat }" />
        <Marker :options="{ position: clientLat }" />
      </GoogleMap>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import { Field } from "vant";
import NavBar from "../components/NavBar.vue";
import { useStore } from "vuex";
import { GoogleMap, Marker, Polyline } from "vue3-google-map";

export default defineComponent({
  props: {},
  components: {
    NavBar,
    [Field.name]: Field,
    GoogleMap,
    Marker,
    Polyline,
  },
  setup() {
    const store = useStore();
    const searchBoxValue = ref("");
    const center = reactive({
      lat: 52.666666,
      lng: -10.33333,
    });
    // const country = computed(() => store.state.country);
    const key = "AIzaSyADSJjhz-C62Kp69blJBBo71fqNyC7oZkY";
    return {
      searchBoxValue,
      key,
      center,
    };
  },
});
</script>

<style lang="less" scoped>
.google-map-box {
  .google-map {
    width: 100%;
    height: 90vh;
    position: relative;
    .control-box {
      width: 300px;
      height: 100px;
      border-radius: 10px;
      background-color: #fff;
      position: absolute;
      top: 5px;
      left: 10px;
      z-index: 9999;
      .van-field {
        // width: 200px;
        margin-top: 10px;
        text-align: center;
        // background-color: gray;
      }
    }
  }
}
</style>
