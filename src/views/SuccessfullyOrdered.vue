<template>
  <!-- 下单成功 -->
  <div class="successfully-ordered">
    <div class="successfully">
      <img src="/home-img/success.png" alt="" width="30" />
      <h1>{{ $t("successfullyOrdered") }}</h1>
    </div>
    <div class="time">
      {{ $t("estimatedPickupTime") }} : {{ details.execution_date }}
    </div>
    <div class="order">
      <div class="head-icon">
        <div class="send-icon">{{ $t("send") }}</div>
        <div class="border"></div>
        <div class="receive-icon">{{ $t("receive") }}</div>
      </div>
      <div>
        <div class="send">
          <div class="send-font">
            <span>{{ details.place_fullname }} </span>&nbsp;&nbsp;<span>{{
              details.place_phone
            }}</span>
          </div>
          <div class="send-address">
            {{ details.place_address }}
          </div>
        </div>
        <van-divider />
        <div class="receive">
          <div class="receive-font">
            <span>{{ details.second_place_fullname }} </span>&nbsp;&nbsp;<span
              >{{ details.second_place_phone }}</span
            >
          </div>
          <div class="receive-address">
            {{ details.second_place_address }}
          </div>
        </div>
      </div>
    </div>
    <div class="order-more">
      <div :class="['more-panel', isHiddenPanel ? 'more-close' : '']">
        <div v-for="item in details.package_list" :key="item">
          <div v-if="!isHiddenPanel">
            <div class="order-detail">
              <div>{{ $t("thing") }}</div>
              <div>{{ item.express_first_no }}</div>
            </div>
            <div class="order-detail">
              <div>{{ $t("estimatedWeight") }}</div>
              <div>{{ item.weight }}</div>
            </div>
            <div class="order-detail">
              <div>{{ $t("numberofPieces") }}</div>
              <div>{{ item.expect_quantity }}</div>
            </div>
            <div class="order-detail">
              <div>{{ $t("paymentMethod") }}</div>
              <div>{{ details.settlement_type_name }}</div>
            </div>
            <div class="order-detail">
              <div>{{ $t("basicFreight") }}</div>
              <div>
                {{ currencyUnit }} {{ details.count_settlement_amount }}
              </div>
            </div>
            <van-divider />
            <div class="fee">
              <div>
                <span>{{ $t("estimatedTotalCost") }} </span>&nbsp;&nbsp;
                <span
                  >{{ currencyUnit }}{{ details.count_settlement_amount }}
                </span>
              </div>
              <div>
                <span>{{ $t("actualPayment") }} </span>&nbsp;&nbsp;
                <span style="color: #ffa785"
                  >{{ currencyUnit }}{{ details.actual_amount }}
                </span>
              </div>
            </div>
          </div>
          <div class="more" @click="showMore">
            {{ isHiddenPanel ? $t("more") : $t("putAway") }}
            <van-icon
              color="#999999"
              :name="isHiddenPanel ? 'arrow-down' : 'arrow-up'"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="order-operate">
      <div
        class="details"
        @click="$router.push('/expressQuery')"
        style="cursor: pointer"
      >
        <van-icon name="description" /> {{ $t("orderDetails") }}
      </div>
      <div
        style="cursor: pointer"
        @click="
          $router.push({
            name: 'ShipByAppointment',
            query: {
              id: details.id,
            },
          })
        "
      >
        <van-icon name="add-o" /> {{ $t("anotherOrder") }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import $api from "../api/index";
import { useRouter, useRoute } from "vue-router";
import { Divider, Icon } from "vant";
import { useStore } from "vuex";

export default {
  components: {
    [Divider.name]: Divider,
    [Icon.name]: Icon,
  },
  setup() {
    const isHiddenPanel = ref(true);
    const details = ref({});
    const route = useRoute();
    const store = useStore();
    const currencyUnit = computed(() => store.state.currencyUnit);

    const getDetailsOrder = () => {
      $api.getDetailsOrder(route.query.id).then((res) => {
        details.value = res.data;
      });
    };
    const showMore = () => {
      isHiddenPanel.value = !isHiddenPanel.value;
    };
    onMounted(() => {
      getDetailsOrder();
    });
    return {
      isHiddenPanel,
      details,
      currencyUnit,
      showMore,
    };
  },
};
</script>

<style lang="less" scoped>
.successfully-ordered {
  padding: 5px;
  .successfully {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .time {
    text-align: center;
    font-size: 16px;
    color: #555555;
  }
  .order {
    margin: 10px;
    padding: 15px 15px;
    background-color: #fff;
    display: grid;
    grid-template-columns: 50px 1fr;
    border-radius: 5px;
    .head-icon {
      width: 25px;
      .send-icon {
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
      .receive-icon {
        width: 25px;
        height: 25px;
        border-radius: 5px;
        line-height: 25px;
        background-color: #ffa785;
        color: #fff;
        text-align: center;
      }
    }
    .send,
    .receive {
      min-height: 40px;
    }
    .send-font,
    .receive-font {
      font-size: 15px;
      color: #555555;
      font-weight: 500;
      margin-bottom: 5px;
    }
    .send-address,
    .receive-address {
      font-size: 13px;
      color: #999999;
    }
  }
  .order-more {
    margin: 10px;
    .more-panel {
      height: 330px;
      transition: height 0.1s ease-in-out;
      background: #fff;
      background-color: #fff;
      color: #999999;
      text-align: center;
    }
    .more-close {
      height: 40px;
      transition: height 0.1s ease-in-out;
      background-color: #fff;
      color: #999999;
      line-height: 40px;
      text-align: center;
    }
    .order-detail {
      display: flex;
      justify-content: space-between;
      padding: 10px;
    }
    .more {
      cursor: pointer;
    }
    .fee {
      padding: 10px;
      text-align: right;
      font-size: 18px;
      color: #555555;
    }
  }
  .order-operate {
    margin: 10px;
    height: 40px;
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 16px;
    text-align: center;
    color: #999999;
    padding-top: 15px;
    .details {
      height: 20px;
      border-right: 1px solid #999999;
    }
  }
}
</style>