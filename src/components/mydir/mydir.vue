<template>
<div class="mydir">
  <div class="menu">
    <newnodes ref="newnodes" class="newnodes" :nodes="newnodesApiData" @callBackMT="callBackMT"></newnodes>
    <nodesearch  ref="nodesearch" ></nodesearch>
  </div>
  <markdown ref="markdown" class="markdown"></markdown>
  <nodetree ref="nodetree" v-show="nodetreeVisible"  class="notetree"></nodetree>
</div>
</template>

<script>
import nodeutil from "@/components/node/nodeutil";
import Newnodes from "@/components/newnodes/newnodes";
import api from "@/api/api";
import Markdown from "@/components/markdown/markdown";
import Nodetree from "@/components/notetree/nodetree";
import Nodesearch from "@/components/nodesearch/nodesearch";
import newnodesUtil from "@/components/newnodes/newnodesUtil";
import util from "@/util/util";

export default {
  name: "mydir",
  components: {Nodesearch, Nodetree, Markdown, Newnodes},
  data:function (){
    return{
      nodetreeVisible:false,
      newnodesApiData:[

      ],
      selectedNode:{},
    }
  },
  methods:{
    callBackMT(data,method){
      //console.log(data,method)
      switch (method){
        case "selectedNodeMT":
          this.getMarkDownMT(data)
          break
        case "onContextClickMT":
          console.log(data)
          switch (data.item.label){
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
                this.newnodesApiData.push(rootnode)
                this.$refs.newnodes.selectedNode = rootnode
                this.$refs.markdown.marktext = rootnode.markdown
              })
              break
            case "新建":
              var node = {
                level:data.data.level+1,
                nodes:[],
                parentid:data.data.id,
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
                data.data.nodes.push(node)
                data.data.toggle = true
                this.$refs.newnodes.selectedNode = node
                this.$refs.markdown.marktext = node.markdown
              })
              break
            case "删除":
              var parent = [{}]

              newnodesUtil.getParentNode(this.newnodesApiData,data.data.id,parent)
              console.log(parent[0])
              if(util.isNotEmpty(parent[0])){
                parent[0].splice(parent[0].indexOf(data.data),1)
              }

              // api.postApi(api.deleteByPrimaryKey,{id:data.data.id},res=>{
              //   if(res.data==1){
              //     newnodesUtil.getParentNode(this.newnodesApiData,data.data.id,parent)
              //     if(util.isNotEmpty(parent[0])){
              //       parent[0].removeChild(data.data)
              //     }
              //   }
              // })
              break
            // case "本次删除":
            //   this.removeNode(item.currentNode)
            //   break
            // case "剪切":
            //   this.cutNode()
            //   break
            // case "粘贴":
            //   this.pasteNode(item)
            //   break
          }
          break
      }
    },
    getMarkDownMT(item){
      console.log(item)
      if(item.id.toString().startsWith("new")){
        this.$refs.markdown.marktext = item.markdown
        return
      }
      api.postApi(api.selectMarkdownById,{id:item.id},res=>{
        item.markdown = res.data.markdown
        this.$refs.markdown.marktext = item.markdown
      })
    },
  },
  mounted() {
    console.log(123)
    api.getTestApi(api.blog.selectTreeNode,{},res=>{
      console.log(res)
      this.newnodesApiData = res.data
    })
  }
}
</script>

<style scoped lang="less">
@import "mydir.less";
</style>
