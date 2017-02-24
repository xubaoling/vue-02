<template>
	<poverty-mask :loading="loading"></poverty-mask>
	<header><span class="pull-left" v-link="{name : 'personal'}">返回</span>我的申请</header>

	<article data-page="personal-receiver-mydonation" >
	    <ul class="menu" v-if="false">
	        <li class="active"><p>物资</p></li>
	        <li><p>善款</p></li>
	    </ul>
	    <div class="listbox-goods" id="goodsList">
	        <ul class="list-unstyled timeline">
	        <template v-for="item in applyList">
	            <li class="item" v-if="item.applyStatus==0"> <!-- 申请中 -->
	                <img v-bind:src="item.picurl" alt="">
	                <h1>{{item.itemsName}}</h1>
	                <h2>申请中</h2>
	                <div class="btnGroup">
	                    <button class="btn btn-default myNeed btn-xs" v-if="false" @click="toDetail(item.id)">申请详情</button>   
	                    <button class="btn btn-default myNeed btn-xs" @click="cancelApply(item.id)">取消申请</button>           
	                </div>
	            </li>
	            <li class="item" v-if="item.applyStatus==1"><!-- 通过 -->
	                <img v-bind:src="item.picurl" alt="">
	                <h1>{{item.itemsName}}</h1>
	                <h2>申请成功</h2>
	                <div class="btnGroup">
	                    <button class="btn btn-default myNeed btn-xs" v-if="false" @click="toDetail(item.id)">申请详情</button>
	                    <span>{{item.itemsDesc}}</span>
	                    <!-- <button class="btn btn-default confirmLog btn-xs" @click="confirmRecieve(item.loveNo)">确认收货</button> 
	                                <button class="btn btn-default searchLog btn-xs" @click="searchLogistics(item.loveNo,item.id)">查看物流</button>  -->            
	                </div>
	            </li>
	            <li class="item" v-if="item.applyStatus==2"> <!-- 未通过 -->
	                <img v-bind:src="item.picurl" alt="">
	                <h1>{{item.itemsName}}</h1>
	                <h2 class="donation-success">申请失败</h2>
	                <div class="btnGroup">
	                    <button class="btn btn-default myNeed btn-xs" v-if="false" @click="toDetail(item.id)">我的需求</button>
	                    <!-- <button class="btn btn-default showGreeting btn-xs">表达感谢</button> -->              
	                </div>
	            </li>
	            <li class="item" v-if="item.loveStatus==4">
	                <img v-bind:src="item.picurl" alt="">
	                <h1>{{item.itemsName}}</h1>
	                <h2 class="donation-done">捐赠关闭</h2>
	                <div class="btnGroup">
	                    <button class="btn btn-default myNeed btn-xs" @click="toDetail(item.phid)">我的需求</button>         
	                </div>
	            </li>
	            <li class="blank_5"></li>
	        </template>
	        </ul>
	        <infinite-loading :on-infinite="onInfinite" v-if="isLoadedAllData"></infinite-loading>
	    </div>
	    <div class="listbox-money" style="display:none" id="moneyList">
	        <ul class="list-unstyled timeline" style="display:none">
	            <li class="item">
	                <h1>￥<span>200</span></h1>
	                <h2>完成37%</h2>
	                <h3>
	                    <span>目标筹集 <em>￥3000/</em><small>已筹集<em>￥1000</em></small></span>                  
	                </h3>
	                <h4>剩余 2天18小时46分</h4>
	            </li>
	        </ul>
	    </div>
	</article>
