<template>
	<div class="listbox-goods" id="my_money">
	    <ul class="list-unstyled timeline">
	    <template v-if="userType==1">
	    	<!--捐赠者-->
	        <li class="item" v-for="item in reserveMoneyList">

	            <h1 class="mat1">目标筹集 ￥{{item.getMoney}}/已筹集￥{{item.moneyCount}}</h1>
	            <h2>{{parseFloat(item.moneyCount*100/item.getMoney).toFixed(2)}}%</h2>
	            <p class="mat2">{{item.reason}}</p>
	            <span class="mat3">{{item.captionName}}</span>

	            <!-- <span class="rightspan1">剩余30天</span><span class="rightspan2">2小时</span> -->
	            <span class="rightspan2">开始时间{{item.beginTime}}</span>
	            <div class="btnGroup">
	                <button class="btn btn-default donateCancel btn-sm" @click="cancelCollect(item.id,item.phId)">取消收藏</button>
	                <button class="btn btn-default  sendGoods btn-sm" @click="goDonate(item.phId)">捐助他</button>
	                <button class="btn btn-default  sendGoods btn-sm" v-if="false">分享</button>
	            </div>
	        </li>
	        <li class="item nolist" v-if="reserveMoneyList.length==0">
	        	<img src="../img/noList.png" alt="" style="width:152px;height:141px">
	        	<p>您还没有相关条目</p>
	        </li>
	    </template>
	    <template v-if="userType==2">
	    	<!--需求者-->
	    	<li class="item" v-for="item in reserveMoneyList">
	    	    <h1 class="mat1">目标筹集 ￥{{item.getMoney}}/已筹集￥{{item.moneyCount}}</h1>
	    	    <h2>{{parseFloat(item.moneyCount*100/item.getMoney).toFixed(2)}}%</h2>
	    	    <p class="mat2">{{item.reason}}</p>
	    	    <span class="mat3">{{item.captionName}}</span>

	    	    <!-- <span class="rightspan1">剩余30天</span><span class="rightspan2">2小时</span> -->
	    	    <span class="rightspan2">开始时间{{item.beginTime}}</span>
	    	    <div class="btnGroup">

	    	        <button class="btn btn-default donateCancel btn-sm" @click="cancelCollect(item.id,item.phId)">取消收藏</button>
	    	        <!-- <button class="btn btn-default  sendGoods btn-sm">捐助他</button> -->
	    	        <button class="btn btn-default  sendGoods btn-sm" v-if="false">分享</button>

	    	    </div>
	    	</li>
	    	<li class="item nolist" v-if="reserveMoneyList.length==0">
	    		<img src="../img/noList.png" alt="" style="width:152px;height:141px">
	    		<p>您还没有相关条目</p>
	    	</li>
	    </template>
	    <li class="item nolist" v-if="reserveMoneyList.length==0">
	      <img src="../img/noList.png" alt="" style="width:152px;height:141px">
	      <div>您还没有相关条目</div>
	    </li>
	    <li class="blank_5"></li>
	    </ul>
	</div>
