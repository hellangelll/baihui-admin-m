<template>
  <div class="detail">
    <app-header><p slot="header">编辑商家信息</p></app-header>
    <div class="main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="商家名称">
          <el-input v-model="form.businessName"></el-input>
        </el-form-item>
        <el-form-item label="商家电话">
          <el-input v-model="form.businessPhone"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input v-model="form.contactPeopleName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model="form.contactPeoplePhone"></el-input>
        </el-form-item>
        <el-form-item label="商家地址">
          <el-input v-model="form.businessAddress"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.businessMemo"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <mt-button type="primary" @click="saveBusinessDetail()">保存商家信息</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import appHeader from '@/components/public/header/header'
  export default {
    name: "detail",
    data(){
      return {
        form:{
          businessAddress:'',
          businessMemo:'',
          businessName:'',
          businessPhone:'',
          contactPeopleName:'',
          contactPeoplePhone:'',
          createTime:'',
          id:'',
          updateTime:''
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
      saveBusinessDetail(){
        let redirect = this.$route.query.redirect || '/business';
        // console.log(this.form)
        this.$apis.saveBusinessInfo(this.form,res=>{
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
    }
  }
</style>
