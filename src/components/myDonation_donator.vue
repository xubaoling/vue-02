<template>
<poverty-mask :loading="loading"></poverty-mask>
<header><span class="pull-left" v-link="{name:'personal'}">返回</span>我的捐赠</header>

<article data-page="personal-donator-mydonation" id="perMyDon">
    <modal :show.sync="showModal_deliver" width="300" ok-text="确定" cancel-text="取消" id="genderSelect">
        <div slot="modal-header" class="modal-header">
          <h4 class="modal-title">选择配送方式</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <div class="gender" @click="deliver_compony">快递</div>
            <div class="gender" @click="deliver_self">自送</div>
        </div>
        <div slot="modal-footer" class="modal-footer">
        </div>
    </modal>
    <ul class="menu" v-if="false">
        <li :class="{'active':showNow=='goods'}" @click="showGoods"><p>物资</p></li>
        <li :class="{'active':showNow=='money'}" @click="showMoney"><p>金钱</p></li>
    </ul>
    <div class="listbox-goods" v-if="showNow=='goods'">
        <ul class="list-unstyled timeline">
            <template v-for="item in donateList">
                    <li class="item" v-if="item.loveStatus==1">         <!-- 爱心待出发 -->
                        <img v-bind:src="item.picurl" alt="">
                        <h1>{{item.itemsName}}</h1>
                        <h2>等待发货</h2>
                        <div class="btnGroup">
                            <button class="btn btn-default needDetail btn-sm" @click="toDetail(item.phId)">需求详情</button>
                            <button class="btn btn-default sendGoods btn-sm" @click="sendGoods(item.id,item.loveNo)">发货</button>
                            <button class="btn btn-default donateCancel btn-sm" @click="cancelDonation(item.loveNo)">取消捐赠</button>              
                        </div>
                    </li>
                    <li class="item" v-if="item.loveStatus==2">     <!--爱心在路上-->
                        <img v-bind:src="item.picurl" alt="">
                        <h1>{{item.itemsName}}</h1>
                        <h2>等待对方收货</h2>
                        <div class="btnGroup">
                            <button class="btn btn-default needDetail btn-sm" @click="toDetail(item.loveNo)" v-if="false">需求详情</button>
                            <!-- <button class="btn btn-default searchLog btn-sm">查看物流</button> -->
                        </div>
                    </li>
                    <li class="item" v-if="item.loveStatus == 3">   <!-- 爱心已收到 -->
                        <img v-bind:src="item.picurl" alt="">
                        <h1>{{item.itemsName}}</h1>
                        <h2>捐赠成功</h2>
                        <div class="btnGroup">
                            <button class="btn btn-default needDetail btn-sm" @click="toDetail(item.loveNo)" v-if="false">需求详情</button>
                            <button class="btn btn-default searchLog btn-sm" @click="toFeedBack(item.loveNo)">查看反馈</button>              
                        </div>
                    </li>
                    <li class="item" v-if="item.loveStatus == 4">   <!-- 爱心已收到 -->
                        <img v-bind:src="item.picurl" alt="">
                        <h1>{{item.itemsName}}</h1>
                        <h2>捐赠关闭</h2>
                        <div class="btnGroup">
                            <button class="btn btn-default needDetail btn-sm" @click="toDetail(item.loveNo)" v-if="false">需求详情</button>              
                        </div>
                    </li>
                    <li class="blank_5"></li>
            </template>
            <li class="item nolist" v-if="donateList.length==0">
              <img src="../img/noList.png" alt="" style="width:152px;height:141px">
              <p>您还没有相关条目</p>
            </li>
        </ul>
    </div>
    <div class="listbox-money" v-if="showNow=='money'">
        <ul class="list-unstyled timeline">
            <!-- <li class="item">
                <h1>￥<span>200</span></h1>
                <h2>完成37%</h2>
                <h3>
                    <span>目标筹集 <em>￥3000/</em><small>已筹集<em>￥1000</em></small></span>                  
                </h3>
                <h4>剩余 2天18小时46分</h4>
                <button class="btn btn-default btn-sm">追加金额</button>
            </li> -->
            <li class="item nolist" v-if="donateMoneyList.length==0">
              <img src="../img/noList.png" alt="" style="width:152px;height:141px">
              <p>您还没有相关条目</p>
            </li>
        </ul>
    </div>
</article>
</template>
<script>
	import Util from '../assets/util.js';
  import povertyMask from './povertyMask.vue';
  import {modal} from 'vue-strap';

	export default {
		data () {
			return {
				donateList : [],
        donateMoneyList : [],
        loading:false,
        showNow : 'goods',
        showModal_deliver : false,
        item_id : '',
        item_loveNo : ''
			}
		},
		methods : {
      showGoods:function(){
        this.showNow = "goods";
      },
      showMoney : function(){
        this.showNow = "money";
      },
			toDetail : function(loveNo){
				//location.href = "./donateDetail.html?loveNum="+loveNo;
        this.$router.go({name:'needDetail',params:{type:1,id:loveNo}});
			},
			sendGoods : function(id,loveNo){
        this.item_id = id;
        this.item_loveNo = loveNo;
        this.showModal_deliver = true;
			},
      deliver_compony : function(id,loveNo){
        this.showModal_deliver = false;

        this.$router.go({
          name:'order_send',
          params : {
            id : this.item_id,
            loveNo : this.item_loveNo
          }
        })
      },
      deliver_self : function(){
        this.showModal_deliver = false;

        this.$router.go({
          name:'self_deliver',
          params : {
            id : this.item_id,
            loveNo : this.item_loveNo
          }
        })
      },
			cancelDonation : function(loveNo){
				var jsonStr = {
					loveno : loveNo
				};

				var that = this;
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "cancelDonateLove",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {
				    that.getGoodsList();
				}, (response) => {

				});
			},
			toFeedBack : function(loveNo){
      	this.$router.go({
          name : 'seefeedback',
          params : {
            loveNo : loveNo
          }
        });
			},
			getGoodsList : function(){
				var jsonStr = {
					userId : localStorage.getItem('userId'),
					pageNow : '1',
					loveType : '0',
					sort : "",
					pageCount : '30'
				};
				var that = this;
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
			},
      getMoneyList : function(){
        var jsonStr = {
          userId : localStorage.getItem('userId'),
          pageNow : '1',
          loveType : '0',
          sort : "",
          pageCount : '30'
        };
        var that = this;
        this.$http.jsonp(Util.url,{
            params : {
                marked : "donateMoneyList",
                jsonStr : JSON.stringify(jsonStr)
            },
            jsonp: "callbackparam"
        }).then((response) => {
            that.donateMoneyList = response.data.myDonationList;
        }, (response) => {

        });
      }
		},
		created : function(){
			this.getGoodsList();
      this.getMoneyList();
		},
    components : {povertyMask,modal}
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

#genderSelect{
    text-align: center;
    .modal-body{
      height: 0.5rem;
    }

    .modal-body>div{
      float: left;
      width: 50%;
      font-size: 0.24rem;
    }
}
</style>