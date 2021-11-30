<template>
  <!-- 关于我们 -->
  <nav-bar :title="$t('aboutUs')" :needBack="ture"></nav-bar>
  <div class="about-uz">
    <div>
      红兔TMS-H5是恩尔伊科技开发的个人快递业务管理软件,为客户提供自助下单、查单、订单管理、个性服务等一站式掌上便捷快件服务.
      主要功能:
      ·在线下单寄件:支持用户在客户端下单,语言快递员上门收件;同时支持用户在线填写订单,用于营业点自寄;
      ·查询快递信息:支持快递信息实时查询;登录后,还可在查件列表中看到自己的快递信息,收到快递路由变化的推送;
      ·在线地址管理:支持用户在线管理地址,将常用地址保存在地址簿,下单时可直接选择地址簿中的地址或者历史寄件/收件地址,方便快捷;并且支持便捷删除操作;
      为了给您提供更好的服务,我们还在不断努力改进.更多精彩功能,期待您的发现!
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  setup() {},
};
</script>

<style lang="less" scoped>
.about-uz {
  padding: 20px;
  min-height: calc(100vh - 86px);
  background-color: #fff;
}
</style>