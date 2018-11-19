<template>
  <div class="detail">
    <app-header><p slot="header">添加商品信息</p></app-header>
    <div class="main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="商品编号">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-input v-model="form.categoryId"></el-input>
        </el-form-item>
        <el-form-item label="现价(元)">
          <el-input v-model="form.containerPrice"></el-input>
        </el-form-item>
        <el-form-item label="显示图片">
          <el-upload
            class="upload-demo"
            action="https://test.bhsht.com/common/sysFile/upload"
            :multiple = false
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-success="handleSuccess"
            :on-error="handleError"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <!-- <el-input v-model="form.goodsImg"></el-input>el-input v-model="form.goodsImg"></el-input> -->
        </el-form-item>
        <el-form-item label="原价(元)">
          <el-input v-model="form.bulkPrice"></el-input>
        </el-form-item>
        <el-form-item label="散装起批数量">
          <el-input v-model="form.bulkNum"></el-input>
        </el-form-item>
        <el-form-item label="允许退货">
          <el-input v-model="form.isReturn"></el-input>
        </el-form-item>
        <el-form-item label="条码">
          <el-input v-model="form.barcode"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="form.specifications"></el-input>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-input v-model="form.status"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="定金金额">
          <el-input v-model="form.var01"></el-input>
        </el-form-item>
        <el-form-item label="厂家名称">
          <el-input v-model="form.var02"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.var03"></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="form.categoryName"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <mt-button type="primary" @click="addGoodsDetail()">添加商品信息</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import appHeader from '@/components/public/header/header'
  export default {
    name: "detail",
    data(){
      return {
        form:{
          "id":"",
          "name":"",
          "categoryId":"",
          "containerPrice":"",
          "goodsImg":"",
          "bulkPrice":"",
          "bulkNum":"",
          "isReturn":"",
          "barcode":"",
          "specifications":"",
          "status":"",
          "label":"",
          "remark":"",
          "var01":"",
          "var02":"",
          "var03":"",
          "categoryName":""
        },
        fileList:[]
      }
    },
    components:{
      'appHeader': appHeader
    },
    mounted(){
      // this.getDetailData();
    },
    watch:{ //复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象
      // $route:function(to, from){
      //   this.getDetailData();
      // }
    },
    methods:{
      // getDetailData(){
      //   this.form = this.$route.params
      // },
      addGoodsDetail(){
        let redirect = this.$route.query.redirect || '/goods';
        // console.log(this.form)
        if(this.fileList.length){
          this.form.goodsImg = this.fileList[0].url
        }
        this.$apis.addGoodsInfo(this.form,res=>{
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
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(rep){
        let data = rep.data;
          if(data.code == 0){
            swal({
              title:'上传成功!',
              type:'success',
              confirmButtonText:'确定'
            });
            this.fileList = [{name:"",url:data.fileName}]        
          }
      },
      handleError(err){
        console.log(err)
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
