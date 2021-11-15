//语言
import {
    createI18n
} from 'vue-i18n' //引入vue-i18n组件
import cn from './cn'
import en from './en'
// import { 引入的组件 export 出来的 变量} from 'vue-i18n'
//注册i8n实例并引入语言文件
const i18n = createI18n({
    globalInjection: true, // 全局注册 $t方法
    // locale: localStorage.getItem('language') || 'cn',
    locale: 'cn',
    messages: {
        cn,
        en,
    }

})
export default i18n; //将i18n暴露出去，在main.js中引入挂载