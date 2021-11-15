import {
  createStore
} from 'vuex'
import $api from '../api/index'

export const ORDER_MEAL_TOKEN = 'ORDER_MEAL_TOKEN'
export const UPDATE_SELECTED_GOODS = 'UPDATE_SELECTED_GOODS'
export const UPDATE_ALL_CART_GOODS = 'UPDATE_ALL_CART_GOODS'
export const INIT_ALL_CART_GOODS = 'INIT_ALL_CART_GOODS'
export const UPDATE_CHECKOUT_SELECTED_ADDRESS = 'UPDATE_CHECKOUT_SELECTED_ADDRESS'
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const UPDATE_ORDER_UNPAID_NUM = 'UPDATE_ORDER_UNPAID_NUM'
export const UPDATE_SHOP_INFO = 'UPDATE_SHOP_INFO'
export const IS_FROM_CHECKOUT_PAGE = 'isFromCheckoutPage'

const store = createStore({
  state: {
    token: '',
    selectedGoods: [],
    allCartGoods: [],
    checkoutSelectedAddress: {},
    userInfo: {},
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
    [IS_FROM_CHECKOUT_PAGE](state, data) {
      state.isFromCheckoutPage = data
    },
    [ORDER_MEAL_TOKEN](state, data) {
      state.token = data
      localStorage.setItem(ORDER_MEAL_TOKEN, data)
    },
    [UPDATE_USER_INFO](state, data) {
      state.userInfo = data
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
        const res = await $api.getCart();
        if (res && res.status) {
          commit(INIT_ALL_CART_GOODS, res.data)
        }
        return Promise.resolve(true)
      } catch (error) {
        return Promise.resolve(false)
      }
    },
    getUserInfo({
      commit
    }) {
      $api.getUserInfo().then((res) => {
        if (res && res.status === 200) {
          commit(UPDATE_USER_INFO, res.data);
        }
      });
    },
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