<template>
<poverty-mask :loading="loading"></poverty-mask>
	<header>
    <span class="pull-left" @click="getback">返回</span>订单信息
</header>
<article data-page="orders-goods">
    <div class="loading-box loading-3">
        <i class="line"><span></span></i>
        <div class="num-box">
            <div class="inline-box ">
                <div class="active">1</div>
                <p>已上传</p>
            </div>
            <div class="inline-box ">
                <div class="active">2</div>
                <p>已发货</p>
            </div>
            <div class="inline-box">
                <div>3</div>
                <p>捐助成功</p>
            </div>
        </div>
    </div>
    <!-- <div class="ln_solid"></div>
    <div class="big-box t1">
        <h1>受捐人：<span>{{realName}}</span></h1>
        <h2>{{address}}</h2>
        <h3>{{mobile}}</h3>
    </div> -->
    <div class="ln_solid"></div>
    <div class="big-box t2">
        <h1>物流信息</h1>
        <h2>物流公司 ： {{ogisticsCompany}}</h2>
        <h3>快递单号 ： {{ogisticsNo}} 
            <span class="pull-right">
                <button class="btn btn-sm btn-white" v-if="false">复制快递单号</button>
                <!-- <button class="btn btn-sm btn-white">查询快递</button> -->
            </span>
        </h3>
    </div>
    <div class="ln_solid"></div>
    <div class="blank_5"></div>
    <div class="ln_solid"></div>
    <!-- <div class="big-box t3">
        <img v-bind:src="picurl" class="inline-box">
        <div class="ttt">
            <p class="s1">{{itemsName}}</p>
            <p class="s2" >{{itName}}</p>
            <p  class="s3">{{itemsDesc}}</p>
        </div>
        <span class="fa fa-angle-right"></span>
    </div>
    <div class="ln_solid"></div> -->
    <!-- <div class="big-box t4">
        <p>捐助编号：19019232893099819</p>
        <p>交易号：1239023949027490818389736749121389-1298</p>
        <p>捐助时间：2016.06.15  21:45:00</p>
    </div>
    <div class="ln_solid"></div> -->

</article>
<!--<footer>-->
    <!--<input type="button" class="btn btn-primary" value="修改物流">-->
<!--</footer>-->
<footer class="twoBtn" v-if="false">
    <!-- <input type="button" class="btn btn-primary" value="修改物流"> -->
    <input type="button" class="btn btn-primary" value="确认" @click="goBack">
</footer>

<div class="pop-address" style="display:none">
    <div class="bg">
        <div class="big-box  ">
            <p class="p_10_15">快递单号&nbsp;&nbsp;<span>336 221 361 000</span></p>
        </div>
        <div class="ln_solid"></div>
        <div class="big-box t1">
            <p class=" inline-box p_10_15"><img>顺丰快递</p>
           <span class="fa fa-angle-right"></span>
        </div>
        <div class="ln_solid"></div>
        <div class="blank_5"></div>
        <div class="ln_solid"></div>
        <div class="big-box list">
            <ul class="list-unstyled timeline widget ">
                <li>
                    <div class="block">
                        <div class="block_content">
                            <h2 class="title">
                                <a class="text-orange">快件到达【上海嘉定外岗营业点】</a>
                            </h2>
                            <div class="byline">
                                <span class="text-orange">2016-05-20 12:01:39</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="block">
                        <div class="block_content">
                            <h2 class="title">
                                <a class="text-orange">快件到达【上海嘉定外岗营业点】</a>
                            </h2>
                            <div class="byline">
                                <span class="text-orange">2016-05-20 12:01:39</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="block">
                        <div class="block_content">
                            <h2 class="title">
                                <a class="text-orange">快件到达【上海嘉定外岗营业点】</a>
                            </h2>
                            <div class="byline">
                                <span class="text-orange">2016-05-20 12:01:39</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="block">
                        <div class="block_content">
                            <h2 class="title">
                                <a class="text-orange">快件到达【上海嘉定外岗营业点】</a>
                            </h2>
                            <div class="byline">
                                <span class="text-orange">2016-05-20 12:01:39</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="blank_5"></div>
        <div class="blank_5"></div>

    </div>

    <footer>
      <input type="button" class="btn btn-primary" value="查看物流">
    </footer>
</div>
</template>
<script>
	import Util from '../assets/util.js';
    import povertyMask from './povertyMask.vue';

	export default {
		data () {
			return {
				ogisticsCompany: "",
				ogisticsNo : "",
				loveNo : "",
				id : "",
				itName : "",
				"userId": "",
				"picurl": "",
				"itemsName": "",
				"itemsDesc": "",
				"realName": "",
				"address": "",
				"mobile" : "",
				"picurl" : "",
                loading:false
			}
		},
		methods : {
            getback : function(){
                window.history.back();
            }
		},
        components : {povertyMask},
		created : function(){
			this.loveNo = this.$route.params.loveNo;

			var that = this;
			var jsonStr = {
				loveNo: this.loveNo
			};
			this.$http.jsonp(Util.url,{
			    params : {
			        marked : "postCheck",
			        jsonStr : JSON.stringify(jsonStr)
			    },
			    jsonp: "callbackparam"
			}).then((response) => {
                var viewdata = response.data;
			    for(var i in response.data)
				{
					that[i] = viewdata[i];
				}
                /*that.address="宁夏回族自治区";
                that.mobile = "11111111111"*/
			}, (response) => {

			});

		}
	}
</script>
<style lang="less" scoped>
    @import '../assets/common.less';
	@import '../assets/common_in.less';

    .t1{
        padding: 15px;
        font-size: 0.14rem;

        h1{
            font-size: 0.15rem;
            font-weight: bold;
        }
        h2{
            font-size: 0.14rem;
            padding:0.1rem 0;
        }
        h3{
            font-size: 0.14rem;
        }
    }
    .t2{
        padding: 15px 30px;

        h1{
            font-size: 0.15rem;
            font-weight: bold;

        }
        h2{
            font-size: 0.14rem;
            font-weight: normal;
            padding: 0.1rem 0;
        }
        h3{
            font-size: 0.14rem;
        }
        
    }
    .t3{
        padding: 15px;
        height: 100px;
        img{
            float: left;
            width: 60px;
            height: 60px;
        }
        .ttt{
            margin-left: 90px;
            .s1{
                font-size: 0.15rem;
                font-weight: bold;
            }
            .s2{
                padding: 5px 0;
            }
        }
    }
</style>