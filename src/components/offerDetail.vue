<template>
<poverty-mask :loading="loading"></poverty-mask>
    <header><span class="pull-left" @click="getback">返回</span>捐赠信息</header>
    <article data-page="donation-Info-Check">
        <!-- s<div class="ln_solid"></div>
        <div class="big-box goods_category">
            <span>{{itemsName}}</span>
            <a>{{itName}}</a>
        </div>
        <div class="ln_solid"></div>
        <div class="big-box wordstopoor">
            <p>
            {{reason}}
            </p>
            <p>
                <span>{{realname}}</span>
                <small class="pull-right">
                    <span>2016-04-24</span><span>08:53:39</span>
                    <span>{{publishTime}}</span>
                </small>
            </p>
        </div>
        <div class="ln_solid"></div>
        <div class="blank_5"></div>
        <div class="ln_solid"></div>
        <div class="big-box goods-show">
            <h2>{{itemsDesc}}</h2>
            <img v-bind:src="homePicUrl" id="pic0">
        </div>
        <div class="ln_solid"></div> -->
        <div class="title_m">
            <span class="glyphicon glyphicon-list-alt"></span>
            <small>基本信息</small>
        </div>
        <div class="row_m">
            <span>物品类别：</span>
            <small>{{itName}}</small>
        </div>
        <div class="ln_solid"></div>
        <div class="row_m">
            <span>物品名称：</span>
            <small>{{itemsName}}</small>
        </div>
         <div class="ln_solid"></div>
        <div class="row_m">
            <span>物品描述：</span>
            <small>{{itemsDesc}}</small>
        </div>

        <div class="ln_solid"></div>
        <div class="row_m">
            <span>申请人数：</span>
            <small>{{appliyCount}}人</small>
        </div>
        <div class="ln_solid"></div>
        <div class="row_m">
            <span>发布时间：</span>
            <small>{{publishTime}}</small>
        </div>
        <div class="ln_solid"></div>
        <div class="title_m title_change">
            <span class="glyphicon glyphicon-list-alt"></span>
            <small>发布详情</small>
        </div>
        <div class="desc_m">

            <small>{{reason}}</small>
            <img :src="homePicUrl" alt="">
        </div>
        
    </article>
    <footer class="donation-Info" style="display: none">
        <span>申请（3）</span>
        <span class="pull-right">
            <span class="fa fa-edit"><p>编辑</p></span>
            <span class="fa fa-trash-o"><p>删除</p></span>
        </span>
    </footer>
    <footer class="donation-Info-Apply" v-if="localUserId!=userId">
        <span class="pull-left">
            <!-- <span class="fa fa-share-square-o"><p>分享</p></span> -->
            <span class="fa fa-star" v-if="alyCollect==true" @click="cancelCollect"><p>取消收藏</p></span>
            <span class="fa fa-star-o" v-if="alyCollect==false" @click="toCollect"><p>收藏</p></span>
        </span>
        <span class="pull-right inline-box" @click="toApply" v-if="userType==2">申请</span>
    </footer>
