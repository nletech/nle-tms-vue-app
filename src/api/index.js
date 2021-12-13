import {
  GET,
  POST,
  PUT,
  DEL
} from './config'

export default {
  getUserInfo: () => GET(`merchant_h5/company`), //公司信息
  getDictionary: () => GET(`merchant_h5/common/dictionary`), //数据
  login: (data) => POST(`merchant_h5/login`, data), //登录
  register: (data) => POST(`merchant_h5/register`, data), //注册
  getResetRegisterEmailCode: (data) => POST(`merchant_h5/register/apply`, data), //注册验证码
  getResetPasswordEmailCode: (data) => POST(`merchant_h5/password/code`, data), //密码验证码
  getResetPassword: (data) => PUT(`merchant_h5/password/reset`, data), //忘记密码
  getFace: (data) => GET(`merchant_h5/customize`, data), //获取自定义界面
  getTimezone: (data) => PUT(`merchant_h5/timezone`, data), //时区

  // 首页
  getCarousel: () => GET('merchant_h5/carousel', null), //轮播图
  getArticle: () => GET('merchant_h5/article', null), //文章查询
  getDetailsArticle: (id) => GET(`merchant_h5/article${id} `, null), //文章详情
  getService: () => GET('merchant_h5/service-agreement', null), //条款查询
  getDetailsService: (id) => GET(`merchant_h5/service-agreement${id} `, null), //条款详情
  getOrderDate: (data) => GET('merchant_h5/order/get-date', data), //获取订单日期
  getOrderPriceCount: (data) => POST('merchant_h5/order/price-count', data), //估算运价
  order: (data) => POST('merchant_h5/order', data), //订单新增
  getDetailsOrder: (id) => GET(`merchant_h5/order/${id} `, null), //订单详情
  orderPay: (data) => POST('merchant_h5/order/pay', data), //订单支付
  imageUpload: (data, config) => POST('merchant_h5/upload/image', data, config), //图片上传
  getImageDir: (data) => GET('merchant_h5/upload/image-dir', data), //图片上传目录

  // 快件查询
  getOrder: (data) => GET('merchant_h5/order', data), //订单查询
  delOrder: (id) => DEL(`merchant_h5/order/${id}`, null), //订单删除

  // 我的
  getLedger: (data) => GET(`merchant_h5/ledger`, data), //财务信息
  getBillVerify: (data) => GET(`merchant_h5/bill-verify`, data), //对账账单
  getBillRecharge: (data) => GET(`merchant_h5/bill/recharge`, data), //充值记录
  recharge: (data) => POST(`merchant_h5/bill/recharge`, data), //充值
  paypal: (data) => POST(`merchant_h5/payment/paypal`, data), //发起支付
  putPaypal: (data) => PUT(`merchant_h5/payment/paypal`, data), //完成支付

  getMerchant: () => GET(`merchant`, null), //个人信息
  putMerchant: (data) => PUT(`merchant`, data), //修改个人信息
  getTransportPrice: (data) => GET(`merchant_h5/transport-price`, data), //运价规则
  getAddress: (data) => GET(`merchant_h5/address`, data), //地址查询
  putAddress: (data) => PUT(`merchant_h5/address/${data.id}`, data), //编辑地址
  getDetailsAddress: (id) => GET(`merchant_h5/address/${id}`, null), //地址详情
  delAddress: (id) => DEL(`merchant_h5/address/${id}`, null), //地址删除
  address: (data) => POST(`merchant_h5/address`, data), //新增地址
  putAddressDefault: (id) => PUT(`merchant_h5/address/${id}/default`, null), //设置默认地址
  getCountry: (data) => GET(`merchant_h5/common/country`, data), //获取国家列表
  getLocation: (data) => GET(`merchant_h5/common/location`, data), //获取经纬度


















}