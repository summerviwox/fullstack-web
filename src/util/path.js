const path = {
    getPictureThumnailNetPath(path){
        let src = "https://"+process.env.VUE_APP_DOMAIN+"/thumbnail/"+this.dealPath(path)
        return src
    },

    getPictureOriginNetPath(path){
        let src = "https://"+process.env.VUE_APP_DOMAIN+"/records/"+this.dealPath(path)
        return src
    },

    dealPath(path){
        let split = path.split('\\')
        split.shift()
        split.shift()
        let src = ''
        split.forEach((v,i)=>{
            if(i!=split.length-1){
                src = src +v+"/"
            }else{
                src =src+ v
            }

        })
        return src
    },
}
export default path
