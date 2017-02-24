<template>
	<header>
	    <span class="pull-left" @click="getBack">返回</span>
		发布信息
	</header>

	<article data-page="publish-money" >
	<validator name="validation1">
	<form novalidate>
	    <div class="ln_solid"></div>
	    <div class="big-box">
	       <input type="number" class="form-control" placeholder="填写需求金额，不超过5000元" v-model="getMoney" v-validate:getMoney="{required:true,money:true}" style="padding:0">
	       	<!-- <div class="item_title">捐赠金额</div>
	       				<div class="row">
	       					<div class="col-xs-3">
	       						<label class="checkbox-inline">
	       						  <input type="checkbox" id="inlineCheckbox1" value="option1"> 1元
	       						</label>
	       					</div>
	       					<div class="col-xs-3">
	       						<label class="checkbox-inline">
	       						  <input type="checkbox" id="inlineCheckbox2" value="option2"> 5元
	       						</label>
	       					</div>
	       					<div class="col-xs-3">
	       						<label class="checkbox-inline">
	       						  <input type="checkbox" id="inlineCheckbox3" value="option3"> 10元
	       						</label>
	       					</div>
	       					<div class="col-xs-3">
	       						<label class="checkbox-inline">
	       						  <input type="checkbox" id="inlineCheckbox3" value="option3"> 50元
	       						</label>
	       					</div>
	       				</div>
	       				<div class="row">
	       					<div class="col-xs-3">
	       						<label class="checkbox-inline">
	       						  <input type="checkbox" id="inlineCheckbox3" value="option3"> 100元
	       						</label>
	       					</div>
	       					<div class="col-xs-3">
	       						<label class="checkbox-inline">
	       						  <input type="checkbox" id="inlineCheckbox1" value="option1"> 500元
	       						</label>
	       					</div>
	       					<div class="col-xs-3">
	       						<label class="checkbox-inline">
	       						  <input type="checkbox" id="inlineCheckbox2" value="option2"> 1000元
	       						</label>
	       					</div>
	       					<div class="col-xs-3">
	       						<label class="checkbox-inline">
	       						  <input type="checkbox" id="inlineCheckbox3" value="option3"> 5000元
	       						</label>
	       					</div>
	       					
	       				</div> -->
	    </div>
	    <div class="ln_solid"></div>
	    <div class="big-box">
	        <textarea class="form-control" placeholder="讲述您的故事,不超过80个字" rows="4" style="resize:none" v-model="reason" v-validate:getStory="{required:true,story:true}"></textarea>
	        <img v-bind:src="homePicUrl" alt="" class="add-img" @click="selImg">
	    </div>
	    <div class="ln_solid"></div>
	    <p class="text-outBox setpadding item_title" style="padding-bottom:0">请填写银行卡信息</p>
	    <div class="big-box cardNumber-box setpadding row" >
	    	<div class="col-xs-3">
	    		<span class="cardNumber" style="height:34px;line-height:34px;text-align:center">卡号:</span>
	    	</div>
	        <div class="col-xs-9">
	        	<input type="number" class="form-control inline-box" placeholder="填写您名下的银行卡号" v-model="getBankNum" style="letter-spacing:1px" maxlength="19" v-validate:bankcard="{required:true,bankcard:true}"/>
	        </div>
	    </div>
	    <div class="big-box bank-box setpadding row">
	    	<div class="col-xs-3">
	    		<span class="bank inline-box">银行:</span>
	    	</div>
	    	<div class="col-xs-9">
	    		<span class="choseBank inline-box" style="padding:6px 12px">{{getBankName}}</span>
	    	</div>
	    </div>
	    <div class="blank_5"></div>
	    <div class="ln_solid"></div>
	    <!-- <div class="big-box address">
	        <p class="name">受捐人：<span>王二小</span><span class="btn btn-default  btn-sm pull-right">修改地址</span></p>
	        <p>宁夏回族自治区 石嘴山市 大武口区 石炭井路22号</p>
	        <p>13822223333</p>
	    </div> -->
	    <div class="big-box address setpadding">
	        <p class="name">受捐人：<span>{{name}}</span><span class="btn btn-default  btn-sm pull-right" v-if="false">修改地址</span></p>
	        <p>{{address}}</p>
	        <p>{{telephone}}</p>
	    </div>
	</form>
	</validator>
	</article>
	<footer style="background-color:#fff">
	    <button class="btn btn-primary" v-on:click.prevent="submitNeed">发布需求申请</button>
	</footer>
