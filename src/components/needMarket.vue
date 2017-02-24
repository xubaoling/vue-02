<template>
<!-- <poverty-mask :loading="loading"></poverty-mask>  -->
<article data-page="needMarkets" style="overflow-y: hidden">
   <!--  <div class="banner">
        <carousel :interval="3000" :indicators="false" :controls="false">
          <slider>
            <img src="../img/icon1.jpg">
          </slider>
          <slider>
            <img src="../img/icon2.jpg">
          </slider>
        </carousel>
        <img src="../img/icon1.jpg">
    </div> -->
    <div class="search">
        <div class="row">
            <div class="col-xs-10">
                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-primary" style="background-color:#f75354;border-color:#f75354" @click="search_needMark">Go!</button>
                    </span> 
                    <input type="text" class="form-control" v-model="searchContent">
                </div>
            </div>
            <div class="col-xs-2" style="text-align:center;height:34px;line-height:34px;padding-left:0">
                <span style="font-size:16px;color:#f75354" @click="showModal_selector=true">筛选</span>
                <!-- <p @click="showModal=true">物品类别</p>
                <p @click="showModal_region=true">选择地域</p> -->
            </div>
        </div>
    </div>
    <modal :show.sync="showModal_selector" width="300" ok-text="确定" cancel-text="取消">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">筛选条件</h4>
      </div>
      <div slot="modal-body" class="modal-body chooseSelector">
        <ul class="timeline">
          <li @click="enterItem()">物品类别</li>
          <li @click="enterAddress()">地域住址</li>
        </ul>
      </div>
      <div slot="modal-footer" class="modal-footer">
      </div>
    </modal>
    <!-- 物品类别的弹框 -->
    <modal :show.sync="showModal" width="300" ok-text="确定" cancel-text="取消">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">物品分类</h4>
      </div>
      <div slot="modal-body" class="modal-body">
        <ul class="list-unstyled-it timeline">
          <li @click="chooseIt('','')">不限</li>
          <li @click="chooseIt('1','服饰')">服饰</li>
          <li @click="chooseIt('2','鞋靴')">鞋靴</li>
          <li @click="chooseIt('3','运动')">运动</li>
          <li @click="chooseIt('4','母婴')">母婴</li>
          <li @click="chooseIt('5','家具')">家具</li>
          <li @click="chooseIt('6','玩具')">玩具</li>
          <li @click="chooseIt('7','箱包')">箱包</li>
          <li @click="chooseIt('8','书籍')">书籍</li>
          <li @click="chooseIt('9','电器')">电器</li>
          <li @click="chooseIt('10','数码')">数码</li>
          <li @click="chooseIt('11','乐器')">乐器</li>
          <li @click="chooseIt('12','食品')">食品</li>
          <li @click="chooseIt('13','日用')">日用</li>
          <li @click="chooseIt('14','文具')">文具</li>
          <li @click="chooseIt('15','其他')">其他</li>
        </ul>
      </div>
      <div slot="modal-footer" class="modal-footer">
      </div>
    </modal>
    <!-- 选择地域的弹框 -->
    <modal :show.sync="showModal_region" width="300" ok-text="确定" cancel-text="取消">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">物品分类</h4>
      </div>
      <div slot="modal-body" class="modal-body">
        <ul class="list-unstyled-it timeline">
          <li @click="chooseRegion('','')">全国</li>
          <li v-for="item in regionArr" @click="chooseRegion(item.addressCode,item.addressName)">{{item.addressName}}</li>
        </ul>
      </div>
      <div slot="modal-footer" class="modal-footer">
      </div>
    </modal>
    <div class="selectAl" v-if="addressName||itName">
      筛选条件：
      <span v-if="addressName">{{addressName}}</span>
      <span v-if="itName">{{itName}}</span>
    </div>
    <div class="list-box">
        <div id="sd">
              <div v-if="sd1show">
                  <p>松开后查看最新需求信息</p>
              </div>
              <div v-if="sd2show">
                  <pulse-loader></pulse-loader>  
              </div>
        </div>
        <ul class="list-unstyled timeline" id="dataList" @touchstart="ultouchstart" @touchmove="ultouchmove" @touchcancel="ultouchend" @touchend="ultouchend">
            <template v-for="item in helpList" track-by="$index">
                <li class="container" v-if="item.type==1" @click="toDetail(item.type,item.id)">
                    <h1>{{item.itemsName}}</h1>
                    <h2>{{item.itName}}</h2>
                    <p>
                        {{item.itemsDesc.substring(0,20)}}...
                    </p>
                    <h3><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp{{item.caption}}</h3>
                    <h4>{{item.publishTime}}</h4>
                </li>
                <li class="container" v-if="item.type==2" @click="toDetail(item.type,item.id)">
                    <h1>￥{{item.getMoney}}&nbsp/&nbsp<small>已筹集<span>￥{{item.moneyCount}}</span></small></h1>
                    <h2>{{item.itName}}</h2>
                    <p>
                        {{item.reason.substring(0,20)}}...
                    </p>
                    <h3><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp{{item.caption}}</h3>
                    <h4>剩余 {{item.remainTime}}天</h4>
                </li>
                <div class="ln_solid"></div>
            </template>
            <li class="item nolist" v-if="helpList.length==0&&loaded==true">
              <img src="../img/noList.png" alt="" style="width:152px;height:141px">
              <div>没有相关条目</div>
            </li>
            <li class="blank_5"></li>
            <infinite-loading :on-infinite="onInfinite" v-if="isLoadedAllData"></infinite-loading>
          <!-- </loadmore> -->
        </ul>
    </div>
