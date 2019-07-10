<template>
  <div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    this.getAppCardid()
  },
  methods: {
    getAppCardid(){
      var paraObj = this.getPara()
      let code = paraObj['code']
      let state = paraObj['state'].split('#')[0]
      this.$store.state.state = state
      localStorage.setItem('companyId',state)
      this.$request('iac-mms/wx/wxinfo','get',{},{companyId:state}).then(res=>{
          if(res.success){
            this.$store.state.appId = res.data.appId
            window.location.href = res.data.authUrl
                          
          }
          
        })
    },
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
  },
}
</script>
