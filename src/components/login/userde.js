// 用户逻辑
export default {
    isLogined(){
        return localStorage.getItem('loginres')!=null&&localStorage.getItem('loginres')!=''
    }
}