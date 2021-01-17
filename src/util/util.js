const util = {
    isEmpty(e){
        return (!e&& e!=0)||e===''
    },
    isNotEmpty(e){
        return !this.isEmpty(e)
    }
}
export default util
