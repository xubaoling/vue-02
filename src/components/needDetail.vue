<template>
	<poverty-mask :loading="loading"></poverty-mask>
	<!-- <header><span class="pull-left" v-link="{name:'need'}">返回</span>捐赠信息</header> -->
	<header><span class="pull-left" @click="getback">返回</span>捐赠信息</header>
	<article data-page="needDetail-Money">
	    <!-- <div class="ln_solid"></div>
	    <div class="big-box container" v-if="itemType=='2'">
	        <h1>￥{{getMoney}}&nbsp/&nbsp<small>已筹集<span>￥{{moneyCount}}</span></small></h1>
	        <h2>金钱</h2>
	        <h3><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp宁夏 石嘴山</h3>
	        <h4><span>5</span>人捐款 | 剩余59天23小时</h4>
	        <h4><span>已审核</span></h4>
	        <h4><span>5</span>人捐款 | <span>捐款成功</span></h4>
	    </div>
	    <div class="big-box goods_category" v-if="itemType=='1'">
	        <div>
	            <h1>{{itemsName}}</h1>
	            <a>{{itName}}</a>
	        </div>
	        <div>
	            <h3><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp{{caption}}</h3>
	            <h4>{{publishTime}}</h4>
	        </div>
	    </div>
	    
	    
	    <div class="ln_solid"></div>
	    <div class="bigbox demander-story">
	        {{itemsDesc}}
	    </div>
	    <div class="ln_solid"></div>
	    <div class="big-box goods-show">
	        <h2 style="padding:15px 0px 0px 15px;font-size:14px">{{reason}}</h2>
	        <img v-bind:src="homePicUrl">
	    </div>
	    <div class="ln_solid"></div> -->
	    <div class="title_m">
	    	<span class="glyphicon glyphicon-list-alt"></span>
	    	<small>基本信息</small>
	    </div>
	    <div class="row_m">
	    	<span>姓&nbsp&nbsp&nbsp&nbsp名：</span>
	    	<small>{{userName}}</small>
	    </div>
	    <div class="ln_solid"></div>
	    <div class="row_m">
	    	<span>性&nbsp&nbsp&nbsp&nbsp别：</span>
	    	<small>{{bstGender=='1'?'男':'女'}}</small>
	    </div>
	    <div class="ln_solid"></div>
	    <div class="row_m">
	    	<span>年&nbsp&nbsp&nbsp&nbsp龄：</span>
	    	<small>{{age}}岁</small>
	    </div>
	    <div class="ln_solid"></div>
	    <div class="row_m">
	    	<span>家庭地址：</span>
	    	<small>{{bstUserAddress}}</small>
	    </div>
	    <template v-if="this.itemType==1">
	    	<div class="ln_solid"></div>
	    	<div class="row_m">
	    		<span>邮寄地址：</span>
	    		<small>{{bstMailAddress}}</small>
	    	</div>
	    </template>
	    
	    <div class="ln_solid"></div>
	    <div class="row_m">
	    	<span>贫困等级：</span>
	    	<small>{{userlevel=="0"?"国家级建档立卡贫困户":"普通困难户"}}</small>
	    </div>
	    <div class="ln_solid"></div>
	    <div class="row_m">
	    	<span>物品类别：</span>
	    	<small>{{itName}}</small>
	    </div>
	    <template v-if="this.itemType==1">
	    	<div class="ln_solid"></div>
	    	<div class="row_m" v-if="this.itemType==1">
	    		<span>物品名称：</span>
	    		<small>{{itemsName}}</small>
	    	</div>
	    </template>
	    
	    <div class="ln_solid"></div>
	    <div class="row_m">
	    	<span>发布时间：</span>
	    	<small>{{publishTime}}</small>
	    </div>
	    <div class="ln_solid"></div>
	    <div class="row_m">
	    	<span>申请原因：</span>
	    	<small>{{reason}}</small>
	    </div>
	    <div class="ln_solid"></div>
	    <div class="title_m title_change">
	    	<span class="glyphicon glyphicon-list-alt"></span>
	    	<small>需求详情</small>
	    </div>
	    <div class="desc_m">

	    	<small>{{itemsDesc}}</small>
	    	<img :src="homePicUrl" alt="">
	    </div>
	    <div class="ln_solid"></div>
	    <div class="big-box" v-if="false">
	        <div class="container">
	            <h1><small>￥</small>3000</h1>
	            <h2>已筹集￥1000</h2>
	            <h3><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>匿名用户</h3>
	            <h4>2016-04-21 08:53:39</h4>
	        </div>
	    </div>
	</article>
	<!-- <footer class="donation-Info" style="display: none">
	    <span>申请（3）</span>
	    <span class="pull-right">
	        <span class="fa fa-edit"><p>编辑</p></span>
	        <span class="fa fa-trash-o"><p>删除</p></span>
	    </span>
	</footer> -->
	<footer class="donation-Info-Apply" v-if="userType==1">
	    <span class="pull-left">
	        <span class="fa fa-share-square-o" v-if="false"><p>分享</p></span>
	        <span class="fa fa-star" v-if="alreadyCollect==true" @click="cancelCollect"><p>已收藏</p></span>
	        <span class="fa fa-star-o" v-if="alreadyCollect==false" @click="toCollect"><p>收藏</p></span>
	    </span>
	    <button class="pull-right inline-box" @click="toDonate" v-if="applyStatus==0">捐赠</button>
	</footer>
	<footer class="donation-Info-Apply" v-if="userType==2">
	    <span class="pull-left">
	        <span class="fa fa-share-square-o" v-if="false"><p>分享</p></span>
	        <span class="fa fa-star" v-if="alreadyCollect==true" @click="cancelCollect"><p>已收藏</p></span>
	        <span class="fa fa-star-o" v-if="alreadyCollect==false" @click="toCollect"><p>收藏</p></span>
	    </span>
	</footer>
