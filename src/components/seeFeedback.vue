<template>
<poverty-mask :loading="loading"></poverty-mask>
	<header><span class="pull-left" v-link="{name:'myDonation_donator'}">返回</span>捐赠信息</header>

	<article data-page="donation-Info-Check" id="donationDetail">
	    <div class="big-box wordstopoor">
	        <p>
	        受捐人：{{recipientName}}
	        </p>
	        <p>
	            <span>{{thanksTime}}</span>
	        </p>
	    </div>
	    <div class="ln_solid"></div>
	    <div class="blank_5"></div>
	    <div class="ln_solid"></div>
	    <div class="big-box goods-show">
	        <h2>{{thanksContent}}</h2>
	        <img v-bind:src="picUrl" id="pic0">
	    </div>
	    <div class="ln_solid"></div>


	</article>
</template>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';

	export default {
		data () {
			return {
				loveNo : "",
				recipientId: "",
				thanksTime: "",
				picUrl: "",
				recipientName:"",
				thanksContent : "",
				loading:false
			}
		},
		components : {povertyMask},
		methods : {

		},
		created : function(){
			this.loveNo = this.$route.params.loveNo;
			var that = this;

			var jsonStr = {
				loveNo : this.loveNo
			};

			this.$http.jsonp(Util.url,{
			    params : {
			        marked : "checkThanksRecord",
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
	.big-box img {
	  width: 100%;
	  height: 100%;
	  padding: 0.15rem;
	}

	.wordstopoor p:first-child {
	  padding: 0.1rem 0.15rem;
	  line-height: 0.22rem;
	  font-size: 0.15rem;
	}
	.wordstopoor p:last-child {
	  padding: 0rem 0.15rem 0.06rem 0.15rem;
	  font-size: 0.12rem;
	  span {
	    color: @list-box-text-2;
	  }
	  small span {
	    color: @list-box-text-3;
	  }
	  small span:first-child {
	    margin-right: 0.1rem;
	  }
	}

	.goods-show {
	  padding-top: 0.2rem;
	  h2 {
	    padding: 0 0.15rem;
	    line-height: 0.15rem;
	    font-size: 0.15rem;
	  }
	}

</style>