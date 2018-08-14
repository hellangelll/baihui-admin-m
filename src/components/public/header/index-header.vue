<template>
  <div class="header">
    <div class="search-wrapper">
      <input type="text" placeholder="请输入关键字">
      <span class="scan"><i class="fa fa-qrcode"></i></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'header-home',
    data(){
      return {

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
    width:100%;
    height:1.2rem;
    line-height:1.2rem;
    background: #293751;
    color:#fff;
    text-align: center;
    .search-wrapper{
      position: relative;
      margin:.2rem;
      height:.8rem;
      line-height:.8rem;
      background: #fff;
      border-radius: 2px;
      overflow: hidden;
      input{
        box-sizing: border-box;
        width:100%;
        border:none;
        outline:none;
        padding:0 .2rem;
        text-align: left;
        .placehoder(#c8c8c8);
        font-size: .28rem;
      }
      .scan{
        display: block;
        position: absolute;
        right:0;
        top:0;
        width:.8rem;
        height:.8rem;
        line-height:.8rem;
        i{
          display: block;
          height:.8rem;
          line-height:.8rem;
          font-size: .40rem;
          text-align: center;
          color:#c8c8c8;
        }
      }
    }

  }
</style>
