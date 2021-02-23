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
    }
}
export default newnodesUtil
