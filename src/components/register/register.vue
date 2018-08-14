<template>
  <div class="register">
    <div class="mask"></div>
    <div class="main">
      <p class="text">sign in</p>
      <div class="pannel">
        <div class="row">
          <label for="userName" class="fa fa-user"></label>
          <input type="text" name="userName" placeholder="请输入用户名">
        </div>
        <div class="row">
          <label for="userPwd" class="fa fa-lock"></label>
          <input type="text" name="userPwd" placeholder="请输入密码">
        </div>
      </div>
      <div class="registerBtn">注 册</div>
      <div class="toLoginIn"><router-link to="login">已有账号，去登录</router-link></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name:'register',
    data(){
      return {

      }
    },
    mounted(){
      const bodyHeight = document.body.clientHeight;
      const registerPage = document.querySelector('.register');
      registerPage.style.height = bodyHeight + 'px';
    },
    components:{

    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/less/minxs.less';
  .register{
    position: relative;
    height:100%;
    background: url("signIn_bg.jpg");
    background-size:100%;
    .mask{
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background: rgba(0,0,0,.5);
      z-index:10;
    }
    .main{
      position: absolute;
      width:100%;
      height:100%;
      left:0;
      top:0;
      z-index:11;
      .text{
        width:100%;
        text-align: center;
        font-size: .8rem;
        color:#fff;
        margin-top:1.2rem;
        margin-bottom:1rem;
      }
      .pannel{
        width:80%;
        margin:0 auto;
        background: #fff;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        overflow: hidden;
        .row{
          height:1.2rem;
          border-bottom:1px solid #f1f1f1;
          display:flex;
          flex-flow: row nowrap;
          label{
            width:1.2rem;
            height:1.2rem;
            line-height:1.2rem;
            font-size:.36rem;
            color:#ddd;
            text-align: center;
          }
          input{
            border:none;
            flex:1;
            outline:none;
            .placehoder(#666);
            color:#333;
            font-size: .28rem;
          }
        }
      }
      .registerBtn{
        width:80%;
        height:1.2rem;
        line-height:1.2rem;
        margin:.6rem auto 0;
        background: @theme_color;
        -webkit-border-radius: .1rem;
        -moz-border-radius: .1rem;
        border-radius: .1rem;
        color:#fff;
        font-size:.36rem;
        text-align: center;

      }
      .toLoginIn{
        margin:.8rem auto;
        text-align: center;
        a{
          color:#fff;
          text-decoration: none;
          font-size:.28rem;

        }
      }
    }
  }
</style>
