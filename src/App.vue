<template>
    <div id="app">
        <router-view></router-view>
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
                theme:[
                    {
                        background:'white',
                        selectbackground:'lightgray',
                        unselectedbackground:'white',
                        inputbackgound:'white',
                        color:'black',
                        selectedcolor:'#0099FF',
                        unselectcolor:'gray',
                    },
                    {
                        background:'#2b2b2b',
                        selectbackground:'#4B6EAF',
                        unselectedbackground:'lightgray',
                        inputBackgound:'#3C3F41',
                        color:'white',
                        selectedcolor:'white',
                        unselectcolor:'#2b2b2b',
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
            }
        },
        mounted() {
            this.changeTheme(1)
            bus.$on("changeTheme",this.changeTheme)
            this.$router.push({path:'/all'})
        }
    }
</script>


<style>
    html,body{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        --themeColor:#2b2b2b;
        --secondColor:#3C3F41;
    }
    #app {
        width: 100%;
        height: 100%;
    }
</style>
