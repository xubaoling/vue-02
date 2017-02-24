<style scoped lang="less">
	@import '../assets/common_in.less';

	article[data-page=donation-Info-Money] {
		margin-top: 0.44rem;
	  .bank-box .pull-right {
	    padding: 0.03rem;
	  }
	  p.amout-instru {
	    padding-left: 0.12rem;
	    height: 0.3rem;
	    line-height: 0.3rem;
	    font-size: 0.12rem;
	    color: #838181;
	    background-color: #f4f4f4;
	  }
	  .big-box {
	  	padding: 0.12rem 0.12rem;
	    ul {
	      li {
	        height: 0.4rem;
	        position: relative;
	        input {
	          width: 0.2rem;
	          height: 0.2rem;
	          margin: 0rem;
	          position: absolute;
	          top: 50%;
	          tranform: translateY(-50%);
	          -webkit-transform: translateY(-50%);
	          -moz-transform: translateY(-50%);
	        }
	        span {
	          margin: 0.07rem 0;
	          margin-left: 0.32rem;
	          font-size: 0.16rem;
	        }
	      }
	    }
	  }
	  .anounce {
	    text-align: center;
	    font-size: 0.13rem;
	    color: #bfbdbd
	  }
	}
	.item_title{
	  	font-size: 0.16rem;
	  	font-family: "黑体"
	}
	div.col-xs-3{
		padding-right: 0;
	}
	textarea.form-control{
		padding: 0;
	}
	div.payMethod p:nth-of-type(1){
		padding: 0;
		font-size: 0.16rem;
	}
	div.payMethod ul li{
		padding: 0;
	}
	div.ln_solid{
		border-top: 0.01rem solid #ddd;
	}
	div.payAccount div:nth-of-type(2){
		margin-top: 0.06rem;
	}
</style>
<template>
	<header><span class="pull-left" @click="getback">返回</span>捐赠信息</header>
	<article data-page="donation-Info-Money">
	<validator name="validation" @valid="fillpass=true" @invalid="fillpass=false">
		<div class="big-box payAccount">
				<div class="item_title">捐赠金额</div>
   				<div class="row">
   					<div class="col-xs-3">
   						<label class="radio-inline">
   						  <input type="radio" name="inlineRadioOptions" value="1" v-model="moneyCount"> 1元
   						</label>
   					</div>
   					<div class="col-xs-3">
   						<label class="radio-inline">
   						  <input type="radio" name="inlineRadioOptions" value="5" v-model="moneyCount"> 5元
   						</label>
   					</div>
   					<div class="col-xs-3">
   						<label class="radio-inline">
   						  <input type="radio" name="inlineRadioOptions" value="10" v-model="moneyCount"> 10元
   						</label>
   					</div>
   					<div class="col-xs-3">
   						<label class="radio-inline">
   						  <input type="radio" name="inlineRadioOptions" value="50" v-model="moneyCount"> 50元
   						</label>
   					</div>
   				</div>
   				<div class="row">
   					<div class="col-xs-3">
   						<label class="radio-inline">
   						  <input type="radio" name="inlineRadioOptions" value="100" v-model="moneyCount"> 100元
   						</label>
   					</div>
   					<div class="col-xs-3">
   						<label class="radio-inline">
   						  <input type="radio" name="inlineRadioOptions" value="500" v-model="moneyCount"> 500元
   						</label>
   					</div>
   					<div class="col-xs-3">
   						<label class="radio-inline">
   						  <input type="radio" name="inlineRadioOptions" value="1000" v-model="moneyCount"> 1000元
   						</label>
   					</div>
   					<div class="col-xs-3">
   						<label class="radio-inline">
   						  <input type="radio" name="inlineRadioOptions" value="5000" v-model="moneyCount"> 5000元
   						</label>
   					</div>
   					
   				</div>
		</div>
		<div class="ln_solid"></div>
		<div class="big-box">
			<textarea placeholder="您想对受助者说的话(最多80字)" v-model="reason" rows="6" class="form-control" style="resize:none" v-validate:story="{required:true,maxlength:80}"></textarea>
		</div>
		<div class="ln_solid"></div>
		<div class="big-box payMethod">
			<p class="amout-instru">请选择支付方式</p>
			<ul>
				<li style="display:none" >
					<input type="radio" name="pay-method"><span>支付宝支付</li>
				<li style="display:none"><input type="radio" name="pay-method"><span>微信支付</li>
				<li>
					<input type="radio" name="pay-method" checked>
					<span class="inline-box">银联在线支付</span>
				</li>
			</ul>
		</div>
		<div class="blank_5"></div>
		<div class="ln_solid"></div>
		<div class="big-box bank-box">
		    <span class="bank inline-box">匿名捐助</span>
		        <div class="inline-box pull-right">
		            <input type="checkbox" class="js-switch" checked />
		        </div>
		</div>
		<div class="ln_solid"></div>
		<div class="anounce text-outBox">
			筹集期限内，若没达到筹集目标，您的爱心金额将全数返还
		</div>
	</validator>
	</article>
	<footer>
	    <input type="button" class="btn btn-primary" @click="toSubmit" value="提交" />
	</footer>
