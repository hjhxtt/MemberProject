<template>
  <div class="code_body">
    <div class="code_main">
      <div class="qrcode" ref="qrCodeUrl"></div>
      <h3>会员二维码</h3>
      <span>向商户展示会员二维码，可用于识别会员及会员支付</span>
    </div>
    <button class="close" @click="close">
            关闭
    </button>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      
    }
  },
  mounted(){
    this.creatQrCode()
    if(!Boolean(this.$route.query.id)){
      this.$message.error('获取失败')
    }
  },
  methods: {
    creatQrCode() {
      var w = 300
      var h = 300
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        //这个是安卓操作系统
        w = 200
        h = 200
      }
      if (isIOS) {
  　　　　//这个是ios操作系统
        w = 400
        h = 400
      }


      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.$route.query.id, 
        //text:'123', 
        width: w,  
        height: h,  
        colorDark: '#000000',  
        colorLight: '#ffffff',  
        correctLevel: QRCode.CorrectLevel.H  
    })
    },
    close(){
      this.$router.push('/myCard')
    }
  },
}
</script>
<style scoped>
  .code_body{
    width: 100%;
    height: 100vh;
    background: #F7F7F7;
  }
  .code_main{
    padding-top: 80px;
    width: 100%;
    text-align: center;
  }
  .code_main .qrcode{
    display: inline-block;
    max-width: 800px;
    max-height: 800px;
  }
  .code_main .qrcode>img{
    width: 80vw;
    height: 80vw;
  }
  .code_main h3{
    font-size: 40px;
    font-weight: 700;
    margin: 40px 0;
  }
  .code_main span{
    padding-top: 80px;
  }
  .close{
    margin-top: 200px;
    border-radius: 10px;
    display: block;
    width: 80%;
    margin-left: 10%;
    height: 88px;
    text-align: center;
    background: #fff;
    color: #000;
    border:2px solid #E6E6E6;
    line-height: 88px;
  }
</style>

