import vue from "vue"
import VueRouter from "vue-router"
vue.use(VueRouter)

const originpush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originpush.call(this,location).catch(err=>err)
}
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
                {
                  path:'/bug',
                    component:()=>import("@/components/bug/bug")
                },
                {
                    path:'/hero',
                    component:()=>import("@/components/hero/hero")
                },
                {
                  path:'/photo',
                    component:()=>import("@/components/photo/photo")
                },
                {
                  path: '/nodetree',
                    component:()=>import("@/components/notetree/nodetree")
                },
                {
                    path:'/mydir',
                    component:()=>import("@/components/mydir/mydir")
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
        {
            path:'/mythree',
            component:()=>import("@/components/mythree/mythree")
        },
    ]
})



export default router
