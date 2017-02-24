<template>
<poverty-mask :loading="loading"></poverty-mask>
<header><span class="pull-left" @click="getback()">返回</span>我的受捐</header>

<article data-page="personal-receiver-mydonation" >
    <ul class="menu" v-if="false">
        <li :class="{'active':showNow=='goods'}" @click="showGoods"><p>物资</p></li>
        <li :class="{'active':showNow=='money'}" @click="showMoney" ><p>善款</p></li>
    </ul>
    <div class="listbox-goods" v-if="showNow=='goods'">
        <ul class="list-unstyled timeline">
	        <template v-for="item in myHelpList">
	            <li class="item" v-if="item.loveStatus==1">
	                <img v-bind:src="item.picurl" alt="">
	                <h1>{{item.itemsName}}</h1>
	                <h2>等待对方发货</h2>
	                <div class="btnGroup">
	                    <button class="btn btn-default myNeed btn-xs" v-if="false" @click="toDetail(item.loveNo)">我的需求</button>           
	                </div>
	            </li>
	            <li class="item" v-if="item.loveStatus==2">
	                <img v-bind:src="item.picurl" alt="">
	                <h1>{{item.itemsName}}</h1>
	                <h2>等待收货</h2>
	                <div class="btnGroup">
	                    <button class="btn btn-default myNeed btn-xs" v-if="false" @click="toDetail(item.loveNo)">我的需求</button>
	                    <button class="btn btn-default confirmLog btn-xs" @click="confirmRecieve(item.loveNo)">确认收货</button> 
	                    <button class="btn btn-default searchLog btn-xs" @click="searchLogistics(item.loveNo,item.id)">查看物流</button>             
	                </div>
	            </li>
	            <li class="item" v-if="item.loveStatus==3">
	                <img v-bind:src="item.picurl" alt="">
	                <h1>{{item.itemsName}}</h1>
	                <h2 class="donation-success">捐赠成功</h2>
	                <div class="btnGroup">
	                    <button class="btn btn-default myNeed btn-xs" v-if="false" @click="toDetail(item.loveNo)">我的需求</button>
	                    <!-- <button class="btn btn-default showGreeting btn-xs">表达感谢</button> -->              
	                </div>
	            </li>
	            <li class="item" v-if="item.loveStatus==4">
	                <img v-bind:src="item.picurl" alt="">
	                <h1>{{item.itemsName}}</h1>
	                <h2 class="donation-done">捐赠关闭</h2>
	                <div class="btnGroup">
	                    <button class="btn btn-default myNeed btn-xs" v-if="false"  @click="toDetail(item.loveNo)">我的需求</button>         
	                </div>
	            </li>

	        </template>
	        <li class="item nolist" v-if="myHelpList.length==0">
	        	<img src="../img/noList.png" alt="" style="width:152px;height:141px">
	        	<p>您还没有相关条目</p>
	        </li>
        </ul>
        <!-- <infinite-loading :on-infinite="onInfinite" v-if="isLoadedAllData"></infinite-loading> -->
    </div>
    <div class="listbox-money" v-if="showNow=='money'" id="moneyList">
        <ul class="list-unstyled timeline" >
            <li class="item" v-for="item in myMoneyList">
                <h1>￥<span>{{item.getMoney}}</span></h1>
                <h2>完成{{parseFloat(item.moneyCount*100/item.getMoney).toFixed(2)}}%</h2>
                <h3>
                    <span>目标筹集 <em>￥{{item.getMoney}}/</em><small>已筹集<em>￥{{item.moneyCount}}</em></small></span>                  
                </h3>
                <h4>剩余 {{item.remainTime}}天</h4>
            </li>
            <li class="item nolist" v-if="myMoneyList.length==0">
            	<img src="../img/noList.png" alt="">
            	<p>您还没有相关条目2</p>
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
				myHelpList : [],
				myMoneyList : [],
				loading:false,
				pageNum : 1,
				isLoadedAllData : true,
				showNow : 'goods'
			}
			
		},
		methods : {
			/*onInfinite : function(){
		      this.pageNum++;
		      this.getGoodsList();
		    },*/
		    getback : function(){
		    	window.history.back();
		    },
			toDetail : function(loveNo){
				//location.href = "./donateDetail.html?loveNum="+loveNo;
			},
			searchLogistics : function(loveNo,id){
				//location.href = "./orders-goods-demander.html?loveNo="+loveNo+"&id="+id;
				this.$router.go({
					name:'demander_see_logistics',
					params : {
						loveNo : loveNo
					}
				})
			},
			confirmRecieve : function(loveNo){
				/*location.href = "./feedback.html?loveNo="+loveNo;*/
				this.$router.go({
					name : 'feedback',
					params : {
						loveNo : loveNo
					}
				})
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
				        marked : "myHelpList",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
				    that.myHelpList = that.myHelpList.concat(response.data.myHelpList);
				    that.$broadcast('$InfiniteLoading:loaded');

				}, (response) => {
					that.$broadcast('$InfiniteLoading:loaded');

				});
			},
			getMoneyList : function(){
				var jsonStr = {
					userId : localStorage.getItem('userId'),
					pageNow : this.pageNum,
					sort : "",
					pageCount : '30'
				};
				var that = this;

				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "myMoneyList",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
				    that.myMoneyList = that.myMoneyList.concat(response.data.myMoneyList);
				    that.$broadcast('$InfiniteLoading:loaded');

				}, (response) => {
					that.$broadcast('$InfiniteLoading:loaded');

				});
			},
			showGoods : function(){
				this.showNow = 'goods';
			},
			showMoney : function(){
				this.showNow = 'money';
			}
		},
		components : {povertyMask,InfiniteLoading},
		created : function(){
			this.getGoodsList();
			this.getMoneyList();
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
	.nolist{
			text-align: center;
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
	        font-size: 0.11000000000000001rem;

	        em {
	          font-size: 0.11000000000000001rem;
	          color: #e84d3c
	        }
	      }
	    }
	    h4 {
	      position: absolute;
	      bottom: 0.18rem;
	      left: 0.15rem;
	      font-size: 0.13999999999999999rem;
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