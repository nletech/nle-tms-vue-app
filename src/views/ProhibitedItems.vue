<template>
  <!-- 禁运物品 -->
  <nav-bar
    :title="$t('prohibitedItems')"
    :needBack="ture"
    :onClickLeft="() => $router.push('/helpSupport')"
  ></nav-bar>
  <div class="prohibited-items">
    <div class="box">
      <div>
        <img
          src="../../public/home-img/img-1.png"
          alt=""
          style="width: 120px; height: 70px"
        />
      </div>
      <div>
        <div>打發大水發斯蒂芬</div>
        <div style="color: #999999">打發大水發斯蒂芬</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="less" scoped>
.prohibited-items {
  padding: 10px;
  min-height: 100vh;
  background-color: #fff;
  .box {
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: solid 1px #eaeaea;
  }
}
</style>