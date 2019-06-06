<template>
  <div class="home-container">
    <ul>
      <li>关于我们</li>
      <router-link to="/Card" tag="li">电子卡</router-link>
      <router-link to="/register" tag="li">加入会员</router-link>
    </ul>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  ul{
    width: 100%;
    max-width: 10rem;
    margin: 0 auto;
    display: flex;
    position: fixed;
    bottom: 0;
  }
  ul li{
    flex:1;
    border: 2px solid #ddd;
    text-align: center;
    height: 84px;
    line-height: 84px;
    font-size: 32px;
  }
</style>
