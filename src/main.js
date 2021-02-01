import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import './common/common.less'
import 'element-ui/lib/theme-chalk/index.css';
import {
    Pagination,
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    Button,
    Image,
    Message,
} from 'element-ui'
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Image)
Vue.use(Message)

Vue.prototype.$message = Message;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
