<template>
  <div class="detail">
    <app-header><p slot="header">编辑用户信息</p></app-header>
    <div class="main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="编号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="form.realName"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="用户等级">
          <el-input v-model="form.leave"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.createTime"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="form.updateTime"></el-input>
        </el-form-item>
        <el-form-item label="微信openid">
          <el-input v-model="form.openId"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <mt-button type="primary" @click="saveCustomerDetail()">保存用户信息</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import appHeader from '@/components/public/header/header'
  export default {
    name: "detail",
    data(){
      return {
        form:{
          id:'',
          irealNamed:'',
          nickName:'',
          leave:'',
          status:'',
          icreateTimed:'',
          updateTime:'',
          openId:'',
        }
      }
    },
    components:{
      'appHeader': appHeader
    },
    mounted(){
      this.getDetailData();
    },
    watch:{ //复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象
      $route:function(to, from){
        this.getDetailData();
      }
    },
    methods:{
      getDetailData(){
        this.form = this.$route.params
      },
      saveCustomerDetail(){
        let redirect = this.$route.query.redirect || '/customer';
        // console.log(this.form)
        this.$apis.saveCustomerInfo(this.form,res=>{
          let data = res.data;
          // console.log(data)
          if(data.code == 0){
            swal({
              title:'修改成功!',
              type:'success',
              confirmButtonText:'确定'
            });
            this.$router.push({path:redirect});          
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail{
    display: flex;
    flex-flow: column nowrap;
    height:100%;
    .main{
      flex:1;
      width:100%;
      box-sizing: border-box;
      padding:.5rem;
      font-size: .28rem;
      line-height:.32rem;
      color:#666;
      height: 100%;
      overflow: auto;
    }
  }
</style>
