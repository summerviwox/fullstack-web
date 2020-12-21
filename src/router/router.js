import vue from "vue"
import VueRouter from "vue-router"
vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/home',
            component:()=>import("@/components/home/home")
        }
    ]
})
export default router