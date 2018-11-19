<template>
  <div class="detail">
    <app-header><p slot="header">订单信息管理</p></app-header>
    <div class="d-title">{{item.status | orderStateName}}</div>
    <div class="d-detail">订货单详情</div>
    <div class="main">
        <div class="d-order-list" v-for="ite in item.orderDetailResults" :key=ite.id>
          <mt-cell :title="ite.name+'('+ite.specifications+') x'+ite.num">
            <img slot="icon" :src="ite.goodsImg" width="40" height="40">
          </mt-cell>
        </div>
        <mt-cell title="订单编号">{{item.id}}</mt-cell>
        <mt-cell title="下单时间">{{item.createTime}}</mt-cell>
        <mt-cell title="支付状态">{{item.isPaid | payStateName}}</mt-cell>
        <div class="d-pay">总金额:<span class="d-price">￥{{item.totalmoney/100}}</span></div>
        <!-- <mt-cell title="订货总金额(元)">{{item.totalmoney/100}}</mt-cell> -->
        <!-- <mt-cell title="订单状态">{{item.status | orderStateName}}</mt-cell> -->
        <div class="d-send">配送信息</div>
        <mt-cell title="收货人信息">{{customerAddressDO.linkMan+' '+customerAddressDO.linkPhone}}</mt-cell>
        <mt-cell title="收货地址">{{customerAddressDO.address}}</mt-cell>
        <!-- <mt-cell title="订货单详情" v-for="its in orderDetailResults" :key="its.name">{{its.name+"("+its.specifications+")X"+its.num}}</mt-cell> -->
        <mt-cell title="客户留言">{{item.remark||'暂无'}}</mt-cell>
    </div>
    <mt-button v-if="item.status==0||item.status==1||item.status==2" type="primary" @click="modifyOrderStatus(item)">修改订单状态为-{{item.status+1|orderStateName}}</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import appHeader from '@/components/public/header/header'
  export default {
    name: "detail",
    data(){
      return {
        item:{},
        orderDetailResults:[],
        customerAddressDO:{}
      }
    },
    components:{
      'appHeader': appHeader
    },
    filters:{
      orderStateName:function (par){
        let listName = ["下单未支付","等待派送","派送中","已收货"]
        return listName[par]
      },
      payTypeName:function (par){
        let listName = ["微信","支付宝","线下"]
        return listName[par-1]
      },
      payStateName:function (par){
        let listName = ["未支付","已支付","已过期"]
        return listName[par]
      }
    },
    mounted(){
      this.getDetailData();
    },
    watch:{ //复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象
      $route:function(to, from){
        // console.log(to)
        if(to.path=='/showOrderDetail'){
          this.getDetailData();
        }
      }
    },
    methods:{
      getDetailData(){
        this.item = this.$route.params
        this.orderDetailResults = this.item.orderDetailResults
        this.customerAddressDO = this.item.customerAddressDO
      },
      modifyOrderStatus(){
        let redirect = this.$route.query.redirect || '/order';
        var status = this.item.status
        if(status == 0){
          status = 1
        }else if(status == 1){
          status = 2
        }else if(status == 2){
          status = 3
        }
        var pra = {
          orderId: this.item.id,
          status: status
        }
        this.$apis.modifyOrderStatus(pra, res=>{
          let data = res.data;
          if(data.code == 0){
            swal({
              title:'修改成功!',
              type:'success',
              confirmButtonText:'确定'
            });
            this.$router.push({path:redirect});          
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .d-order-list .mint-cell .mint-cell-wrapper{
    background-size: 120% 0px !important;
  }
  .d-order-list .mint-cell{
    min-height: 50px !important;
  }
  .mint-cell-text{
    font-weight: 500 !important;
  }
</style>

<style lang="less" scoped>
  .d-pay{
    text-align:right;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  .d-pay .d-price{
    font-size: 28px;
    color: red;
  }
  .d-title{
    width: 100%;
    height: 30px;
    background-color: rgb(235, 235, 235);
    line-height: 30px;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
  }
  .d-detail{
    width:100%;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    font-weight: 600;
    padding: 10px 15px;
    border-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
  }
  .d-send{
    width:100%;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    font-weight: 600;
    padding: 10px 15px;
    border-style: solid;
    border-top-width: 10px;
    border-top-color: #ebebeb;
    margin-left:-10px;
  }
  .d-order-list{
    width:100%;
  }
  .mint-button{
    border-radius:4px !important;
  }
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
      height: 100%;
      overflow: auto;
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