</template>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';
	import InfiniteLoading from 'vue-infinite-loading';

	export default {
		data () {
			return {
				applyList : [],
				pageNum : 1,
				loading:false,
				isLoadedAllData : true
			}
		},
		methods : {
			onInfinite : function(){
				this.pageNum++;
				this.getGoodsList();
			},
			toDetail : function(phId){
				
			},
			getGoodsList : function(){			
				var jsonStr = {
					userId : localStorage.getItem('userId'),
					pageNow : this.pageNum,
					sort : "",
					pageCount : '30'
				};
				var that = this;
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "applyList",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					if(response.data.rspCode=="000")
					{
						if(response.data.applyList){
							that.applyList = that.applyList.concat(response.data.applyList);
						}
					}else{
						window.toast.h5Toast(response.data.rspDesc);
					}

					that.$broadcast('$InfiniteLoading:loaded');

				}, (response) => {
					that.$broadcast('$InfiniteLoading:loaded');
				});

			},
			cancelApply : function(id){
				var jsonStr = {
					ahId : id
				};
				var that = this;
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "applyHelpDel",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					if(response.data.rspCode=="000")
					{
						if(window.toast)
						{
							window.toast.h5Toast('取消成功');
						}else {
							alert("取消成功");
						}
						that.getGoodsList();

					}else{
						if(window.toast)
						{
							window.toast.h5Toast('取消失败'+response.data.rspDesc);
						}else {
							alert("取消失败"+response.data.rspDesc);
						}
					}

				}, (response) => {

				});
			}
		},
		components : {povertyMask,InfiniteLoading},
		created : function(){
			this.getGoodsList();
		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/common_in.less';
	ul.menu {
	  height: 0.45rem;
	  background-color: #f7f7f7;
	  font-size: 0.15rem;

	  li {
	    width: 50%;
	    height: 0.45rem;
	    float: left;
	    text-align: center;
	    border-bottom: 0.01rem solid #e6e9ed;

	    p {
	      line-height: 0.33rem;
	      vertical-align: bottom;
	      margin-top: 0.06rem;
	    }
	  }
	  li:first-child {
	    p {
	      border-right: 0.01rem solid #e6e9ed;
	    }
	  }
	  li.active {
	    border-bottom: 0.01rem solid #26ba9b;
	    color: #26ba9b;
	  }
	}

	div.listbox-goods {
	  li.item {
	    padding: 0.18rem 0.15rem;
	    position: relative;

	    img {
	      width: 0.8rem;
	      height: 0.8rem;
	    }
	    h1 {
	      position: absolute;
	      top: 0.18rem;
	      left: 1.1rem;
	      font-size: 0.16rem;
	      line-height: 0.32rem;
	    }
	    h2 {
	      position: absolute;
	      top: 0.18rem;
	      right: 0.15rem;
	      font-size: 0.13rem;
	      line-height: 0.32rem;
	      color: #e84d3c;
	    }
	    h2.donation-success, h2.donation-done {
	      color: rgb(85, 85, 85);
	    }
	    input {
	      margin-bottom: 0;
	    }
	    div.btnGroup {
	      position: absolute;
	      left: 1.1rem;
	      right: 0.15rem;
	      bottom: 0.18rem;


	      button {
	        margin: 0;
	      }
	      button.sendGoods {
	        float: right;
	      }
	      button.donateCancel {
	        float: right;
	        margin-right: 0.05rem;
	      }
	      button.searchLog {
	        float: right;
	      }

	      button.confirmLog {
	        float: right;
	      }
	      button.searchLog {
	        float: right;
	        margin-right: 0.05rem;
	      }
	      button.showGreeting {
	        float: right;
	      }
	    }
	  }
	}

	div.listbox-money {
	  li.item {
	    padding: 0.18rem 0.15rem;
	    position: relative;
	    height: 1.2rem;

	    h1 {
	      font-size: 0.12rem;
	      span {
	        font-size: 0.24rem
	      }
	    }
	    h2 {
	      position: absolute;
	      top: 0.18rem;
	      right: 0.15rem;
	      font-size: 0.13rem;
	      line-height: 0.32rem;
	      color: #e84d3c;
	    }
	    h3 {
	      position: absolute;
	      top: 0.5rem;
	      left: 0.15rem;
	      font-size: 0.15rem;
	      em {
	        font-size: 0.16rem;
	      }
	      small {
	        font-size: 0.11rem;

	        em {
	          font-size: 0.11rem;
	          color: #e84d3c
	        }
	      }
	    }
	    h4 {
	      position: absolute;
	      bottom: 0.18rem;
	      left: 0.15rem;
	      font-size: 0.14rem;
	    }
	    button {
	      position: absolute;
	      right: 0.15rem;
	      bottom: 0.18rem;
	      margin: 0;
	    }
	  }
	}


</style>