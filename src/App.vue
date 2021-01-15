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
          selected:'lightgray',
          unselected:'white',
          inputBackgound:'white',
        },
        {
          background:'#2b2b2b',
          selected:'#4a4a4a',
          unselected:'#3C3F41',
          inputBackgound:'#3C3F41',
        }
      ]
    }
  },
  methods:{
    changeTheme(index){
      index = index - 1
      document.body.style.setProperty('--themeColor',this.theme[index].background)
      document.body.style.setProperty('--selectedthemeColor',this.theme[index].selected)
      document.body.style.setProperty('--unselectedthemeColor',this.theme[index].unselected)
      document.body.style.setProperty('--secondColor',this.theme[index].inputBackgound)
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
