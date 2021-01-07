import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import './common/common.less'
import ele from 'element-ui'
import  'highlight.js/styles/androidstudio.css'
Vue.use(ele)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
