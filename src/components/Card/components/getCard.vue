<template>
  <div class="getCard">
    <div class="card_pic">
      <div class="card_detail">
        <div class="card_user">
          <div class="user_pic">
            <img :src="cardInfo.logoUrl" alt="">
          </div>
          <div class="user_info">
            <div class="user_name" style="display:block;width:300px;">
              {{cardInfo.brandName}}
            </div>
            <div class="user_id">
              {{cardInfo.title}}
            </div>
          </div>
        </div>
        <div class="user_card">
          <img :src="cardInfo.backgroundPicUrl" alt="">
        </div>
      </div>


      <!-- <img class="card_img" src="@/assets/images/card.jpg" alt=""> -->
    </div>
      <el-button type="primary" @click="getCard">确认领取</el-button>
  </div>
</template>
<script>
import {CryptoJS} from '@/assets/js/sha1.js'
export default {
  data() {
    return {
      jsticket:'',
      cardticket:'',
      openid:'',
      state:'',
      code:'',
      cardInfo:{},
    }
  },
  mounted(){
    //判断是否领过卡
    if(this.$store.state.userInfo.wxCardNo){
      this.$router.push('/myCard')
      return
    }
    if(!Boolean(this.$store.state.state)){
      this.getCompanyId()
    }
    this.getticket()
    this.getCardInfo()
    
  },
  methods: {
    getCompanyId(){
      
          var url = location.search; //location.search获取url中"?"符后的字串
          //var url = '?code=061zIiee1V0ajA0V6Zee1CZkee1zIiem&state=123#/register';
          var theRequest = new Object();
          if (url.indexOf("?") != -1) {
              var str = url.substr(1);
              var strs = str.split("&");
              for (var i = 0; i < strs.length; i++) {
                  theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
              }
          }



      var paraObj = theRequest
      let code = paraObj['code']
      let state = paraObj['state'].split('#')[0]
      this.$store.state.state = state
    },
    getCardInfo(){
      this.state = this.$store.state.state
      
      this.$request('iac-mms/wx/cardinfo','get',{},{companyId:this.state}).then(res=>{
          if(res.success){
            if(Boolean(res.data)){

              if(Boolean(res.data.wxCardNo)){
                this.$router.push('/myCard')
              }
              this.cardInfo = res.data
              this.$store.state.cardId = res.data.wxCardId
            }else{
              this.$router.push('/error')
            }
            

            
          }
      })
    },
    //调用
    getticket(){
    let nonceStr = Math.floor(Math.random()*1000).toString()
    this.state = this.$store.state.state
    
    //获取微信ticket
    this.$request('iac-mms/wx/jsticket','get',{},{companyId:this.state}).then(res=>{

        if(res.success){
          console.log(res);
          
          this.jsticket = res.data

          var timestamp =  Date.parse(new Date())/1000;
          wx.config({
                debug: false, // 开启调试模式,
                appId: this.$store.state.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: this.getSignature(this.jsticket,nonceStr,timestamp,window.location),// 必填，签名，见附录1
                jsApiList: ['addCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
        }else{
          //todo
          this.$router.push('/error')
        }

    }).catch(err=>{
        //todo
        this.$router.push('/error')
    })
    //获取卡券ticket
      this.$request('iac-mms/wx/cardticket','get',{},{companyId:this.state}).then(res=>{
          if(res.success){
            this.cardticket = res.data
          }else{
            this.$router.push('/error')
          }
      }).catch(err=>{
        this.$router.push('/error')
      })
    },
    getCard(){
            var timestamp = Date.parse(new Date())/1000;
            var nonce_str = Math.floor(Math.random()*1000).toString();
            var api_ticket = this.cardticket;
            var card_id = this.$store.state.cardId;//后台如何获取
            var params = [];
            debugger
            params.push(timestamp);
            params.push(nonce_str);
            params.push(api_ticket);
            params.push(card_id);
            params.sort();
            var signStr =  params.join("");
            var sign = CryptoJS.SHA1(signStr).toString();
            wx.addCard({
              cardList: [{
              cardId: card_id,
              cardExt: '{"nonce_str":"'+nonce_str+'","timestamp":"'+timestamp+'","api_ticket":"'+api_ticket+'","signature":"'+sign+'"}'
              }], // 需要添加的卡券列表
              success: function (res) {

                var cardList  = res.cardList; // 添加的卡券列表信息
                this.$router.push('/myCard')

              }
            });


    },
    getSignature (ticket, nonceStr, timestamp, url) {//拿到的access_token,采用http GET方式请求获得jsapi_ticket
        var ret = {
            jsapi_ticket: ticket,
            nonceStr: nonceStr,
            timestamp: timestamp,
            url: url
        };
        var keys = Object.keys(ret);
        keys = keys.sort();
        var newArgs = {};
        keys.forEach(function (key) {
          newArgs[key.toLowerCase()] = ret[key];
        });
        var string = '';
        for (var k in newArgs) {
          string += '&' + k + '=' + newArgs[k];
        }
        var signStr = string.substr(1);
        return CryptoJS.SHA1(signStr).toString();
      },
    getPara() {
	        var url = location.search; //获取url中"?"符后的字串
	        var theRequest = new Object();
	        if (url.indexOf("?") != -1) {
	            var str = url.substr(1);
	            strs = str.split("&");
	            for (var i = 0; i < strs.length; i++) {
	                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	            }
	        }
          return theRequest;
          console.log(theRequest)
	  },


  },
}
</script>
<style scoped>
  .getCard{
    padding: 56px 48px;
  }
  .card_pic{
    border-radius: 40px;
    overflow: hidden;

    margin-bottom:198px;
  }
  .card_img{
    width: 100%;
  }
  .el-button--primary{
    width: 100%;
    height: 88px;
    font-size: 36px;
  }
  .card_detail{
    width: 100%;
    position: relative;
  }
  .user_card{
    border-radius: 20px;
    overflow: hidden;
  }
  .card_user{
    width: 100px;
    height: 100px;
    position: absolute;
    left:40px;
    top: 40px;
    display: flex;
  }
  .user_info{
    color: #fff;
    margin-left: 20px;
  }
  .user_info .user_name{
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .user_info .user_id{
    color: #fff;
  }
  .card_user img{
    width: 100px;
    height: 100px;
  }
  .user_card img{
    width: 100%;
  }
</style>

