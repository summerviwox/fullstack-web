<template>
<div class="root hroot bug">
  <div class="left">
    <div class="buglist myscroller mymaintheme" >
      <div class="bugitem" v-for="(item,index) in crashlist" :key="index" @click="bugClick(item)" @contextmenu.prevent="ListRightClick($event,item)" v-bind:class="{selectedtheme:selectRow.id == item.id,unselectedtheme:selectRow.id != item.id}">
        <div>
          <div class="bugitemtitle">
          <div class="front">{{item.id +"&nbsp;"+item.platform}}</div>
            <div class="mid"></div>
            <div class="right">{{item.timestr}}</div>
          </div>
          <div class="bugitemdetail"> {{item.error}}</div>
        </div>
      </div>
    </div>


    <el-pagination
        class="pagination"
        small
        :current-page.sync="pagereq.page"
        :page-size="pagereq.pagesize"
        :pager-count="7"
        @current-change="currentChange"
        layout="prev, pager, next"
        :total="pagereq.total">
    </el-pagination>
  </div>




  <div class="bugdetail myscroller" @contextmenu.prevent="rightClick">
    {{selectRow.error}}
  </div>
  <context-menu @onContextClick="onContextClick"  ref="comtextdialog"   :contextList="contextList"></context-menu>
</div>
</template>

<script>
import api from "../../api/api";
import ContextMenu from "../contextmenu/contextMenu";
import util from "../../util/util";
import bus from "../../util/bus";

export default {
name: "bug",
  components: {ContextMenu},
  data:function () {
    return{
      crashlist:[

      ],
      selectRow:{},
      pagereq:{
        page:1,
        pagesize:20,
        total:0,
      },
      contextList:[
        {
          label:'删除',
          value:0,
          enable:true,
        },
      ],
    }
  },
  methods:{
    getCrashListApi(){
      api.getApi(api.crash.getCrashList,true,{
        page:this.pagereq.page-1,
        pagesize:this.pagereq.pagesize,
      },res=>{
        this.crashlist = res.data
        this.pagereq.total = res.total
      },err=>{

      })
    },
    bugClick(item){
      this.selectRow = item
    },
    ListRightClick(e,item){
      this.bugClick(item)
      this.rightClick(e)
    },
    rightClick(e){
      if(util.isEmpty(this.selectRow.id)){
        return
      }
      this.$refs.comtextdialog.open(e)
    },
    deleteApi(){
      if(util.isEmpty(this.selectRow.id)){
        return
      }
      api.postApi(api.crash.deleteByPrimaryKey,true,{id:this.selectRow.id},res=>{
        if(res==1){
          this.$message.success(this.selectRow.id+ " 删除成功")
          this.getCrashListApi()
          this.selectRow = {}
        }

      },err=>{

      })
    },
    currentChange(index){
      this.getCrashListApi()
    },
    onContextClick(e,item){
      switch (item.label){
        case "删除":
          this.deleteApi()
          this.$refs.comtextdialog.close()
          break
      }
    },
    rootClick(){
      if(this.$refs.comtextdialog){
        this.$refs.comtextdialog.close()
      }
    },
  },
  mounted() {
    this.getCrashListApi()
    bus.$on("onAllClickEvent",this.rootClick)
  }
}
</script>

<style scoped lang="less">
@import "bug.less";
</style>
