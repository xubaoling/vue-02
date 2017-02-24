<template>
  <poverty-mask :loading="loading"></poverty-mask>
	<header><span class="pull-left" v-link="{name:'personal'}">返回</span>我的发布</header>

	<article data-page="personal-donator-myrelease">

	    <div class="listbox-goods">
	        <ul class="list-unstyled timeline">
	        <template v-for="item in donateList">
	            <li class="item" @click="toPublicDetail(item.loveNo)">
	                <img v-bind:src="item.picurl" alt="">
	                <h1>{{item.itemsName}}</h1>

	                <p>{{item.itemsDesc}}</p>
	                <!-- <span class="leftspan">来自匿名用户</span> -->

	                <span class="rightspan1">2016-06-08</span><span class="rightspan2">08:39:26</span>
	                <div class="btnGroup">
	                    <p class="left1" @click.stop="toApplyPeople(item.loveNo)">申请人数</p><span class="left2">（{{item.appliyCount}}）</span>
	                    <button class="btn btn-default  donateCancel btn-sm" @click.stop="toShare" v-if="false">分享</button>

	                </div>
	            </li>

	        </template>
          <li class="item nolist" v-if="donateList.length==0">
            <img src="../img/noList.png" alt="" style="width:152px;height:141px">
            <div>您还没有相关条目</div>
          </li>
          <li class="blank_5"></li>

	            <!-- li class="item">
	                <img src="" alt="">
	                <h1>羽绒服</h1>
	                <h2> 已结束</h2>
	                <p>男士L码，鸭绒羽绒服。已洗干净。</p>
	                <span class="leftspan">来自匿名用户</span>
	            
	                <span class="rightspan1">2016-06-08</span><span class="rightspan2">08:39:26</span>
	                <div class="btnGroup">
	                    <p class="left1">申请</p><span class="left2">(8)</span>
	                    <button class="btn btn-default  donateCancel btn-sm">分享</button>
	                </div>
	            </li>
	            
	            <li class="blank_5"></li>
	            
	            <li class="item">
	                <img src="" alt="">
	                <h1>羽绒服</h1>
	            
	                <p>男士L码，鸭绒羽绒服。已洗干净。</p>
	                <span class="leftspan">来自匿名用户</span>
	            
	                <span class="rightspan1">2016-06-08</span><span class="rightspan2">08:39:26</span>
	                <div class="btnGroup">
	            
	                    <p class="left1">申请</p><span class="left2">(9)</span>
	                    <button class="btn btn-default  donateCancel btn-sm">分享</button>
	            
	                </div>
	            </li> -->

	        </ul>
	    </div>
	    <div class="listbox-money" style="display:none">
	        <ul class="list-unstyled timeline">
	            <li class="item">
	                <h1>￥<span>200</span></h1>
	                <h2>完成37%</h2>
	                <h3>
	                    <span>目标筹集 <em>￥3000/</em><small>已筹集<em>￥1000</em></small></span>
	                </h3>
	                <h4>剩余 2天18小时46分</h4>
	                <button class="btn btn-default btn-sm">追加金额</button>
	            </li>
	        </ul>
	    </div>
	</article>
</template>
<script>
	import Util from '../assets/util.js';
  import povertyMask from './povertyMask.vue';

	export default {
		data () {
			return{
				donateList : [],
        loading:false
			}
		},
		methods : {
      toShare : function(){
        if(window.toast){
            window.toast.h5Toast("此功能尚未开发")
        }else{
            alert("此功能尚未开发");
        }
      },
			toApplyPeople : function(loveNo){
				/*location.href="./applicant-list.html?loveNo="+loveNo;*/
        this.$router.go({
          name: 'applicantList',
          params : {
            loveNo :loveNo
          }
        })
			},
			toPublicDetail : function(loveNo){
        this.$router.go({
          name : 'offerDetail',
          params : {
            loveNo : loveNo
          }
        })
				/*location.href = "./donateDetail.html?loveNum="+loveNo;*/
			}	
		},
    components : {povertyMask},
		created : function(){
			var jsonStr = {
				userId : localStorage.getItem('userId'),
				pageNow : '1',
				sort : '',
				loveType : '1',
				pageCount : '30'
			};
			var that = this;

			/*var sendData = {
				marked : 'mydonateList',
				jsonStr : JSON.stringify(jsonStr)
			};
			var cb_myrelease = function(viewdata){
				that.donateList = viewdata.donateList;
			};
			Util.ajaxJsonp(Util.url,sendData,cb_myrelease);*/

			this.$http.jsonp(Util.url,{
			    params : {
			        marked : "mydonateList",
			        jsonStr : JSON.stringify(jsonStr)
			    },
			    jsonp: "callbackparam"
			}).then((response) => {
			    that.donateList = response.data.myDonateList;

			}, (response) => {

			});
		}
	}
</script>
<style lang="less" scoped>
@import '../assets/common_in.less';

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
.nolist{
      text-align: center;
  }

div.listbox-goods{
  li.item2 {
    padding: 0.18rem 0.15rem;
    position: relative;
    height: 1.2rem;

    h1 {
      position: absolute;
      top: 0.18rem;
      left: 1.03rem;
      font-size: 0.16rem;
      line-height: 0.32rem;
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
    .mat3 {
      position: absolute;
      top: 0.72rem;
      left: 0.15rem;
      font-size: 0.12rem;
      line-height: 0.24rem;
      color: #3599db;
    }
    p {
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
    }
    .rightspan1 {
      position: absolute;
      top: 0.72rem;
      right: 0.68rem;
      font-size: 0.12rem;
      line-height: 0.24rem;
      color: #5d554f;
    }
    .rightspan2 {
      position: absolute;
      top: 0.72rem;
      right: 0.15rem;
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
    .left1{
      position: absolute;
      top: 0.15rem;
      left: 0.15rem;
      font-size:0.12rem;
      line-height: 0.24rem;
      color: #3599db;
    }
    .left2{
      position: absolute;
      top: 0.15rem;
      left: 0.7rem;
      font-size:0.12rem;
      line-height: 0.24rem;
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
    } .rightspan4{
        position: absolute;
        top: 0.72rem;
        right:0.56rem;
        font-size:0.12rem;
        line-height: 0.24rem;
        color: #5d554f;
      } .rightspan5{
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