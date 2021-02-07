<template>
    <div id="app">
      <transition :name="animname">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
    import bus from "./util/bus";
    export default {
        name: 'App',
        components: {

        },
        data:function (){
            return{
              animname:'',
                theme:[
                    {
                        background:'white',
                        selectbackground:'lightgray',
                        unselectedbackground:'white',
                        inputbackgound:'white',
                        color:'black',
                        selectedcolor:'#0099FF',
                        unselectcolor:'#143e05',
                      linecolor:'#eeeeee',
                      toptitlebackground:'#333333',
                      bordercolor:'#CCCCCC',
                    },
                    {
                        background:'#2b2b2b',
                        selectbackground:'#4B6EAF',
                        unselectedbackground:'#1A1A1A',
                        inputBackgound:'#3C3F41',
                        color:'white',
                        selectedcolor:'white',
                        unselectcolor:'white',
                      linecolor:'#2b2b2b',
                      toptitlebackground:'black',
                      bordercolor:'#555555',
                    }
                ]
            }
        },
        methods:{
            changeTheme(index){
                index = index - 1
                document.body.style.setProperty('--background',this.theme[index].background)
                document.body.style.setProperty('--selectbackground',this.theme[index].selectbackground)
                document.body.style.setProperty('--unselectedbackground',this.theme[index].unselectedbackground)
                document.body.style.setProperty('--inputbackgound',this.theme[index].inputbackgound)
                document.body.style.setProperty('--color',this.theme[index].color)
                document.body.style.setProperty('--selectedcolor',this.theme[index].selectedcolor)
                document.body.style.setProperty('--unselectcolor',this.theme[index].unselectcolor)
              document.body.style.setProperty('--linecolor',this.theme[index].linecolor)
              document.body.style.setProperty('--toptitlebackground',this.theme[index].toptitlebackground)
              document.body.style.setProperty('--bordercolor',this.theme[index].bordercolor)
            }
        },
      watch:{
        $route(to,from){
          if(from.path ==='/login' && to.path ==='/all'){
            this.animname = 'loginanim'
          }else{
            this.animname = ''
          }
        },
      },
        mounted() {
            this.changeTheme(1)
            bus.$on("changeTheme",this.changeTheme)
           // this.$router.push({path:'/all'})
        }
    }
</script>


<style lang="less">
@import "App";
</style>
