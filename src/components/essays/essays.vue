<template>
  <div class="essays">
    <app-header>
      <span slot="header">随笔</span>
    </app-header>
    <div class="main">
      <test @listenChildChange="showChildVal"></test>
      <div class="showBox">
        <h2>这里接收子组件的值</h2>
        <div class="infos" v-text="childVal"></div>
      </div>
    </div>
    <app-menu></app-menu>
  </div>

</template>

<script type="text/ecmascript-6">
  import appHeader from '@/components/public/header/header'
  import appMenu from '@/components/public/menu/menu'
  import test from './test/test'
  export default {
    name: 'essays',
    data(){
      return {
        childVal:''
      }
    },
    components:{
      'appHeader': appHeader,
      'appMenu': appMenu,
      'test': test
    },
    methods:{
      showChildVal: function(data){
        this.childVal = data;
      }
    }
  }
</script>

<style lang="less" scoped>
  .essays{
    height:100%;
    display: flex;
    flex-flow: column nowrap;
    .main{
      flex:1;
      background: #fff;

      .showBox{
        width:80%;
        margin:.5rem auto;
        h2{
          font-size: .38rem;
          color:orangered;
        }
        .infos{
          min-height: 4rem;
          border:1px solid #f1f1f1;
          margin:.5rem auto;
          padding:.2rem;
        }
      }
    }
  }
</style>