</template>
<script>
	import Util from '../assets/util.js';

	export default {
		data(){
			return {
				userType: localStorage.getItem('userType'),
				reserveMoneyList:[]
			}
			
		},
		methods:{
			getList : function(){
				var jsonStr = {
					userId : localStorage.getItem('userId'),
					type : "2",
					pageNow : "1",
					pageCount: "30"
				};

				var that = this;

				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "reserveMoneyList",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
				    that.reserveMoneyList = response.data.reserveMoneyList;

				}, (response) => {

				});
			},
			cancelCollect : function(id,phId){
				var jsonStr = {
					id : id,
					phId:phId,
					dlId:"0",
					userId:localStorage.getItem('userId'),
					type :"1"
				};

				var that = this;

				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "reserveDel",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
				    if(response.data.rspCode=="000")
					{
						if(window.toast)
						{
							window.toast.h5Toast("取消成功");
						}else{
							alert("取消成功");
						}
					}else{
						if(window.toast)
						{
							window.toast.h5Toast("取消失败");
						}else{
							alert("取消失败");
						}
					}
					
					that.getList();

				}, (response) => {

				});
			},
			goDonate : function(phId){
				this.$router.go({
					name:'needDetail',
					params : {
						type:2,
						id: phId
					}
				})
			}
		},
		created:function(){
			this.getList();
		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/common_in.less';
		.nolist{
			text-align: center;
		}

		div.listbox-goods{
		  li.item2 {
		    padding: 0.18rem 0.15rem;
		    position: relative;

		    h1 {
		      position: absolute;
		      top: 0.18rem;
		      left: 1.03rem;
		      font-size: 0.16rem;
		      line-height: 0.32rem;
		    }

		    #applyDetail{
		      position: absolute;
		      right: 0.18rem;
		    }

		    .mat0 {
		      position: absolute;
		      top: 0.18rem;
		      left: 0.75rem;
		      font-size: 0.16rem;
		      line-height: 0.32rem;
		    }
		    .mat1 {
		      position: absolute;
		      top: 0.18rem;
		      left: 0.15rem;
		      font-size: 0.16rem;
		      line-height: 0.32rem;
		    }
		    .mat2 {
		      position: absolute;
		      top: 0.46rem;
		      left: 0.15rem;
		      font-size: 0.13rem;
		      line-height: 0.26rem;
		      color: #5d554f;
		    }
		    /* .mat3 {
		      position: absolute;
		      top: 0.72rem;
		      left: 0.15rem;
		      font-size: 0.12rem;
		      line-height: 0.24rem;
		      color: #3599db;
		    } */
		    .mat3 {
		      display: block;
		      margin-top: 0.5rem;
		      font-size: 0.12rem;
		      line-height: 0.24rem;
		      color: #3599db;
		    }

		    /* p {
		      position: absolute;
		      top: 0.46rem;
		      left: 1.03rem;
		      font-size: 0.13rem;
		      line-height: 0.26rem;
		      color: #5d554f;
		    }
		    .leftspan {
		      position: absolute;
		      top: 0.72rem;
		      left: 1.03rem;
		      font-size: 0.12rem;
		      line-height: 0.24rem;
		      color: #3599db;
		    } */
		    .rightspan1 {
		      position: absolute;
		      top: 0.72rem;
		      right: 0.68rem;
		      font-size: 0.12rem;
		      line-height: 0.24rem;
		      color: #5d554f;
		    }
		    .rightspan2 {
		      /* position: absolute;
		      top: 0.72rem;
		      right: 0.15rem; */
		      display: block;

		      font-size: 0.12rem;
		      line-height: 0.24rem;
		      color: #5d554f;
		    }
		  }
		  li.item{
		    padding: 0.18rem 0.15rem;
		    position: relative;
		    height: 1.7rem;

		    img{
		      width: 0.8rem;
		      height: 0.8rem;
		    }
		    h1{
		      position: absolute;
		      top: 0.18rem;
		      left: 1.03rem;
		      font-size: 0.16rem;
		      line-height: 0.32rem;
		    }
		    h2{
		      position: absolute;
		      top: 0.18rem;
		      right: 0.15rem;
		      font-size: 0.13rem;
		      line-height: 0.32rem;
		      color: #e84d3c;
		    }
		    .mat1{
		      position: absolute;
		      top: 0.18rem;
		      left: 0.15rem;
		      font-size: 0.16rem;
		      line-height: 0.32rem;
		    }
		    .mat2{
		      position: absolute;
		      top:0.46rem;
		      left: 0.15rem;
		      font-size:0.13rem;
		      line-height:0.26rem;
		      color: #5d554f;
		    }
		    .mat3{
		      position: absolute;
		      top: 0.72rem;
		      left: 0.15rem;
		      font-size:0.12rem;
		      line-height: 0.24rem;
		      color: #3599db;
		    }
		   p{
		     position: absolute;
		     top:0.46rem;
		     left: 1.03rem;
		     font-size:0.13rem;
		     line-height:0.26rem;
		     color: #5d554f;
		   }
		    .leftspan{
		      position: absolute;
		      top: 0.72rem;
		      left: 1.03rem;
		      font-size:0.12rem;
		      line-height: 0.24rem;
		      color: #3599db;
		    }
		    .rightspan1{
		      position: absolute;
		      top: 0.72rem;
		      right:0.68rem;
		      font-size:0.12rem;
		      line-height: 0.24rem;
		      color: #5d554f;
		    }
		    .rightspan6{
		      position: absolute;
		      top: 0.72rem;
		      right:0.86rem;
		      font-size:0.12rem;
		      line-height: 0.24rem;
		      color: #5d554f;
		    }
		    .rightspan3{
		      position: absolute;
		      top: 0.72rem;
		      right:0.7rem;
		      font-size:0.12rem;
		      line-height: 0.24rem;
		      color: #5d554f;
		    } 
		    .rightspan4{
		        position: absolute;
		        top: 0.72rem;
		        right:0.56rem;
		        font-size:0.12rem;
		        line-height: 0.24rem;
		        color: #5d554f;
		    } 
		    .rightspan5{
		          position: absolute;
		          top: 0.72rem;
		          right:0.4rem;
		          font-size:0.12rem;
		          line-height: 0.24rem;
		          color: #5d554f;
		    }
		    .rightspan2{
		      position: absolute;
		      top: 0.72rem;
		      right:0.15rem;
		      font-size:0.12rem;
		      line-height: 0.24rem;
		      color: #5d554f;
		    }
		    input{
		      margin-bottom: 0;
		    }
		    div.btnGroup{
		      position: absolute;
		      left: 0;
		      right: 0;
		      top: 1.1rem;
		      bottom: 0rem;
		      border-top:0.01rem solid #e6e9ed;
		      .pull-left {
		        padding-left: 0.15rem;
		        padding-top: 0.2rem;
		        .text-danger {
		          color: #e84d3c;
		        }
		      }
		      button.sendGoods{
		        float: right;
		        margin-right: 0.05rem;
		        margin-top: 0.15rem;
		      }
		      button.donateCancel{
		        float: right;
		        margin-right: 0.15rem;
		        margin-top: 0.15rem;

		      }
		      button.searchLog{
		        float: right;
		      }
		    }
		  }
		}

</style>