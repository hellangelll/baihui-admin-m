<template>
  <input class="child" type="text" v-model="inputVal" @keyup="sendInfo" placeholder="我是子组件">
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'test',
    data(){
      return {
        inputVal: ""
      }
    },
    methods: {
      sendInfo(){
        this.$emit('listenChildChange', this.inputVal)
      }
    }


  }
</script>

<style lang="less" scoped>
  .child{
    display: block;
    width:4rem;
    height:.6rem;
    line-height:.6rem;
    margin:.5rem auto;
    -webkit-border-radius: .05rem;
    -moz-border-radius: .05rem;
    border-radius: .05rem;
    border:1px solid #f1f1f1;
    -webkit-appearance: none;
    padding:0 .2rem;
    outline:none;
  }

</style>
