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
    }
}
export default newnodesUtil
