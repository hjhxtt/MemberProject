<template>
  <div>
    <div class="mycard_top">
      <div class="my_card">
        <div class="left">
          我的电子卡
        </div>
        <div class="level">
          等级：<span>{{userInfo.level}}</span>
        </div>
      </div>
      <div class="card_detail" @click="toCode">
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
        <div class="cardId">{{userInfo.wxCardNo}}</div>
        <div class="user_card">
          <img :src="cardInfo.backgroundPicUrl" alt="">
        </div>
      </div>
      <div class="score">
        <div>
          <i>余额</i>
          <span>{{userInfo.balance}}</span>
          <router-link tag="button" to="recharge">充值</router-link>
        </div>
        <div>
          <i>积分</i>
          <span>{{userInfo.point}}</span>
        </div>
        <div>
          <i>优惠券</i>
          <span @click="toCoupon">{{couponNumber}}</span>
        </div>
      </div>
    </div>
    <div class="serve">
      <ul>
        <!-- <router-link to="/cardBinding" tag="li"><img src="@/assets/images/icon1.png" alt=""><p>实体卡绑定<span><img src="@/assets/images/right.png" alt=""></span></p></router-link> -->
        <router-link to="/recharge" tag="li"><img src="@/assets/images/icon2.png" alt=""><p>会员卡充值<span><img src="@/assets/images/right.png" alt=""></span></p></router-link>
        <router-link to="/cardInfo" tag="li"><img src="@/assets/images/icon3.png" alt=""><p>会员卡说明<span><img src="@/assets/images/right.png" alt=""></span></p></router-link>
        <router-link to="/levelInfo" tag="li"><img src="@/assets/images/icon4.png" alt=""><p>等级权益说明<span><img src="@/assets/images/right.png" alt=""></span></p></router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
 
  data() {
    return {
      userInfo:{
        name:'黄伟华',
        level:'铂金',
        id:'15208887869',
        money:'120',
        points:'2560',
        couponNumber:'3'
        },
        openid:'',
        cardInfo:{},
        couponNumber:'',
    }
  },
   mounted(){

    //this.openid  = localStorage.getItem('openid')
    this.getUserInfo()
    this.userInfo = this.$store.state.userInfo
    this.getCardInfo()
  },
  methods:{
    toCode(){
      this.$router.push({
        path:'/code',
        query:{
          id:this.userInfo.wxCardNo
        }
      })
      
    },
    toCoupon(){
      this.$router.push({
        path:'/coupon',
        query:{
          id:this.userInfo.id
        }
      })
    },
    getCardInfo(){
      
      this.$request('iac-mms/wx/cardinfo','get',{},{companyId:localStorage.getItem('companyId')}).then(res=>{
          if(res.success){
            if(Boolean(res.data)){
              this.cardInfo = res.data
              console.log(this.cardInfo);
              
            }else{
              this.$router.push('/error')
            }
            

            
          }
      })

    },
    //通过openid获取用户信息
    getUserInfo(){
      this.$request("iac-mms/wx/member",'get',{openId:localStorage.getItem('openid')},{companyId:localStorage.getItem('companyId')}).then(function(data){
          if(data.data){//如果有数据则是会员
            console.log(data.data);
            
            this.$store.state.userInfo = data.data //已经是会员数据放入vuex
            localStorage.setItem('balance',data.data.balance)
            this.userInfo = data.data
            debugger
            console.log(this.userInfo);
            this.$request('iac-mms/wx/ticketrecord','get',{openId:localStorage.getItem('openid')},{companyId:localStorage.getItem('companyId')}).then(res=>{
                if(res.success){
                  this.couponNumber = res.data.length
                }
            })
            
          }else{
            return
          }
        }.bind(this)).catch(function(error){
          console.log(error)
        })
    },
  }
}
</script>
<style  scoped>
  .mycard_top{
    padding: 0 48px;
  }
  .my_card{
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    height: 80px;
    line-height: 80px;
  }
  .my_card .level{
    color: #ccc;
  }
  .my_card .level span{
    color: #000;
    text-decoration: underline;
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
  .cardId{
    position: absolute;
    left:80px;
    bottom: 40px;
    z-index: 999;
    color: #fff;
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
  .score{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 60px 0;
  }
  .score>div{
    width: 33%;
    text-align: center;
  }
  .score>div i{
    display: block;
    font-size: 24px;
    color: #999999;
  }
  .score>div span{
    display: block;
    margin: 20px 0;
    font-size: 40px;
    color: #1890FF;
    font-weight: 700;
  }
  .score>div button{
    width: 96px;
    height: 40px;
    color: #fff;
    font-size: 24px;
    background: #1890FF;
    font-weight: normal;
  }
  .serve{
    background: #f7f7f7;
    padding: -40px 0;
    padding-top: 20px;
  }
  .serve ul{
  }
  .serve li{
    height: 100px;
    line-height: 100px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    background: #fff;

  }
  .serve li p{
    border-bottom: 1px solid#f7f7f7;
    width: 100%;
    padding-left: 20px;
    font-size: 28px;
  }
  .serve li span{
    float:right;
  }
  .serve li span img{
    height: 30px;
  }
  .serve li>img{
    display: inline;
    width: 40px;
    height: 40px;
    margin-top: 30px;
  }
</style>
