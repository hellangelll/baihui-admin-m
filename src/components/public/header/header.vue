<template>
  <div class="header">
    <div class="left" @click="goBack()"><i class="fa fa-arrow-left"></i></div>
    <div class="page-title">
      <slot name="header">no header</slot>
    </div>
    <div class="right"> </div>
    {{message}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'myheader',
    props:['message'],
    data(){
      return {

      }
    },
    methods:{
      goBack(){
        window.history.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../common/less/index.less';
  .header{
    position: relative;
    top:0;
    left:0;
    z-index: 1000;
    display: flex;
    width:100%;
    height:1rem;
    line-height:1rem;
    background: #293751;
    color:#fff;
    .left, .right{
      width:1rem;
      text-align: center;
    }
    .left>i, .right>i{
      display: block;
      height:1rem;
      line-height:1rem;
      font-size: .36rem;
      text-align: center;
    }
    .page-title{
      flex:1;
      font-size: .36rem;
      text-align: center;
    }
  }
</style>
