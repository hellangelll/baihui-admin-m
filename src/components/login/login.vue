<template>
  <div class="loginWrap">
    <div class="login">
      <h2>百惠商户通管理后台</h2>
      <div class="row">
        <label class="fa fa-user"></label>
        <input type="text" name="userName" placeholder="请输入用户名" v-model="userName"/>
      </div>
      <div class="row">
        <label class="fa fa-lock"></label>
        <input type="password" name="userPwd" placeholder="请输入密码" v-model="userPwd" @keyup.enter="login($event)">
      </div>
      <div class="submit" @click="login">登 录</div>
      <!-- <div class="bottom">
        <router-link to="register">我要注册</router-link>|
        <router-link to="forget">忘记密码</router-link>
      </div> -->
    </div>
    <!--<vue-modal></vue-modal>-->
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;

  export default{
    name:'login',
    data(){
      return {
        userData: {},
        userName:'',
        userPwd:''
      }
    },
    mounted(){
      const bodyHeight = document.body.clientHeight;
      const loginPage = document.querySelector('.loginWrap');
      loginPage.style.height = bodyHeight + 'px';
    },
    methods:{
      login:function(){

        let name = this.userName;
        let pwd = this.userPwd;
        let redirect = this.$route.query.redirect || '/order';
        let that = this;

        this.$apis.login({"username":name,"password":pwd}, res => {
          let data = res.data;
          that.userData = data;
          if(res.status == 200){
            if( that.userData.code == 0){;
              localStorage.setItem('userInfo', JSON.stringify({"username":name}));
              that.$store.commit('updateLoginStatus', true); //更新登录状态为true
              that.$store.commit('updateUserInfo', that.userData);

              that.$router.push({path:redirect});
            }else{
              that.loginErr(data);
            }
          }else{
            alert(res.msg);
          }
        })
      },
      loginErr(data){
        //this.$indicator.close();
        swal({
          title:data.msg,
          type:'error',
          confirmButtonText:'确定'
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/index.less";
  .loginWrap{
    width:100%;
    height:100%;
    background: #293751;
    .login{
      padding-top:2.2rem;
      h2{
        margin-bottom:1rem;
        font-size:.6rem;
        color:#fff;
        text-align: center;
      }
      .row{
        display: flex;
        flex-flow: row nowrap;
        width:70%;
        height:.8rem;
        background: #FFF;
        margin:0 auto .4rem;
        -webkit-border-radius: .5rem;
        -moz-border-radius: .5rem;
        border-radius: .5rem;
        overflow: hidden;
        label{
          position: relative;
          display: block;
          width:1rem;
          height:.8rem;
          line-height:.8rem;
          font-size: .32rem;
          color:#929DB1;
          text-align: center;
          &:after{
            position: absolute;
            right:.0rem;
            top:.2rem;
            content:'';
            width:1px;
            height:.4rem;
            background: #eee;
          }
        }
        input{
          flex:1;
          box-sizing: border-box;
          border:none;
          outline: none;
          padding:0 .2rem;
          font-size: .34rem;
          color:#333;
          .placehoder(#929DB1);
          overflow: hidden; //修复flex布局的bug
        }
      }
      .submit{
        display: block;
        width:70%;
        height:.8rem;
        line-height:.8rem;
        margin:0rem auto 0;
        background: @theme_color;
        text-align: center;
        font-size: .36rem;
        -webkit-border-radius: .5rem;
        -moz-border-radius: .5rem;
        border-radius: .5rem;
        color:#fff;
      }
    }
    .bottom{
      width:70%;
      margin:.4rem auto 0;
      color:#58647E;
      font-size: .28rem;
      text-align: center;
      a{
        color:#58647E;
        text-decoration: none;
        margin:0 .5rem;
      }
    }
  }

</style>
