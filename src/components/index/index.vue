<template>
  <div class="index">
    <app-index-header></app-index-header>
    <div class="main">
      <app-index-banner1></app-index-banner1>
      <div class="list-wrapper">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" @top-status-change="handleTopChange" ref="loadmore" :autoFill="false">
          <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'"><i class="fa fa-spinner fa-spin"></i> 加载中...</span>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
            <span v-show="bottomStatus === 'loading'"><i class="fa fa-spinner fa-spin"></i> 加载中...</span>
          </div>
          <ul>
            <li v-for="item in list" @click="goDetail(item)">
              <div class="left">
                <img :src="item.coverImg">
              </div>
              <div class="right">
                <h3 class="book_name">{{item.title}}</h3>
                <div class="book_info">
                  <span>作者：{{item.article}}</span>
                  <span><b>￥</b>：{{item.price}}</span>
                </div>
                <div class="book_views">
                  <span><i class="fa fa-calendar"></i>：{{item.date}}</span>
                  <span><i class="fa fa-eye"></i>：{{item.views}}</span>
                </div>
              </div>
            </li>
          </ul>

        </mt-loadmore>
      </div>
    </div>
    <app-menu></app-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import appIndexHeader from '@/components/public/header/index-header'
  import appMenu from '@/components/public/menu/menu'
  import appIndexBanner from '@/components/index/banner/banner'
  import appIndexBanner1 from '@/components/index/banner/banner1'
  export default {
    name:'index',
    data:function(){
      return {
        list: [],
        allLoaded: false,
        topStatus: '',
        bottomStatus: '',
        scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        count: 0
      }
    },
    created(){

    },
    mounted(){
      this.getBookData();
    },
    components:{
      'appIndexHeader': appIndexHeader,
      'appMenu': appMenu,
      'appIndexBanner1': appIndexBanner1
    },
    methods:{
      getBookData(){
        this.Axios.get('api/list').then(res => {
          let data = res.data;
          if(parseInt(data.errno) === 0){
            this.list = this.list.concat(data.data);
            this.$nextTick(function () {
              // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
              // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
              // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
              this.scrollMode = "touch";
            });
            //console.log(this.list);
          }

        }).catch(error => {
          console.log(error);
        })
      },
      loadTop() {
        // 加载更多数据
        var _this = this;
        setTimeout(function () {
          _this.getBookData();
          _this.$refs.loadmore.onTopLoaded();
        }, 1000);
      },
      loadBottom() {
        // 加载更多数据
        this.count ++;
        if(this.count <=5){
          let _this = this;
          setTimeout(function(){
            _this.getBookData();
            _this.$refs.loadmore.onBottomLoaded();
          },1000)
        }else{
          this.allLoaded = true;// 若数据已全部获取完毕
        }
      },
      handleBottomChange(status){
        this.bottomStatus = status;

      },
      handleTopChange(status){
        this.topStatus = status;
      },
      goDetail(item){
        //console.log(item)
        let bookId = item.bookId;
        let bookName = item.title;
        console.log(bookId, bookName);

        this.$router.push({
          name:'Detail',
          params:{id:bookId, name: bookName}
        })
      }
    }
  }
</script>

<style lang="less" scoped>
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
            height:2.4rem;
            box-sizing: border-box;
            margin:.4rem auto .4rem;
            background: #fff;
            border-radius: .08rem;
            padding-left:2.5rem;
            padding-right:.3rem;
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
