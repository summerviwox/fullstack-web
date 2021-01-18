import vue from "vue"
import VueRouter from "vue-router"
vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:()=>import("@/components/login/login"),
        },
        {
            path:'/all',
            component:()=>import("@/components/all/all"),
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
        {
            path:'/html',
            component:()=>import("@/components/html/html")
        },
        {
            path:'/login',
            component:()=>import("@/components/login/login"),
        },
    ]
})
export default router