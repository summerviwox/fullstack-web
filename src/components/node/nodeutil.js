const nodeutil = {
    copyDataFromNodeToNode(from,to){
        to.id = from.id

        to.parentid = from.parentid
        to.title = from.title
        to.markdown = from.markdown
    },
    getFirstLineStr(str){
        let title =  str.indexOf('\n')==-1?str:str.substring(0,str.indexOf('\n'))
        if(title.indexOf("# ")!=-1){
            title = title.substring(2,title.length)
        }
        return title.trim()
    },
    //接口获取的node处理一下数据防止报错
    operateNode(parentNode,node,i,type){
        node.index = i
        node.level = parentNode?parentNode.level+1:0
        node.showNodes =false
        node.parentNode=parentNode
        node.nodeType=type
        node.markdown = node.markdown.replace(/http:\/\/222.186.36.75:8888/g,"https://www.summerviwox.com")
        node.markdown = node.markdown.replace(/https:\/\/www.summerman.top:7777/g,"https://www.summerviwox.com")

    },
    getchildcount(node,type){
        if((type==="node")&&node.node){
            return node.node.length==0?"":"("+node.node.length+")"
        }
        return ''
    },
    getCurrentNodePath(data,str){
        if(data.childBlog.length==0){
            str = str + data.title
            return str
        }else{
            str = str + data.title + '&nbsp;<span>></span>&nbsp;'
            return this.getCurrentNodePath(data.childBlog[0],str)
        }
    },
    NODE:"node",
    STYLE:"style"
}
export default nodeutil
