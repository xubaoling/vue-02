<template>
	<poverty-mask :loading="loading"></poverty-mask>
	<header>
		<span class="pull-left" @click="getback()">取消</span>发布信息
	</header>

	<article data-page="publish-goods"> 
		<div class="big-box">
			<textarea name="" class="form-control" rows="6" placeholder="对捐助者表达您的感谢吧" style="resize:none" v-model="thanksContent"></textarea>
			<div class="ln_solid"></div>
			<img v-bind:src="picUrl" alt="" class="add-img" @click="selImg">
		</div>
	</article>
	<footer>
		<input type="button" class="btn btn-primary" value="提交" @click="submitFeedback">
	</footer>
</template>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';

	export default {
		data () {
			return {
				loveNo : "",
				picUrl :'http://7xqgvd.com1.z0.glb.clouddn.com/upload.png',
				thanksContent : '',
				loading : false
			}
		},
		methods : {
			getback : function(){
				window.history.back();
			},
			selImg : function(){
				window.demo.revert("");
				this.loading = true;
			},
			submitFeedback : function(){
				if(this.thanksContent=="")
				{
					if(window.toast){
						window.toast.h5Toast('请填写感谢内容');
					}else{
						alert("请填写感谢内容")
					}
					return;
				}
				if(this.picUrl == "http://7xqgvd.com1.z0.glb.clouddn.com/upload.png"||(!this.picUrl))
				{
					if(window.toast){
						window.toast.h5Toast('请上传图片');
					}else{
						alert("请上传图片");
					}
					return;
				}
				var jsonStr = {
					loveNo: this.loveNo,
					recipientid : localStorage.getItem('userId'),
					thanksContent : this.thanksContent,
					picUrl : this.picUrl
				};
				var that = this;
				/*var sendData = {
					marked : "addThanksRecord",
					jsonStr : JSON.stringify(jsonStr)
				};

				Util.ajaxJsonp(Util.url,sendData,function(viewdata){
					if(viewdata.rspCode=="000")
					{
						if(window.toast)
						{
							window.toast.h5Toast("发布成功");
						}else{
							alert("发布成功");
						}
						location.href="./personal-mydonation_demander.html";
					}else{
						if(window.toast)
						{
							window.toast.h5Toast(viewdata.rspDesc);
						}else{
							alert(viewdata.rspDesc);
						}
					}
				})*/

				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "addThanksRecord",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					if(response.data.rspCode=="000")
					{
						if(window.toast)
						{
							window.toast.h5Toast("发布成功");
						}else{
							alert("发布成功");
						}
						that.$router.go({
							name : 'myDonation_demander'
						})
					}else{
						if(window.toast)
						{
							window.toast.h5Toast(viewdata.rspDesc);
						}else{
							alert(viewdata.rspDesc);
						}
					}
				}, (response) => {

				});
			}
		},
		components : {povertyMask},
		created : function(){
			this.loveNo = this.$route.params.loveNo;
			var that = this;

			window.wave2 = function(name,url) {
				that.picUrl = url;
				that.loading = false;
			};
		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/common_in.less';
</style>