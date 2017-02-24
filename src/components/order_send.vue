<template>
<poverty-mask :loading="loading"></poverty-mask>
	<header>
	    <span class="pull-left" v-link="{name:'myDonation_donator'}">返回</span>订单信息
	</header>
	<article data-page="orders-goods">
	<form class="form-horizontal">
	    <div class="loading-box loading-3">
	        <i class="line"><span></span></i>
	        <div class="num-box">
	            <div class="inline-box ">
	                <div class="active">1</div>
	                <p>已上传</p>
	            </div>
	            <div class="inline-box ">
	                <div>2</div>
	                <p>已发货</p>
	            </div>
	            <div class="inline-box">
	                <div>3</div>
	                <p>捐助成功</p>
	            </div>
	        </div>
	    </div>
	    <div class="ln_solid"></div>
	    <div class="big-box t1">
	        <h1>受捐人：<span>{{realName}}</span></h1>
	        <h2>{{address}}</h2>
	        <h3>{{mobile}}</h3>
	    </div>
	    <!-- <div class="big-box t2 " style="padding:10px;height:50px;font-size:16px"> -->
	    <div class="form-group" style="padding:0 15px">
	        <label class="col-md-4 control-label">快递单号:</label>
	        <div class="col-md-8">
	            <input type="text" class="form-control" v-model="ogisticsNo">
	        </div>
	        
	    </div>
	    <div style="margin-left:15px;font-weight:bold">快递类型</div>
	    <select v-model="ogisticsCompany" style="margin:15px">
	        <option>韵达快递</option>
	        <option>圆通速递</option>
	        <option>申通速递</option>
	        <option>百世快递</option>
	        <option>邮政包裹</option>
	        <option>天天快递</option>     
	        <option>中通快递</option>
	        <option selected>顺丰速递</option>
	        <option>EMS</option>
	        <option>宅急送</option>
	        <option>全峰快递</option>
	        <option>德邦</option>
	        <option>天地华宇</option>
	        <option>速尔物流</option>
	        <option>优速物流</option>
	        <option>远成物流</option>
	        <option>佳怡物流</option>
	        <option>龙邦物流</option>
	        <option>申通速递</option>
	    </select>
	</form>
	</article>
	<!--<footer>-->
	    <!--<input type="button" class="btn btn-primary" value="修改物流">-->
	<!--</footer>-->
	<footer class="twoBtn">
	    <input type="button" class="btn btn-primary" value="取消捐赠" style="left:5px" @click="getBack()">
	    <input type="button" class="btn btn-primary" value="确认发货" @click="confirmSend">
	</footer>
</template>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';

	export default {
		data() {
			return {
				ahId : "",
				userId : "",
				loveNo : "",
				itemsName : "",
				itemsDesc : "",
				realName : "",
				picurl : "",
				address : "",
				mobile : "",
				ogisticsCompany: "",
				ogisticsNo : "",
				loading:false
			}
		},
		components : {povertyMask},
		methods: {
			confirmSend : function(){

				var that = this;
				if(this.ogisticsCompany&&this.ogisticsNo){
					var jsonStr = {
						loveNo : this.loveNo,
						ogisticsNo : this.ogisticsNo,
						ogisticsCompany : this.ogisticsCompany
					};
					this.$http.jsonp(Util.url,{
					    params : {
					        marked : "postConfirm",
					        jsonStr : JSON.stringify(jsonStr)
					    },
					    jsonp: "callbackparam"
					}).then((response) => {
					    if(response.data.rspCode=="000")
						{
							/*location.href="./orders-goods.html?loveNo="+that.loveNo+"&ogisticsCompany="+that.ogisticsCompany+"&ogisticsNo="+that.ogisticsNo;*/
							that.$router.go({
								name:'order_final',
								params : {
									loveNo : that.loveNo,
									ogisticsNo : that.ogisticsNo,
									ogisticsCompany : that.ogisticsCompany
								}
							})
						}
					}, (response) => {

					});


				}else{
					if(window.toast)
					{
						window.toast.h5Toast("请填写快递号及快递公司")
					}else{
						alert("请填写快递号及快递公司")
					}
					
					return;
				}
			},
			getBack : function(){
				window.history.back();
			}
		},
		created: function() {

			this.loveNo = this.$route.params.loveNo;
			this.id = this.$route.params.id;

			var that = this;

			var jsonStr = {
				loveNo: this.loveNo
			};

			this.$http.jsonp(Util.url,{
			    params : {
			        marked : "deliverGoods",
			        jsonStr : JSON.stringify(jsonStr)
			    },
			    jsonp: "callbackparam"
			}).then((response) => {
			    for(var i in response.data)
				{
					that[i] = response.data[i];
				}
			}, (response) => {

			});


		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/common_in.less';
	.big-box {
	  padding: 0.15rem;
	}
	.big-box h1 {
	  color: @list-box-text-1;
	  font-size: 0.15rem;
	}
	.big-box.t1 h1 {
	  margin-bottom: 0.1rem;
	}
	.big-box h2,.big-box h3 {
	  color: #7e7873;
	  font-size: 0.13999999999999999rem;
	  margin-top: 0.05rem;
	}
	.big-box.t4 h2 {
	  margin-top: 0rem;
	}
	.text-danger {
	  color: #e94d3c;
	}
	.t2 {
	  .btn {
	    margin-left: 0.05rem;
	    margin-top: -0.1rem;
	  }
	}
	.t3 {
	  position: relative;
	  img {
	    width: 0.8rem;
	    height: 0.8rem;
	  }
	  .fa {
	    position: absolute;
	    top: 0.45rem;
	    right: 0.15rem;
	    font-size: 0.18rem;
	    color: @list-box-text-3;
	  }
	  .ttt {
	    position: absolute;
	    top: 0.15rem;
	    left: 1.05rem;
	    .s1 {
	      font-size: 0.15rem;
	    }
	    .s2 {
	      font-size: 0.11000000000000001rem;
	      color: @list-box-text-3;
	      margin: 0.05rem 0 0.15rem;
	    }
	    .s3 {
	      font-size: 0.13rem;
	    }
	  }
	}
	.t4 {
	  color: @list-box-text-3;
	  font-size: 0.13rem;
	}

</style>