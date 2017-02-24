<template>
	<!-- <poverty-mask :loading="loading"></poverty-mask>
	<header>忘记密码</header>
	<validator name="validation1" @valid="fillpass=true" @invalid="fillpass=false">
	    <form novalidate v-on:submit.prevent>
	        <div>
	            <input type="password" class="form-control" placeholder="请输入新密码,不小于6位" v-model="password" v-validate:password="{required:true,minlength:6}" initial="off"/>
	        </div>
	        <div>
	            <input type="password" class="form-control" placeholder="请再次输入密码" v-model="repassword" maxlength="16" v-validate:repassword="['repass']" v-bind:class="{valid_err:$validation1.repassword.dirty&&repassword!=password}"/>
	            <input type="password" class="form-control" placeholder="请再次输入密码" v-model="repassword" maxlength="16" v-validate:repassword="{required:true,minlength:6}"/>
	        </div>
	
	        <div>
	            <input type="number" class="form-control" placeholder="手机号" v-bind:class="{valid_err:$validation1.telephone.invalid&&$validation1.telephone.dirty}" v-model="telephone" v-validate:telephone="['tel']" />
	            <input type="number" class="form-control" placeholder="手机号" v-model="telephone" v-validate:telephone="{required:true,tel:true}" />
	        </div>
	
	        <div class="row">
	            <div class="col-xs-6">
	                <input type="text" class="form-control" v-model="authCode" placeholder="短信验证码" v-validate:authCode="{required:true}"/>
	            </div>
	            <div class="col-xs-6" style="text-align:center">
	                <span class="btn btn-default" style="margin-right: 0" @click="getVerify" >{{verifyText}}</span>
	            </div>
	        </div>
	        <div>
	            <a class="btn btn-primary"  href="#" style="width: 100%" v-on:click.stop.prevent="forget_sub" :disabled="$validation1.invalid">修改密码</a>
	        </div>
	        <div class="clearfix"></div>
	        <p class="change_link">已经有用户名了？
	                <a v-link="{name:'login'}" class="to_register"><span class="text-danger">《点此登陆》</span></a>
	        </p>
	    </form>
	</validator> -->
		<div class="denglu">
		<div class="top">
		  忘记密码
		</div>
		<validator name="validation1">
		<div class="denglukuang">
			<div class="denglu_01">
			    <input class="input_01" type="password" placeholder="密码最少8位并含字母"  v-model="password" maxlength="16" v-validate:password="{required:true,password:true}">
			    <input class="input_01" type="password" placeholder="密码最少8位并含字母" v-model="repassword" maxlength="16" v-validate:repassword="['repass']" />
			    <input id="input_02" placeholder="手机号" v-model="telephone" v-validate:telephone="{required:true,telephone:true}" @blur="testTel()">
	            <div class="input-group">
		    		  <span class="input-group-addon" style="background-color:#f75354;color:#fff;height:60%" @click="getVerify">{{verifyText}}</span>
		    		  <input type="text" class="form-control" placeholder="请输入短信验证码" aria-describedby="basic-addon1" v-model="authCode" v-validate:authCode="{required:true,authCode:true}">
		    		</div>
			    </div>
			    <a href="javascript:;" @click="forget_sub" :disabled="$validation1.invalid"><div class="juan_input">修改密码</div></a>
			    <a href="javascript:;" v-link="{name:'login'}"><div class="forget">已经有账号了?点此登录</div></a>
			</div>
		<div>
		</validator>
</template>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';

	export default {
		data () {
			return {
				password : "",
				telephone : "",
				authCode : "",
				repassword : "",
				fillpass : false,
				verifyText : "点击获取验证码",
				loading:false
			}
		},
		methods : {
			forget_sub : function(){

				if(this.$validation1.password.invalid){
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
				}
				else if(this.$validation1.telephone.invalid){
					if(window.toast)
					{
						window.toast.h5Toast('请重新填写手机号')
					}else{
						alert('请重新填写手机号')
					}
					return;
				}else if(this.$validation1.authcode.invalid){
					if(window.toast)
					{
						window.toast.h5Toast('请重新填写验证码')
					}else{
						alert('请重新填写验证码')
					}
					return;
				}
				var jsonStr = {
					mobile : this.telephone,
					newPassWord :this.password,
					authCode : this.authCode
				};
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "lostPass",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

				    if(response.data.rspCode=="000")
				    {
				    	if(window.toast){
							window.toast.h5Toast('修改成功');
						}else{
							alert('修改成功');
						}
						this.$router.go({
							name : 'login'
						})
				    }else{
				        if(window.toast){
				            window.toast.h5Toast('修改失败'+response.data.rspDesc);
				        }else{
				            alert('修改失败'+response.data.rspDesc);
				        }
				    }

				}, (response) => {

				});
			},
			testTel : function(){
				if(!this.telephone){
					return;
				}

				var jsonStr = {
					mobile : this.telephone
				};
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "checkmobile",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
					if(response.data.rspCode!="000"){
						if(window.toast){
							window.toast.h5Toast('该手机号未注册');
						}else{
							alert('该手机号未注册');
						}
					}
				}, (response) => {

				});
			},
			getVerify: function(event){	//获取验证码
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
					return false;
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

			}

		},
		computed : {
			ispassMatch : function(){
				return this.password==this.repassword?true:false;
			}
		},
		components : {povertyMask},
		validators : {
			tel : function(val){
				return /^1[3-9]\d{9}$/.test(val);
			},
			password : function(val){
				return /^(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,16}$/.test(val)
			}
		}
	}
</script>
<style lang="less" scoped>
	/* @import '../assets/common_in.less';
	
	form{
		margin-top: 0.56rem;
	}
	form>div{
		margin-bottom : 0.16rem;
	}
	p{
		text-align: center;
	} */
	.top{ width:100%; background:#f75354; padding-bottom:0.2em; overflow:hidden; position:relative;height: 52px;line-height: 52px;font-size: 24px;text-align: center;color: #fff}
	.denglu{ float:left; width:100%; height:100%;}
	.bg_login{ width:100%; height:14em; float:left; background:url(../img/001.png) center top no-repeat; background-size:cover;}
	.denglukuang{ width:100%;  float:left;}
	.denglu_01{ width:100%; padding:0 5%;}
	.denglu_01 input{ margin-top:0.2em; width:90%; height:3em; border:none; border-bottom:1px solid #e3e5da; padding-left:10%; font-size:1.2em; font-family:Microsoft Yahei; color:#3d4c4f;}
	#input_00{ width:100%;margin-top:0.6em; background:url(../img/002.png) left no-repeat; background-size:1.4em;}
	#input_000{width:100%; margin-top:0.6em; background:url(../img/004.png) left no-repeat; background-size:1.4em;}
	.input_01{width:100%; background:url(../img/003.png) left no-repeat; background-size:1.4em;}
	#input_02{ width:100%;background:url(../img/002.png) left no-repeat; background-size:1.4em;}
	#input_03{ width:100%;background:url(../img/002.png) left no-repeat; background-size:1.4em;}
	.juan_input{ width:70%; margin:2em auto; background:#f75354; border-radius:1em; line-height:2.4em; margin-bottom:1em; text-align:center; font-size:1.2em; font-family:Microsoft Yahei; color:#fff;}
	.juan_input01{ width:70%; margin:0 auto; background:#f75354; border-radius:1em; line-height:2.4em; margin-bottom:1em; text-align:center; font-size:1.2em; font-family:Microsoft Yahei; color:#fff;}
	.forget{ width:60%; margin:0 auto; text-align:center; font-size:1em; font-family:Microsoft Yahei; margin-top:4em; color:#999;}
</style>