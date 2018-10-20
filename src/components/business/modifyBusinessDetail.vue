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
        <el-form-item v-if="oldStatus==0" label="审核状态">
          <el-select v-model="form.status" filterable placeholder="请选择">
            <el-option
              v-for="item in statusCode"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商家所属类目">
          <el-select v-model="form.categoryId" filterable placeholder="请选择">
            <el-option
              v-for="item in goodsTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
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
          status:'',
          id:'',
          updateTime:'',
          categoryId:''
        },
        oldStatus:0,
        goodsTypeList:[],
        statusCode:[
          {
            id:0,
            name:'待审核'
          },{
            id:1,
            name:'审核通过'
          },{
            id:2,
            name:'审核不通过'
          }
        ]
      }
    },
    components:{
      'appHeader': appHeader
    },
    mounted(){
      this.getGoodsTypeList();
      this.getDetailData();
    },
    watch:{ //复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象
      $route:function(to, from){
        this.getDetailData();
      }
    },
    methods:{
      getDetailData(){
        this.oldStatus = this.$route.params.status;
        this.form = this.$route.params;
      },
      saveBusinessDetail(){
        let redirect = this.$route.query.redirect || '/business';
        if(this.form.categoryId == null && this.oldStatus == 0){
          alert('服务商所属菜单不能为空!');
          return false;
        }
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
          }else{
            swal({
              title:data.msg,
              type:'faile',
              confirmButtonText:'确定'
            });
          }
        })
      },
      getGoodsTypeList(){
        let that = this
        this.$apis.getGoodsTypeList({"limit":1000,"offset":0,"pid":0},res=>{
          let data = res.data;
          if(data.rows.length >0){
            that.goodsTypeList = data.rows;
          }
        })
      },
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
