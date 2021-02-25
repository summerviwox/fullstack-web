<template>
  <div class="root myscroller">
    <nodes ref="nodes" :context-list="contextList"  :type="{type:'style'}" @onContextClicked="onContextClicked" @currentNodeInfo="currentNodeInfo" class="myscroller"></nodes>
  </div>
</template>

<script>
import api from "../../api/api";
import bus from "../../util/bus";
import Node from "../node/node";
import Nodes from "../nodes/nodes";
import nodeutil from "../node/nodeutil";
import Vue from 'vue'
export default {
  name: "searchnodes",
  components: {Nodes},
  props:{

  },
  data:function () {
    return{
      list:[],
      contextList:[
        {
          label:"删除",
          value:1,
          enable:true,
        },
      ]
    }

  },
  methods:{
    currentNodeInfo(node){
      api.postApi(api.selectParentsById,true,node,res=>{
        let str = nodeutil.getCurrentNodePath(res.data,"")
        node.path = str
        this.$emit("currentNodeInfo",node,"search")

      },error=>{

      })
    },
    onContextClicked(e,item){
      this.$emit("onContextClicked",e,item)
    },
    search(text){
      if(text===""){
        this.$message.warning("至少输入一些内容")
        return
      }
      api.postApi(api.search,true,{
        markdown:text
      },res=> {
        this.$refs.nodes.node.node = res.data
       // this.$set(this,'list',res.data)
        //this.list = res.data
      },error=>{

      })
    },
  }
}
</script>

<style scoped lang="less">
@import "searchnodes";

</style>
