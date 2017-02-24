<template>
	<poverty-mask :loading="loading"></poverty-mask>
	<header>
		<span class="pull-left" onclick="getback()">返回</span>发布信息
	</header>

	<article data-page="publish-goods"> 
	<validator name="validation" @valid="fillpass=true" @invalid="fillpass=false">
		<div class="ln_solid"></div>
		<div class="big-box">
			<textarea name="" id="" class="form-control" rows="4" placeholder="讲述您的故事,最多80字" style="resize:none" v-model="applyReason" v-validate:applyReason="{required:true,maxlength:80}"></textarea>
			<div class="ln_solid"></div>
			<img v-bind:src="picUrl" alt="" class="add-img" id="pic0" @click="selImg">
		</div>
		<div class="big-box address">
		    <p class="name">受捐人：<span>{{realName}}</span><span class="btn btn-default  btn-sm pull-right" @click="changAddress">修改地址</span></p>
		    <p v-if="!changeNow">{{address}}</p>
		    <textarea name="" id="" class="form-control" cols="30" rows="3" placeholder="邮寄地址" v-model="address" style="resize:none;padding:0;font-size:13px;border:1px solid" v-if="changeNow"></textarea>
		    <p>{{telephone}}</p>
		</div>
		<modal :show.sync="showModal_address" width="300">
		  <div slot="modal-header" class="modal-header">
		    <h4 class="modal-title">请填写您的邮寄地址</h4>
		  </div>
		  <div slot="modal-body" class="modal-body">
		    <textarea class="form-control" cols="30" rows="4" v-model = "address_mail"></textarea>
		  </div>
		  <div slot="modal-footer" class="modal-footer">
		    <button type="button" class="btn btn-default" @click="cancelMailAddress">取消</button>
		    <button type="button" class="btn btn-primary" @click="confirmMailAddress">确定</button>
		  </div>
		</modal>
	</validator>
	</article>
	<footer>
		<input type="button" class="btn btn-primary" value="发布需求申请" @click="submitNeed" :disabled="$validation.invalid">
	</footer>
</template>
<script>
	import Util from '../assets/util.js';
	import { modal } from 'vue-strap';
	import povertyMask from './povertyMask.vue';

	export default {
		data () {
			return {
				realName : "",
				address : "",
				address_mail : "",
				telephone : "",
				applyReason : "",
				loveNo : "",
				changeNow : false,
				picUrl : 'http://7xqgvd.com1.z0.glb.clouddn.com/upload.png',
				showModal_address : false,
				loading : false
			}
		},
		methods : {
			cancelMailAddress : function(){
				this.address_mail = "";
				this.showModal_address = false;
			},
			confirmMailAddress : function(){
				this.address = this.address_mail;
				this.showModal_address = false;
			},
			submitNeed : function(){
				if(this.picUrl == "http://7xqgvd.com1.z0.glb.clouddn.com/upload.png"||(!this.picUrl))
				{
					if(window.toast)
					{
						window.toast.h5Toast("请选择图片");
					}else{
						alert("请选择上传图片");
					}
					return;
				}

				var jsonStr = {
					recipientId : localStorage.getItem('userId'),
					applyReason : this.applyReason,
					loveNo : this.loveNo,
					picUrl : this.picUrl,
					address : this.address
				};
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "addApplyHelp",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					if(response.data.rspCode=="000")
					{
						if(window.toast)
						{
							window.toast.h5Toast('申请成功,请耐心等待审核');
							this.$router.go({
								name : 'donate'
							})
						}else{
							alert('申请成功')
						}
						
						that.$route.go({
							name : 'donate'
						})
					}else{
						window.toast.h5Toast(response.data.rspDesc);
					}

				}, (response) => {

				});
			},
			selImg : function(){
				this.loading = true;
				window.demo.revert("");
				
			},
			changAddress : function(){
				this.showModal_address = true;
			}
		},
		created : function(){

			this.loveNo = this.$route.params.loveNo;

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
					if(window.toast){
						window.toast.h5Toast('根据相关要求，请您先完善个人资料');
					}else{
						alert('根据相关要求，请您先完善个人资料');
					}
					
					that.$router.go({
						name:'personalCenter'
					})
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

				that.address = response.data.address;
				that.realName = response.data.realName;
				that.telephone = response.data.phone;
			}, (response) => {
			});
		},
		components : {
			modal,povertyMask
		}
	}
</script>
<style lang="less" scoped>

	@import '../assets/common_in.less';
	article[data-page=publish-goods] {
	  margin-top: @header-height;
	  margin-bottom: @footer-height;
	  .ln_solid {
	    margin: 0;
	  }
	  .big-box {
	    input {
	      border: none;
	      box-shadow: none;
	    }
	    textarea {
	      width: 100%;
	      border: none;
	      border-shadow: none;
	    }
	    img.add-img {
	      width: 0.75rem;
	      height: 0.75rem;
	      margin: 0.15rem;
	    }
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
	  .address {
	    padding: 0.1rem 0.15rem;
	    .name {
	      font-size: 0.16rem;
	    }
	    .btn {
	      padding: 0.01rem 0.1rem;
	    }
	    p {
	      margin-bottom: 0.05rem;
	    }
	  }
	}


	
</style>