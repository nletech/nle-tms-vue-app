import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import store from '../store/index'
const loadonDemand = path => {
    return () => import(`../views/${path}.vue`)
}
const Login = loadonDemand('Login')
const Register = loadonDemand('Register')
const Home = loadonDemand('Home')
const ShipByAppointment = loadonDemand('ShipByAppointment')
const ExpressQuery = loadonDemand('ExpressQuery')
const PersonalInformation = loadonDemand('PersonalInformation')
const BillingRules = loadonDemand('BillingRules')
const RegistrationSuccess = loadonDemand('RegistrationSuccess')

const Me = loadonDemand('Me')
const router = createRouter({
    mode: 'history',
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
            path: '/expressQuery',
            component: ExpressQuery,
            name: 'ExpressQuery',
            meta: {
                tabbar: true
            }
        },
        {
            path: '/me',
            component: Me,
            name: 'Me',
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
        },
        {
            path: '/personalInformation',
            component: PersonalInformation,
            name: 'PersonalInformation',
            meta: {
                tabbar: false
            }
        },
        {
            path: '/billingRules',
            component: BillingRules,
            name: 'BillingRules',
            meta: {
                tabbar: false
            }
        },
    ]
})
router.beforeEach((guard, from, next) => {
    if (guard.path === '/login' && store.state.token) {
        next('/')
    }
    next()
})
export default router