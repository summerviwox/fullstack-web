<template>
  <div class="nodetree">
    <div id="nodetreecontainer" ></div>
    <el-input-number size="small" class="el-input-number" v-model="inputnumbernum" @change="handleChange" :min="1" :max="6" label="描述文字"></el-input-number>
  </div>
</template>

<script>

import * as echarts from "echarts";
import api from "@/api/api";

export default {
  name: "nodetree",
  data:function(){
    return{
      inputnumbernum:5,
      apiData:[],
    }
  },
  methods:{
      init(){
        api.getTestApi(api.blog.selectBlogSunburst,{
          deep:this.inputnumbernum
        },res=>{
          this.apiData = res.data
          var mychart = echarts.init(document.getElementById("nodetreecontainer"))
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
          mychart.setOption(option)
          document.oncontextmenu = function (){
            return false
          }
          mychart.on("contextmenu",function (p) {
           // p.preventDefault()
            console.log(p)
          })
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

  },
  activated() {
    this.handleChange()
  }
}
</script>

<style scoped lang="less">
@import "nodetree";
</style>
