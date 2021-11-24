import {
    createApp
} from 'vue'
import router from './router'
import store, {
    ORDER_MEAL_TOKEN,
    CURRENCY_UNIT,
    VOLNME_UNIT,
    WEIGHT_UNIT
} from './store'
import App from './App.vue'
import {
    Lazyload,
} from 'vant';
import VueI18n from './lib/i18n/index.js'
// import enUS from 'vant/es/locale/lang/en-US';
// Locale.use('en-US', enUS)
// import 'amfe-flexible/index.js'
const app = createApp(App)
const token = localStorage.getItem(ORDER_MEAL_TOKEN)
store.commit(ORDER_MEAL_TOKEN, token || '')
const currencyUnit = localStorage.getItem(CURRENCY_UNIT)
store.commit(CURRENCY_UNIT, currencyUnit || '')
const volumeUnit = localStorage.getItem(VOLNME_UNIT)
store.commit(VOLNME_UNIT, volumeUnit || '')
const weightUnit = localStorage.getItem(WEIGHT_UNIT)
store.commit(WEIGHT_UNIT, weightUnit || '')

store.dispatch('initCart', token)
app.use(Lazyload).use(store).use(router).use(VueI18n).mount('#app')