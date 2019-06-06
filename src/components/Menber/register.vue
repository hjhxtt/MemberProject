<template>
  <div class="register">
    <div class="re_main">
      <ul>
        <li><span><img src="@/assets/images/hy_icon1.png" alt=""></span><input type="text" placeholder="请输入手机号" v-model="mobile" @blur.prevent="testTel()"></li>
        <li><span><img src="@/assets/images/hy_icon2.png" alt=""></span><input type="text" placeholder="请输入图形验证码" v-model="picCode"><identify @changeCode="changeCode" ref="iden"></identify></li>
        <li><span><img src="@/assets/images/hy_icon3.png" alt=""></span><input type="text" placeholder="请输入手机验证码" v-model="verifyCode">
            <div class="getcode">获取验证码</div>
        </li>
        <li><span><img src="@/assets/images/hy_icon4.png" alt=""></span><input type="text" placeholder="会员姓名" v-model="name"></li>
      </ul>
      <div class="check">
        <div
            class="checkBox"
            :class="isactive?'active':''"
            @click="handelActive"
        >
        <img src="@/assets/images/gou.png" alt="">
        </div>本人已同意并同意签署<router-link to="/isMenber/hyClause" tag="span">《英华达会员条款》</router-link>
      </div>
      <div style="display:none" >{{ exitsVal }}</div>
      <div class="register_now"
            :class="canRegister?'active':''"
            @click="register_now"
      >
        立即申请
      </div>
    </div>
  </div>
</template>
<script>
import identify from './components/identify'
export default {
  name:'register',
  components:{
    identify,
  },
  mounted() {
    this.getOpenId()
    this.getAppCardid()
  },
  data() {
    //实际中openid要打开，短信验证码要获取后台数据，
    return {
      isactive:false,
      allready:'',
      appId:'wx7d7805ca9e412b4a',
      mobile:'',
      picCode:'',
      //openid:'oMZavwmzrShGyOq_N7qhfJ0mMi-8',//写死的openid
      openid:'',
      childPiccode:'',
      verifyCode:'',//短信验证码
       
      name:'',
      canRegister:false,
      timestamp:'',
      nonceStr:'',
      jsticket:'',
    }
  },
  methods: {
    getAppCardid(){
      var paraObj = this.getPara()
      let code = paraObj['code']
      let state = paraObj['state'].split('#')[0]
      this.$store.state.state = state
      this.$request('iac-mms/wx/wxinfo','get',{},{companyId:state}).then(res=>{
          if(res.success){
            this.$store.state.appId = res.data.appId
          }
          
        })
    },
    testTel(){
      let telReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if(!telReg.test(this.mobile)){
        this.$message({
          message:'请输入正确的手机号',
          type:'error'
        })
        return
      }
    },
    handelActive(){
      this.isactive=!this.isactive
    },
    //立即注册
    register_now(){
      
      this.testTel()
      if(this.picCode === this.childPiccode){

      }else{
        this.$message({
          message:'图形验证码错误',
          type:'error'
        })
        this.$refs.iden.handleClick()
        return
      }
      if(this.isactive){
         let menberData = {
          mobile:this.mobile,
          verifyCode:'短信验证码',//先写死
          name:this.name,
          openId:this.openid
        }
        var $this = this
        this.$request("iac-mms/wx/account/register",'post',menberData,{companyId:$this.$store.state.state}).then(function(data){
          if(data.success){


            this.getUserInfo()//重获取一次用户数据
          }else{
            alert('注册失败请重试')
          }
        }.bind(this)).catch(function(error){
           alert(error)
        })
      }
    },
      //拿到url参数用于获取openid
    getPara() {
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
          return theRequest;
      },
      changeCode(newNum){
          this.childPiccode = newNum
      },
    //获取用户的openId
    getOpenId(){
      var paraObj = this.getPara()
      let code = paraObj['code']
      let state = paraObj['state'].split('#')[0]
      this.$store.state.state = state

      //获取openid
      
      this.$request('iac-mms/wx/openid','get',{code:code},{companyId:state}).then(function(res){
        //console.log(res);
        
      //this.$request('iac-mms/wx/openid','get',{appid:state,code:code}).then(function(res){
        this.openid =  res.data.openid  //todo 打开openid
        this.getUserInfo()
        localStorage.setItem('openid',this.openid)
      }.bind(this))

    },
    //通过openid获取用户信息
    getUserInfo(){
      var $this = this
      this.$request("iac-mms/wx/account",'get',{openId:this.openid},{companyId:$this.$store.state.state}).then(function(data){
          if(data.data){//如果有数据则是会员

            this.$store.state.userInfo = data.data //已经是会员数据放入vuex
            //localStorage.setItem('userInfo',data.data)
            this.$router.push('/register/success')//已经是会员
          }else{
            return
          }
        }.bind(this)).catch(function(error){
          console.log(error)
        })
    }



  },
  computed:{
    exitsVal:function(){
        this.allready=Number(Boolean(this.mobile))+Number(Boolean(this.picCode))+Number(Boolean(this.name))+Number(Boolean(this.verifyCode))+Number(this.isactive);
    }
  },
  watch: {
    allready(newVal,oldVal){
        if(Number(newVal)===5){
           this.canRegister=true
        }else{
          this.canRegister=false
      }
    },
  },

}
</script>
<style  scoped>
  .re_main{
    padding: 100px 48px;
  }
  .re_main ul{
    margin-bottom: 30px;
  }
  .re_main ul li{
    border-bottom: 2px solid #F2F2F2;
    margin-bottom: 40px;
    padding-bottom:20px;
  }
  .re_main ul li img{
    margin-right:20px;
    width: 36px;
    height: 36px;
  }
  .re_main ul li input{
    font-size: 28px;
  }
  .re_main ul li input::placeholder{
    color: #ccc;
  }
  .getcode{
    float:right;
    font-size: 28px;
    color: #1890FF;
  }
  .check{
    font-size: 24px;
    color: #999;
    height: 46px;
    line-height: 46px;
  }
  .check span{
    font-size: 28px;
    color: #1890FF;
  }
  .checkBox{
    display: inline-block;
    width: 46px;
    height: 46px;
    border-radius: 4px;
    border: 2px solid #ccc;
    background-color:#fff;
    margin-right: 20px;
    text-align: center;
  }
  .checkBox.active{
    background: #1890FF;
  }
  .checkBox img{
    width: 80%;
    height: 80%;
  }
  .register_now{
    width: 100%;
    height: 88px;
    text-align: center;
    line-height: 88px;
    background: #ccc;
    color: #fff;
    font-size: 30px;
    border-radius: 10px;
    margin-top: 100px;
  }
  .register_now.active{
    background:#1890FF;
  }
  .s-canvas{
    float: right;
  }
</style>
