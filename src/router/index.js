import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import store from '../store/index'
const loadonDemand = path => {
    return () => import(`../views/${path}.vue`)
}
const Login = loadonDemand('Login')
const ForgetPassword = loadonDemand('ForgetPassword')
const Register = loadonDemand('Register')
const RegistrationSuccess = loadonDemand('RegistrationSuccess')

const Home = loadonDemand('Home')
const HelpSupport = loadonDemand('HelpSupport')
const ArticleDetails = loadonDemand('ArticleDetails')
const NewsNotification = loadonDemand('NewsNotification')
const GettingStarted = loadonDemand('GettingStarted')
const ProhibitedItems = loadonDemand('ProhibitedItems')
const CommonProblem = loadonDemand('CommonProblem')
const PaymentSuccessful = loadonDemand('PaymentSuccessful')


const ExpressQuery = loadonDemand('ExpressQuery')
const ShipByAppointment = loadonDemand('ShipByAppointment')

const Me = loadonDemand('Me')
const MyBalance = loadonDemand('MyBalance')
const Recharge = loadonDemand('Recharge')
const PersonalInformation = loadonDemand('PersonalInformation')
const AddressBook = loadonDemand('AddressBook')
const AddAddress = loadonDemand('AddAddress')
const BillingRules = loadonDemand('BillingRules')
const AboutUs = loadonDemand('AboutUs')
const GoogleMap = loadonDemand('GoogleMap')



const router = createRouter({
    // mode: 'history',
    // history: createWebHistory(),去掉#的模式
    base: '/',
    history: createWebHashHistory(),
    routes: [{
            path: '/login',
            component: Login,
            name: 'Login',
            meta: {
                tabbar: false
            }
        },
        {
            path: '/forget_password',
            component: ForgetPassword,
            name: 'ForgetPassword',
            meta: {
                tabbar: false
            }
        },
        {
            path: '/register',
            component: Register,
            name: 'Register',
            meta: {
                tabbar: false
            }
        },
        {
            path: '/registrationSuccess',
            component: RegistrationSuccess,
            name: 'RegistrationSuccess',
            meta: {
                tabbar: false
            }
        },
        {
            path: '/',
            component: Home,
            name: 'Home',
            meta: {
                tabbar: true
            }
        },
        {
            path: '/helpSupport',
            component: HelpSupport,
            name: 'HelpSupport',
            meta: {
                tabbar: false
            }
        }, //帮助与支持
        {
            path: '/articleDetails',
            component: ArticleDetails,
            name: 'ArticleDetails',
            meta: {
                tabbar: false
            }
        }, //文章详情
        {
            path: '/newsNotification',
            component: NewsNotification,
            name: 'NewsNotification',
            meta: {
                tabbar: false
            }
        }, //新闻通知
        {
            path: '/gettingStarted',
            component: GettingStarted,
            name: 'GettingStarted',
            meta: {
                tabbar: false
            }
        }, //入门教程
        {
            path: '/prohibitedItems',
            component: ProhibitedItems,
            name: 'ProhibitedItems',
            meta: {
                tabbar: false
            }
        }, //禁运物品
        {
            path: '/commonProblem',
            component: CommonProblem,
            name: 'CommonProblem',
            meta: {
                tabbar: false
            }
        }, //常见问题
        {
            path: '/expressQuery',
            component: ExpressQuery,
            name: 'ExpressQuery',
            meta: {
                tabbar: true
            }
        },

        {
            path: '/shipByAppointment',
            component: ShipByAppointment,
            name: 'ShipByAppointment',
            meta: {
                tabbar: false
            }
        }, //预约寄件
        {
            path: '/me',
            component: Me,
            name: 'Me',
            meta: {
                tabbar: true
            }
        },
        {
            path: '/myBalance',
            component: MyBalance,
            name: 'MyBalance',
            meta: {
                tabbar: false
            }
        }, //我的余额
        {
            path: '/recharge',
            component: Recharge,
            name: 'Recharge',
            meta: {
                tabbar: false
            }
        }, //充值
        {
            path: '/paymentSuccessful',
            component: PaymentSuccessful,
            name: 'PaymentSuccessful',
            meta: {
                tabbar: false
            }
        }, //支付成功
        {
            path: '/personalInformation',
            component: PersonalInformation,
            name: 'PersonalInformation',
            meta: {
                tabbar: false
            }
        }, //个人信息
        {
            path: '/addressBook',
            component: AddressBook,
            name: 'AddressBook',
            meta: {
                tabbar: false
            }
        }, //地址薄
        {
            path: '/addAddress',
            component: AddAddress,
            name: 'AddAddress',
            meta: {
                tabbar: false
            }
        }, //新增地址
        {
            path: '/billingRules',
            component: BillingRules,
            name: 'BillingRules',
            meta: {
                tabbar: false
            }
        }, //运价规则
        {
            path: '/aboutUs',
            component: AboutUs,
            name: 'AboutUs',
            meta: {
                tabbar: false
            }
        }, //关于我们

        {
            path: '/googleMap',
            component: GoogleMap,
            name: 'GoogleMap',
            meta: {
                tabbar: false
            }
        }, //地图

    ]
})
router.beforeEach((guard, from, next) => {
    if (guard.path === '/login' && store.state.token) {
        next('/')
    }
    next()
})
export default router