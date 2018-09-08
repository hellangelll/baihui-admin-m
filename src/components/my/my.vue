<template>
  <div class="memberCenter">
    <app-header>
      <span slot="header">我的</span>
    </app-header>
    <div class="centerWrap">
      <div class="main">
        <!-- <router-link tag="div" class="user-info" to="/index"> -->
          <!-- <img :src="userData.avatar" alt=""> -->
          <div class="user-info">
            <span class="nickname">{{userData.username}}</span>
            <!-- <span class="mobile"><i class="fa fa-mobile"></i>{{userData.mobile}}</span> -->
          </div>
          <!-- <span class="fa fa-angle-right"></span> -->
        <!-- </router-link> -->
        <div class="panel-wrap">
          <!-- <ul>
            <li><span><i class="fa fa-map-marker fa-fw"></i>收货地址</span></li>
            <li><span><i class="fa fa-heart fa-fw"></i></span>我的收藏</li>
            <li><span><i class="fa"></i></span></li>
          </ul> -->
          <div class="exit" @click="exitLogin">退出登录</div>
        </div>
      </div>
    </div>
    <app-menu></app-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import appMenu from '@/components/public/menu/menu'
  import appHeader from '@/components/public/header/header'
  export default {
    name:'my',
    data:function(){
      return {
        userData:{},
      }
    },
    created(){
      this.userData = JSON.parse(localStorage.getItem('userInfo'));
    },
    mounted(){
    },
    components:{
      'appMenu': appMenu,
      'appHeader': appHeader
    },
    methods: {
      exitLogin(){
        this.$store.commit('updateLoginStatus', false) //更新登录状态为false
        localStorage.setItem('userInfo','');
        this.$router.push({
          path: '/login'
        })

      }
    }

  }
</script>

<style lang="less" scoped>
  .memberCenter{
    width:100%;
    height:100%;
    //padding:1rem 0;
    background:#f9f9f9;
    display: flex;
    flex-flow: column nowrap;
    .centerWrap{
      flex:1;
      overflow: auto;
      .main{
        .user-info{
          box-sizing: border-box;
          display: flex;
          width:100%;
          padding:.2rem .3rem;
          background: #293751;
          color:#fff;
          font-size: .28rem;
          img{
            width:1.5rem;
            height:1.5rem;
            border-radius: 50%;
            margin-right:.25rem;
          }
          div{
            flex:1;
            .nickname{
              display: block;
              text-align: left;
              margin:.3rem 0;
            }
            .mobile{
              display: block;
              text-align: left;
              i{
                padding-right:.1rem;
                font-size: .28rem;
              }
            }
          }
          span.fa-angle-right{
            display: block;
            height: 1.5rem;
            line-height:1.5rem;
          }

        }
        .panel-wrap{
          width:100%;
          margin-top:.2rem;
          border-top:1px solid #f6f6f6;
          ul{
            background: #fff;
            li{
              box-sizing: border-box;
              height:1rem;
              line-height:1rem;
              padding:0 .2rem;
              border-bottom:1px solid #f6f6f6;
              font-size: .32rem;
              i{
                font-size: .36rem;
                color:#666;
                padding-right:.2rem;
              }
              &:nth-child(1)>span>i{
                color:#3fc3ee;
              }
              &:nth-child(2)>span>i{
                color:pink;
              }
              &:nth-child(3)>span>i{
                color:yellow;
              }
              &:nth-child(4)>span>i{
                color:hotpink;
              }
            }
          }
        }
        .exit{
          width:100%;
          height:1rem;
          line-height:1rem;
          box-sizing: border-box;
          padding:0 .2rem;
          border-bottom:1px solid #f6f6f6;
          font-size: .32rem;
          background: #fff;
          text-align: center;
          margin:.2rem auto;
          color:dodgerblue;
        }
      }
    }
  }
</style>
