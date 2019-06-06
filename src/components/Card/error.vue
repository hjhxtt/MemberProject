<template>
  <div class="success">
    <div class="success_body">
      <img src="@/assets/images/error.png" alt="">
      <p>出错了</p>
      <div class="btn">
        <button class="close" @click="close">
            关闭
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    close(){
      wx.closeWindow()
      return
    }
  },
}
</script>
<style scoped>
  .success_body{
    text-align: center;
    padding-top: 200px;
  }
  .success_body p{
    font-size: 40px;
    margin: 40px 0px;
    font-weight: 700;
  }
  .success_body span{
    font-size: 24px;
    color: #999
  }
  .btn{
    margin-top: 200px;
    text-align: center;
    padding: 0 48px;
    font-size: 32px;
  }
  .btn .go_now{
    width: 100%;
    height: 88px;
    line-height: 88px;
    text-align: center;
    background: #1890FF;
    margin-bottom: 30px;
    color: #fff;
    display: block;
    border-radius: 10px;
  }
  .btn .close{
    border-radius: 10px;
    display: block;
    width: 100%;
    height: 88px;
    text-align: center;
    background: #fff;
    color: #000;
    border:2px solid #E6E6E6;
    line-height: 88px;
  }
</style>

