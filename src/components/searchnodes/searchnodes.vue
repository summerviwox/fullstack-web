<template>
  <div class="root myscroller">
    <nodes ref="nodes"  :type="{type:'style'}" @onContextClicked="onContextClicked" @currentNodeInfo="currentNodeInfo" class="myscroller"></nodes>
  </div>
</template>

<script>
import api from "../../api/api";
import bus from "../../util/bus";
import Node from "../node/node";
import Nodes from "../nodes/nodes";
import Vue from 'vue'
export default {
  name: "searchnodes",
  components: {Nodes},
  props:{

  },
  data:function () {
    return{
      list:[]
    }

  },
  methods:{
    currentNodeInfo(node){
      api.postApi(api.selectParentsById,node,res=>{
        let str = this.getCurrentNodePath(res.data,"")
        node.path = str
        this.$emit("currentNodeInfo",node,"search")

      },error=>{

      })
    },
    onContextClicked(data){
      this.$emit("onContextClicked",data)
    },
    search(text){
      if(text===""){
        this.$message.warning("至少输入一些内容")
        return
      }
      api.postApi(api.search,{
        markdown:text
      },res=> {
        this.$refs.nodes.nodes = res.data
       // this.$set(this,'list',res.data)
        //this.list = res.data
      },error=>{

      })
    },
    getCurrentNodePath(data,str){
      if(data.childBlog.length==0){
        str = str + data.title
        return str
      }else{
        str = str + data.title + '&nbsp;<span>></span>&nbsp;'
        return this.getCurrentNodePath(data.childBlog[0],str)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "searchnodes";

</style>