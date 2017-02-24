<template>
<!-- <poverty-mask :loading="loading"></poverty-mask>
	<header>注册</header>
	<validator name="validation1" @valid="fillpass=true" @invalid="fillpass=false">
	    <form novalidate class="form-horizontal">
	        <div class="input-group">
			  <span class="input-group-addon">姓名</span>
			  <input type="text" class="form-control" placeholder="姓名" aria-describedby="basic-addon1" v-model="username" v-validate:username="{required:true}">
			</div>
	        <div class="input-group">
			  <span class="input-group-addon">密码</span>
			  <input type="password" class="form-control" placeholder="请输入密码" aria-describedby="basic-addon1" v-model="password" v-validate:password="{required:true}">
			</div>
	        <div class="input-group">
			  <span class="input-group-addon">重新输入密码</span>
			  <input type="password" class="form-control" placeholder="请重新输入密码" aria-describedby="basic-addon1" v-model="repassword" v-validate:password="{required:true}">
			</div>
	        <div class="input-group">
			  <span class="input-group-addon">手机号</span>
			  <input type="text" class="form-control" placeholder="请输入手机号" aria-describedby="basic-addon1" v-model="telephone" v-validate:telephone="{required:true,tel:true}">
			</div>
	        <div class="input-group" v-if="userType==2">
			  <span class="input-group-addon">身份证号码</span>
			  <input type="text" class="form-control" placeholder="请输入身份证号码" aria-describedby="basic-addon1" v-model="IDcard" v-validate:telephone="{required:true,IDcard:true}">
			</div>
	        <div class="input-group">
			  <span class="input-group-addon" style="background-color:#337ab7;color:#fff" @click="getVerify">{{verifyText}}</span>
			  <input type="text" class="form-control" placeholder="请输入短信验证码" aria-describedby="basic-addon1" v-model="verification">
			</div>
			<p><a v-link="{name:'login'}">已经有账号了？点此登录</a></p>
			<input class="btn btn-primary btn-lg btn-block" @click="startSubmit" type="button" value="注册">
	    </form>
	</validator> -->
	<div class="denglu">
	<div class="top">
	  注册
	</div>
	<validator name="validation1">
	<div class="denglukuang">
		<div class="denglu_01">
		    <input id="input_000" placeholder="用户名只能为邮箱或者手机号"  v-model="username" v-validate:username="{required:true,username:true}">
		    <input id="input_01" placeholder="密码最少8位并含字母" type="password" v-model="password" v-validate:password="{required:true,password:true}">
		    <input id="input_01" placeholder="密码最少8位并含字母" type="password" v-model="repassword" v-validate:password="{required:true}">
		    <input id="input_02" placeholder="认证手机号码" v-model="telephone" v-validate:telephone="{required:true,telephone:true}">
		    <div v-if="userType==2">
		    	<input id="input_03" placeholder="身份证号" v-model="IDcard" v-validate:IDcard="{required:true,IDcard:true}">
		    </div>
            <div class="input-group">
	    		  <span class="input-group-addon" style="background-color:#f75354;color:#fff;height:60%" @click="getVerify">{{verifyText}}</span>
	    		  <input type="text" class="form-control" placeholder="请输入短信验证码" aria-describedby="basic-addon1" v-model="verification" v-validate:verifivation="{required:true}">
	    	</div>		    
		    <a href="javascript:;" @click="startSubmit" :disabled="$validation1.invalid">
		    <div class="juan_input">注 册</div></a>
		    <a href="javascript:;" v-link="{name:'login'}">
		    <div class="forget">已经有账号了?点此登录</div></a>
		</div>
	</div>
	</validator>
