<template>
  <div class="drabs">
    <lg-preview></lg-preview>
    <app-header>
      <span slot="header">点滴</span>
    </app-header>
    <div class="main" id="container" >
      <ul v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li v-for="item in imgLists">
          <img v-lazy.container="item.imgSrc" v-preview="item.imgSrc" preview-title-enable="true"
               preview-nav-enable="true">
        </li>
      </ul>
    </div>
    <app-menu></app-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import appHeader from '@/components/public/header/header'
  import appMenu from '@/components/public/menu/menu'
  import App from "../../App.vue";
  export default {
    name:'drabs',
    data(){
      return {
        imgLists:[
          {imgSrc: 'static/images/banner1.jpg'},
          {imgSrc: 'static/images/banner2.jpg'},
          {imgSrc: 'static/images/banner1.jpg'},
          {imgSrc: 'static/images/banner2.jpg'},
          {imgSrc: 'static/images/banner2.jpg'},
        ]
      }
    },
    components:{
      App,
      'appHeader': appHeader,
      'appMenu':appMenu
    },
    methods:{
      loadMore(){
        this.loading = true;
        setTimeout(() => {
          let last = this.imgLists[this.imgLists.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.imgLists.push({imgSrc: '../../static/images/banner1.jpg'});
          }
          this.loading = false;
        }, 2500);
      }
    }
  }
</script>

<style lang="less" scoped>

  .drabs{
    height:100%;
    display: flex;
    flex-flow: column nowrap;
    .main{
      flex:1;
      background: #fff;
      overflow: scroll;
      ul{
        width:100%;
        box-sizing: border-box;
        padding:.2rem;
        &::after{
          display: block;
          content: '';
          clear:both;
        }
        li{
          position: relative;
          width:48%;
          float:left;
          box-sizing: border-box;
          padding:.2rem;
          border:1px solid #f1f1f1;
          min-height:1.5rem;
          margin:0 0 .2rem 0;
          &:nth-child(n){
            float:left;
          }
          &:nth-child(2n){
            float:right;
          }
          img{
            display: block;
            box-sizing: border-box;
            max-width:100%;
          }
          img[lazy=loading] {
            position: absolute;
            top:50%;
            left:50%;
            width:.5rem;
            height:.5rem;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%,-50%);
            transform:translate(-50%,-50%);
          }
        }
      }
    }
  }
</style>
