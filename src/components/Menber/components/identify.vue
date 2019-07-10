<template>
  <div class="s-canvas"  @click="handleClick">
    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>
<script>
export default {
  name: 'SIdentify',
  data() {
    return {
      identifyCode:'',
      contentWidth: 138,
      contentHeight: 48,
      fontSizeMin: 32,
      fontSizeMax:40 ,
      backgroundColorMin: 180,
      backgroundColorMax: 240,
      colorMin:50 ,
      colorMax:160,
      lineColorMin: 40,
      lineColorMax:180 ,
      dotColorMin: 0,
      dotColorMax: 255,
    }
  },
  methods: {
    checkMobile(){
      var w = 136
      var h = 48
      var u = navigator.userAgent, app = navigator.appVersion;
      
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        //这个是安卓操作系统
        w = 68
        h = 24
      }
      if (isIOS) {
  　　　　//这个是ios操作系统
        w = 136
        h = 48
      }
      this.contentWidth = w
       this.contentHeight = h
       
    },
    handleClick(){
        let num="";
        for(let i=0;i<4;i++){
          num+=Math.floor(Math.random()*10)
        }
        this.identifyCode = num
        let newN =this.identifyCode
        this.$emit('changeCode',newN)
    },
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成一个随机的颜色
    randomColor(min, max) {
      var r = this.randomNum(min, max)
      var g = this.randomNum(min, max)
      var b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    drawPic() {
      this.checkMobile()
      var canvas = document.getElementById('s-canvas')
      var ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.randomColor(
        this.backgroundColorMin,
        this.backgroundColorMax
      )
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i)
      }
      this.drawLine(ctx)
      this.drawDot(ctx)
      
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
      ctx.font =
        this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
      var x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
      var y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
      var deg = this.randomNum(-45, 45)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    },
    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = this.randomColor(
          this.lineColorMin,
          this.lineColorMax
        )
        ctx.beginPath()
        ctx.moveTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        )
        ctx.lineTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        )
        ctx.stroke()
      }
    },
    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight),
          1,
          0,
          2 * Math.PI
        )
        ctx.fill()
      }
    }
  },
  watch: {
    identifyCode() {
      this.drawPic()
    }
  },
  mounted() {
    
    this.drawPic()
    setTimeout(() => {
      this.handleClick()
    }, 100);
    
  }
}
</script>