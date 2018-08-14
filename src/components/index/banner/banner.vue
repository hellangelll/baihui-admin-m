<template>
  <div class="swiper-container" id="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in banners">
        <a>
          <figure class="wp-avatar banner">
            <img :src="banner.imgSrc"/>
          </figure>
        </a>
      </div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  export default {
    name: 'banner',
    data(){
      return {
        banners:[
          { url:"", imgSrc:'../../../static/images/banner1.jpg' },
          { url:"", imgSrc:'../../../static/images/banner2.jpg' },
          { url:"", imgSrc:'../../../static/images/banner3.jpg' }
        ]

      }
    },
    methods:{

    },
    mounted(){
       new Swiper('#swiper', {
        loop: true,
        pagination: '.swiper-pagination',
        autoplay: 2000,
        paginationClickable: true,
        autoplayDisableOnInteraction:false

      });
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container{
    width:100%;
    .swiper-wrapper{
      .swiper-slide{
        width:10%;
        img{
          width:100%;
        }
      }
      .swiper-slide:nth-child(1){
        background:red;
      }
      .swiper-slide:nth-child(2){
        background:pink;
      }
      .swiper-slide:nth-child(3){
        background:green;
      }
    }
  }
</style>
