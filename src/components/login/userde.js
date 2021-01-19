// 用户逻辑
import util from "../../util/util";
export default {
    isLogined(){
        return util.isNotEmpty(localStorage.getItem('loginres'))
    }
}