</template>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';

	export default {
		data() {
			return {
				userType:"",
				username:"",
				password:"",
				repassword:"",
				telephone: "",
				verification:"",//验证码
				IDcard: "",
				verifyText : "点击获取验证码",
				loading:false
			}
		},
		components : {povertyMask},
		methods : {
			getVerify: function(e){	//获取验证码
				if(this.verifyText!="点击获取验证码"){
					event.preventDefault();
					return false;
				}

				if(!/^1[3-9]\d{9}$/.test(this.telephone)){
					if(window.toast){
						window.toast.h5Toast('请重新输入手机号');
					}else{
						alert('请重新输入手机号码');
					}
					return;
				}
				
				var that = this;

				var jsonStr = {
					mobile :this.telephone,
					userType : 1,
					type: 1
				};
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "sendSms",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					if(response.data.rspCode=="000")
					{
						if(window.toast){
							window.toast.h5Toast('发送成功');
						}else{
							alert('发送成功');
						}

						var num = 60;
						var timer = setInterval(function(){
							that.verifyText=num+"秒后可再点击";
							num--;
							if(num==0)
							{
								that.verifyText ="点击获取验证码";
								clearInterval(timer);
							}
						},1000);
					}else{
						if(window.toast){
							window.toast.h5Toast('发送失败');
						}else{
							alert('发送失败');
						}
					}
				}, (response) => {

				});

				event.preventDefault();
			},
			startSubmit : function(){	//开始提交

				console.log(this.$validation1);
				if(this.$validation1.username.invalid){
					if(window.toast)
					{
						window.toast.h5Toast('请重新填写用户名')
					}else{
						alert('请重新填写用户名')
					}
				}else if(this.$validation1.password.invalid){
					if(window.toast)
					{
						window.toast.h5Toast('请重新填写密码')
					}else{
						alert('请重新填写密码')
					}
				}else if(this.repassword!=this.password){
					if(window.toast)
					{
						window.toast.h5Toast('两次密码不相同')
					}else{
						alert('两次密码不相同')
					}
					return;
				}else if(this.$validation1.telephone.invalid){
					if(window.toast)
					{
						window.toast.h5Toast('请重新填写手机号')
					}else{
						alert('请重新填写手机号')
					}
				}else if(this.$validation1.verifivation.invalid){
					if(window.toast)
					{
						window.toast.h5Toast('请重新填写验证码')
					}else{
						alert('请重新填写验证码')
					}
				}
				else if(this.userType==2&&this.$validation1.idcard.invalid){
					if(window.toast)
					{
						window.toast.h5Toast('请重新填写身份证号')
					}else{
						alert('请重新填写身份证号')
					}
				}


				if(this.$validation1.invalid){
					return;
				}

				this.goRegister();
			},
			goRegister : function(){		//捐赠者提交
				var jsonStr = {
				};
				jsonStr["userName"]=this.username;
				jsonStr["passWord"]=this.password;
				jsonStr["mobile"]=this.telephone;
				jsonStr["authCode"]=this.verification;
				jsonStr["userType"] = this.userType;
				jsonStr["IDNumber"] = this.IDcard;

				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "registerAppUsers",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					if(response.data.rspCode=="000")
					{
						if(window.toast){
							window.toast.h5Toast("注册成功");
						}else{
							alert("注册成功");
						}
						
						this.$router.go({
							name:'login',
							query:{
								phone:this.telephone
							}
						})
					}else{
						if(window.toast){
							window.toast.h5Toast("注册失败;"+response.data.reason);
						}else{
							alert("注册失败;"+response.data.reason)
						}
						
					}
				}, (response) => {

				});
			}

		},
		computed : {
			ispassMatch :function(){//再次输入的密码与原密码是否匹配
				return this.repassword==this.password?true:false;
			}
		},
		validators : {
			username: function(val){
            return /(^1[3-9]\d{9}$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test(val);
			},
			telephone : function(val){
				return /^1[3-9]\d{9}$/.test(val);
			},
			IDcard : function(val){
				return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(val);
			},
			password : function(val){
				return /^(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,16}$/.test(val)
			}
		},
		created : function(){
			this.userType = this.$route.params.userType;
		}
	}
</script>
<style lang="less" scoped>
	/* @import '../assets/common_in.less';
	
	form{
		margin-top: 0.56rem;
	}
	div.input-group{
		margin-bottom: 0.16rem;
	}
	input.btn-block{
		margin-top: 0.16rem;
	}
	p{
		text-align: center;
		a{
			color:#337ab7;
		}
		
	} */
	/*login*/
	.top{ width:100%; background:#f75354; padding-bottom:0.2em; overflow:hidden; position:relative;height: 52px;line-height: 52px;font-size: 24px;text-align: center;color: #fff}
	.denglu{ float:left; width:100%; height:100%;}
	.bg_login{ width:100%; height:14em; float:left; background:url(../img/001.png) center top no-repeat; background-size:cover;}
	.denglukuang{ width:100%;  float:left;}
	.denglu_01{ width:100%; padding:0 5%;}
	.denglu_01 input{ margin-top:0.2em; width:90%; height:3em; border:none; border-bottom:1px solid #e3e5da; padding-left:10%; font-size:1.2em; font-family:Microsoft Yahei; color:#3d4c4f;}
	#input_00{ width:100%;margin-top:0.6em; background:url(../img/002.png) left no-repeat; background-size:1.4em;}
	#input_000{width:100%; margin-top:0.6em; background:url(../img/004.png) left no-repeat; background-size:1.4em;}
	#input_01{width:100%; background:url(../img/003.png) left no-repeat; background-size:1.4em;}
	#input_02{ width:100%;background:url(../img/002.png) left no-repeat; background-size:1.4em;}
	#input_03{ width:100%;background:url(../img/002.png) left no-repeat; background-size:1.4em;}
	.juan_input{ width:70%; margin:2em auto; background:#f75354; border-radius:1em; line-height:2.4em; margin-bottom:1em; text-align:center; font-size:1.2em; font-family:Microsoft Yahei; color:#fff;}
	.juan_input01{ width:70%; margin:0 auto; background:#f75354; border-radius:1em; line-height:2.4em; margin-bottom:1em; text-align:center; font-size:1.2em; font-family:Microsoft Yahei; color:#fff;}
	.forget{ width:60%; margin:0 auto; text-align:center; font-size:1em; font-family:Microsoft Yahei; margin-top:4em; color:#999;}
</style>