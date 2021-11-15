<template>
  <!-- 预约寄件 -->
  <div class="ship-appointment">
    <nav-bar
      :title="$t('shipByAppointment')"
      :needBack="ture"
      :onClickLeft="() => $router.push('/')"
    ></nav-bar>
    <div class="appointment-head">
      <div class="head">
        <div class="send">{{ $t("send") }}</div>
        <div class="border"></div>
        <div class="receive">{{ $t("receive") }}</div>
      </div>
      <div>
        <div>
          <div class="address-library">
            <div>
              <div class="address font">{{ "3241" }} {{ "32143241324" }}</div>
              <div class="information">
                {{ "doorno street city state United States" }}
              </div>
            </div>
            <div class="address-border"></div>
            <div class="address">{{ $t("addressBook") }}</div>
          </div>
        </div>
        <van-divider />
        <div>
          <div class="address-library">
            <div>
              <div class="address font">{{ "3241" }} {{ "32143241324" }}</div>
              <div class="information">
                {{ "NL Schlphol Evert van de Beekstraat 202 1183GT" }}
              </div>
            </div>
            <div class="address-border"></div>
            <div class="address">{{ $t("addressBook") }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="cell">
      <van-cell is-link to="home" title-style="text-align: left">
        <template #title>
          <span class="custom-title">{{ $t("thing") }} </span>
          <van-tag plain round type="warning">{{ $t("required") }} </van-tag>
        </template>
      </van-cell>
      <van-cell is-link to="home" title-style="text-align: left">
        <template #title>
          <span class="custom-title">{{ $t("expectedTimeVisit") }}</span>
        </template>
      </van-cell>
      <van-cell is-link to="home" title-style="text-align: left">
        <template #title>
          <span class="custom-title">{{ $t("paymentMethod") }}</span>
        </template>
      </van-cell>
    </div>

    <div class="cell">
      <van-cell is-link to="home" title-style="text-align: left">
        <template #title>
          <span class="custom-title">{{ $t("insured") }} </span>
          <van-tag plain round type="warning">{{ $t("required") }} </van-tag>
        </template>
      </van-cell>
      <van-cell is-link to="home" title-style="text-align: left">
        <template #title>
          <span class="custom-title">{{ $t("valueAddedServices") }}</span>
        </template>
      </van-cell>
      <van-cell is-link to="home" title-style="text-align: left">
        <template #title>
          <span class="custom-title">{{ $t("remark") }}</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Divider, Cell, Tag } from "vant";
import NavBar from "../components/NavBar.vue";
export default {
  components: {
    NavBar,
    [Divider.name]: Divider,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
  },
};
</script>

<style lang="less" scoped>
.ship-appointment {
  .appointment-head {
    margin: 10px;
    padding: 15px 15px;
    background-color: #fff;
    display: grid;
    grid-template-columns: 50px 1fr;
    border-radius: 10px;
    .head {
      width: 25px;
      .send {
        width: 25px;
        height: 25px;
        border-radius: 5px;
        line-height: 25px;
        background-color: #2dc18c;
        color: #fff;
        text-align: center;
      }
      .border {
        width: 1px;
        min-height: 50px;
        text-align: center;
        border-left: 1px dashed #eaeaea;
        margin: 0 auto;
      }
      .receive {
        width: 25px;
        height: 25px;
        border-radius: 5px;
        line-height: 25px;
        background-color: #ffa785;
        color: #fff;
        text-align: center;
      }
    }

    .address {
      font-size: 15px;
      color: #555555;
    }
    .font {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .address-library {
      display: grid;
      grid-template-columns: 1fr 10px 60px;
      align-items: center;
      .address-border {
        min-height: 30px;
        border-left: 1px solid #eaeaea;
      }
      .information {
        font-size: 13px;
        color: #999999;
      }
    }
  }
}
</style>