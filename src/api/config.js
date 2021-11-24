import axios from "axios";
import {
  Toast
} from 'vant';
import qs from "qs";
import router from '../router/index'
import store, {
  ORDER_MEAL_TOKEN
} from "../store";
import baseApi from './baseApi';
import i18n from '../lib/i18n/index.js'

export const ax = axios.create({
  baseURL: baseApi,
  timeout: 120000,
  responseType: "json",
  headers: {
    post: {
      ["Content-Type"]: "application/x-www-form-urlencoded;charset=UTF-8",
    },
    put: {
      ["Content-Type"]: "application/x-www-form-urlencoded;charset=UTF-8",
    },
  },
  transformRequest: [
    (params) => {
      return qs.stringify(params, {
        skipNulls: true
      });
    },
  ],
});

function interceptorsRequestSuccess(config) {
  config.headers.Authorization = `Bearer ${store.state.token}`;
  config.headers.language = localStorage.getItem('lang') || 'cn'; // 设置语言
  return config;
}

function interceptorsRequestError(error) {
  return Promise.reject(error);
}

function interceptorsResponse(config) {
  const {
    data
  } = config;
  if (data.code === 500) {
    Toast.fail({
      duration: 3000,
      message: data.msg
    })
  } else if (data.code === 2001) {
    router.push('/login')
    // 翻译
    Toast.fail(i18n.global.t('signInFirst'));
  }
  return config.data;
}
function interceptorsResponseError(error) {
  const {
    response
  } = error;
  let msg = "Service Error";
  if (response && response.code === 401) {
    router.push('/login')
    store.commit(ORDER_MEAL_TOKEN, '')
    msg = 'Please log in first '
  }
  Toast.fail(msg)
  return Promise.reject(response && response.data);
}

ax.interceptors.request.use(
  interceptorsRequestSuccess,
  interceptorsRequestError
);
ax.interceptors.response.use(
  interceptorsResponse,
  interceptorsResponseError
);

export function GET(url, params, config) {
  return ax.get(url, {
    params,
    ...config
  });
}

export function POST(url, data, config) {
  return ax.post(url, data, config);
}

export function PUT(url, data, config) {
  return ax.put(url, data, config);
}

export function PATCH(url, data, config) {
  return ax.patch(url, data, config);
}

export function DEL(url, params, config) {
  return ax.delete(url, {
    params,
    ...config
  });
}