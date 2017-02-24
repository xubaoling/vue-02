<template>
	<header>登录</header>
	<div class="form-group">
    	<label for="nickname" style="padding:12px 12px;margin:0">您尚未选择用户类型，请选择 ：</label><br/>
    	<div class="tab">
    		<input type="radio" id="one" value="1" v-model="userType">
    		<label for="one">捐赠者</label>
    	</div> 
    	<div class="tab">
    		<input type="radio" id="two" value="2" v-model="userType">
    		<label for="two">受助者</label>
    	</div> 
    	
    </div>
    <div>
      <input @click="submitUsertype" class="btn btn-primary btn-md btn-block" value="确定"></input>
    </div>
</template>
<script>
	import Util from '../assets/util.js';

	export default {
		data (){
			return {
				userType:1
			}
			
		},
		methods : {
			submitUsertype : function(){
				var jsonStr = {
					userType : this.userType,
					Id : localStorage.getItem('userId')
				};
				var that = this;

				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "changeAppUsersInfo",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
				    if(response.data.rspCode=="000")
					{
						if(window.toast){
							window.toast.h5Toast('修改成功');
						}else{
							alert("修改成功");
						}
						localStorage.setItem('userType',that.userType);
						window.location.href="http://djres.zgshfp.org.cn/demo/pages/";
						
					}else{
						if(window.toast){
							window.toast.h5Toast('修改失败');
						}else{
							alert("修改失败");
						}
					}
				}, (response) => {

				});
			}
		}
	}
</script>
<style lang="less" scoped>

div.form-group{
	margin: 0.56rem 0.16rem;
	font-size: 0.16rem;

	div.tab{
		width: 50%;
		float: left;
		padding: 0.12rem 0.12rem;
	}
}
</style>