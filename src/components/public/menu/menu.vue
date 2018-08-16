<template>
  <div class="menu">
    <ul>
      <!-- <router-link to="/index" tag="li"><span><i class="fa fa-home fa-fw"></i>home</span></router-link> -->
      <router-link to="/business" tag="li"><span><i class="fa fa-users fa-fw"></i>商家</span></router-link>
      <router-link to="/order" tag="li"><span><i class="fa fa-clone fa-fw"></i>订单</span></router-link>
      <router-link to="/goods" tag="li"><span><i class="fa fa-cart-plus fa-fw"></i>商品</span></router-link>
      <router-link to="/customer" tag="li"><span><i class="fa fa-address-book-o fa-fw"></i>用户</span></router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'myMenu',
    data:function(){
      return {

      }
    },
    created:function(){

    },
    methods:{

    }
  }
</script>

<style lang="less" scoped>
  @import "../../../common/less/index.less";
  .menu{
    position: relative;
    bottom:0px;
    z-index:1000;
    height:1rem;
    background:#fff;
    border:1px solid #f1f1f1;
    ul{
      display: flex;
      width:100%;
      li{
        flex:1;
        height:1rem;
        span{
          display: block;
          width:100%;
          height:1rem;
          font-size: .24rem;
          color:#ccc;
          text-align: center;
          vertical-align: middle;
          i {
            display: block;
            height:.7rem;
            line-height:.7rem;
            font-size: .4rem;
            color:#ccc;
            margin:0 auto;
          }
        }
        &.router-link-active span{
          color:@theme_color;
          i{
            color:@theme_color;
          }
        }
      }

    }
  }
</style>
