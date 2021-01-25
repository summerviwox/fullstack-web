<template>
  <div class="all vroot" @click="onAllClick">
    <div class="top">
      <div class="titles">
        <div class="title" @click="switchPage(0)" v-bind:style="{'color':currentIndex==0?'#0099FF':'#ffffff'}">主页</div>
        <div  class="title" @click="switchPage(1)" v-bind:style="{'color':currentIndex==1?'#0099FF':'#ffffff'}">附页</div>
        <div  class="title" @click="switchPage(2)" v-bind:style="{'color':currentIndex==2?'#0099FF':'#ffffff'}">bug</div>
<!--        <div  class="title" @click="switchPage(2)" v-bind:style="{'color':currentIndex==2?'#0099FF':'#ffffff'}">个人中心</div>-->
        <div class="gap" style="flex: 1;width: 0"></div>
        <el-dropdown class="dropdown" @command="dropDownClick">
          <span class="el-dropdown-link">
            summer<i class="el-icon-arrow-down el-icon--right arrow"></i>
          </span>
          <el-dropdown-menu  class="dropdown-menu" slot="dropdown" >
            <el-dropdown-item :command="item.value" v-for="(item,index) in personalList" :key="index">
              <div  class="item"  style="padding: 0px 10px">{{item.label}}</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="container mymaintheme mid">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="footer" v-if="currentIndex==1" >
      <myfooter :infos="infos" ref="footer"></myfooter>
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
      infos:[],
      pageUrl:[
        "/home",
        "/second",
          "/bug",
        "/mine",
      ],
      personalList:[
        {
          label:'退出登录',
          value:0,
          enalbe:true,
        },
        {
          label:'个人中心',
          value:1,
          enalbe:true,
        },
      ]
    }
  },
  methods:{
    switchPage(index){
      this.currentIndex = index
      this.$router.push({path:this.pageUrl[index]})
    },
    autoSwitchPage(){
      this.currentIndex = (this.currentIndex+1)%3
      //console.log(this.currentIndex)
      this.switchPage(this.currentIndex)
    },
    currentNodeInfo(node){
      this.infos = node.path.split('&nbsp;<span>></span>&nbsp;')
      if(this.infos.length!=0&&this.infos[0]===''){
        this.infos.shift()
      }
    },
    currentSearchNode(str){
      this.footerinfo = str
    },
    onAllClick(){
      bus.$emit("onAllClickEvent",{})
    },
    dropDownClick(index){
      console.log(index)
      switch (index){
        case 0:
          localStorage.removeItem('loginres')
          localStorage.setItem('loginres','')
          this.$router.push({path:'login',query:{}})
          break
        case 1:
          this.switchPage(2)
          break
      }
    }
  },
  mounted() {
    this.switchPage(0)
    bus.$on("currentNodeInfo",this.currentNodeInfo)
    bus.$on("currentSearchNode",this.currentSearchNode)
    bus.$on("switchpage",this.autoSwitchPage)
  }
}
</script>

<style scoped lang="less">
@import "all";
</style>
