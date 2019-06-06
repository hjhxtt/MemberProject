<template>
  <div class="header">
    <div class="close" @click="handelpush">
      <img src="@/assets/images/close.png" alt="">
    </div>
    <div class="name">电子卡</div>
    <div class="more">
      <img src="@/assets/images/more.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handelpush(){
    this.$router.push("/")
    }
  },
}
</script>
<style scoped>
  .header{
    height: 80px;
    line-height: 80px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    padding: 0 48px;
  }
  .header img{
    width: 50px;
    height: 50px;
  }
  .header .name{
    font-size: 36px;
  }
</style>

