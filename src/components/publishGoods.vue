<template>
<poverty-mask :loading="loading"></poverty-mask>

	<header>
		<span class="pull-left" v-link="{name:'need'}">返回</span>
		发布信息
	</header>

	<article data-page="publish-goods"> 
	<validator name="validation" @valid="fillpass=true" @invalid="fillpass=false">
		<div class="big-box">
			<input type="text" class="form-control" placeholder="物品名称,不超过20个字" v-model="itemsName" v-validate:itemsname="{required:true,maxlength:20}" style="height:50px">
		</div>
		<div class="ln_solid"></div>
		<div class="big-box">
			<textarea class="form-control" rows="4" style="resize:none" placeholder="描述一下您需求的物品详情,最多80字" v-model="itemsDesc" v-validate:itemsDesc="{required:true,maxlength:80}" style="margin:0"></textarea>		
		</div>
		<div class="goods_category" @click="toCategory">
			<span>物品分类&nbsp{{itname}}</span>
			<a href="" class="pull-right"><span class="fa fa-angle-right"></span></a>
		</div>
		<modal :show.sync="showModal" width="300">
		  <div slot="modal-header" class="modal-header">
		    <h4 class="modal-title">物品分类</h4>
		  </div>
		  <div slot="modal-body" class="modal-body">
		    <ul class="list-unstyled-it timeline">
		      <li @click="chooseIt('1')">服饰</li>
		      <li @click="chooseIt('2')">鞋靴</li>
		      <li @click="chooseIt('3')">运动</li>
		      <li @click="chooseIt('4')">母婴</li>
		      <li @click="chooseIt('5')">家具</li>
		      <li @click="chooseIt('6')">玩具</li>
		      <li @click="chooseIt('7')">箱包</li>
		      <li @click="chooseIt('8')">书籍</li>
		      <li @click="chooseIt('9')">电器</li>
		      <li @click="chooseIt('10')">数码</li>
		      <li @click="chooseIt('11')">乐器</li>
		      <li @click="chooseIt('12')">食品</li>
		      <li @click="chooseIt('13')">日用</li>
		      <li @click="chooseIt('14')">文具</li>
		      <li @click="chooseIt('15')">其他</li>
		    </ul>
		  </div>
		  <div slot="modal-footer" class="modal-footer">
		    <!-- <button type="button" class="btn btn-default" @click="showModal=false;itid=0">取消</button>
		    <button type="button" class="btn btn-primary" @click="showModal=false">确定</button> -->
		  </div>
		</modal>
		<div class="big-box">
			<textarea name="" id="" class="form-control" rows="4" placeholder="讲述您的故事,不超过80个字" style="resize:none" v-model="reason" v-validate:reason="{required:true,maxlength:80}"></textarea>
			<div class="ln_solid"></div>
			<img v-bind:src="homePicUrl" alt="" class="add-img" @click="selImg">
		</div>
		<div class="big-box address">
		    <p class="name">受捐人：<span>{{name}}</span><span class="btn btn-default  btn-sm pull-right"  @click="changAddress">修改地址</span></p>
		    <p v-if="!changeNow">{{address}}</p>
		    <textarea name="" id="" class="form-control" cols="30" rows="3" placeholder="邮寄地址" v-model="address" style="resize:none;padding:0;font-size:13px;border:1px solid" v-if="changeNow"></textarea>
		    <p>{{telephone}}</p>
		</div>
		<modal :show.sync="showModal_address" width="300">
		  <div slot="modal-header" class="modal-header">
		    <h4 class="modal-title">请填写您的邮寄地址</h4>
		  </div>
		  <div slot="modal-body" class="modal-body">
		    <textarea class="form-control" cols="30" rows="4" v-model = "address_mail"></textarea>
		  </div>
		  <div slot="modal-footer" class="modal-footer">
		    <button type="button" class="btn btn-default" @click="cancelMailAddress">取消</button>
		    <button type="button" class="btn btn-primary" @click="confirmMailAddress">确定</button>
		  </div>
		</modal>
	</validator>
	</article>
	<footer>
		<input type="button" class="btn btn-primary" value="发布需求申请" @click="submitNeed" :disabled="$validation.invalid">
	</footer>
