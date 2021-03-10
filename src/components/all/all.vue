<template>
  <div class="all vroot" @click="onAllClick">
    <div class="top">
      <div class="titles">
        <div class="title" v-for="(item,index) in title" :key="index" @click="switchPage(item)" v-bind:style="{'color':current.index==item.index?'#0099FF':'#ffffff'}">{{item.label}}</div>
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
    <div class="footer" v-if="current.index==1||current.index==7" >
      <myfooter :infos="infos" ref="footer"></myfooter>
    </div>
  </div>
</template>

<script>
import bus from "../../util/bus";
import myfooter from "../footer/myfooter";
import Mythree from "../mythree/mythree";
import util from "@/util/util";
import dirNodesUtil from "@/components/dirnodes/dir-nodes-util";
export default {
  name: "all",
  components: { myfooter},
  data:function (){
    return{
      current:{},
      currentIndex:0,
      infos:[],
      title:[
        {
          label:"主页",
          index:0,
          url:"/home",
        },
        {
          label:"笔记",
          index:1,
          url:"/myDir",
        },
        {
          label:"bug",
          index:2,
          url:"/bug",
        },
        // {
        //   label:"模型",
        //   index:3,
        //   url:"/hero",
        // },
        {
          label:"相册",
          index:4,
          url:"/photo",
        },
        // {
        //   label:"结构",
        //   index:5,
        //   url:"/nodetree",
        // },
        {
          label:"个人中心",
          index:6,
          url:"/mine",
        },
        // {
        //   label:"mydir",
        //   index:7,
        //   url:"/mydir",
        // },
      ],
      personalList:[
        {
          label:'退出登录',
          value:0,
          enalbe:true,
        },
        // {
        //   label:'个人中心',
        //   value:1,
        //   enalbe:true,
        // },
      ]
    }
  },
  methods:{
    switchPage(current){
      this.current = current
      this.title.forEach((v,i)=>{
        if(current.label===v.label){
          this.currentIndex = i
        }
      })
      this.$router.push({path:current.url})
    },
    autoSwitchPage(){
      this.switchPage(this.title[(this.currentIndex+1)%this.title.length])
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
      switch (index){
        case 0:
          localStorage.removeItem('loginres')
          localStorage.removeItem('userid')
          localStorage.setItem('loginres','')
          this.$router.push({path:'login',query:{}})
          break
        case 1:
          this.switchPage(this.title[4])
          break
      }
    },
    callBackMT(data,method){
        switch (method){
          case "selectedNodeMT":
              var result = []
            this.infos = []
              dirNodesUtil.getCurrentNodeDirPath(data,result)
              for(let i=result.length-1;i>=0;i--){
                this.infos.push(result[i].title)
              }
            break
        }
    }
  },
  mounted() {
    let a ;
    this.title.forEach((v,i)=>{
      if(this.$route.path===v.url){
        a = v
      }
    })
    this.switchPage(util.isEmpty(a)?this.title[0]:a)
    bus.$on("currentNodeInfo",this.currentNodeInfo)
    bus.$on("currentSearchNode",this.currentSearchNode)
    bus.$on("switchpage",this.autoSwitchPage)
    bus.$on("callBackMT",this.callBackMT)
  }
}
</script>

<style scoped lang="less">
@import "all";
</style>
