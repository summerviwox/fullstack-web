<template>
    <div class="vroot root" @click="onAllClick">
        <div class="top">
            <div class="titles">
                <div class="title" @click="switchPage(0)" v-bind:style="{'color':currentIndex==0?'#0099FF':'#ffffff'}">主页</div>
                <div  class="title" @click="switchPage(1)" v-bind:style="{'color':currentIndex==1?'#0099FF':'#ffffff'}">附页</div>
                <div  class="title" @click="switchPage(2)" v-bind:style="{'color':currentIndex==2?'#0099FF':'#ffffff'}">个人中心</div>
            </div>
        </div>
        <div class="container mymaintheme">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <div class="footer">
            <myfooter :infos="infos" ref="footer"></myfooter>
        </div>
    </div>
</template>

<script>
    import bus from "../../util/bus";
    import myfooter from "../footer/myfooter";
    export default {
        name: "all",
        components: {myfooter},
        data:function (){
            return{
                currentIndex:0,
                infos:[],
                pageUrl:[
                    "/home",
                    "/second",
                    "/mine",
                ],
            }
        },
        methods:{
            switchPage(index){
                this.currentIndex = index
                this.$router.push({path:this.pageUrl[index]})
            },
            autoSwitchPage(){
                this.currentIndex = (this.currentIndex+1)%3
                console.log(this.currentIndex)
                this.switchPage(this.currentIndex)
            },
            currentNodeInfo(node){
                this.infos = node.path.split('&nbsp;<span>></span>&nbsp;')
                this.infos.shift()
            },
            currentSearchNode(str){
                this.footerinfo = str
            },
            onAllClick(){
                bus.$emit("onAllClickEvent",{})
            }
        },
        mounted() {
            this.switchPage(1)
            bus.$on("currentNodeInfo",this.currentNodeInfo)
            bus.$on("currentSearchNode",this.currentSearchNode)
            bus.$on("switchpage",this.autoSwitchPage)
        }
    }
</script>

<style scoped lang="less">
    @import "all";
</style>
