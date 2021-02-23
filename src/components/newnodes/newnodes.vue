<template>
  <div class="newnodes myscroller">
    <newnode :nodes="nodes" @callBackMT="callBackMT" :data="{selectedNode:selectedNode}"></newnode>
    <context-menu @onContextClick="onContextClickMT"  ref="contextdialog"   :contextList="contextList"></context-menu>
  </div>
</template>

<script>
import Newnode from "@/components/newnode/newnode";
import ContextMenu from "@/components/contextmenu/contextMenu";
import bus from "@/util/bus";

export default {
  name: "newnodes",
  props:{
    nodes:Array,
  },
  components: {ContextMenu, Newnode},
  data:function (){
    return{
      selectedNode:{},
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
  methods:{
    callBackMT(method,data){
      console.log(method,data)
      switch (method){
        case "selectedNodeMT":
          this.selectedNode = data
          break
        case "toggle":
          data.toggle = !data.toggle
          break
        case "contextmenuMT":
          this.selectedNode = data.data
          this.$refs.contextdialog.open(data.event)
          break
      }
      this.$emit("callBackMT",data,method)
    },
    onContextClickMT(e,item){
      this.$refs.contextdialog.close()
      this.$emit("callBackMT",{data:this.selectedNode,item:item},'onContextClickMT')
    },
    rootclick(){
      if(this.$refs.contextdialog){
        this.$refs.contextdialog.close()
      }
    },
  },
  mounted() {
    this.contextList = this.contextListA
    bus.$on("onAllClickEvent",this.rootclick)
  }
}
</script>

<style scoped lang="less">
@import "newnodes.less";
</style>
