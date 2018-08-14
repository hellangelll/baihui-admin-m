<template>
  <div class="detail">
    <app-header><p slot="header">详情</p></app-header>
    <div class="main">
      <h1 class="bookName">{{bookName}}</h1>
      <p>文章id为：{{bookId}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import appHeader from '@/components/public/header/header'
  export default {
    name: "detail",
    data(){
      return {
        bookId:'',
        bookName:''

      }
    },
    components:{
      'appHeader': appHeader
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
        this.bookId = this.$route.params.id;
        this.bookName= this.$route.params.name;
        /*if(!this.bookId){
          this.$router.push('/index');
        }*/

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
