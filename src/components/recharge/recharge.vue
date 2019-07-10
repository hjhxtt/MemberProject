<template>
  <div>
    <div class="charge_body">
      
      <div class="balance">
        当前余额：<span>{{balance}}元</span>
      </div>
      <div class="recharge">
        <p>充值金额</p>
        <ul>
          <li 
          v-for="(item,index) in price" :key="index" 
          :class="activeClass == index?'active':''" 
          @click="getItme(index);getVal(item)"
          >{{item}}元</li>
          <li @click="handleSelf" :class="flag?'active':''">自定义</li>
          <li><input v-model="money" type="number" placeholder="金额" ref="money" @click="handleSelf">元</li>
        </ul>
      </div>
      <el-button type="primary" @click="handelCharge">确认充值</el-button>
    </div>
  </div>
  
</template>
<script>
export default {
  data() {
    return {
      price:['10','50','100','200','500','1000','3000'],
      activeClass:'-1',
      money:'',
      flag:false,
      balance:0
    }
  },
  mounted() {
    this.balance = localStorage.getItem('balance')
  },
  methods: {
        getItme(index) {
        this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
        this.flag=false
      },
      getVal(item){
        this.money = item
      },
      handleSelf(){
        this.$refs.money.focus()
        this.flag=true
        this.activeClass = "-1"
      },
      handelCharge(){
        if(isNaN(this.money) || this.money=="" ){
           alert('请输入数字金额')
        }else{
          console.log(this.money);
           
           
        }
        
      }
  },
}
</script>
<style scoped>
  .charge_body{
    padding: 0 48px;
    padding-top: 60px;
  }
  .balance{
    color: #999;
    font-size: 36px;
  }
  .balance span{
    color:#1890FF;
    font-size: 36px;
    margin-left: 20px;
    font-weight: 700;
    border-bottom: 1px solid #1890FF;
  }
  .recharge{
    margin-top: 60px;
    margin-bottom: 160px;
  }
  .recharge p{
    font-size: 28px;
  }
  .recharge ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 30px;
  }
  .recharge ul li{
    width: 30%;
    border-radius: 10px;
    border:1px solid #1890FF;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 32px;
    color: #1890FF;
    background: #fff;
    margin-bottom: 30px;
  }
  .recharge ul li.active{
    color: #fff;
    background: #1890FF;
  }
  .recharge ul li:last-child{
    border:none;
    border-bottom: 1px solid #1890FF;
    border-radius: 0;
  }
  .recharge ul li:last-child input{
    display: block;
    width: 70%;
    padding-top: 22px;
    float: left;
    color:#1890FF;
    padding-left: 10px;
  }
  .recharge ul li:last-child input::-webkit-input-placeholder{
            color:#ccc;
        }
  .el-button--primary{
    width: 100%;
    height: 100px;
    font-size: 32px;
  }
</style>
