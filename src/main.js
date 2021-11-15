import {
    createApp
} from 'vue'
import router from './router'
import store, {
    ORDER_MEAL_TOKEN
} from './store'
import App from './App.vue'
import {
    Lazyload,
} from 'vant';
// import enUS from 'vant/es/locale/lang/en-US';
// Locale.use('en-US', enUS)
import VueI18n from './lib/i18n/index.js'
// import 'amfe-flexible/index.js'
const app = createApp(App)
const token = localStorage.getItem(ORDER_MEAL_TOKEN)
store.commit(ORDER_MEAL_TOKEN, token || '')
store.dispatch('initCart', token)
app.use(Lazyload).use(store).use(router).use(VueI18n).mount('#app')