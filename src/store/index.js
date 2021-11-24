import {
  createStore
} from 'vuex'
import $api from '../api/index'

export const ORDER_MEAL_TOKEN = 'ORDER_MEAL_TOKEN'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const CURRENCY_UNIT = 'CURRENCY_UNIT'
export const VOLNME_UNIT = 'VOLNME_UNIT'
export const WEIGHT_UNIT = 'WEIGHT_UNIT'

export const UPDATE_SELECTED_GOODS = 'UPDATE_SELECTED_GOODS'
export const UPDATE_ALL_CART_GOODS = 'UPDATE_ALL_CART_GOODS'
export const INIT_ALL_CART_GOODS = 'INIT_ALL_CART_GOODS'
export const UPDATE_CHECKOUT_SELECTED_ADDRESS = 'UPDATE_CHECKOUT_SELECTED_ADDRESS'
export const UPDATE_ORDER_UNPAID_NUM = 'UPDATE_ORDER_UNPAID_NUM'
export const UPDATE_SHOP_INFO = 'UPDATE_SHOP_INFO'
export const IS_FROM_CHECKOUT_PAGE = 'isFromCheckoutPage'

const store = createStore({
  state: {
    token: '',
    currencyUnit: '', //钱
    volumeUnit: '', //体积
    weightUnit: '', //重量
    userInfo: {},


    selectedGoods: [],
    allCartGoods: [],
    checkoutSelectedAddress: {},
    orderUnpaidNum: 0,
    shopInfo: {
      start_open_time: "",
      end_open_time: "",
      name: "",
      logo: [],
      photo: [],
      vip_min_pay_money: ""
    },
    isFromCheckoutPage: false
  },
  
  mutations: {
    [ORDER_MEAL_TOKEN](state, data) {
      state.token = data
      localStorage.setItem(ORDER_MEAL_TOKEN, data)
    }, //token
    [CURRENCY_UNIT](state, data) {
      state.currencyUnit = data
      localStorage.setItem(CURRENCY_UNIT, data)
    }, //钱
    [VOLNME_UNIT](state, data) {
      state.volumeUnit = data
      localStorage.setItem(VOLNME_UNIT, data)
    }, //体积
    [WEIGHT_UNIT](state, data) {
      state.weightUnit = data
      localStorage.setItem(WEIGHT_UNIT, data)
    }, //重量
    [UPDATE_USER_INFO](state, data) {
      state.userInfo = data
    }, //公司信息



    [IS_FROM_CHECKOUT_PAGE](state, data) {
      state.isFromCheckoutPage = data
    },
    [UPDATE_SHOP_INFO](state, data) {
      if (!Array.isArray(data.logo)) {
        data.logo = []
      }
      if (!Array.isArray(data.photo)) {
        data.photo = []
      }
      state.shopInfo = data
    },
    [UPDATE_ORDER_UNPAID_NUM](state, data) {
      state.orderUnpaidNum = data
    },
    [UPDATE_SELECTED_GOODS](state, data) {
      state.selectedGoods = data
    },
    [UPDATE_CHECKOUT_SELECTED_ADDRESS](state, data) {
      state.checkoutSelectedAddress = data
    },
    [UPDATE_ALL_CART_GOODS](state, data) {
      state.allCartGoods = data
    },
    [INIT_ALL_CART_GOODS](state, data) {
      const selectedId = state.selectedGoods.map(i => i.id)
      data.forEach(item => {
        if (selectedId.includes(item.id)) {
          item.checked = true
        }
      })
      state.allCartGoods = data
    }
  },
  actions: {
    async initCart({
      commit
    }, token) {
      if (!token) return
      try {
        const res = await $api.getUserInfo();
        if (res && res.code === 200) {
          commit(UPDATE_USER_INFO, res.data)
        }
        return Promise.resolve(true)
      } catch (error) {
        return Promise.resolve(false)
      }
    },
    // getUserInfo({
    //   commit
    // }) {
    //   $api.getUserInfo().then((res) => {
    //     if (res && res.status === 200) {
    //       commit(UPDATE_USER_INFO, res.data);
    //     }
    //   });
    // },
    // getShopInfo({ commit }) {
    //   $api.getShopInfo().then((res) => {
    //     if (res && res.status === 200) {
    //       const data = {
    //         ...res.data,
    //         logo: JSON.parse(res.data.logo),
    //         photo: JSON.parse(res.data.photo),
    //       };
    //       commit(UPDATE_SHOP_INFO, data);
    //     }
    //   });
    // },
    // getOrderUnpaidNum({
    //   commit
    // }) {
    //   $api.getOrderUnpaidNum().then(res => {
    //     if (res && res.status === 200) {
    //       commit(UPDATE_ORDER_UNPAID_NUM, res.data)
    //     }
    //   })
    // }
  }
})

export default store