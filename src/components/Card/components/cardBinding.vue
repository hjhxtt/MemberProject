<template>
  <div class="bing">
    <div class="bing_box">
      <img src="@/assets/images/icon1.png" alt="">
      <input type="text" placeholder="请输入实体卡账号" v-model="cardNumber">
    </div>
    <button @click="handleBind" :class="cardNumber==''? '':'active'">立即绑定</button>
  </div>
</template>
<script>
export default {
    data() {
      return {
        cardNumber:'',
      }
    },
    methods: {
      handleBind(){
        let data = this.cardNumber
        this.$request('','get',data).then(function(res){
              
        }).catch(function (err) {

        })
        
        this.$router.push('/myCard')
      }
    },
}
</script>
<style scoped>
  .bing{
    padding: 60px 44px;
  }
  .bing img{
    width: 40px;
    height: 40px;
    margin-right: 30px;
  }
  .bing_box{
    width: 100%;
    border-bottom: 2px solid #f2f2f2;
    padding-bottom:20px;

  }
  .bing_box input{
    font-size: 28px;
  }
  .bing_box input::placeholder{
    color: #ccc;
  }
  .bing button{
    width: 100%;
    height: 88px;
    border-radius: 10px;
    background: #ccc;
    color: #fff;
    font-size: 32px;
    margin-top: 160px;
  }
  .bing button.active{
    background: #1890FF;
  }
</style>

