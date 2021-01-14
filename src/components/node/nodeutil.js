const nodeutil = {
    getFirstLineStr(str){
        let title =  str.indexOf('\n')==-1?str:str.substring(0,str.indexOf('\n'))
        if(title.indexOf("# ")!=-1){
            title = title.substring(2,title.length)
        }
        return title.trim()
    },
    //接口获取的node处理一下数据防止报错
    operateNode(parentNode,node,i){
        node.index = i
        node.level = parentNode?parentNode.level+1:0
        node.showNodes =false
        node.parentNode=parentNode
    },
}
export default nodeutil