</template>
<script>
    import Util from '../assets/util.js'
    import povertyMask from './povertyMask.vue'

    export default {
        data () {
            return {
                dlid: "",
                loveNo : "",
                itemsName : "",
                itemsDesc:"",
                userId : "",            //捐赠者的ID
                itName :"",
                reason :"",
                publishTime : "",
                homePicUrl : "",
                isHide : "",
                realname : "",
                appliyCount : "",
                userType : localStorage.getItem('userType'),    //当前用户的userType
                alyCollect:false,
                localUserId : localStorage.getItem("userId"),    ////当前用户的userId
                loading:false
            }
        },
        components : {povertyMask},
        methods : {
            getback : function(){
                window.history.back();
            },
            toApply : function(){
                var that = this;
                this.$router.go({
                    name : 'applyGoods',
                    params : {
                        loveNo : that.loveNo
                    }
                })
            },
            getDonationDetail : function(){
                var that = this;
                var jsonStr = {loveNo:this.loveNo};

                this.$http.jsonp(Util.url,{
                    params : {
                        marked : "donateDetail",
                        jsonStr : JSON.stringify(jsonStr)
                    },
                    jsonp: "callbackparam"
                }).then((response) => {
                    for (var _it in response.data) {
                        that[_it] = response.data[_it];
                    }

                    this.getCollectStatus();        //写在这儿是因为需要返回值中的dlid
                }, (response) => {

                });

                
            },
            getCollectStatus : function(){
                var jsonStr = {
                    userId : this.localUserId,
                    phId : "",
                    dlId : this.dlid,
                    loveNo : this.loveNo,
                    type :"3"
                };
                var that = this;

                this.$http.jsonp(Util.url,{
                    params : {
                        marked : "reserveCheck",
                        jsonStr : JSON.stringify(jsonStr)
                    },
                    jsonp: "callbackparam"
                }).then((response) => {
                    if(response.data.flag=="1")
                    {
                        that.alyCollect = true;
                    }else{
                        that.alyCollect = false;
                    }
                }, (response) => {

                });
            },
            toCollect : function(){
                var jsonStr = {
                    userId : this.localUserId,
                    phId : "",
                    dlId : this.dlid,       //需求详情里填
                    loveNo : this.loveNo,
                    type :"3"
                };

                var that = this;

                this.$http.jsonp(Util.url,{
                    params : {
                        marked : "reserveAdd",
                        jsonStr : JSON.stringify(jsonStr)
                    },
                    jsonp: "callbackparam"
                }).then((response) => {
                    that.getCollectStatus();
                }, (response) => {

                });

            },
            cancelCollect : function(){
                var jsonStr = {
                    id : "",
                    userId : this.localUserId,
                    phId : "0",
                    dlId : this.dlid,
                    type :"3"
                };
                var that = this;

                this.$http.jsonp(Util.url,{
                    params : {
                        marked : "reserveDel",
                        jsonStr : JSON.stringify(jsonStr)
                    },
                    jsonp: "callbackparam"
                }).then((response) => {
                    that.getCollectStatus();
                }, (response) => {

                });
            }
        },
        created : function(){
           this.loveNo = this.$route.params['loveNo'];
           this.getDonationDetail();
        }
    }
</script>
<style lang="less" scoped>
    @import "../assets/common_in.less";

    
.ln_solid{
        width: 100%;
        height: 0rem;
        border-top: 0.01rem solid #ddd;
    }

    div.title_m{
        padding: 0.12rem 0.12rem 0.06rem 0.12rem;
        color: #d9534e;

        span{
            font-size: 0.16rem;
        }
        small{
            font-size: 0.16rem;
        }
        
    }
    div.row_m{
        padding: 0.06rem 0.12rem;
        font-size: 0.16rem;

        span{
            font-family: "黑体";
            margin-right: 0.1rem;
        }

        small{
            font-size: 0.13999999999999999rem;
            color: #999;
        }
    }

    div.desc_m{
        padding: 0.06rem 0.12rem;
        
        small{
            font-size: 0.16rem;
            font-family: '黑体';
        }
        img{
            margin-top: 0.12rem;
            width: 100%;
        }
    }


    /* color: @footer-text-donation; */
    /*.big-box img {
      width: 100%;
      height: 100%;
      padding: 15px;
    }
    
    .wordstopoor p:first-child {
      padding: 10px 15px;
      line-height: 22px;
      font-size: 1.5rem;
    }
    .wordstopoor p:last-child {
      padding: 0px 15px 6px 15px;
      font-size: 1.2rem;
      span {
        color: @list-box-text-2;
      }
      small span {
        color: @list-box-text-3;
      }
      small span:first-child {
        margin-right: 10px;
      }
    }
    
    .goods-show {
      padding-top: 20px;
      h2 {
        padding: 0 15px;
        line-height: 15px;
        font-size: 1.5rem;
      }
    } */
</style>