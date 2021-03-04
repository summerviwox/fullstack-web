<template>
  <div ref="nodetreeroot" class="nodetree-root" :style="{'z-index':zindex}" >
    <div ref="nodetreecontainer"  id="nodetreecontainer"></div>
    <el-input-number size="small" class="el-input-number" v-model="inputnumbernum" @change="handleChange" :min="1" :max="6" label="描述文字"></el-input-number>
  </div>
</template>

<script>

import * as echarts from "echarts";
import api from "@/api/api";
import util from "@/util/util";

export default {
  name: "nodetree",
  data:function(){
    return{
      inputnumbernum:5,
      apiData:[],
      zindex:-1,
      mychart:"",
    }
  },
  methods:{
    switchShowNoteTreeMT(){
      this.showHideNoteTreeMT()
      if(this.zindex==1000){
        this.init()
      }
    },
    showHideNoteTreeMT(){
      this.zindex = this.zindex ==-1?1000:-1
      console.log(this.zindex)
    },
      init(){
      if(util.isNotEmpty(this.mychart)){
        this.mychart.clear()
        this.mychart.off("click")
        this.mychart.off("contextmenu")
        this.mychart.getZr().off("click")
      }
        api.getApi(api.blog.selectBlogSunburst,true,{
          deep:this.inputnumbernum
        },res=>{
          this.apiData = res.data
          if(util.isEmpty(this.mychart)){
            this.mychart= echarts.init(document.getElementById("nodetreecontainer"))
          }
          let bound = this.$refs.nodetreeroot.getBoundingClientRect()
          this.$refs.nodetreecontainer.style.height = bound.height
          this.$refs.nodetreecontainer.style.width = bound.width
          this.mychart.getZr().on("click",params=>{
            if(util.isEmpty(params.target)){
              this.showHideNoteTreeMT()
            }else{
             // this.showHideNoteTreeMT()
           //   this.$listeners.callBackMT(params,"onSelectedNodeTreeNode")
            }
          })
          // this.mychart.on("click",params=>{
          //   console.log(params)
          //   this.$listeners.callBackMT(params,"onSelectedNodeTreeNode")
          // })
          var option = {
            series:{
              type:'sunburst',
              data:res.data,
              label:{

              },
              radius:["0%","100%"],
              highlightPolicy:"none",
            }
          }
          this.mychart.setOption(option)
          document.oncontextmenu = function (){
            return false
          }
          this.mychart.on("contextmenu",p=> {
           // p.preventDefault()
            this.showHideNoteTreeMT()
            this.$listeners.callBackMT(p,"onSelectedNodeTreeNode")
          })
          this.mychart.resize()
        })
      },
    handleChange(){
        this.init()
    },
    keepDataInit(){//保证有界面
        console.log(this.apiData)
        if(this.apiData.length==0){
          this.init()
        }
    },
  },
  mounted() {
    this.handleChange()
  },
  activated() {

  }
}
</script>

<style scoped lang="less">
@import "nodetree";
</style>
