import util from "@/util/util";

const newnodesUtil = {
    getParentNode(treenode,id,parent){
        treenode.forEach((v,i)=>{
            if(v.id==id){
                console.log(v.id)
                parent[0] = treenode
                return
            }else{
                this.getParentNode(v.nodes,id,parent)
            }
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
            v.parentNode = node
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
export default newnodesUtil
