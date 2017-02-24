<template>
<poverty-mask :loading="loading"></poverty-mask>
	<header><span class="pull-left" @click="getback">返回</span>他的申请</header>

	<article data-page="needDetail-Money">
	    <div class="ln_solid"></div>
	    <div class="big-box goods_category" id="applyDetail">
	        <div>
	            <h1>{{realName}}</h1>
	        </div>
	        <div>
	            <h3 style="bottom :26px;left:10px"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp{{caption}}</h3>
	            <h4 style="bottom:6px;left:15px">申请时间{{applyTime}}</h4>
	        </div>
	    </div>

	    
	    
	    <div class="ln_solid"></div>
	    <div class="bigbox demander-story">
	        {{reason}}
	    </div>
	    <div class="ln_solid"></div>
	    <div class="big-box goods-show">
	        <img v-bind:src="picurl">
	    </div>
	    <div class="ln_solid"></div>
	</article>
	<footer class="donation-Info-Apply">
	    <button class="btn btn-primary" @click="passApply">通过申请</button>
	</footer>
</template>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';

	export default {
		data (){
			return {
				ahId:"",
				userId:"",
				userName:"",
				realName:"",
				reason:"",
				applyTime:"",
				regionId:"",
				caption:"",
				applyStatus:"",
				picurl : "",
				loading:false
			}
		},
		methods : {
			getback : function(){
				window.history.back();
			},
			passApply : function(){
				var jsonStr = {
					ahId : this.ahId,
					loveNo : this.loveNo,
					userId : this.userId
				};
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "passApply",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
				    if(response.data.rspCode=="000")
					{
						if(window.toast){
							window.toast.h5Toast('成功');
						}else{
							alert("成功");
						}
						/*location.href="./personal-mydonation_donator.html"*/
						this.$router.go({
							name : 'myDonation_donator'
						})
					}else{
						if(window.toast){
							window.toast.h5Toast('操作失败'+response.data.rspDesc);
						}else{
							alert('操作失败'+response.data.rspDesc);
						}
					}

				}, (response) => {

				});
				
			}
		},
		components : {
			povertyMask
		},
		created : function(){

			this.ahId = this.$route.params.ahId;
			this.userId = this.$route.params.userId;
			this.loveNo = this.$route.params.loveNo;

			var jsonStr = {
				ahId:this.ahId
			};
			var that = this;
			this.$http.jsonp(Util.url,{
			    params : {
			        marked : "applyDetail",
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

	div.container{
	  width:100%;
	  height: 0.8rem;
	  padding:0.15rem;
	  text-align:left;
	  position: relative;

	  h1{
	    font-size: 0.16rem;
	    small{
	      font-size:0.11000000000000001rem;
	  color:#5d554f;
	      span{
	        color:red;
	      }
	    }
	  }
	  h2{
	    position: absolute;
	    right: 0.15rem;
	    top: 0.15rem;
	    font-size: 0.12rem;
	    color: @list-box-text-3;
	  }
	  p{
	    position: absolute;
	    font-size: 0.13999999999999999rem;
	    left: 0.15rem;
	    top:0.45rem;
	  }
	  h3{
	    font-size: 0.12rem;
	    position: absolute;
	    color:@list-box-text-2;
	    top: 0.5rem;
	    left: 0.15rem;
	  }
	  h4{
	    font-size:0.12rem;
	    position: absolute;
	    top: 0.5rem;
	    right: 0.15rem;
	    span{
	      color: red;
	    }
	  }
	}
	div.goods_category{
	  position: relative;
	  height: 0.8rem;
	  padding: 0.15rem;
	  h1{
	    position: absolute;
	    left: 0.15rem;
	    top: 0.15rem;
	    font-size: 0.13999999999999999rem;
	  }
	  a{
	    position: absolute;
	    right: 0.15rem;
	    top: 0.15rem;
	    font-size: 0.13999999999999999rem;
	  }
	  h3{
	    position: absolute;
	    left: 0.15rem;
	    bottom: 0.15rem;
	    font-size: 0.12rem;
	    color: @list-box-text-2;
	  }
	  h4{
	    position: absolute;
	    right: 0.15rem;
	    bottom: 0.15rem;
	    font-size: 0.12rem;
	  }
	}
	div.demander-story{
	  padding: 0.15rem;
	  font-size: 0.13999999999999999rem;
	}
	.big-box img {
	  width: 100%;
	  height: 100%;
	  padding: 0.15rem;
	}
</style>