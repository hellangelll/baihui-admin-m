<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'App',
    data(){
      return {

      }
    },
    created(){
      //this.remJs();
    },
    mounted(){

    },
    methods:{
      remJs(){
        let docEl = document.documentElement;
        let clientW = docEl.clientWidth;
        docEl.style.fontSize = clientW/750*100 + 'px';
      }
    }

  }
</script>

<style lang="less">
  @import './common/css/font-awesome.min.css';
  html{
    font-size: 100px;
    height:100%;
  }
  body{
    margin:0;
    padding:0;
    height:100%;
    font-size: .24rem;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //text-align: center;
    color: #2c3e50;
    height:100%;
    background: #FFF;
  }
</style>
