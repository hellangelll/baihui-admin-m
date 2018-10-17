<template>
  <div class="index">
    <app-header :show-add-goods='showAddGoods'>
      <span slot="header">商品信息管理</span>
    </app-header>
    <div class="main">
      <div class="list-wrapper">  
        <el-select v-model="goodsTypeValue" style="margin-left:5px; width:2.2rem;" size='small' @change="getGoodsData(1)" placeholder="全部分类">
          <el-option v-for="item in goodsTypeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select> <span style="font-size:0.4rem; color:#aaa;">|</span>
        <el-select v-model="orderOptionsValue" style="margin-left:2px; width:2.2rem;" size='small' @change="getGoodsData(1)" placeholder="全部商品">
          <el-option v-for="item in orderOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> <span style="font-size:0.4rem; color:#aaa;">|</span>
        <el-select v-model="sortOptionsValue" style="margin-left:2px; width:2.3rem;" size='small' @change="getGoodsData(1)" placeholder="默认排序">
          <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
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
            <li v-for="item in list" :key="item.id">
              <mt-cell :title="item.name+' 售价:'+item.containerPrice/100+'元'" :label="'商品ID:'+item.id+' 规格:'+item.specifications">
                <img slot="icon" :src="filePathDomain+item.goodsImg" width="24" height="24">
                <!-- <mt-button  @click="addGoodsDetail(item)" type="primary" size="small">添加</mt-button> -->
                <mt-button  @click="modifyGoodsDetail(item)" type="primary" size="small">编辑</mt-button>
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
      currentPageNum:0,
      filePathDomain:'',
      showAddGoods:true,
      goodsTypeList:[{
        name:'全部分类',
        id:''
      }],
      orderOptions: [{
        value: '',
        label: '全部商品'
      }, {
        value: '1',
        label: '生效商品'
      }, {
        value: '0',
        label: '失效商品'
      }, {
        value: '5',
        label: '库存不足'
      }],
      sortOptions:[{
        label:'默认排序',
        value:''
      }, {
        label:'价格降序',
        value:'1'
      },{
        label:'价格升序',
        value:'2'
      },{
        label:'库存降序',
        value:'3'
      },{
        label:'库存升序',
        value:'4'
      }],
      sortOptionslist:[{
        sort:'',
        order:'asc'
      }, {
        sort:'container_price',
        order:'desc'
      },{
        sort:'container_price',
        order:'asc'
      },{
        sort:'stock',
        order:'desc'
      },{
        sort:'stock',
        order:'asc'
      }
      ],
      goodsTypeValue: '',
      sortOptionsValue: '',
      orderOptionsValue: '',
    }
  },
  filters:{
    goodsStateName:function (par){
    // console.log(par)
    let listName = ["停用","启用"]
    return '状态: '+listName[par]
    }
  },
  components:{
      'appHeader': appHeader,
      'appMenu': appMenu
  },
  mounted(){
    this.getFilePathDomain(),
    this.getGoodsTypeData(),
    this.getGoodsData(0)
  },
  watch:{ //复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象
    // $route:function(to, from){
    //   this.list = []
    //   this.getGoodsData(0);
    // }
  },
  methods: {
    getGoodsData(refresh){
      let that = this;
      let sort='',order='',categor=this.goodsTypeValue,status=this.orderOptionsValue,warning='';
      if( status != 0 && status != 1 && status != '' ){
        warning = status;
        status = '';
      }
      if(this.sortOptionsValue != ''){
        sort = this.sortOptionslist[this.sortOptionsValue].sort;
        order = this.sortOptionslist[this.sortOptionsValue].order;
      }

      this.$apis.getGoodsList({"limit":this.pageSize,"offset":this.pageSize*this.currentPageNum,"categoryId":categor,"order":order,"sort":sort,"status":status,"warning":warning},res=>{
        let data = res.data;
        if(refresh){
            that.list = [];
          }
        if(data.rows.length >0){
          that.noData = false;
          that.list = that.list.concat(data.rows);
          that.$nextTick(function () {
            that.scrollMode = "touch";
          });
        }else{
          that.noData = true;
        }
        that.pageTotal = Math.ceil(data.total/that.pageSize);
        if(that.pageTotal-1<=that.currentPageNum){
          that.allLoaded = true;
        }else{
          that.allLoaded = false; // 若数据已全部获取完毕
        }
      })
    },
    getGoodsTypeData(){
      let that = this
      this.$apis.getGoodsTypeList({"limit":1000,"offset":0},res=>{
        let data = res.data;
        if(data.rows.length >0){
          that.noData = false;
          that.goodsTypeList = that.goodsTypeList.concat(data.rows);
        }
      })
    },
    getFilePathDomain(){
      this.$apis.getFilePathDomain(res=>{
        if(res.data){
          this.filePathDomain = res.data
        }
      })
    },
    loadTop() {
      // 加载更多数据
      var _this = this;
      setTimeout(function () {
        _this.getGoodsData();
        _this.$refs.loadmore.onTopLoaded();
      }, 1000);
    },
    loadBottom() {
      // 加载更多数据
      if(!this.allLoaded){
        this.currentPageNum ++;
        let _this = this;
        setTimeout(function(){
          _this.getGoodsData();
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

    modifyGoodsDetail(item){
      this.$router.push({
        name:'ModifyGoodsDetail',
        params:item
      })
    },
    addGoodsDetail(item){
      this.$router.push({
        name:'AddGoodsDetail',
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

