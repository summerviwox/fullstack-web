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
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="footer">
      <myfooter ref="footer"></myfooter>
    </div>
  </div>
</template>

<script>
import bus from "../../util/bus";
import myfooter from "../footer/myfooter";
export default {
  name: "all",
  components: {myfooter},
  data:function (){
    return{
      currentIndex:0,
      pageUrl:[
        "/home",
        "/second",
        "/mine",
      ],
    }
  },
  methods:{
    switchPage(index){
      this.currentIndex = index
        this.$router.push({path:this.pageUrl[index]})
    },
    currentInfo(str){
      this.$refs.footer.info = str
    },
    currentSearchNode(str){
      this.$refs.footer.info = str
    }
  },
  mounted() {
    this.switchPage(1)
    bus.$on("currentInfo",this.currentInfo)
    bus.$on("currentSearchNode",this.currentSearchNode)
  }
}
</script>

<style scoped lang="less">
@import "all";
</style>