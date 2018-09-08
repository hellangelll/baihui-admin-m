<template>
  <div class="index">
    <app-header>
      <span slot="header">订单信息管理</span>
    </app-header>
    <div class="main">
      <div class="list-wrapper">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore" :autoFill="false">
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'"><i class="fa fa-spinner fa-spin"></i> 加载中...</span>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
            <span v-show="bottomStatus === 'loading'"><i class="fa fa-spinner fa-spin"></i> 加载中...</span>
          </div>
          <ul>
            <span v-if="noData">没有数据</span>
            <li v-for="item in list" :key=item.id>
              <mt-cell :title="'订单金额:'+item.totalmoney/100" :label="'订单号:'+item.id" is-link>
                <mt-button  @click="showOrderDetail(item)" type="primary" size="small">{{item.status | orderStateName}}</mt-button>
              </mt-cell>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
    <app-menu></app-menu>
  </div>
</template>

<script>
import appHeader from '@/components/public/header/header'
import appMenu from '@/components/public/menu/menu'
export default {
  data() {
    return {
      list: [],
      allLoaded: false,
      topStatus: '',
      noData: true,
      bottomStatus: '',
      scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      pageSize:10,
      pageTotal:1,
      currentPageNum:0
    }
  },
  filters:{
    orderStateName:function (par){
    // console.log(par)
    let listName = ["下单未支付","等待派送","派送中","已收货"]
    return listName[par]
    }
},
  components:{
      'appHeader': appHeader,
      'appMenu': appMenu
  },
  mounted(){
      this.getOrderData();
  },
  watch:{ //复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象
    // $route:function(to, from){
    //   this.list = []
    //   this.getOrderData();
    // }
  },
  methods: {
    getOrderData(){
      this.$apis.getOrderList({"limit":this.pageSize,"offset":this.pageSize*this.currentPageNum},res=>{
        let data = res.data;
        if(data.rows.length >0){
          this.noData = false;
          this.list = this.list.concat(data.rows);
          this.$nextTick(function () {
            this.scrollMode = "touch";
          });
        }else{
          this.noData = true;
        }
        this.pageTotal = Math.ceil(data.total/this.pageSize);
        if(this.pageTotal-1<=this.currentPageNum){
          this.allLoaded = true;
        }else{
          this.allLoaded = false; // 若数据已全部获取完毕
        }
      })
    },
    loadTop() {
      // 加载更多数据
      var _this = this;
      setTimeout(function () {
        _this.getOrderData();
        _this.$refs.loadmore.onTopLoaded();
      }, 1000);
    },
    loadBottom() {
      // 加载更多数据
      if(!this.allLoaded){
        this.currentPageNum ++;
        let _this = this;
        setTimeout(function(){
          _this.getOrderData();
          _this.$refs.loadmore.onBottomLoaded();
        },1000)
      }
    },
    handleBottomChange(status){
      this.bottomStatus = status;

    },
    handleTopChange(status){
      this.topStatus = status;
    },
    showOrderDetail(item){
      // console.log(item)
      this.$router.push({
        name:'ShowOrderDetail',
        params:item
      })
    }
  }
}
</script>

<style lang='less' scoped>
.line{
  text-align: center;
}
.index{
    display: flex;
    flex-flow: column nowrap;
    height:100%;
    background: #f6f6f6;
    .main{
      display: flex;
      flex:1;
      overflow: hidden;
      margin-bottom:.2rem;
      flex-flow: column nowrap;
      .list-wrapper{
        flex: 1;
        width:100%;
        height:5rem;
        overflow: scroll;
        margin-top:.2rem;
        background: #f6f6f6;
        ul{
          width:100%;
          box-sizing: border-box;
          padding:.2rem;
          background: #fff;

          li{
            position: relative;
            width:100%;
            // height:2.4rem;
            height:auto;
            box-sizing: border-box;
            // margin:.4rem auto .4rem;
            background: #fff;
            border-radius: .08rem;
            padding-left:.2rem;
            padding-right:.2rem;
            transform:translate(0,0);
            box-shadow: 0 0 10px #e1e1e1;
            &:last-child{
              border-bottom:none;
            }
            .left{
              position: absolute;
              left:0;
              top:-.2rem;
              width:2rem;
              height:2.6rem;
              border-radius: .08rem;
              box-shadow: 0 5px 10px #f1f1f1;
              background: #e1e1e1;
              img{
                max-width: 100%;
              }
            }
            .right{
              box-sizing: border-box;
              padding:.2rem 0;
              .book_name{
                font-size: .40rem;
                margin:.2rem 0;
                color:#333;
              }
              .book_info{
                margin:.4rem 0;
                font-size: .28rem;
                color:#666;
                &>span:last-child{
                  float: right;
                  color:#27BBC5;
                  font-size: .36rem;
                }
              }
              .book_views{
                margin:.2rem 0;
                font-size: .24rem;
                color:#999;
                &>span:last-child{
                  float: right;
                }
              }
            }
          }
        }
        .mint-loadmore-bottom span, .mint-loadmore-top span{
          display: inline-block;
          transition: .2s linear;
          -webkit-transition: .2s linear;
        }
        .mint-loadmore-bottom span.rotate, .mint-loadmore-top span.rotate{
          transform: rotate(180deg);
          -webkit-transform: rotate(180deg);
        }
      }
    }
  }
</style>

