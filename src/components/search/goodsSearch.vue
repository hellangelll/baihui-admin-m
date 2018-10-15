<template>
  <div class="jmc-search">
    <iframe name='frameFile' style="display: none;"></iframe>
    <!-- 当点击确定按钮时，触发submit事件 -->
    <div class="page-search">
      <mt-search autofocus v-model="value" placeholder="请输入关键字" @keyup.enter.native="search"></mt-search>

      <!-- <div class="hotkey-wrapper">
        <p>热门搜索</p>
        <ul class="hotkey-list">
        <a class="speical">消毒液</a>
        <a>大盘纸</a>
        <a>玻璃刮</a>
        <a>防滑地垫</a>
        <a>拖把</a>
        <a>纸盒 </a>
        <a>防滑地垫 </a>
        <a>拖把</a>
        </ul>
      </div> -->
    
          <ul>
            <span v-if="noData" style="text-align:center;width:100%;display:inline-block;">&nbsp;没有数据</span>
            <li v-for="item in list" :key="item.id">
              <mt-cell :title="item.name+' 售价:'+item.containerPrice/100+'元'" :label="'商品ID:'+item.id+' 规格:'+item.specifications">
                <img slot="icon" :src="'http://test.bhsht.com'+item.goodsImg" width="24" height="24">
                <mt-button  @click="modifyGoodsDetail(item)" type="primary" size="small">编辑</mt-button>
              </mt-cell>
            </li>
          </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "page-search",
  data() {
    return {
      value: "",
      list: [],
      allLoaded: false,
      topStatus: '',
      noData: false,
      bottomStatus: '',
      scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      pageSize:1000,
      pageTotal:1,
      currentPageNum:0
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    search () {
      window._that= this;
      if (this.value.length !== 0) {
        this.$apis.getGoodsList({"limit":this.pageSize,"offset":this.pageSize*this.currentPageNum,"name":this.value},res=>{
          window._res = res
          if(_res.data.rows.length >0){
            _that.noData = false;
            _that.list = _res.data.rows;
            _that.$nextTick(function () {
              _that.scrollMode = "touch";
            });
          }else{
            _that.noData = true;
          }

          _that.pageTotal = Math.ceil(_res.data.total/_that.pageSize);
          if(_that.pageTotal-1<=_that.currentPageNum){
            _that.allLoaded = true;
          }else{
            _that.allLoaded = false; // 若数据已全部获取完毕
          }

          // window._that = null;
          // window._res = null;
        })
      }
    },
    modifyGoodsDetail(item){
      this.$router.push({
        name:'ModifyGoodsDetail',
        params:item
      })
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

    }
  }
};
</script>


<style>
.hotkey-wrapper {
  padding: 15px;
}

.hotkey-wrapper p:first-child {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
}

.hotkey-wrapper .hotkey-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.hotkey-wrapper .hotkey-list > a {
  font-size: 14px;
  margin-right: 5px;
  margin-bottom: 10px;
  text-align: center;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 16px;
  border: 1px solid #d7d7d7;
}

.hotkey-wrapper .hotkey-list > a.speical {
  border-color: #24b6ff;
  color: #24b6ff;
}
.mint-search {
  height: auto !important;
}
</style>