</template>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';

	export default {
		data () {
			return {
				itemId: "",
				itemType: "", //钱还是物  这两个是从上级页面传过来的参数，后面的是回传的
				userType : localStorage.getItem('userType'),
				id: "",
				userId: "", //发布需求人的ID,不是当前用户的
				userName: "",
				age: "",
				bstGender: "", //性别
				reason: "",
				publishTime: "",
				homePicUrl: "",
				getMoney: "",
				moneyCount: "",
				donateCount: "",
				daysRemaining: "",
				auditstatus: "",
				itemsName: "",
				itemsDesc: "",
				applyStatus: "",
				itName: "",
				bstUserAddress: "",
				bstMailAddress: "",
				userlevel : "",
				caption : "",
				alreadyCollect : false,
				loading:false
			}
		},
		computed : {
			type : function(){
				return this.itemType == 'goods' ? 1 : 2;
			}
		},
		components : {povertyMask},
		methods: {
			toDonate : function(){
				if(this.itemType=="1"){
					this.$router.go({name:'donationInfo',params:{pmId:this.itemId}})
				}else{
					this.$router.go({
						name : 'donationInfo_money',
						params:{pmId:this.itemId}
					})
				}
				
			},
			getback : function(){
				window.history.back();
			},
			getModel : function(){
				var that = this;
				var jsonStr = {
					type: this.itemType,
					id: this.itemId
				};
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "helpDetail",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
				    for (let _it in response.data) {
						that[_it] = response.data[_it];
					}

					this.getCollectStatus()
				}, (response) => {

				});
			},
			getCollectStatus : function(){		//获取是否已经收藏的状态
				var that = this;
				var jsonStr = {
					userId : localStorage.getItem('userId'),
					phId : this.itemId,
					dlId : "0",
					loveNo : "",
					type :this.type
				};

				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "reserveCheck",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
				    if(response.data.flag=="1")
					{
						that.alreadyCollect = true;
					}else{
						that.alreadyCollect = false;
					}
				}, (response) => {

				});
			},
			toCollect : function(){				//添加到收藏
				var that = this;
				var jsonStr = {
					userId : localStorage.getItem('userId'),
					phId : this.itemId,
					dlId : "0",
					loveNo : "",
					type :this.type
				};

				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "reserveAdd",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					this.getCollectStatus();
				}, (response) => {

				});

			},
			cancelCollect : function(){		//取消收藏
				var that = this;
				var jsonStr = {
					id : "",
					userId : localStorage.getItem('userId'),
					phId : this.itemId,
					dlId : "0",
					type :this.type
				};
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "reserveDel",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					this.getCollectStatus();
				}, (response) => {

				});

				this.getCollectStatus();
			}
		},
		created: function() {
			this.itemType = this.$route.params.type;
			this.itemId = this.$route.params.id;

			this.getModel();
		}
	}
</script>
<style lang="less" scoped>
	@import "../assets/common_in.less";
	.ln_solid{
		width: 100%;
		height: 0rem;
		border-top: 0.01rem solid #ddd;
	}

	div.title_m{
		padding: 0.12rem 0.12rem 0.06rem 0.12rem;
		color: #d9534e;

		span{
			font-size: 0.16rem;
		}
		small{
			font-size: 0.16rem;
		}
		
	}
	div.row_m{
		padding: 0.06rem 0.12rem;
		font-size: 0.16rem;

		span{
			font-family: "黑体";
			margin-right: 0.1rem;
		}

		small{
			font-size: 0.13999999999999999rem;
			color: #999;
		}
	}

	div.desc_m{
		padding: 0.06rem 0.12rem;
		
		small{
			font-size: 0.16rem;
			font-family: '黑体';
		}
		img{
			margin-top: 0.12rem;
			width: 100%;
		}
	}


	/* div.container{
	      width:100%;
	      height: 80px;
	      padding:15px;
	      text-align:left;
	      position: relative;
	
	      h1{
	        font-size: 1.6rem;
	        small{
	          font-size:1.1rem;
	      color:#5d554f;
	          span{
	            color:red;
	          }
	        }
	      }
	      h2{
	        position: absolute;
	        right: 15px;
	        top: 15px;
	        font-size: 1.2rem;
	        color: @list-box-text-3;
	      }
	      p{
	        position: absolute;
	        font-size: 1.4rem;
	        left: 15px;
	        top:45px;
	      }
	      h3{
	        font-size: 1.2rem;
	        position: absolute;
	        color:@list-box-text-2;
	        top: 50px;
	        left: 15px;
	      }
	      h4{
	        font-size:1.2rem;
	        position: absolute;
	        top: 50px;
	        right: 15px;
	        span{
	          color: red;
	        }
	      }
	    }
	    div.goods_category{
	      position: relative;
	      height: 80px;
	      padding: 15px;
	      h1{
	        position: absolute;
	        left: 15px;
	        top: 15px;
	        font-size: 1.4rem;
	      }
	      a{
	        position: absolute;
	        right: 15px;
	        top: 15px;
	        font-size: 1.4rem;
	        line-height: 1.4rem;
	      }
	      h3{
	        position: absolute;
	        left: 15px;
	        bottom: 15px;
	        font-size: 1.2rem;
	        color: @list-box-text-2;
	      }
	      h4{
	        position: absolute;
	        right: 15px;
	        bottom: 15px;
	        font-size: 1.2rem;
	      }
	    }
	    div.demander-story{
	      padding: 15px;
	      font-size: 1.4rem;
	    }
	    .big-box img {
	      width: 100%;
	      height: 100%;
	      padding: 15px;
	    } */
</style>