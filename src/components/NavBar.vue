<template>
  <van-nav-bar
    class="nav-bar"
    :title="title"
    @click-left="clickLeft"
    :right-text="rightText"
    @click-right="onClickRight"
  >
    <template v-if="needBack" #left>
      <van-icon name="arrow-left" color="#272727" size="18" />
    </template>
  </van-nav-bar>
</template>
<script>
import { useRouter } from "vue-router";
import { NavBar, Icon } from "vant";
export default {
  props: {
    title: {
      type: String,
    },
    needBack: {
      type: Boolean,
      default: true,
    },
    onClickRight: {
      type: Function,
    },
    onClickLeft: {
      type: Function,
    },
    rightText: {
      type: String,
      default: "",
    },
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  setup(props) {
    const router = useRouter();
    const clickLeft = () => router.back();
    return {
      clickLeft: props.onClickLeft ? props.onClickLeft : clickLeft,
    };
  },
};
</script>
<style lang="less">
// .nav-bar {
//   position: sticky;
//   top: 0;
//   z-index: 999;
// }
</style>
