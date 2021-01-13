import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import './common/common.less'
import 'element-ui/lib/theme-chalk/index.css';
import ele from 'element-ui'
Vue.use(ele)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
