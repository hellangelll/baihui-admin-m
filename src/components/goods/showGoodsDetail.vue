<template>
  <div class="detail">
    <app-header><p slot="header">订单信息详情</p></app-header>
    <div class="main">
        <mt-cell title="订单编号">{{item.id}}</mt-cell>
        <mt-cell title="订货总金额(元)">{{item.totalmoney/100}}</mt-cell>
        <mt-cell title="支付状态">{{item.isPaid | payStateName}}</mt-cell>
        <mt-cell title="订单状态">{{item.status | orderStateName}}</mt-cell>
        <mt-cell title="下单时间">{{item.createTime}}</mt-cell>
        <mt-cell title="收货人信息">{{customerAddressDO.linkMan+' '+customerAddressDO.linkPhone}}</mt-cell>
        <mt-cell title="订货单详情" v-for="its in orderDetailResults" :key="its.name">{{its.name+"X"+its.num}}</mt-cell>
        <mt-cell title="客户留言">{{item.remark||'暂无'}}</mt-cell>
    </div>
    <mt-button v-if="item.status==1||item.status==2" type="primary" @click="modifyOrderStatus(item)">修改订单状态为-{{item.status+1|orderStateName}}</mt-button>
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
        console.log(to)
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
        if(status == 1){
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