</template>
<script>
	import Util from '../assets/util.js';
	import { modal } from 'vue-strap';
	import povertyMask from './povertyMask.vue';

	export default {
		data(){
			return {
				itemsName : "",
				itemsDesc:"",
				itid :'0',
				category:"",
				reason : "",
				homePicUrl : 'http://7xqgvd.com1.z0.glb.clouddn.com/upload.png',
				address :"",
				address_mail : "",
				name : "",
				telephone : "",
				changeNow : false,
				fillpass : false,
				showModal : false,
				showModal_address : false,
				loading:false,
				regionid : ""
			}
		},
		computed : {
			itname : function(){
				var that = this;
				var arr = ['','服饰','鞋靴','运动','母婴','家具','玩具','箱包','书籍','电器','数码','乐器','食品','日用','文具','其他'];
				return arr[parseInt(that.itid)];
			}
		},
		methods:{
			cancelMailAddress : function(){
				this.address_mail = "";
				this.showModal_address = false;
			},
			confirmMailAddress : function(){
				this.address = this.address_mail;
				this.showModal_address = false;
			},
			submitNeed:function(){
				if(!this.fillpass)
				{
					if(window.toast)
					{
						window.toast.h5Toast("请重新填写提示项");
					}else{
						alert("请重新填写提示项");
					}
					return;
				}
				if(this.itid=="0")
				{
					if(window.toast)
					{
						window.toast.h5Toast("请选择物品类别");
					}else{
						alert("请选择物品类别");
					}
					return;
				}
				if(this.homePicUrl == "http://7xqgvd.com1.z0.glb.clouddn.com/upload.png"||(!this.homePicUrl))
				{
					if(window.toast)
					{
						window.toast.h5Toast("请选择图片");
					}else{
						alert("请选择上传图片");
					}
					return;
				}
				

				var jsonStr = {
					type : "1",	//1物 2钱
					userId : localStorage.getItem("userId"),
					itemsName : this.itemsName,
					itemsDesc : this.itemsDesc,
					reason : this.reason,
					itId : this.itid?this.itid:"1",
					homePicUrl :this.homePicUrl,
					bstMailAddress : this.address,
					bstphone : this.telephone,
					regionid : this.regionid
				};
				var that = this;

				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "publishHelp",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					if(response.data.rspCode=="000")
					{
						if(window.toast)
						{
							window.toast.h5Toast('发布成功,请耐心等待审核');
							that.$router.go({
								name : 'donate'
							})
						}else{
							alert('发布成功')
						}
						
						that.$route.go({
							name : 'need'
						})
					}else{
						window.toast.h5Toast(response.data.rspDesc);
					}

				}, (response) => {

				});
			},
			selImg : function(){
				window.demo.revert("");
				this.loading=true;
			},
			toCategory : function(){
				this.showModal = true;
			},
			changAddress : function(){
				this.showModal_address = true;
			},
			chooseIt : function(itId){
				this.itid = itId;

				this.showModal = false;
			}
		},
		created : function(){

			var jsonStr = {};
			jsonStr.userType = localStorage.getItem('userType');
			jsonStr.userId = localStorage.getItem('userId');

			var that = this;

			this.$http.jsonp(Util.url,{
			    params : {
			        marked : "getAppUsersInfo",
			        jsonStr : JSON.stringify(jsonStr)
			    },
			    jsonp: "callbackparam"
			}).then((response) => {

				if(response.data.tochangeInfo){
					if(window.toast)
					{
						window.toast.h5Toast('根据相关要求，请您先完善个人资料');
					}else{
						alert('根据相关要求，请您先完善个人资料');
					}
					
					that.$router.go({
						name:'personalCenter'
					})
				}else{
					that.regionid=response.data.regionid;
					window.wave2 = function(name,url) {
						if(!url){
							window.toast.h5Toast('上传失败');
						}else{
							that.homePicUrl = url;
						}
						that.loading = false;
					};
				}

				that.address = response.data.address;
				that.name = response.data.realName;
				that.telephone = response.data.phone;
			}, (response) => {
			});
		},
		components : {
			modal,povertyMask
		}
	}
</script>
<style lang="less" scoped>
	@import '../assets/common_in.less';

	article[data-page=publish-goods] {
	  margin-top: @header-height;
	  margin-bottom: @footer-height;
	  .ln_solid {
	    margin: 0;
	  }
	  .big-box {
	    input {
	      border: none;
	      box-shadow: none;
	    }
	    textarea {
	      width: 100%;
	      border: none;
	      border-shadow: none;
	    }
	    img.add-img {
	      width: 0.75rem;
	      height: 0.75rem;
	      margin: 0.15rem;
	    }
	  }
	  .goods_category {
	    height: 0.4rem;
	    border-top: 0.01rem solid #e7e7e7;
	    border-bottom: 0.01rem solid #e7e7e7;
	    margin: 0.06rem 0;
	    line-height: 0.4rem;
	    font-size: 0.15rem;
	    padding: 0 0.12rem;
	    span.fa-angle-right {
	      margin-top: 0.05rem;
	      font-size: 0.24rem;
	    }
	  }
	  .address {
	    padding: 0.1rem 0.15rem;
	    .name {
	      font-size: 0.16rem;
	    }
	    .btn {
	      padding: 0.01rem 0.1rem;
	    }
	    p {
	      margin-bottom: 0.05rem;
	    }
	  }
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
	div.ln_solid{
		border-top: 0.01rem solid #ddd;
	}

</style>