<template>
	<poverty-mask :loading="loading"></poverty-mask>
	<header><span class="pull-left" @click="getback">返回</span>捐赠信息</header>

	<article data-page="donation-Info" >
	<validator name="valdiation" @valid="fillpass=true" @invalid="fillpass=false">
	    <div class="ln_solid"></div>
	    <div class="big-box">
	        <input type="text" class="form-control" placeholder="物品名称,最多20个字" v-model="itemsname" v-validate:itemsname="{required:true,maxlength:20}">
	    </div>
	    <div class="ln_solid"></div>
	    <div class="big-box">
	        <textarea class="form-control" placeholder="讲述一下您的物品。如型号、颜色;最多80字" rows="4" v-model="itemsdesc" style="resize:none" v-validate:itemsdesc="{required:true,maxlength:80}"></textarea>
	        <img class="add-img" id="pic0" @click="uploadPic" v-bind:src="picUrl">
	    </div>
	    <div class="ln_solid"></div>
	    <div class="blank_5"></div>
	    <div class="ln_solid"></div>
	    <div class="big-box ">
	        <textarea  class="form-control inline-box" rows="4" placeholder="您想对受捐者说的话,最多80" v-model="reason" style="resize:none" v-validate:story="{required:true,maxlength:80}"></textarea>
	    </div>
	    <div class="ln_solid"></div>
	    <div class="big-box bank-box">
	        <span class="bank inline-box">匿名捐助</span>
	            <div class="inline-box pull-right">
	                <input type="checkbox" class="js-switch" checked />
	            </div>
	    </div>
	    <div class="ln_solid"></div>

	</validator>
	</article>
	<footer>
	    <button class="btn btn-primary" @click="toSubmit" :disabled="$valdiation.invalid">发布捐助</button>
	</footer>
</template>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';

	export default {
		data () {
			return {
				userId :localStorage.getItem('userId'),
				pmId : "",
				itemsname : "",
				reason : "",
				itemsdesc: "",
				isHide : "1",
				picUrl : 'http://7xqgvd.com1.z0.glb.clouddn.com/upload.png',
				fillpass : false,
				loading : false
			}
		},
		methods : {
			getback : function(){
				window.history.back();
			},
			toSubmit : function(){
				if(!this.fillpass)
				{
					return;
				}
				if(this.picUrl=="http://7xqgvd.com1.z0.glb.clouddn.com/upload.png"){
					if(window.toast)
					{
						window.toast.h5Toast("请上传图片");
					}else{
						alert("请上传图片")
					}					
					return;
				}
				var that = this;

				var stateBtn = document.querySelector('.js-switch');
				
				var jsonStr = {
					contributorid : this.userId,
					phId : this.pmId,
					itemsname : this.itemsname,
					reason : this.reason,
					itemsdesc :this.itemsdesc,
					picUrl : this.picUrl,
					isHide : stateBtn.checked?1:0
				}
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "publishDonateLove",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					if(response.data.rspCode=="000")
					{
						if(window.toast){
							window.toast.h5Toast("捐赠成功");
							this.$router.go({
								name : 'need'
							})
						}else{
							alert("捐赠成功")
						}
						
						that.$route.go({name:'need'});
					}else{
						if(window.toast){
							window.toast.h5Toast("捐赠失败");
						}else{
							alert("捐赠失败")
						}
					}


				}, (response) => {
				});
			},
			uploadPic : function(){
				if(window.demo)
				{
					window.demo.revert("");
					this.loading = true;
				}
			}
		},
		components : {povertyMask},
		created : function(){

			this.pmId = this.$route.params.pmId;

			var jsonStr = {};
			jsonStr.userType = localStorage.getItem('userType');
			jsonStr.userId = localStorage.getItem('userId');

			var that = this;

			this.$http.jsonp(Util.url,{
			    params : {
			        marked : "getAppUsersInfo",
			        jsonStr : JSON.stringify(jsonStr)
			    },
			    jsonp: "callbackparam"
			}).then((response) => {

				if(response.data.tochangeInfo){
					if(window.toast)
					{
						window.toast.h5Toast('根据相关要求，请您先完善个人资料');
					}else{
						alert('根据相关要求，请您先完善个人资料');
					}
					
					this.$router.go({ name: 'personalCenter'})
				}else{
					window.wave2 = function(name,url) {
						if(!url){
							window.toast.h5Toast('上传失败');
						}else{
							that.picUrl = url;
						}
						that.loading = false;
					};
				}
			}, (response) => {

			});

		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/common_in.less';

	.bank-box .pull-right {
	  padding: 0.03rem;
	}
	.bank-box .pull-right {
	  padding: 0.03rem;
	}
	.goods_category {
	  height: 0.4rem;
	  border-top: 0.01rem solid #e7e7e7;
	  border-bottom: 0.01rem solid #e7e7e7;
	  margin: 0.06rem 0;
	  line-height: 0.4rem;
	  font-size: 0.15rem;
	  padding: 0 0.12rem;
	  span.fa-angle-right {
	    margin-top: 0.05rem;
	    font-size: 0.24rem;
	  }
	}
</style>