<template>
  <div class="vroot root">
    <div class="top">
      <div class="titles">
        <div class="title" @click="switchPage(0)" v-bind:style="{'color':currentIndex==0?'#0099FF':'#ffffff'}">主页</div>
        <div  class="title" @click="switchPage(1)" v-bind:style="{'color':currentIndex==1?'#0099FF':'#ffffff'}">附页</div>
        <div  class="title" @click="switchPage(2)" v-bind:style="{'color':currentIndex==2?'#0099FF':'#ffffff'}">个人中心</div>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "main",
  data:function (){
    return{
      currentIndex:0,
      pageUrl:[
        "/home",
        "/second",
        "/mine",
      ]
    }
  },
  methods:{
    switchPage(index){
      this.currentIndex = index
        this.$router.push({path:this.pageUrl[index]})
    }
  }
}
</script>

<style scoped lang="less">
@import "main";
</style>