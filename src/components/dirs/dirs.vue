<template>
  <div class="root">
    <nodes @expanClickEvent="expanClickEvent" ref="nodes" :context-list="contextList" :type="{type:'node'}" @onContextClicked="onContextClicked" @currentNodeInfo="currentNodeInfo" class="myscroller"></nodes>
  </div>
</template>

<script>
import Nodes from "../nodes/nodes";
import api from "../../api/api";
import nodeutil from "../node/nodeutil";

export default {
  name: "dirs",
  components: {Nodes},
  data:function () {
    return{
        contextListA:[
          {
            label:"新增根目录",
            value:1,
            enable:true,
          },
          {
            label:"新建",
            value:2,
            enable:true,
          },
          {
            label:"删除",
            value:3,
            enable:true,
          },
          {
            label:"剪切",
            value:4,
            enable:true,
          }
        ],
      contextListB:[
        {
          label:"新增根目录",
          value:1,
          enable:true,
        },
        {
          label:"新建",
          value:2,
          enable:true,
        },
        {
          label:"删除",
          value:3,
          enable:true,
        },
        {
          label:"剪切",
          value:4,
          enable:true,
        },
        {
          label:"粘贴",
          value:5,
          enable:true,
        },
      ],
      contextList:[],
    }

  },
  methods: {
    currentNodeInfo(node) {
      this.$emit("currentNodeInfo",node,"dir")
    },
    switchContextList(index){
      switch (index){
        case 1:
          this.contextList = this.contextListB
          break
        default:
          this.contextList = this.contextListA
          break
      }
    },
    //点击展开收缩开关
    expanClickEvent(node,e){
      console.log(node)
      //收缩不掉接口 展开才掉接口
      if(node.showNodes){
        this.getApiNodes(node,res=> {
          this.$set(node,'node',res)
        })
      }
      this.$emit("expanClickEvent",node,e)
    },
    onContextClicked(e,item){
      this.$emit("onContextClicked",e,item)
    },
    getApiNodes(parentNode,go) {
      api.getApi(api.selectWithOutHtmlDataByParentId,{
        id:parentNode?parentNode.id:0
      },res=> {
        for(let i=0;i<res.length;i++){
          nodeutil.operateNode(parentNode,res[i],i,nodeutil.NODE)
        }
        go(res)
      })
    },
  },
  mounted() {
    this.contextList = this.contextListA
    this.getApiNodes(undefined,res=> {
      for(let i=0;i<res.length;i++){
        res[i].parentNode = {
          id:0,
          level:-1,
          title:'',
        }
      }
      this.$refs.nodes.node.node = res
    })
  }
}
</script>

<style scoped lang="less">
@import "dirs";

</style>
