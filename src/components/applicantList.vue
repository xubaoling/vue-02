<template>
	<poverty-mask :loading="loading"></poverty-mask>
	<header><span class="pull-left" @click="getback">返回</span>申请人列表</header>

	<article data-page="personal-donator-collection1" >

	    <div class="listbox-goods">
	        <ul class="list-unstyled timeline">
	        <template v-for="item in applicantsList">
	            <li class="item2" @click="toDetail(item.ahid,item.userId)">
	                <h1 class="mat1">申请人:</h1> <h1 class="mat0">{{item.userName}}</h1>
	                <button class="btn btn-default btn-sm" id="applyDetail" @click.stop="toDetail(item.ahid,item.userId)">申请人详情</button>
	                <p class="mat2">{{item.applyReason}}</p>
	                <span class="mat3">{{item.caption}}</span>
	                <!-- <span class="rightspan1"></span> -->
	                <span class="rightspan2">{{item.applyTime}}</span>
	            </li>
	            <li class="blank_5"></li>
	        </template>
    		<li class="item nolist" v-if="applicantsList.length==0">
    		  <img src="../img/noList.png" alt="" style="width:152px;height:141px">
    		  <div>还没有申请人</div>
    		</li>
            <li class="blank_5"></li>
	            
	            <!-- <li class="item2">
	                <h1 class="mat1">申请人:</h1> <h1 class="mat0">李某某</h1>
	                <p class="mat2">宁夏的冬天好冷，我想有个羽绒服,让我的冬天温暖。</p>
	                <span class="mat3">宁夏石嘴山</span>
	                <span class="rightspan1">2016-06-08</span><span class="rightspan2">08:39:26</span>
	            </li>
	            <li class="blank_5"></li>
	            <li class="item2">
	                <h1 class="mat1">申请人:</h1> <h1 class="mat0">李某某</h1>
	                <p class="mat2">宁夏的冬天好冷，我想有个羽绒服,让我的冬天温暖。</p>
	                <span class="mat3">宁夏石嘴山</span>
	                <span class="rightspan1">2016-06-08</span><span class="rightspan2">08:39:26</span>
	            </li> -->
	        </ul>
	    </div>

	</article>
</template>
<script>
	import Util from '../assets/util.js';
	import povertyMask from './povertyMask.vue';

	export default {
		data () {
			return {
				applicantsList: [],
				loveNo : "",
				loading:false
			}
		},
		methods : {
			getback : function(){
				window.history.back();
			},
			toDetail :function(ahId,userId){
				/*location.href = "./applicant-detail.html?ahId="+ahId+"&userId="+userId+"&loveNo="+this.loveNo;*/

				this.$router.go({
					name:'applicantDetail',
					params:{
						ahId : ahId,
						userId : userId,
						loveNo : this.loveNo
					}
				})

			}
		},
		components : {
			povertyMask
		},
		created : function(){
			this.loveNo = this.$route.params.loveNo;

			var jsonStr = {
				loveNo : this.loveNo
			};
			var that = this;
			this.$http.jsonp(Util.url,{
			    params : {
			        marked : "applicantsList",
			        jsonStr : JSON.stringify(jsonStr)
			    },
			    jsonp: "callbackparam"
			}).then((response) => {
				if(response.data.applicantsList) that.applicantsList = response.data.applicantsList;
			    console.log(that.applicantsList);

			}, (response) => {

			});
		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/common_in.less';

	.nolist{
		text-align: center;
	}
	ul.menu{
	  height: 0.45rem;
	  background-color: #f7f7f7;
	  font-size: 0.15rem;


	  li{
	    width: 25%;
	    height: 0.45rem;
	    float: left;
	    text-align: center;
	    border-bottom: 0.01rem solid #e6e9ed;

	    p{
	      line-height: 0.33rem;
	      vertical-align: bottom;
	      margin-top: 0.06rem;
	    }
	  }
	  li:first-child{
	    p{
	      border-right: 0.01rem solid #e6e9ed;
	    }
	  }
	  li.active{
	    border-bottom: 0.01rem solid #26ba9b;
	    color: #26ba9b;
	  }
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