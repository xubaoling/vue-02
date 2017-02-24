<template>
<poverty-mask :loading="loading"></poverty-mask>
	<header><span class="pull-left" v-link="{name:'donate'}">取消</span>捐赠信息</header>

	<article data-page="donation-Info">
	<validator name="validation" @valid="fillpass=true" @invalid="fillpass=false">
	    <div class="ln_solid"></div>
	    <div class="big-box">
	        <input type="text" class="form-control" placeholder="物品名称,不超过20个字" v-model="itemsname" v-validate:itemsname="{required:true,maxlength:20}" style="height:50px">
	    </div>
	    <div class="ln_solid"></div>
	    <div class="big-box">
	        <textarea class="form-control" placeholder="讲述一下您的物品。如型号、颜色,80字以内" rows="4" style="resize:none" v-model="itemsdesc" v-validate:itemsdesc="{required:true,maxlength:80}"></textarea>
	        <img class="add-img" @click="uploadPic" v-bind:src="picUrl">
	    </div>
	    <div class="goods_category" @click="showModal=true">
	        <span>物品分类&nbsp{{itname}}</span>
	        <a href="" class="pull-right"><span class="fa fa-angle-right"></span></a>
	    </div>
	    <modal :show.sync="showModal" width="300" ok-text="确定" cancel-text="取消">
	      <div slot="modal-header" class="modal-header">
	        <h4 class="modal-title">物品分类</h4>
	      </div>
	      <div slot="modal-body" class="modal-body">
	      	<ul class="list-unstyled timeline">
	      		<li @click="chooseIt(1)">服饰</li>
	      		<li @click="chooseIt(2)">鞋靴</li>
	      		<li @click="chooseIt(3)">运动</li>
	      		<li @click="chooseIt(4)">母婴</li>
	      		<li @click="chooseIt(5)">家具</li>
	      		<li @click="chooseIt(6)">玩具</li>
	      		<li @click="chooseIt(7)">箱包</li>
	      		<li @click="chooseIt(8)">书籍</li>
	      		<li @click="chooseIt(9)">电器</li>
	      		<li @click="chooseIt(10)">数码</li>
	      		<li @click="chooseIt(11)">乐器</li>
	      		<li @click="chooseIt(12)">食品</li>
	      		<li @click="chooseIt(13)">日用</li>
	      		<li @click="chooseIt(14)">文具</li>
	      		<li @click="chooseIt(15)">其他</li>
	      	</ul>
	      </div>
	      <div slot="modal-footer" class="modal-footer">
	      	<!-- <button type="button" class="btn btn-default" @click="showModal=false;itid=0">取消</button>
	      	<button type="button" class="btn btn-primary" @click="showModal=false">确定</button> -->
	      </div>
	    </modal>
	    <div class="big-box ">
	        <textarea  class="form-control inline-box" rows="4" placeholder="您想对受捐者说的话，80字以内" style="resize:none" v-model="reason" v-validate:reason="{required:true,maxlength:80}"></textarea>
	    </div>
	    <div class="ln_solid"></div>
	    <div class="big-box bank-box">
	        <span class="bank inline-box">匿名捐助</span>
	        <div class="inline-box pull-right">
	            <input type="checkbox" class="js-switch" checked />
	        </div>
	    </div>
	    <div class="ln_solid"></div>
	</validator>

	</article>
	<footer>
	    <input class="btn btn-primary" type="button" @click="verificate" value="发布捐赠信息" :disabled="$validation.invalid"></input>
	</footer>
</template>
<script>
import Util from '../assets/util.js'
import { modal } from 'vue-strap'
import povertyMask from './povertyMask.vue';

	export default {
		data (){
			return {
				userId : localStorage.getItem('userId'),
				itemsname :'',
				itemsdesc :'',
				reason : '',
				itid :'0',
				picUrl :'http://7xqgvd.com1.z0.glb.clouddn.com/upload.png',
				ishide :'0',
				itname : "",
				fillpass:false,
				incategory:false,
				showModal:false,
				loading:false
			}
		},
		components : {modal,povertyMask},
		computed:{
			itname : function(){
				var that = this;
				var arr = ['','服饰','鞋靴','运动','母婴','家具','玩具','箱包','书籍','电器','数码','乐器','食品','日用','文具','其他'];
				return arr[parseInt(that.itid)];
			}
		},
		methods:{
			verificate : function(){
				console.log(this.pass);
				if(!this.fillpass)
				{
					if(window.toast)
					{
						window.toast.h5Toast("请填写空白项");
					}else{
						alert("请填写空白项")
					}	
					return;
				}
				if(this.picUrl=="http://7xqgvd.com1.z0.glb.clouddn.com/upload.png"){
					if(window.toast)
					{
						window.toast.h5Toast("请上传图片");
					}else{
						alert("请上传图片")
					}					
					return;
				}
				if(this.itid=="0")
				{
					if(window.toast)
					{
						window.toast.h5Toast("请选择物品类别");
					}else{
						alert("请选择物品类别")
					}					
					return;
				}
				this.publishDonate();
			},
			publishDonate : function(){

				

				var stateBtn = document.querySelector('.js-switch');

				var jsonStr = {
					contributorid : this.userId,
					itemsname :this.itemsname,
					itemsdesc :this.itemsdesc,
					reason : this.reason,
					itid : this.itid,
					picurl:this.picUrl,
					ishide:stateBtn.checked?1:0
				}
				this.$http.jsonp(Util.url,{
				    params : {
				        marked : "publishDonateLove",
				        jsonStr : JSON.stringify(jsonStr)
				    },
				    jsonp: "callbackparam"
				}).then((response) => {

					if(response.data.rspCode=="000")
					{
						window.toast.h5Toast("捐赠成功");
						this.$router.go({
							name:'need'
						})
					}else{
						window.toast.h5Toast("捐赠失败;"+response.data.rspDesc);
					}
				}, (response) => {

				});

			},
			uploadPic : function(){
				if(window.demo)
				{
					window.demo.revert("");
					this.loading = true;
				}
				
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
						name: 'personalCenter'
					})
				}else{
					window.wave2 = function(name,url) {
						console.log(url);
						if(!url){
							window.toast.h5Toast('上传失败');
						}else{
							that.picUrl = url;
						}
						that.loading = false;
					};
				}
			}, (response) => {

			});
		}
	}
</script>
<style lang="less" scoped>
@import '../assets/common_in.less';

.bank-box .pull-right {
    padding: 0.03rem;
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

ul.list-unstyled {
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