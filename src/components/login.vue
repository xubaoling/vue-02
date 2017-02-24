<template>
	<div class="denglu">
	<div class="bg_login"></div>
	<div class="denglukuang">
	<validator name="validation1">
		<div class="denglu_01">
		    <input id="input_00" placeholder="手机号码" v-model="username" v-validate:username="{required:true,tel:true}">
		    <input id="input_01" placeholder="密码" v-model="password" v-validate:password="{required:true}" type="password">
		    </div>
		    <a href="javascript:;"><div class="juan_input" @click="submitLog" >登 录</div></a>
		    <a href="javascript:;"><div class="juan_input01" v-link="{name:'guide'}">注 册</div></a>
		    <a href="javascript:;" v-link="{name:'forget'}"><div class="forget">忘记密码?</div></a>
		</div>
	</validator>
	<div>
</template>
<style scoped>
	/*login*/
	.denglu{ float:left; width:100%; height:100%;}
	.bg_login{ width:100%; height:14em; float:left; background:url(../img/001.png) center top no-repeat; background-size:cover;}
	.denglukuang{ width:100%;  float:left;}
	.denglu_01{ width:100%; padding:0 5%;}
	.denglu_01 input{ margin-top:0.2em; width:90%; height:3em; border:none; border-bottom:1px solid #e3e5da; padding-left:10%; font-size:1.2em; font-family:Microsoft Yahei; color:#3d4c4f;}
	#input_00{ width:100%;margin-top:0.6em; background:url(../img/002.png) left no-repeat; background-size:1.4em;}
	#input_000{ margin-top:0.6em; background:url(../img/004.png) left no-repeat; background-size:1.4em;}
	#input_01{ width:100%;background:url(../img/003.png) left no-repeat; background-size:1.4em;}
	#input_02{ width:100%;background:url(../img/002.png) left no-repeat; background-size:1.4em;}
	.juan_input{ width:70%; margin:2em auto; background:#f75354; border-radius:1em; line-height:2.4em; margin-bottom:1em; text-align:center; font-size:1.2em; font-family:Microsoft Yahei; color:#fff;}
	.juan_input01{ width:70%; margin:0 auto; background:#f75354; border-radius:1em; line-height:2.4em; margin-bottom:1em; text-align:center; font-size:1.2em; font-family:Microsoft Yahei; color:#fff;}
	.forget{ width:60%; margin:0 auto; text-align:center; font-size:1em; font-family:Microsoft Yahei; margin-top:4em; color:#999;}
</style>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';

	export default {
		data () {
			return {
				username:"",
				password:"",
				fillpass : false,
				filldone : false,
				logerr : false,
				loading: false
			}
		},
		methods: {
			submitLog:function(event){
				
				if(this.$validation1.valid){
					
					this.submitDonator();
					return;
				}

				if(this.$validation1.username.invalid){
					
					if(window.toast)
					{
						window.toast.h5Toast('请重新输入手机号')
					}else{
						alert('请重新输入手机号')
					}
				}else{
					if(window.toast)
					{
						window.toast.h5Toast('请填写密码')
					}else{
						alert('请填写密码')
					}
				}

				
			},
			submitDonator: function(){
				var that = this;
				var jsonStr = {};
				jsonStr.mobile = this.username;
				jsonStr.passWord = this.password;
				jsonStr.authCode = "";

				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "loginAppUsers",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
					console.log(response);

				    if(response.data.rspCode=="000"){
				    	
				    	localStorage.setItem('userName',response.data.userName);
				    	localStorage.setItem('userId',response.data.userid);
				    	localStorage.setItem('mobile',response.data.mobile);

				    	//从web端注册，没有选择用户类型的情况
				    	if(response.data.userType=="0"){
				    		this.$router.go({
				    			name : 'addUsertype'
				    		})

				    		return;
				    	}

				    	localStorage.setItem('userType',response.data.userType);

				    	//安卓端保存数据
				    	if(window.saveInfo){
				    		window.saveInfo.h5SaveSharedPrefsService(response.body);
				    	}
				    	
				        /*that.$router.go({name:'need'})*/
				       window.location.href = "http://djres.zgshfp.org.cn/demo/pages/";
				    }else{
				        if(window.toast){
				            window.toast.h5Toast('登录失败'+response.data.rspDesc);
				        }else{
				            alert('登录失败'+response.data.rspDesc);
				        }
				    }

				}, (response) => {

				});
			}
		},
		/*created:function(){
			if(localStorage.getItem('userType')&&localStorage.getItem('userId')&&localStorage.getItem('mobile')&&(localStorage.getItem('userType')!="undefined")){
			  window.location.href = "http://djres.zgshfp.org.cn/demo/pages/";
			}
		},*/
		components : {povertyMask},
		validators : {
			tel : function(val){
				return /^1[3-9]\d{9}$/.test(val);
			}
		}
	}
</script>