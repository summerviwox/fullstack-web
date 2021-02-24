<template>
  <div ref="newnodes" class="newnodes myscroller">
    <newnode ref="newnode" :nodes="nodes" @callBackMT="callBackMT" :data="{selectedNode:selectedNode}"></newnode>
    <context-menu @onContextClick="onContextClickMT"  ref="contextdialog"   :contextList="contextList"></context-menu>
  </div>
</template>

<script>
import Newnode from "@/components/newnode/newnode";
import ContextMenu from "@/components/contextmenu/contextMenu";
import bus from "@/util/bus";
import api from "@/api/api";
import newnodesUtil from "@/components/newnodes/newnodesUtil";
import util from "@/util/util";

export default {
  name: "newnodes",
  props:{
    nodes:Array,
  },
  components: {ContextMenu, Newnode},
  data:function (){
    return{
      selectedNode:{},
      cutNode:{},
      tempCutNode:{},
      contextList:[
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
          enable:false,
        },
      ],
    }
  },
  watch:{
    cutNode(n,o){
      this.contextList[4].enable = util.isNotEmpty(n.id)
    }
  },
  methods:{
    scrollToCurrentNodeMT(e){
      console.log(e)
      this.$refs.newnodes.scrollTo(0,100)
    },
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
      switch (item.label){
        case "新增根目录":
          var rootnode = {
            level:0,
            nodes:[],
            parentid:0,
            title:"新建笔记",
            html:"",
            ctime:new Date().getTime(),
            utime:new Date().getTime(),
            type:0,
            markdown:"# 新建笔记",
            toggle:true,
          }
          api.postApi(api.insert,rootnode,res=>{
            rootnode.id = res.data.id
            this.nodes.push(rootnode)
            this.selectedNode = rootnode
            this.$emit("callBackMT",{data:this.selectedNode,item:item},'onContextClickMT')
            // this.$refs.markdown.marktext = rootnode.markdown
          })
          break
        case "新建":
          var node = {
            level:this.selectedNode.level+1,
            nodes:[],
            parentid:this.selectedNode.id,
            html:"",
            ctime:new Date().getTime(),
            utime:new Date().getTime(),
            type:0,
            title:"新建笔记",
            markdown:"# 新建笔记",
            toggle:false,
          }
          api.postApi(api.insert,node,res=>{
            node.id = res.data.id
            this.selectedNode.nodes.push(node)
            this.selectedNode.toggle = true
            this.selectedNode = node
            this.$emit("callBackMT",{data:this.selectedNode,item:item},'onContextClickMT')
          })
          break
        case "删除":
          api.postApi(api.deleteByPrimaryKey,{id:this.selectedNode.id},res=>{
            if(res.data==1){
              var parent = [{}]
              newnodesUtil.getParentNode(this.nodes,this.selectedNode.id,parent)
              if(util.isNotEmpty(parent[0])){
                parent[0].splice(parent[0].indexOf(this.selectedNode),1)
                this.$emit("callBackMT",{data:{},item:item},'onContextClickMT')
              }
            }
          })
          break
        case "剪切":
          this.tempCutNode = this.selectedNode
          this.cutNode = this.selectedNode
          break
        case "粘贴":
          api.postApi(api.updateParentIdByPrimaryKey,{
            parentid:this.selectedNode.id,
            id:this.cutNode.id
          },res=>{
            if(res==1){
              this.$message.success("成功")
              var parent = [{}]
              newnodesUtil.getParentNode(this.nodes,this.tempCutNode.id,parent)
              if(util.isNotEmpty(parent[0])){
                parent[0].splice(parent[0].indexOf(this.tempCutNode),1)
              }
            this.tempCutNode.level = this.selectedNode.level+1
              this.tempCutNode.parentid = this.selectedNode.id
              this.tempCutNode.utime =new Date().getTime()
              newnodesUtil.updateNodeLevel(this.tempCutNode)
              this.selectedNode.nodes.push(this.tempCutNode)
              this.cutNode ={}
              this.$emit("callBackMT",{data:this.selectedNode,item:item},'onContextClickMT')
            }
          })
          break
      }

      //this.$emit("callBackMT",{data:this.selectedNode,item:item},'onContextClickMT')
    },
    rootclick(){
      if(this.$refs.contextdialog){
        this.$refs.contextdialog.close()
      }
    },
  },
  mounted() {
    bus.$on("onAllClickEvent",this.rootclick)
  }
}
</script>

<style scoped lang="less">
@import "newnodes.less";
</style>
