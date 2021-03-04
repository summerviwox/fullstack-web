import util from "@/util/util";

const dirNodesUtil = {
    getFirstLineStr(str){
        let title =  str.indexOf('\n')==-1?str:str.substring(0,str.indexOf('\n'))
        if(title.indexOf("# ")!=-1){
            title = title.substring(2,title.length)
        }
        return title.trim()
    },
    handleErrorMarkdownDomainMT(node){
        node.markdown = node.markdown.replace(/http:\/\/222.186.36.75:8888/g,"https://www.summerviwox.com")
        node.markdown = node.markdown.replace(/https:\/\/www.summerman.top:7777/g,"https://www.summerviwox.com")
    },

    handleInitServeNodesDataMT(node){
        node.nodes.forEach((v,i)=>{
            v.parentNode = node
            this.handleInitServeNodesDataMT(v)
        })
    },
    getCurrentNodeDirPath(currentNode,result){
        if(currentNode){
            result.push(currentNode)
            this.getCurrentNodeDirPath(currentNode.parentNode,result)
        }
    },
    getParentNode(treenode,id,parent){
        treenode.forEach((v,i)=>{
            if(v.id==id){
                parent[0] = treenode
                return
            }else{
                this.getParentNode(v.nodes,id,parent)
            }
        })
    },
    getNodeById(nodes,id,node){
        nodes.forEach(v=>{
            if(v.id==id){
                node.node = v
                return
            }
            this.getNodeById(v.nodes,id,node)
        })
    },
    updateNodeLevel(treeNode){
       treeNode.nodes.forEach((v,i)=>{
           v.level = treeNode.level +1
           this.updateNodeLevel(v)
       })
    },
    findSearchNodeInNodes(node,search,result){
        node.nodes.forEach((v,i)=>{
           // v.parentNode = node
            if(v.id==search.id){
                v.markdown = search.markdown
                result.push(v)
                return
            }
            this.findSearchNodeInNodes(v,search,result)
        })
    },
    expandNode(node){
        if(util.isEmpty(node)){
            return
        }
        node.toggle = true
        this.expandNode(node.parentNode)
    },
    closeAllNode(node){
        node.toggle = false
        node.nodes.forEach((v)=>{
            v.toggle = false
            this.closeAllNode(v)
        })
    },
    countMyHeight(node,result){
        let parentNode = node.parentNode
        if(util.isEmpty(parentNode)||parentNode.id==0){
            return
        }
        parentNode.toggle = true
         for(let i=0;i<parentNode.nodes.length;i++){
             result.result+=1
             if(parentNode.nodes[i]==node){
                 break
             }else{
                 //this.findChildNodeNum(parentNode.nodes[i].nodes,result)
             }
         }
         this.countMyHeight(parentNode,result)
    },

    findChildNodeNum(nodes,result){
        nodes.forEach((v,i)=>{
            result.result+=1
            this.findChildNodeNum(v.nodes,result)
        })
    }
}
export default dirNodesUtil
