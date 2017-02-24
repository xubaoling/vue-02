<template>
  <poverty-mask :loading="loading"></poverty-mask>
	<header><span class="pull-left" v-link="{name:'personal'}">返回</span>我的发布</header>

	<article data-page="release-material" >
	    <ul class="menu" v-if="false">
	        <li :class="{'active':showNow=='goods'}" @click="showGoods"><p>物品</p></li>
	        <li :class="{'active':showNow=='money'}" @click="showMoney"><p>金钱</p></li>
	    </ul>
	    <div class="listbox-goods" v-if="showNow=='goods'">
	        <ul class="list-unstyled timeline">
	        <template v-for="item in goodshelpList">
	            <li class="item" v-if="item.auditStatus==1">
	                <h1 class="mat1">{{item.itemsName}}</h1>
	                <h2>审核中</h2>
	                <p class="mat2">{{item.itemsDesc}}</p>
	                <span class="rightspan1">{{item.publishTime}}</span><span class="rightspan2"></span>
	                <div class="btnGroup">
	                    <button class="btn btn-default donateCancel btn-sm" v-if="false">编辑</button>
	                </div>
	            </li>
	            <li class="item" v-if="item.auditStatus==2">
	                <h1 class="mat1">{{item.itemsName}}</h1>
	                <h2 class="h2text">审核通过</h2>
	                <p class="mat2">{{item.itemsDesc}}</p>
	                <span class="rightspan1">{{item.publishTime}}</span><span class="rightspan2"></span>
	                <div class="btnGroup">
	                    <button class="btn btn-default donateCancel btn-sm" v-if="false">分享</button>
	                </div>
	            </li>
	            <li class="blank_5"></li>
	        </template>
          <li class="nolist" v-if="goodshelpList.length==0">
            <img src="../img/noList.png" alt="" style="width:152px;height:141px">
            <p>您还没有相关条目</p>
          </li>
	        </ul>
	    </div>
	    <div class="listbox-money" v-if="showNow=='money'">
	        <ul class="list-unstyled timeline">
            <template v-for="item in moneyhelpList">
                <li class="item" v-if="item.auditStatus=='1'">
                    <h1 >目标筹集<span>￥{{item.getMoney}}</span></h1>
                    <h2>审核中</h2>
                    <p class="mat2">{{item.reason}}</p>
                    <span class="rightspan1">{{item.publishTime}}</span><span class="rightspan2"></span>
                    <!-- <div class="btnGroup">
                        <span class="left1">招行</span><span class="left2">尾号</span><span class="left3">4529</span>
                        <button class="btn btn-default donateCancel btn-sm">编辑</button>
                    </div> -->
                </li>
                <li class="item" v-if="item.auditStatus=='2'">
                    <h1 >目标筹集<span>￥{{item.getMoney}}</span></h1>
                    <h2 class="h2text">审核通过</h2>
                    <p class="mat2">{{item.reason}}</p>
                    <span class="rightspan1">2016-06-08</span><span class="rightspan2">08:39:26</span>
                    <div class="btnGroup">
                        <!-- <span class="left1">工行</span><span class="left2">尾号</span><span class="left3">4529</span> -->
                        <button class="btn btn-default donateCancel btn-sm" v-if="false">分享</button>
                    </div>
                </li>
                <li class="item" v-if="item.auditStatus=='3'">
                    <h1 >目标筹集<span>￥{{item.getMoney}}</span></h1>
                    <h2 class="h2text">审核不通过</h2>
                    <p class="mat2">{{item.reason}}</p>
                    <span class="rightspan1">2016-06-08</span><span class="rightspan2">08:39:26</span>
                </li>
                <li class="blank_5"></li>
            </template>
            <li class="nolist" v-if="moneyhelpList.length==0">
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

	export default {
		data () {
			return {
				goodshelpList:[],
        moneyhelpList:[],
        loading:false,
        showNow:"goods"
			}
		},
		methods : {
      showGoods:function(){
        this.showNow = "goods";
      },
      showMoney : function(){
        this.showNow = "money";
      },
      getGoodsHelpList : function(){
        var jsonStr = {
          userId : localStorage.getItem("userId"),
          type : "1",
          name : "",    //模糊查询
          pageNow : "1",
          itId: "",
          regionid : "",
          sort : "",
          pageCount : "30",
          auditstatus : ""
        };
        var that = this;
        this.$http.jsonp(Util.url,{
            params : {
                marked : "helpList",
                jsonStr : JSON.stringify(jsonStr)
            },
            jsonp: "callbackparam"
        }).then((response) => {
            that.goodshelpList = response.data.helpList;

        }, (response) => {

        });
      },
      getMoneyHelpList : function(){
        var jsonStr = {
          userId : localStorage.getItem("userId"),
          type : "2",
          name : "",    //模糊查询
          pageNow : "1",
          itId: "",
          regionid : "",
          sort : "",
          pageCount : "30",
          auditstatus : ""
        };
        var that = this;
        this.$http.jsonp(Util.url,{
            params : {
                marked : "helpList",
                jsonStr : JSON.stringify(jsonStr)
            },
            jsonp: "callbackparam"
        }).then((response) => {
            that.moneyhelpList = response.data.helpList;

        }, (response) => {

        });
      }
		},
    components : {povertyMask},
		created : function(){
			this.getGoodsHelpList();
      this.getMoneyHelpList();
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
    width: 50%;
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

  li.item{
    padding: 0.18rem 0.15rem;
    position: relative;
    height: 1.7rem;


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
    .h2text{
      position: absolute;
      top: 0.18rem;
      right: 0.15rem;
      font-size: 0.13rem;
      line-height: 0.32rem;
      color: #5d554f;
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
      left: 0.15rem;
      font-size:0.12rem;
      line-height: 0.24rem;
      color: #5d554f;
    }

    .rightspan2{
      position: absolute;
      top: 0.72rem;
      left:1rem;
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
div.listbox-money{
  li.item2{
    padding: 0.18rem 0.15rem;
    position: relative;
    height: 1.3rem;
    h1{
      position: absolute;
      top: 0.18rem;
      left: 0.15rem;
      font-size: 0.16rem;
      line-height: 0.32rem;
      span{
        font-size: 0.16rem;
        color: #e84d3c;
        em{
          line-height: 0.32rem;
          font-size: 0.13rem;
          color: #5d554f;
        };
      }

    }
    h2{
      position: absolute;
      top: 0.18rem;
      right: 0.15rem;
      font-size: 0.13rem;
      line-height: 0.32rem;
      color: #e84d3c;
    }
    .h2text{
      position: absolute;
      top: 0.18rem;
      right: 0.15rem;
      font-size: 0.13rem;
      line-height: 0.32rem;
      color: #5d554f;
    }
    .fxbtn{
      position: absolute;
      top: 0.7rem;
      right: 0.15rem;


    }
    .thkbtn{
      position: absolute;
      top: 0.7rem;
      right: 0.65rem;

    }
    .leftp{
      position: absolute;
      top: 0.72rem;
      left: 0.15rem;
      font-size:0.13rem;
      line-height: 0.26rem;
      color: #e84d3c;
      span{

        color: #3599db;
      }
    }
  }
  li.item{
    padding: 0.18rem 0.15rem;
    position: relative;
    height: 1.7rem;
    h1{
      position: absolute;
      top: 0.18rem;
      left: 0.15rem;
      font-size: 0.16rem;
      line-height: 0.32rem;
      span{
        font-size: 0.16rem;
        color: #e84d3c;
        em{
          line-height: 0.32rem;
          font-size: 0.13rem;
          color: #5d554f;
        };
      }

    }
    h2{
      position: absolute;
      top: 0.18rem;
      right: 0.15rem;
      font-size: 0.13rem;
      line-height: 0.32rem;
      color: #e84d3c;
    }

    .h2text{
      position: absolute;
      top: 0.18rem;
      right: 0.15rem;
      font-size: 0.13rem;
      line-height: 0.32rem;
      color: #5d554f;
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
    p{
      position: absolute;
      top:0.46rem;
      left: 1.03rem;
      font-size:0.13rem;
      line-height:0.26rem;
      color: #5d554f;
    }


    .leftspan1{
      position: absolute;
      top: 0.72rem;
      left: 0.15rem;
      font-size:0.12rem;
      line-height: 0.24rem;
      color: #3599db;
    }
    .rightspan1{
      position: absolute;
      top: 0.72rem;
      left: 0.15rem;
      font-size:0.12rem;
      line-height: 0.24rem;
      color: #5d554f;
    }

    .rightspan2{
      position: absolute;
      top: 0.72rem;
      left:1rem;
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
         left: 0.45rem;
         font-size:0.12rem;
         line-height: 0.24rem;
       }
      .left3{
        position: absolute;
        top: 0.15rem;
        left: 0.75rem;
        font-size:0.12rem;
        line-height: 0.24rem;
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
.nolist{
      text-align: center;
  }
	
</style>