</article>
</template>

<script>
import Util from '../assets/util.js'
import { modal,carousel,slider } from 'vue-strap'
import povertyMask from './povertyMask.vue'
import InfiniteLoading from 'vue-infinite-loading'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

module.exports =  {
  	data () {
  		return {
  			type : "",	//1.物 2.钱
  			name : "",	//查询内容
  			itId : "",	//物品类别ID
        itName : "",
  			regionid : "",	//地域ID
        addressName : "",
  			searchContent : "",
  			pageNum : 0,
  			helpList : [],
        showModal : false,
        showModal_region : false,
        showModal_selector : false,
        regionArr : [],
        loading : false,
        PullText : '',
        DropText : '',
        LoadingText : '',
        isLoadedAllData : true,
        sd1show : false,
        sd2show :false,
        loaded : false
  		}
	},
	methods : {
    enterItem:function(){
      this.showModal=true;
      this.showModal_selector=false
    },
    enterAddress : function(){
      this.showModal_region=true;
      this.showModal_selector=false
    },
    toDetail : function(type,id){
      sessionStorage.setItem('needList',JSON.stringify(this.helpList));
      sessionStorage.setItem('pageNow',this.pageNum);
      sessionStorage.setItem('scrollT',document.body.scrollTop);

      this.$router.go({name:'needDetail',params:{type:type,id:id}});
    },
    onInfinite : function(){
      if(sessionStorage.getItem('needList')){
        this.pageNum = sessionStorage.getItem('pageNow');
        this.helpList = JSON.parse(sessionStorage.getItem('needList'));

        this.$nextTick(() => {
            document.body.scrollTop = sessionStorage.getItem('scrollT');

            sessionStorage.removeItem('needList');
            sessionStorage.removeItem('pageNow');
            sessionStorage.removeItem('scrollT');
        })

        this.$broadcast('$InfiniteLoading:loaded');
      }else{
        this.pageNum++;
        this.getNeedMarketData();
      }
    },
		search_needMark : function(){
      this.helpList = [];
      this.pageNum = 1;
			this.getNeedMarketData();
		},
		getNeedMarketData : function(){
			var jsonStr = {
				"userId":"",
				"type":this.type,
				"name":this.searchContent,
				"itId" : this.itId,
				"regionid" : this.regionid,
				"pageNow":this.pageNum,
				"sort":"",
				"pageCount":"10",
				"auditstatus":"2",
        "_start" : 0,
        "_end" : 0
			};
			jsonStr = JSON.stringify(jsonStr);

			var that = this;
      this.$http.jsonp(Util.url,{
        	params : {
        		marked : "helpList",
        		jsonStr : jsonStr
        	},
        	jsonp: "callbackparam"
      }).then((response) => {
	        that.helpList = that.helpList.concat(response.data.helpList);
          that.$broadcast('$InfiniteLoading:loaded');
          that.loaded = true;
          //that.helpList = [];

          that.sd1show=false;
          that.sd2show = false;
	    }, (response) => {
        if(response.status == '408'){
          if(window.toast){
            window.toast.h5Toast('访问超时');
          }else{
            alert('访问超时')
          }

          that.$broadcast('$InfiniteLoading:loaded');
        }

	    });

		},
    chooseIt : function(itId,itName){
        this.itId = itId;
        this.itName = itName;

        this.showModal = false;
        this.helpList = [];
        this.pageNum = 1;
        this.getNeedMarketData();
    },
    getRegionData : function(){
      var jsonStr = {
        aaa002 :'100'
      };
      var that = this;

      this.$http.jsonp(Util.url,{
          params : {
            marked : "getNextLevelAddress",
            jsonStr : JSON.stringify(jsonStr)
          },
          jsonp: "callbackparam"
      }).then((response) => {
          that.regionArr = response.data.queryAddressList;
      }, (response) => {

      });
    },
    chooseRegion : function(addressCode,addressName){
      this.regionid = addressCode;
      this.addressName = addressName;

      this.showModal_region = false;
      this.helpList = [];
      this.pageNum = 1;
      this.getNeedMarketData();
    },
    ultouchstart : function(event){
      //event.preventDefault();
      if(window.scrollY>0) return;
      if (!event.touches.length) return;

      var touch = event.touches[0];
      this._start = touch.pageY;
    },
    ultouchmove : function(event){
      if(window.scrollY>0) return;
      if (!event.touches.length) return;

      var touch = event.touches[0];

      this._end = (this._start - touch.pageY);
      if (this._end < 0) {

          this.sd1show=true;
          this.sd2show = false;
      }
    },
    ultouchend : function(event){
      if(window.scrollY>0) return;
      if (this._end < 0) {
        this.sd1show=false;
        this.sd2show = true;

        this.pageNum = 1;
        this.helpList = [];
        this.getNeedMarketData();
      }
    }
	},
	created : function(){
    //获取地域信息 
    this.getRegionData();
	},
  components : {
    modal,carousel,slider,InfiniteLoading,povertyMask,PulseLoader
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/common.less';
.selectAl{
  padding: 8px 15px;

  span{
    border: 1px solid #666;
    border-radius: 5%;
    padding: 2px 2px;
  }
  span:first-child{
    margin-right: 8px;
  }
}
.banner{
    min-height: 1.64rem;
    img{
      width:100%;
    }
  }
#dataList li.nolist{
  text-align: center;
}
div.search{
  width:100%;
  height:0.45rem;
  padding:0.05rem 0.15rem 0;
  //background: url(../img/001.png);

  div.col-xs-9{
    padding-right: 0
  }
  div.col-xs-3{
    padding: 0;

    p{
      text-align:center;
      font-size: 0.12rem;
      color:#171267;
    }
  }
  span.screen{
    color:@article-search-screen;
    font-size:0.13rem;
    line-height:0.4rem;
  }
}
div.list-box{
  background:#fff;
  border-top: 0.01rem  solid @list-box-border;
  border-bottom: 0.01rem  solid @list-box-border;
  li{
    width:100%;
    height: 1.1rem;
    padding:0.15rem;
    text-align:left;
    position: relative;

    h1{
      font-size: 0.16rem;
      small{
        font-size:0.11rem;
        color:#5d554f;
        span{
          color:red;
        }
      }
    }
    h2{
      position: absolute;
      right: 0.15rem;
      top: 0.15rem;
      font-size: 0.12rem;
      color: @list-box-text-3;
    }
    p{
      position: absolute;
      font-size: 0.14rem;
      left: 0.15rem;
      top:0.45rem;
    }
    h3{
      font-size: 0.12rem;
      position: absolute;
      color:@list-box-text-2;
      top: 0.8rem;
      left: 0.15rem;
    }
    h4{
      font-size:0.12rem;
      position: absolute;
      top: 0.8rem;
      right: 0.15rem;
    }
  }
}
.indexFilter{
  text-align:center;
  margin:0.1rem auto;
  margin-top: 0;
}

ul.list-unstyled-it {
  margin: 0.15rem;
  li{
    width:50%;
    float: left;
    font-size: 0.16rem;
    padding: 0.08rem;
    text-align: center
  }
}
div.modal-body{
  height: 4rem;
}
div.chooseSelector{
  height: 1.6rem;

  ul{
    li{
      width: 50%;
      float: left;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      font-size: 0.26rem;
    }
  }
}
#sd{
  text-align: center;
}


</style>