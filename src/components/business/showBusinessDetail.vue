<template>
  <div class="detail">
    <app-header><p slot="header">商家信息详情</p></app-header>
    <div class="main">
        <mt-cell title="ID" :label="item.businessMemo">{{item.id | defultValue}}</mt-cell>
        <mt-cell title="商家名称" :label="item.businessMemo">{{item.businessName | defultValue}}</mt-cell>
        <mt-cell title="商家电话" :label="item.businessMemo">{{item.businessPhone | defultValue}}</mt-cell>
        <mt-cell title="联系人姓名" :label="item.businessMemo">{{item.contactPeopleName | defultValue}}</mt-cell>
        <mt-cell title="联系人电话" :label="item.businessMemo">{{item.contactPeoplePhone | defultValue}}</mt-cell>
        <mt-cell title="商家地址" :label="item.businessMemo">{{item.businessAddress | defultValue}}</mt-cell>
        <mt-cell title="备注" :label="item.businessMemo">{{item.businessMemo | defultValue}}</mt-cell>
        <mt-cell title="创建时间" :label="item.businessMemo">{{item.createTime | defultValue}}</mt-cell>
        <mt-cell title="更新时间" :label="item.businessMemo">{{item.updateTime | defultValue}}</mt-cell>        
    </div>
    <mt-button type="primary" @click="modifyBusinessDetail(item)">修改商家信息</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import appHeader from '@/components/public/header/header'
  export default {
    name: "detail",
    data(){
      return {
        item:{}
      }
    },
    components:{
      'appHeader': appHeader
    },
    filters:{
      defultValue:function (par){
        console.log(par)
        return par || '暂无数据'
      }
    },
    mounted(){
      this.getDetailData();
    },
    watch:{ //复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象
      $route:function(to, from){
        this.getDetailData();
      }
    },
    methods:{
      getDetailData(){
        this.item = this.$route.params
      },
      modifyBusinessDetail(item){
        this.$router.push({
        name:'ModifyBusinessDetail',
        params:item
      })
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail{
    display: flex;
    flex-flow: column nowrap;
    height:100%;
    .main{
      flex:1;
      width:100%;
      box-sizing: border-box;
      padding:.2rem;
      font-size: .28rem;
      line-height:.32rem;
      color:#666;
      h1.bookName{
        width:100%;
        height:.8rem;
        line-height:.8rem;
        font-size: .4rem;
        color:#333;
        text-align: center;
      }
    }
  }
</style>
