import {
  GET,
  POST,
  PUT,
  DEL
} from './config'

export default {
  getUserInfo: () => GET(`merchant_h5/company`),
  login: (data) => POST(`merchant_h5/login`, data),
  register: (data) => POST(`merchant_h5/register`, data),
  getResetRegisterEmailCode: (data) => POST(`merchant_h5/register/apply`, data),



}