</template>
<script>
	import Util from '../assets/util.js';

	export default {
		data(){
			return {
				userId :localStorage.getItem('userId'),
				pmId : "",
				reason : "",
				type: "3",
				isHide : "1",
				moneyCount : "",	//捐多少
				fillpass : false
			}
		},
		methods : {
			getback : function(){
				window.history.back();
			},
			toSubmit : function(){
				var jsonStr = {
					userId : this.userId,
					phId : this.pmId,
					money : this.moneyCount,
					reason : this.reason,
					paytype :this.type,
					isHide : 0
				};

				this.$http.jsonp(Util.url,{
					params : {
					    marked : "donateMoney",
					    jsonStr : JSON.stringify(jsonStr)
					},
					jsonp: "callbackparam"
				}).then((response)=>{
					window.unionPay.h5UnionPayPayment(response.body)
				},(response) => {
				})
			}
		},
		ready : function(){
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
					
					that.$router.go({
						name:'personalCenter'
					})
				}

			}, (response) => {
			});


		}
	}
	/*var max ;
	var appModel = (function(){
		var submitDonate = function(){
			var jsonStr = {
				userId : vm.userId,
				phId : vm.pmId,
				money : vm.money,
				reason : vm.reason,
				type :vm.type,
				isHide : 1
			};
			var sendData = {
				'marked' : 'donateMoney',
				jsonStr : JSON.stringify(jsonStr)
			};
			var _cb_submitDonate = function(viewdata){

			};

			//console.log(sendData);
			Util.ajaxJsonp(Util.url,sendData,_cb_submitDonate);
		};

		return {
			submitDonate: submitDonate
		};
	})();

	export default{
		data () {
			return {
				userId :"",
				pmId : "",
				money : "",
				reason : "",
				type: "3",
				isHide : "1",
				getMoney : "",	//需要多少
				moneyCount : "",	//已获得多少
				fillpass : false
			}
		},
		methods : {
			toSubmit : function(){
				if(!this.fillpass)
				{
					return;
				}
				appModel.submitDonate();
			}
		},
		created : function(){
			var urlDataArray = location.search.substring(1).split('&');
			this.userId = localStorage.getItem('userId');
			this.pmId = urlDataArray[0].split('=')[1];
			this.getMoney = urlDataArray[1].split('=')[1];
			this.moneyCount = urlDataArray[2].split('=')[1];
			max = parseInt(this.getMoney)-parseInt(this.moneyCount);

			var jsonStr = {};
			jsonStr.userType = localStorage.getItem('userType');
			jsonStr.userId = localStorage.getItem('userId');
			jsonStr = JSON.stringify(jsonStr);

			var sendData = {
				marked : 'getAppUsersInfo',
				jsonStr :jsonStr
			};
			var _cb_getUserInfo = function(viewdata){
				if(viewdata.tochangeInfo){
					window.toast.h5Toast('根据相关要求，请您先完善个人资料');
					location.href="./userInfo.html"
				}
			};
		},
		validators : {
			money : function(val){
				return parseInt(val)<=max;
			}
		}
	}*/
</script>