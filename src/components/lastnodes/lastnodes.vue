<template>
  <div class="root myscroller">
    <nodes ref="nodes" :context-list="contextList"  :type="{type:'style'}" @onContextClicked="onContextClicked" @currentNodeInfo="currentNodeInfo" class="myscroller"></nodes>
  </div>
</template>

<script>
import Nodes from "../nodes/nodes";
import util from "../node/nodeutil";
import api from "../../api/api";
import nodeutil from "../node/nodeutil";
export default {
  name: "lastnodes",
  components: {Nodes},
  data:function () {
    return{
      list:[],
      contextList:[
        {
          label:"本次删除",
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
        this.$emit("currentNodeInfo",node,"last")
      },error=>{

      })
    },
    onContextClicked(e,item){
      this.$emit("onContextClicked",e,item)
    },
    pushList(node){
      this.list.forEach((item,index) => {
        if(item.id==node.id){
          this.list.splice(this.list.lastIndexOf(node),1)
        }
      })
      this.list.push({
        id:node.id,
        markdown:node.markdown,
        parentid:node.parentid,
        selected:false,
        showNodes:false,
        title:node.title,
      })
      if(this.list.length>20){
        this.list.shift()
      }
      this.$refs.nodes.node.node = this.list
    }
  }
}
</script>

<style scoped>
@import "lastnodes.less";
</style>
