<template>
  <div>
    <div class="coupon_main">
      <div class="coupon_nav">
        <ul class="get_coupon">
          <li :class="status==='待领取'?'active':''" @click="handleClick($event)" ref="befor">待领取</li>
          <li :class="status==='未使用'?'active':''" @click="handleClick($event)">未使用</li>
          <li :class="status==='已使用'?'active':''" @click="handleClick($event)">已使用</li>
          <li :class="status==='已失效'?'active':''" @click="handleClick($event)">已失效</li>
        </ul>
      </div>
      <div class="bg"></div>
      <div class="coupon_body" v-if="status==='待领取'">
        <div class="coupon" v-for="(item,index) in unclaimedList" :key="index">
          <div class="coupon_left">
            <img src="@/assets/images/coupon.png" alt="">
            <div class="left_get">
              <p>{{item.parValue}}<i>元</i></p>
              <span @click="getNow(item.id)">立即领取</span>
            </div>
          </div>
          <div class="coupon_right">
            <h3>{{item.ticketname}}</h3>


            <div v-if="item.expireType == 0">
              <span>期限：{{item.expireDateStart  | timeChange}} 至 {{item.expireDateEnd | timeChange}}</span>
              <!-- <span>门店：{{item.store}}</span> -->
              <span>门店：所有门店</span>
            </div>
            <div v-else>
              <span></span>
              <!-- <span>门店：{{item.store}}</span> -->
              <span>门店：所有门店</span>
            </div>
          </div>
        </div>

      </div>
      <div class="coupon_body" v-else-if="status==='未使用'">
        <div class="coupon" v-for="(item,index) in notUsedList" :key="index">
          <div class="coupon_left">
            <img src="@/assets/images/coupon.png" alt="">
            <div class="left_get">
              <p>{{item.ticketParValue}}<i>元</i></p>
            </div>
          </div>
          <div class="coupon_right">
            <h3>{{item.ticketName}} <span>未使用</span></h3>
            <div>
              <span>券码：{{item.ticketNo}} </span>
              <span>期限：{{item.activeTime | timeChange }} 至 {{item.expireTime | timeChange}} </span>
              <span>门店：所有门店 </span>
            </div>
          </div>
        </div>
      </div>
      <div class="coupon_body" v-else-if="status==='已使用'">
        <div class="coupon" v-for="item in usedList">
          <div class="coupon_left">
            <img src="@/assets/images/coupon.png" alt="">
            <div class="left_get">
              <p>{{item.ticketParValue}}<i>元</i></p>
            </div>
          </div>
          <div class="coupon_right">
            <h3>{{item.ticketName}}</h3>
            <div>
              <span>券码：{{item.ticketNo}}</span>
              <span>期限：{{item.activeTime | timeChange}} 至 {{item.expireTime | timeChange}}</span>
              <span>门店：所有门店</span>
            </div>
            <img src="@/assets/images/used.png" alt="">
          </div>
        </div>
      </div>
      <div class="coupon_body" v-else-if="status==='已失效'">
        <div class="coupon" v-for="item in failedList">
          <div class="coupon_left">
            <img src="@/assets/images/coupon_nouse.png" alt="">
            <div class="left_get">
              <p>{{item.ticketParValue}}<i>元</i></p>
            </div>
          </div>
          <div class="coupon_right">
            <h3>{{item.ticketName}}</h3>
            <div>
              <span>券码：{{item.ticketNo}}</span>
              <span>期限：{{item.activeTime | timeChange}} 至 {{item.expireTime | timeChange}}</span>
              <span>门店：所有门店</span>
            </div>
            <img src="@/assets/images/nouse.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status:'待领取',
      couponList:[
        {status:'待领取',number:'50',time:''}
      ],
      unclaimedList:[
        {parValue:30,
        id:30,
        ticketname:30,},
        {parValue:0,
        id:0,
        ticketname:0,}
      ],
      notUsedList:[],
      usedList:[],
      failedList:[]
    }
  },
  mounted() {
    this.getCouponInfo()
    this.getTicketrecord()
  },
  filters:{
    timeChange:function(dataStr){
      if(Boolean(dataStr)){
        return dataStr.substring(0,10)
      }
     
    }
  },
  methods: {
    getNow(id){
      //todo使用openid
      this.$request('iac-mms/wx/ticketrecord','post',{openId:localStorage.getItem('openid'),ticketId:id},{companyId:localStorage.getItem('companyId')}).then(res=>{
          if(res.success){
              this.status = '未使用'
             console.log(res.data);
            this.getTicketrecord()
          }else{
            this.$message.error('领取失败')
          }
      })
    },
    //待领取的优惠券
    getCouponInfo(){
      this.$request('iac-mms/wx/ticket','get',{openId:localStorage.getItem('openid')},{companyId:localStorage.getItem('companyId')}).then(res=>{
          if(res.success){
           
            this.unclaimedList = res.data

             console.log(this.unclaimedList);
            
          }
      })
    },
    getTicketrecord(){
      this.$request('iac-mms/wx/ticketrecord','get',{openId:localStorage.getItem('openid')},{companyId:localStorage.getItem('companyId')}).then(res=>{
          if(res.success){

              if(res.data.length !=0){
                var notUsedList = []
                var usedList = []
                var failedList = []
                res.data.map(e=>{
                  if(e.status == 1){
                    notUsedList.push(e)
                  }else if(e.status == 2){
                    usedList.push(e)
                  }else if(e.status == 3){
                    failedList.push(e)
                  }
                })
                this.notUsedList = notUsedList
                this.usedList = usedList
                this.failedList = failedList


              }
            
            
          }
      })
    },
    handleClick(e){
      this.getTicketrecord()
      this.status=e.target.innerHTML;
    }
  },
}
</script>
<style  scoped>
  .coupon_body>.coupon:last-child{
    margin-bottom: 0;
  }
  .coupon{
    margin-bottom: 40px;
  }
  .coupon_nav{
    height: 128px;
    line-height: 128px;
  }
  .coupon_nav ul.get_coupon{
    height: 100%;
    display: flex;
    justify-content: space-around;
  }
  .coupon_nav ul.get_coupon li{
    width: 84px;
    font-size: 28px;
  }
  .coupon_nav ul.get_coupon li.active{
    color:#1890FF;
    border-bottom: 4px solid #1890FF;
  }
  .coupon_body{
    padding: 40px;
    background: #F7F7F7;
  }
  .bg{
    background: #F7F7F7;
    position: absolute;
    top: 128px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .coupon{
    display: flex;
    justify-content: space-between;
    box-shadow: 0 3px 3px #ddd;
    height: 240px;
  }
  .coupon_left{
    position: relative;
    flex: 35%;
    background: #F7F7F7;
    height: 100%;
  }
  .left_get{
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform:translate(-50%,-50%);
  }
  .coupon_left img{
    width: 100%;
    height: 100%;
  }
  .left_get p{
    font-size: 88px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
  }
  .left_get i{
    font-size: 36px;
    font-weight: 700;
    color: #fff;
  }
  .left_get span{
    display: inline-block;
    text-align: center;
    border-radius: 8px;
    width: 156px;
    height: 64px;
    line-height: 64px;
    color: #FF4B48;
    background: linear-gradient(top,#FFF8F8 0,#FFBBBB 100%);
    box-shadow: 0 3px 8px #FF4B48;
  }
  .coupon_right{
    flex: 65%;
    height: 240px;
    background: #fff;
    padding: 22px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;
  }
  .coupon_right>img{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .coupon_right h3{
    font-size: 44px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .coupon_right h3 span{
    color: #1890FF;
    font-size: 24px;
    float: right;
    font-weight: normal;
  }
  .coupon_right span{
    display: block;
    margin-bottom: 16px;
    font-size: 24px;
    color: #999;
  }
</style>
