<template>
  <!-- 计费规则 -->
  <div class="billing-rules">
    <nav-bar
      :title="$t('billingRules')"
      :onClickLeft="() => $router.push('/me')"
    ></nav-bar>
    <!-- 判断是续费包裹类型吗 -->
    <div class="billing" v-if="from.type == 4">
      <h3>{{ $t("firstParcelCost") }}</h3>
      <div>
        <table border="1" cellpadding="10" cellspacing="0" class="table">
          <thead>
            <tr>
              <th>{{ $t("numberFirstParcels") }}</th>
              <th>{{ $t("cost") }}({{ currencyUnit }})</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in from.firstParcelList" :key="index">
              <td :colspan="1">{{ item.starting_count }}</td>
              <td>{{ item.starting_price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>{{ $t("mileageFee") }}</h3>
      <div>
        <table border="1" cellpadding="10" cellspacing="0" class="table">
          <thead>
            <tr>
              <th>{{ $t("startingQuantity") }}</th>
              <th>{{ $t("cutQuantity") }}</th>
              <th>{{ $t("cost") }}({{ currencyUnit }})</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in from.count_list"
              :key="index"
              class="table"
            >
              <td :colspan="1">{{ item.start }}</td>
              <td :colspan="1">{{ item.end }}</td>
              <td>{{ item.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>{{ $t("billingMethod") }}</h3>
      <h6>
        {{ from.type_name }}
      </h6>
    </div>
    <!-- 判断是首重类型吗 -->
    <div class="billing" v-if="from.type == 5">
      <h3>{{ $t("firstParcelCost") }}</h3>
      <div>
        <table border="1" cellpadding="10" cellspacing="0" class="table">
          <thead>
            <tr>
              <th>{{ $t("numberFirstParcels") }}</th>
              <th>{{ $t("cost") }}({{ currencyUnit }})</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in from.firstParcelList" :key="index">
              <td :colspan="1">{{ item.starting_count }}</td>
              <td>{{ item.starting_price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>{{ $t("mileageFee") }}</h3>
      <div>
        <table border="1" cellpadding="10" cellspacing="0" class="table">
          <thead>
            <tr>
              <th>{{ $t("startingQuantity") }}</th>
              <th>{{ $t("cutQuantity") }}</th>
              <th>{{ $t("cost") }}({{ currencyUnit }})</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in from.first_weight_list"
              :key="index"
              class="table"
            >
              <td :colspan="1">{{ item.start }}</td>
              <td :colspan="1">{{ item.end }}</td>
              <td>{{ item.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>{{ $t("billingMethod") }}</h3>
      <h6>
        {{ from.type_name }}
      </h6>
    </div>
    <div class="billing" v-else>
      <h3>
        {{ $t("fixedCosts") }} : {{ currencyUnit }}{{ from.starting_price }}
      </h3>
      <h3>{{ $t("weightCharge") }}</h3>
      <div>
        <table border="1" cellpadding="10" cellspacing="0" class="table">
          <thead>
            <tr>
              <th>{{ $t("weightRange") }}({{ weightUnit }})</th>
              <th>{{ $t("cost") }}({{ currencyUnit }})</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in from.weight_list" :key="index">
              <td :colspan="1">{{ item.start }}~{{ item.end }}</td>
              <td>{{ item.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>{{ $t("mileageFee") }}</h3>
      <div>
        <table border="1" cellpadding="10" cellspacing="0" class="table">
          <thead>
            <tr>
              <th>{{ $t("mileageRange") }}(km)</th>
              <th>{{ $t("cost") }}({{ currencyUnit }})</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in from.km_list"
              :key="index"
              class="table"
            >
              <td :colspan="1">{{ item.start }}~{{ item.end }}</td>
              <td>{{ item.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>{{ $t("billingMethod") }}</h3>
      <h6>
        {{ from.type_name }}
      </h6>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import NavBar from "../components/NavBar.vue";
import { useStore } from "vuex";
import $api from "../api/index";
export default {
  components: {
    NavBar,
  },
  setup() {
    const store = useStore();
    const currencyUnit = computed(() => store.state.currencyUnit);
    const volumeUnit = computed(() => store.state.volumeUnit);
    const weightUnit = computed(() => store.state.weightUnit);
    const from = ref({
      firstParcelList: [],
    });

    const transportPrice = () => {
      $api.getTransportPrice().then((res) => {
        from.value = res.data;
        // if (res.data.type == 4) {
        let firstParcelList = [
          {
            starting_count: res.data.starting_count,
            starting_price: res.data.starting_price,
          },
        ];
        from.value.firstParcelList = firstParcelList;
        // }
      });
    };
    onMounted(() => {
      transportPrice();
    });
    return {
      from,
      currencyUnit,
      volumeUnit,
      weightUnit,
    };
  },
};
</script>

<style lang="less" scoped>
.billing-rules {
  min-height: 100vh;
  background-color: #fff;
  .billing {
    padding: 10px;
  }
  .table {
    width: 80%;
    background-color: #f5f9f7;
    border: 1px solid #fff;
  }
  thead {
    border: 1px solid #fff;
  }
  th {
    width: 200px;
    text-align: leftr;
    border: 1px solid #fff;
  }
  td {
    border: 1px solid #fff;
  }
}
</style>