<template>
  <div id="app">
    <keep-alive>
      <router-view :key="key"/>
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
    },
    computed: {
      key() {
          return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
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

  .el-input__inner{
    height: 35px;
  }

  .el-form-item {
   margin-bottom: 10px;
  }

  .index .main .list-wrapper ul li{
    padding-left: 0 !important;
    padding-right: 0 !important;
    box-shadow: none !important;
  }
   .index,.index .main .list-wrapper{
    background-color: #fff !important;
  }
</style>
