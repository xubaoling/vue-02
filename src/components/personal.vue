<template>
    <article data-page="personalCenter">
        <div class="list-box">
            <ul class="list-unstyled timeline">
                <li v-link="{'name':'personalCenter'}"><p>个人信息<span class="fa fa-angle-right pull-right" ></span></p></li>
                <li class="ln_solid"></li>
                <template v-if="userType==1">
                  <li  v-link="{name:'myDonation_donator'}">
                    <p>我的捐赠<span class="fa fa-angle-right pull-right" ></span></p>
                  </li>
                  <li class="ln_solid"></li>
                  <li v-link="{name:'myRelease_donator'}" v-if="userType==1"><p>我的发布<span class="fa fa-angle-right pull-right" ></span></p></li>
                  <li class="ln_solid"></li>
                </template>
                <template v-if="userType==2">
                  <li v-link="{name : 'myDonation_demander'}"><p>我的受捐<span class="fa fa-angle-right pull-right" ></span></p></li>
                  <li class="ln_solid"></li>
                  <li v-link="{name:'myApply'}"><p>我的申请<span class="fa fa-angle-right pull-right" ></span></p></li>
                  <li class="ln_solid"></li>
                  
                  <li v-link="{name:'myRelease_demander'}"><p>我的发布<span class="fa fa-angle-right pull-right" ></span></p></li>
                  <li class="ln_solid"></li>
                </template>
                <li v-link="{name:'collection'}"><p>我的收藏<span class="fa fa-angle-right pull-right" ></span></p></li>
                 <li class="ln_solid"></li>
                <li v-link="{'name':'passChange'}"><p>密码修改<span class="fa fa-angle-right pull-right" ></span></p></li>
                 <li class="ln_solid"></li>
                <!-- <li><p>意见反馈<span class="fa fa-angle-right pull-right" ></span></p></li>
                 <li class="ln_solid"></li> -->
                <li style="display:none"><p>关于我们<span class="fa fa-angle-right pull-right" ></span></p></li>
            </ul>
        </div>
        <div class="btn-box">
            <button class="btn btn-default" v-if="false" @click="quiteLog">退出登录</button>
        </div>

    </article>
</template>

<script>
import Util from '../assets/util.js'

export default {
    data(){
        return {
            userType:localStorage.getItem('userType')
        }
    },
    methods: {
        quiteLog : function(){
            this.$router.go({name:'login'})

            localStorage.clear();
        },
        toMyrelease: function(){        //我的发布
        },
        toMyapply : function(){ //我的申请（需求者）
        },
        toMydonation : function(){  //我的捐赠
        },
        toChangepass : function(){
        },
        toMycollection : function(){ 
        }
    }
}
    

</script>

<style lang="less" scoped>
@import '../assets/common.less';

.btn-box {
  margin-top: 0.30rem;
 padding: 0.15rem;
  .btn {
    width: 100%;
  }
}
.list-box {
  width: 100%;
  background-color: #fff;
  border-top: 1px  solid @list-box-border;
  border-bottom: 1px  solid @list-box-border;
  li {
    width: 100%;
    padding: 0.15rem;
    text-align: left;
  }
  li.ln_solid{
    height:0;
    padding: 0;
  }
}
</style>