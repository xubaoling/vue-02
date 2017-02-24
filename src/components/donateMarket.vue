<template>
<!-- <poverty-mask :loading="loading"></poverty-mask> -->
<article data-page="donationShop">
  <!--   <div class="banner">
        <carousel :interval="2000" :indicators="false" :controls="false">
          <slider>
            <img src="../img/icon1.jpg">
            <div class="carousel-caption">
                </div>
          </slider>
          <slider>
            <img src="../img/icon2.jpg">
            <div class="carousel-caption">
            </div>
          </slider>
        </carousel>
    </div> -->
    <div class="search">
        <div class="row">
            <div class="col-xs-10">
                <div class="input-group">
                <span class="input-group-btn">
                      <button type="button" class="btn btn-primary" style="background-color:#f75354;border-color:#f75354" @click="search_donateMarket">Go!</button>
                  </span>
                    <input type="text" class="form-control" v-model="searchContent">
                </div>
            </div>
            <div class="col-xs-2" style="text-align:center;height:34px;line-height:34px;padding-left:0">
                <span @click="showModal=true" style="font-size:16px;color:#f75354">筛选</span>
            </div>
        </div>
    </div>
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
    <div class="selectAl" v-if="itName">
      筛选条件：
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
        <ul class="list-unstyled timeline" @touchstart="ultouchstart" @touchmove="ultouchmove" @touchcancel="ultouchend" @touchend="ultouchend">
          <template v-for="item in donateList" track-by="$index">
            <li v-link="{name:'offerDetail',params:{loveNo:item.loveNo}}">
                <img v-bind:src="item.picurl">
                <h1>{{item.itemsName}}</h1>
                <h2>{{item.itemsDesc.substring(0,20)}}...</h2>
                <h3>来自{{item.userName}} </h3>
                <h4>{{item.itName}}</h4>
                <h5>{{item.publishTime}}</h5>
            </li>
          </template>
          <li class="item nolist" v-if="donateList.length==0&&loaded==true">
            <img src="../img/noList.png" alt="" style="width:152px;height:141px">
            <div>没有相关条目</div>
          </li>
          <li class="blank_5"></li>
        </ul>
        <infinite-loading :on-infinite="onInfinite" v-if="isLoadedAllData"></infinite-loading>
    </div>
</article>
</template>

<script>
import Util from '../assets/util.js';
import { modal,carousel,slider } from 'vue-strap';
import povertyMask from './povertyMask.vue';
import InfiniteLoading from 'vue-infinite-loading';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
 	data () {
 		return {
 			type : "",	//1.物 2.钱
 			name : "",	//查询内容
 			itId : "",	//物品类别ID
      itName : "",
 			regionid : "",	//地域ID
 			searchContent : "",
 			pageNum : "0",
 			donateList : [],
 			showModal : false,
      loading : false,
      isLoadedAllData : true,
      sd1show : false,
      sd2show :false,
      loaded : false
 		}
	},
	methods : {
    onInfinite : function(){
      this.pageNum++;
      this.getdonationShopData();
    },
		search_donateMarket : function(){
			this.donateList = [];
			this.pageNum = "1";
			this.getdonationShopData();
		},
		getdonationShopData : function(){
			var jsonStr = {
					pageNow:this.pageNum,
					sort:"",
					pageCount:"10",
					type:"1",
					queryString : this.searchContent,
					itId : this.itId
				};
			jsonStr = JSON.stringify(jsonStr);
			var that = this;

		  this.$http.jsonp(Util.url,{
	        	params : {
	        		marked : "donateList",
	        		jsonStr : jsonStr
	        	},
	        	jsonp: "callbackparam"
		    }).then((response) => {
		    	//console.log(response.data.donateList);
          if(response.data.donateList){
            that.donateList = that.donateList.concat(response.data.donateList);
            //that.donateList = [];
          }
			    
          that.$broadcast('$InfiniteLoading:loaded');
          that.loaded = true;

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
	        this.donateList = [];
          this.pageNum = "1";
	        this.getdonationShopData();
	  },
    ultouchstart : function(event){
      //event.preventDefault();
      if(window.scrollY>0) return;
      if (!event.touches.length) return;

      console.log('start');
      var touch = event.touches[0];
      this._start = touch.pageY;
    },
    ultouchmove : function(event){
      if(window.scrollY>0) return;
      if (!event.touches.length) return;
      console.log('move');

      var touch = event.touches[0];

      this._end = (this._start - touch.pageY);
      if (this._end < 0) {

          this.sd1show=true;
          this.sd2show = false;
      }
    },
    ultouchend : function(event){
      console.log('end');
      console.log(window.scrollY);
      if(window.scrollY>0) return;
      console.log(this._end);
      if (this._end < 0) {
        this.sd1show=false;
        this.sd2show = true;

        this.pageNum = '1';
        this.donateList = [];
        this.getdonationShopData();
      }
    }
	},
	created : function(){
		//this.getdonationShopData();
	},
	components : {
		modal,carousel,slider,povertyMask,InfiniteLoading,PulseLoader
	}
}
</script>

<style lang="less" scoped>
@import '../assets/common.less';

.banner {
  width: 100%;
  img {
    width: 100%;
  }
}
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
.timeline li.nolist{
  text-align: center;
}
.search {
    width: 100%;
    height: 0.45rem;
    padding: 0.05rem 0.15rem 0;
    div.col-xs-9{
      padding-right: 0
    }
    div.col-xs-3{
      padding: 0;

      p{
        text-align:center;
        font-size: 0.12rem;
        color:#171267;
        height: 0.34rem;
        line-height: 0.34rem;
      }
    }
    span.screen {
      line-height: 0.4rem;
      font-size: 0.13rem;
      color: @article-search-screen;
    }
}
.list-box {
    width: 100%;
    background-color: #fff;
    border-top: 0.01rem  solid @list-box-border;
    border-bottom: 0.01rem  solid @list-box-border;
    li {
      width: 100%;
      padding: 0.15rem;
      text-align: left;
      position: relative;
      img {
          width: 0.8rem;
          height: 0.8rem;
          display: inline-block;
      }
      h1 {
          position: absolute;
          top: 0.15rem;
          left: 1.1rem;
          font-size: 0.16rem;
          color: #5d554f;
      }
      h2 {
          position: absolute;
          top: 0.4rem;
          left: 1.1rem;
          font-size: 0.13999999999999999rem;
          color: @list-box-text-1;
      }
      h3 {
          position: absolute;
          top: 0.8rem;
          left: 1.1rem;
          font-size: 0.12rem;
          color: @list-box-text-2;
      }
      h4 {
          position: absolute;
          top: 0.17rem;
          right: 0.15rem;
          font-size: 0.12rem;
          color: @list-box-text-3;
      }
      h5 {
          position: absolute;
          top: 0.8rem;
          right: 0.15rem;
          font-size: 0.12rem;
          color: @list-box-text-1;
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
#sd{
  text-align: center;
}
</style>