</template>
<script>
	import Util from '../assets/util.js';
	import bankData from '../assets/bankData.js'

	export default{
		data(){
			return {
				getMoney : "",
				reason : "",
				getBankNum : "",
				address :"",
				name : "",
				telephone : "",
				getBankCode:"",
				homePicUrl : "http://7xqgvd.com1.z0.glb.clouddn.com/upload.png"
			}
		},
		methods:{
			submitNeed:function(){
				console.log(123);
				var jsonStr = {
					type : "2",
					userId : localStorage.getItem("userId"),
					getMoney : this.getMoney,
					reason : this.reason,
					getBankNum : this.getBankNum,
					getBankCode :this.getBankCode,
					homePicUrl :this.homePicUrl,
					bstUserAddress : this.address,
					bstPhone:this.telephone
				};
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "publishMoney",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then(function(response){
					var viewdata = response.data;
					if(viewdata.rspCode=="000")
					{
						window.toast.h5Toast('发布成功,请耐心等待审核');
						window.history.back();
					}else{
						window.toast.h5Toast(viewdata.rspDesc);
					}
				})
			},
			selImg : function(){
				window.demo.revert("");
			},
			getBack : function(){
				window.history.back();
			}
		},
		computed : {
			getBankName :function(){
				var bin = this.getBankNum.substring(0,6);		//[)
				var bankName = '';
				if(bin.length>=6){
					for(var i=0,_item;i<bankData.data.length;i++)
					{
						_item = bankData.data[i];
						if(_item.bin==bin){
							bankName= _item['bankName'].split('-')[0]+' '+_item['bankName'].split('-')[1];
						}

						this.getBankCode = bin;
					}
				}
				return bankName;
			}
		},
		validators : {
			money : function(val){
				return (parseInt(val)<=5000)&&(parseInt(val)>0)?true:false;
			},
			story :function(val){
				var reg = /^.{1,80}$/;
				return reg.test(val);
			},
			bankcard : function(val){
				var reg = /^\d{16}$|^\d{19}$/;
				return reg.test(val);
			}
		},
		created : function(){
			var jsonStr = {};
			jsonStr.userType = localStorage.getItem('userType');
			jsonStr.userId = localStorage.getItem('userId');

			/*Util.ajaxJsonp(Util.url,sendData,_cb_getUserInfo);*/
			var that = this;

			this.$http.jsonp(Util.url,{
			    params : {
			        marked : "getAppUsersInfo",
			        jsonStr : JSON.stringify(jsonStr)
			    },
			    jsonp: "callbackparam"
			}).then(function(response){
				var viewdata = response.data;
				if(viewdata.tochangeInfo){
					if(window.toast){
						window.toast.h5Toast('根据相关要求，请您先完善个人资料');
					}else{
						alert('根据相关要求，请您先完善个人资料');
					}
					
					that.$router.go({
						name:'personalCenter'
					})
				}else{
					this.address = viewdata.address;
					this.name = viewdata.realName;
					this.telephone = viewdata.phone;

					window.wave2 = function(name,url) {
						if(!url){
							window.toast.h5Toast('上传失败');
						}else{
							that.homePicUrl = url;
						}
						that.loading = false;
					};
				}
			})

		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/common.less';

	.choseBank {
	  margin-right: 0.15rem;
	  font-size: 0.15rem;
	  .fa {
	    margin-left: 0.08rem;
	    font-size: 0.15rem;
	    color: @input-placeholder;
	  }
	}
	.address {
	  padding: 0.1rem 0.15rem;
	  p{
	  	margin-bottom: 0.08rem;
	  }
	  .name {
	    font-size: 0.16rem;
	    margin-bottom: 0.05rem;
	  }
	  .btn {
	    padding: 0.01rem 0.1rem;
	  }
	}

	.big-box {
	  padding: 0.06rem 0.12rem;
	  background-color: #fff;
	  input, textarea {
	    border: none;
	    box-shadow: none;
	  }
	  textarea {
	    width: 100%;
	    padding: 0;
	  }
	  img.add-img {
	    width: 0.75rem;
	    height: 0.75rem;
	  }
	}

	.setpadding{
		padding: 0.06rem 0.12rem;
	}
	footer button{
		width: 100%;
		height:0.5rem;
	}
	textarea{
		margin: 0;
	}
	label.checkbox-inline{

	}
	.item_title{
		font-size: 0.16rem;
		font-family: "黑体"
	}

</style>