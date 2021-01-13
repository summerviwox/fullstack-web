const nodeutil = {
    getFirstLineStr(str){
        let title =  str.indexOf('\n')==-1?str:str.substring(0,str.indexOf('\n'))
        if(title.indexOf("# ")!=-1){
            title = title.substring(2,title.length)
        }
        return title.trim()
    },
}
export default nodeutil