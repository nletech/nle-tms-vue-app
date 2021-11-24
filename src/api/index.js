import {
  GET,
  POST,
  PUT,
  DEL
} from './config'

export default {
  getUserInfo: () => GET(`merchant_h5/company`), //公司信息
  getDictionary: () => GET(`merchant_h5/common/dictionary`), //数据
  login: (data) => POST(`merchant_h5/login`, data),
  register: (data) => POST(`merchant_h5/register`, data),
  getResetRegisterEmailCode: (data) => POST(`merchant_h5/register/apply`, data),
  getResetPasswordEmailCode: (data) => POST(`merchant_h5/password/code`, data),
  getResetPassword: (data) => PUT(`merchant_h5/password/reset`, data),
  // 首页
  getCarousel: () => GET('merchant_h5/carousel', null), //轮播图
  getArticle: () => GET('merchant_h5/article', null), //文章查询
  getDetailsArticle: (id) => GET(`merchant_h5/article${id} `, null), //文章查询
  getService: () => GET('merchant_h5/service-agreement', null), //条款查询
  getDetailsService: (id) => GET(`merchant_h5/service-agreement${id} `, null), //条款查询
  // 我的
  getTransportPrice: (data) => GET(`merchant_h5/transport-price`, data), //运价规则








}