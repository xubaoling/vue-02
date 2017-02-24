<template>
	<footer>
	    <div class="push" v-if="userType==1">
	        <div class="push-box" v-link="{'name':'publishOffer'}">
	            <span class="fa fa-plus"></span>
	        </div>
	        <p>发布</p>
	    </div>
	    <div class="push" v-if="userType==2" @click="showShadow=true">
	        <div class="push-box" >
	            <span class="fa fa-plus"></span>
	        </div>
	        <p>发布</p>
	    </div>
	    <ul class="footer-inline">
	        <li class="bottom-menu needMarkets" v-link="{ path: '/index/need', activeClass: 'active'}" @click="page2Now('need')">
	            <div class="menu-line"></div>
	            <span class="fa fa-file-text-o"></span>

	            <p>我需帮助</p>
	        </li>
	       <!-- <li class="bottom-menu donationShop" :class="{'active':pageNow=='donate'}" @click="page2Now('donate')">
	            <div class="menu-line"></div>
	            <span class="fa fa-shopping-bag"></span>

	            <p>捐赠市场</p>
	        </li>-->
	        <li class="bottom-menu donationShop" v-link="{ path: '/index/donate', activeClass: 'active'}" @click="page2Now('donate')">
	            <div class="menu-line"></div>
	            <span class="fa fa-shopping-bag"></span>

	            <p>捐赠市场</p>
	        </li>
	       
	        <!-- <li class="bottom-menu consumption" v-if="userType==1" v-link="{name : 'undeveloped'}"> -->
	        <li class="bottom-menu consumption" v-link="{activeClass: 'active'}" v-if="userType==1" @click="toOutLink">
	            <div class="menu-line"></div>
	            <span class="fa fa-shopping-cart"></span>

	            <p>消费扶贫</p>
	        </li>
	        <li class="bottom-menu consumption" v-if="userType==2" v-link="{ path: '/index/yulu', activeClass: 'active'}" @click="page2Now('yulu')">
	            <div class="menu-line"></div>
	            <span class="fa fa-shopping-cart"></span>

	            <p>扶贫补助</p>
	        </li>
	        <li class="bottom-menu personalCenter" v-link="{ path: '/index/personal', activeClass: 'active'}" @click="page2Now('personal')">
	            <div class="menu-line"></div>
	            <span class="fa fa-user"></span>

	            <p>个人中心</p>
	        </li>
	    </ul>
	</footer>
	<div class="publish" v-if="showShadow">
	    <div class="menu-box center-text">
	        <div class="row">
	           <!--  <div class="col-xs-4 " v-link="{'name':'publishMoney'}">
	                <a href="javascript:;" disabled>
	                    <span class="fa fa-rmb"></span>
	                    <p>我要钱</p>
	                </a>
	            </div> -->
	            <div class="col-xs-6" v-link="{'name':'publishGoods'}">
	                <a href="javascript:;">
	                    <span class="fa fa-cube"></span>

	                    <p>我要物</p>
	                </a>
	            </div>
	            <div class="col-xs-6 cancel" @click="showShadow=false">
	                <span class="fa fa-close"></span>

	                <p>取消</p>
	            </div>
	        </div>
	    </div>
	</div>
</template>
<script>
export default {
	data (){
		return {
			userType:localStorage.getItem('userType'),
			showShadow : false,
			//pageNow : 'need'
		}
	},
	methods : {
		toOutLink : function(){
			//this.pageNow = 'tooutlink';
			window.location.href = "https://wap.koudaitong.com/v2/feature/i6nhepmp"
		},
		page2Now : function(pageName){
			return;
			this.pageNow = pageName;
			this.$router.go({
				name : pageName
			})
		}
	}
}
</script>
<style lang="less" scoped>
@import '../assets/common.less';

.footer-inline li.active  {
	background-color: @footer-bg-hover;
	color: #fff;
	.menu-line {
	  background-color: @footer-bg-hover;
	}
}
</style>