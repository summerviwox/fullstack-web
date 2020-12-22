import vue from "vue"
import VueRouter from "vue-router"
vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/main',
            component:()=>import("@/components/main/main"),
            children:[
                {
                    path:'/home',
                    component:()=>import("@/components/home/home")
                },
                {
                    path:'/second',
                    component:()=>import("@/components/second/second")
                },
                {
                    path:'/mine',
                    component:()=>import("@/components/mine/mine")
                },
            ]
        },
    ]
})
export default router