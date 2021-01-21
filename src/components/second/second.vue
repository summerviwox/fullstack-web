<template>
  <div class="hroot root">
    <div class="menu vroot">
      <div class="dirs">
        <dirs @onContextClicked="onContextClicked" @currentNodeInfo="currentNodeInfo"  v-show="currentMenuIndex==0" ref="dir" class="dir"></dirs>
        <searchnodes @onContextClicked="onContextClicked" @currentNodeInfo="currentNodeInfo"  v-show="currentMenuIndex==1" ref="search" class="dir"></searchnodes>
        <lastnodes @onContextClicked="onContextClicked" @currentNodeInfo="currentNodeInfo" v-show="currentMenuIndex==2" ref="last" class="dir"></lastnodes>
      </div>
      <nodesearch ref="nodesearch" @onEnterSearch="onEnterSearch" @switchMenu="switchMenu"></nodesearch>
    </div>
    <markdown ref="markdown" class="view"></markdown>
  </div>
</template>

<script>
import Nodes from "../nodes/nodes";
import Markdown from "../markdown/markdown";
import bus from "../../util/bus";
import nodesearch from "../nodesearch/nodesearch";
import Searchnodes from "../searchnodes/searchnodes";
import api from "../../api/api";
import Lastnodes from "../lastnodes/lastnodes";
import Dirs from "../dirs/dirs";
import nodeutil from "../node/nodeutil";
import util from "../../util/util";
export default {
  name: "second",
  // eslint-disable-next-line vue/no-unused-components
  components: {Dirs, Lastnodes, Searchnodes, Markdown, Nodes,nodesearch},
  data:function (){
    return{
      currentMenuIndex:0,
      searchNodes:[],
      currentNode:{},
      operateNode:{},
      lastApiNode:{},//防止点击node速度快于接口回调速度 重复调接口
      cuteApiNode:{}//剪切的node
    }
  },
  methods:{
    currentNodeInfo(node,type){
      this.operateNode = {}
      this.$refs.markdown.marktext = node.markdown
      this.$refs.markdown.nodeId = node.id
      bus.$emit('currentNodeInfo',node)
      if(type==="dir"||type==="search"){
        this.$refs.last.pushList(node)
      }
      this.currentNode = node

      // this.autoSave(()=>{
      //
      // })
    },
    onContextClicked(data){
      this.operateNode = data.currentNode
      switch (data.label){
        case "新增根目录":
          this.currentNode = {}
          this.$refs.markdown.marktext = ''
          this.operateNode = this.$refs.dir.$refs.nodes.node
          break
        case "新建":
          this.currentNode = {}
          this.$refs.markdown.marktext = ''
          break
        case "删除":
          this.deleteNode(data.currentNode)
          break
        case "剪切":
          this.cutNode()
          break
        case "粘贴":
          this.pasteNode(data)
          break
      }
    },
    autoSave(goto){
      // eslint-disable-next-line no-constant-condition
      // if(1==1){//自动保存不要了
      //   typeof goto === "function" && goto()
      //   return
      // }
      //先判断当前是否有文档
      //1 有文档
      //1.1 文档是否改动
      //2 无文档
      //2.1是否要操作文档
      if(util.isNotEmpty(this.currentNode.id)){//当前已有加载文档   准备加载新的node&&将要加载的node将会覆盖原来的node
        //上一次加载的node编辑过 文档有改动
        if(this.currentNode.markdown !== this.$refs.markdown.marktext){
          // this.$message.warning("编辑区域已更改 将自动保存新的变化")
          this.save(goto);
        }else{
          typeof goto === "function" && goto()
           this.$message.warning("编辑区域没有更改变化")
        }
      }else{
        //当前为刚进入界面空文档||新建的空文档
        //处于右键操作状态
        if(util.isNotEmpty(this.operateNode.id)){
          //this.$message.success("当前为刚进入界面空文档||新建的空文档")
          this.insert(this.operateNode,goto)
        }else{
          this.$message.info("开始使用")
          typeof goto === "function" && goto()
        }
      }
    },
    save(goto){
      if(util.isEmpty(this.currentNode.id)){
        typeof goto === "function" && goto()
        return
      }
      this.currentNode.markdown = this.$refs.markdown.marktext
      this.currentNode.html = this.$refs.markdown.htmltext
      this.currentNode.title = nodeutil.getFirstLineStr(this.$refs.markdown.marktext)
      let data = this.currentNode
      api.postApi(api.updateByPrimaryKey,{
        id:data.id,
        parentid:data.parentid,
        markdown:data.markdown,
        html:data.html,
        title:data.title,
        ctime:new Date().getTime(),
        utime:new Date().getTime(),
        type:0
      },res=> {
        this.keepNodeSame(data)
        this.$message.success(data.title + ":更新成功")
        typeof goto === "function" && goto()
      },error=>{
        typeof goto === "function" && goto()
      })
    },
    //新增文档
    insert(node,goto){
      if(this.$refs.markdown.marktext.length==0){
        this.$message.warning("新文档至少需要一些内容")
        typeof goto === "function" && goto()
        return
      }
      let params = {
        parentid:node.id,
        title:nodeutil.getFirstLineStr(this.$refs.markdown.marktext),
        markdown:this.$refs.markdown.marktext,
        html:this.$refs.markdown.htmltext,
        ctime:new Date().getTime(),
        utime:new Date().getTime(),
        type:0
      }
      if(util.isNotEmpty(this.lastApiNode.parentid)
          &&params.parentid==this.lastApiNode.parentid
          &&params.title===this.lastApiNode.title
          &&params.markdown===this.lastApiNode.markdown){
        this.$message.info("点击过快 或者 上次改动未保存")
        typeof goto === "function" && goto()
        return
      }

      api.postApi(api.insert,params,res=>{
            this.currentNode = res.data
            this.operateNode = {}
            this.lastApiNode={}
            if(!node.node){
              node.node = []
            }
            nodeutil.operateNode(node,res.data,node.node.length,nodeutil.NODE)
            res.data.showNodes = true
            node.node.push(res.data)
            node.childCount = node.node.length
            this.$message.info(res.data.id!=0?"新增成功":"新增失败")
            typeof goto === "function" && goto()
          },
          error=>{
            this.lastApiNode={}
            console.log(error)
            typeof goto === "function" && goto()
          })



      this.lastApiNode =  {
        parentid:node.id,
        title:nodeutil.getFirstLineStr(this.$refs.markdown.marktext),
        markdown:this.$refs.markdown.marktext,
      }
    },
    deleteNode(node){
      api.postApi(api.deleteByPrimaryKey,{
        id:node.id
      },res=>{
        if(res.data==1){
          let searchnodes = this.$refs.search.$refs.nodes.node.node
          let lastnodes = this.$refs.last.$refs.nodes.node.node


          this.findNodes(this.$refs.dir.$refs.nodes.node.node,node,res=>{
            res.parentNode.node.splice(res.parentNode.node.indexOf(node),1)
            res.parentNode.childCount = res.parentNode.node.length
          })
          this.findNodes(searchnodes,node,res=>{
            searchnodes.splice(searchnodes.indexOf(node),1)
          })
          this.findNodes(lastnodes,node,res=>{
            lastnodes.splice(lastnodes.indexOf(node),1)
          })

          //当前无文档 也没有要操作的文档
          this.currentNode = {}
          this.operateNode = {}
        }
        this.$message.info(res.data==1?"删除成功":res.errorMessage)
      },error=>{

      })
    },
    //剪切
    cutNode(){
      this.cuteApiNode = this.currentNode
      this.$refs.dir.switchContextList(1)
    },
    pasteNode(parentNode){
      console.log(this.cuteApiNode,parentNode)
      api.postApi(api.updateParentIdByPrimaryKey,{
        parentid:parentNode.currentNode.id,
        id:this.cuteApiNode.id,
      },res=>{
        this.$message((res===1)?"成功":"失败")
        this.$refs.dir.switchContextList(0)

        let dirnodes = this.$refs.dir.$refs.nodes.node.node
        let searchnodes = this.$refs.search.$refs.nodes.node.node
        let lastnodes = this.$refs.last.$refs.nodes.node.node


        this.findNodes(dirnodes,this.cuteApiNode,res=>{
          res.parentNode.node.splice(res.parentNode.node.indexOf(this.cuteApiNode),1)
          res.parentNode.childCount = res.parentNode.node.length
        })

        this.cuteApiNode.parentid = parentNode.currentNode.id
        parentNode.currentNode.node.push(this.cuteApiNode)

        this.findNodes(searchnodes,this.cuteApiNode,res=>{
          res.parentid = parentNode.currentNode.id
        })
        this.findNodes(lastnodes,this.cuteApiNode,res=>{
          res.parentid = parentNode.currentNode.id
        })

      },error=>{

      })
    },
    keepNodeSame(node){
      //console.log(this.$refs.dir.$refs.nodes.node,this.$refs.search.$refs.nodes.node,this.$refs.last.$refs.nodes.node)
      let list = this.$refs.dir.$refs.nodes.node.node.concat(this.$refs.search.$refs.nodes.node.node,this.$refs.last.$refs.nodes.node.node)
      this.findNodes(list,node,res=>{
        this.$set(res,'title',node.title)
        this.$set(res,'markdown',node.markdown)
      })
    },
    findNodes(nodes,node,go){
      let myid = node.id
      for(let i=0;i<nodes.length;i++){
        if(myid == nodes[i].id){
          go(nodes[i])
          continue
        }else{
          if(nodes[i].node&&nodes[i].node.length!=0){
            this.findNodes(nodes[i].node,node,go)
          }else{
            continue
          }
        }
      }
    },
    switchMenu(index){
      this.currentMenuIndex = index
    },
    onEnterSearch(text){
      this.$refs.search.search(text)
    },
    keySwitchMenu(e){
      this.$refs.nodesearch.switchMenu()
    }
  },
  mounted() {
    document.onkeydown=e=>{
      let key = e.keyCode;
      console.log(key)
      if(e.ctrlKey){//ctrl s 保存
        switch (key){
          case 83:
            this.autoSave()
            window.event.preventDefault()
            break
          case 192:
            bus.$emit("switchpage",{})
            window.event.preventDefault()
            break
          case 89://control + y
            this.$refs.markdown.rollPush()
            window.event.preventDefault()
            break
          case 90://control + z
            this.$refs.markdown.rollback()
            window.event.preventDefault()
            break
        }
      }
      if(e.altKey){
        console.log('alt',key)
        switch (key){
          case 192://切换目录
            this.keySwitchMenu(e)
            break
          case 49://alt 1 主题1
            bus.$emit("changeTheme",1)
            break
          case 50://alt 1 主题1
            bus.$emit("changeTheme",2)
            break
          case 51://alt 1 主题1
            bus.$emit("changeTheme",3)
            break
        }
      }
    }

  }
}
</script>

<style scoped lang="less">
@import "second.less";
</style>
