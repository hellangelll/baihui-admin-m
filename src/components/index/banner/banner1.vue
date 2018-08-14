<template>
  <div class="banner-wrapper">
    <mt-swipe :auto="3000">
      <!--<mt-swipe-item v-for="banner in banners" :key="banner.id">
        <router-link tag="a" to="" :style="{backgroundImage: 'url(' + banner.imgSrc + ')'}"></router-link>
      </mt-swipe-item>-->
      <mt-swipe-item v-for="banner in banners" :key="banner.id">
        <router-link tag="a" to="" >
            <img :src="banner.imgSrc">
        </router-link></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'banner1',
    data(){
      return {
        banners:[
          { url:"", imgSrc: 'static/images/banner1.jpg' },
          { url:"", imgSrc: 'static/images/banner2.jpg' }
        ]
      }

    }
  }
</script>

<style lang="less" scoped>
  .banner-wrapper{
    height:3.5rem;
    .mint-swipe-item{
      a{
        display: block;
        //background: #000;
        img{
          display: block;
          width:100%;
          height:3.5rem;
        }
      }
    }
  }
</style>
