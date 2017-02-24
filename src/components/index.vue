<template>
  <poverty-mask :loading="loading"></poverty-mask>
  <header>
    扶贫帮困
    <span @click="toMainIndex">回到主页</span>
  </header>
  <router-view></router-view>
  <index-footer></index-footer>
</template>

<script>

import indexFooter from './indexFooter.vue';
import povertyMask from './povertyMask.vue';

export default {
  data(){
    return {
      userType:localStorage.getItem('userType'),
      userId:localStorage.getItem('userId'),
      mobile : localStorage.getItem('mobile'),
      loading : false
    }
    
  },
  methods : {
    toMainIndex : function(){
      window.location.href = "http://djres.zgshfp.org.cn/demo/pages/";
    }
  },
  components : {
    indexFooter
  },
  ready : function(){

    if(!(this.userType&&this.userId&&this.mobile)){
      this.$router.go({
        name : 'login'
      })
    }
  },
  components : {povertyMask,indexFooter}
}

</script>
<style lang="less">

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.44rem;
  line-height: 0.44rem;
  background-color: #ededed;
  text-align: center;
  font-size: 0.18rem;
  color: #172c43;
  padding: 0 0.15rem;
  z-index: 4;

  span{
    position: absolute;
    top: 0.14rem;
    right: 0.14rem;
    font-size: 0.14rem;
    line-height: 0.14rem;
  }
}
</style>
