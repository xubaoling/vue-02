<template>
<poverty-mask :loading="loading"></poverty-mask>
	<header>
		<span class="pull-left" v-link="{'name':'personal'}">返回</span>个人中心
	</header>

	<article>
	<form>
		<validator name="validation">
	        <div class="input-group">
			  <span class="input-group-addon">昵称</span>
			  <input type="text" class="form-control" aria-describedby="basic-addon1" placeholder="昵称，不超过20个字" v-model="nickName" v-validate:nickname="{required:true,maxlength:20}">
			</div>
	        <div class="input-group">
			  <span class="input-group-addon">真实姓名</span>
			  <input type="text" class="form-control" placeholder="姓名" aria-describedby="basic-addon1" placeholder="真实姓名" v-model="realName" v-validate:realName="{required:true,maxlength:10}">
			</div>
	        <!-- <div class="form-group">
	        	<label for="nickname" style="width:30%;text-align:center;margin-top:0.1rem">性别 ：</label> 
	        	<input type="radio" id="one" value="1" v-model="bstGender"><label for="one">男</label>&nbsp
	        	<input type="radio" id="two" value="0" v-model="bstGender"><label for="two">女</label>
	        	<label class="radio-inline">
	        	  <input type="radio" name="inlineRadioOptions" v-model="bstGender" value="1">男
	        	</label>
	        	<label class="radio-inline">
	        	  <input type="radio" name="inlineRadioOptions" v-model="bstGender" value="0">女
	        	</label>
	        </div> -->
            <div class="input-group">
    		  <span class="input-group-addon">性别</span>
    		  <input type="text" class="form-control" placeholder="性别" aria-describedby="basic-addon1" placeholder="性别" v-model="gender" @click="showModal_gender=true">
    		</div>
    		<modal :show.sync="showModal_gender" width="300" ok-text="确定" cancel-text="取消" id="genderSelect">
    			<div slot="modal-header" class="modal-header">
    			  <h4 class="modal-title">选择性别</h4>
    			</div>
	    		<div slot="modal-body" class="modal-body">
	    		    <div class="gender" @click="gender2man">男</div>
	    		    <div class="gender" @click="gender2woman">女</div>
	    		</div>
	    		<div slot="modal-footer" class="modal-footer">
	    		</div>
    		</modal>
            <div class="input-group">
    		  <span class="input-group-addon">年龄</span>
    		  <input type="number" class="form-control" placeholder="姓名" aria-describedby="basic-addon1" placeholder="年龄" v-model="age" max="200" min="0"  v-validate:age="{required:true}">
    		</div>
	        <div class="input-group">
			  <span class="input-group-addon">手机号</span>
			  <input type="number" class="form-control" placeholder="手机" aria-describedby="basic-addon1" placeholder="手机号" v-bind:disabled="telDisabled" v-model="phone" v-validate:tel="{required:true,tel:true}">
			</div>
	        <div class="input-group">
			  <span class="input-group-addon">身份证号</span>
			  <input type="text" class="form-control" placeholder="姓名" aria-describedby="basic-addon1" placeholder="根据相关法律，需要您提供有效的身份证信息" v-model="cardNo" v-validate:IDcard="{required:true,IDcard:true}">
			</div>
			<div class="addressCss" v-if="userType==2">
				<p>
					<small>户籍所在地</small>
					<span class="pull-right" @click="changeRegion">点击修改</span>
				</p>
				<div>
					{{address}}
				</div>
			</div>
			<modal :show.sync="showModal_region" width="300" ok-text="确定" cancel-text="取消">
			  <div slot="modal-header" class="modal-header">
			    <h4 class="modal-title">选择所在地域</h4>
			  </div>
			  <div slot="modal-body" class="modal-body">
			    <ul class="list-unstyled-it timeline clearfix">
			      <li v-for="item in regionArr" @click="getRegionData(item.addressCode,item.addressName)">{{item.addressName}}</li>
			    </ul>
			  </div>
			  <div slot="modal-footer" class="modal-footer">
			    <!-- <button type="button" class="btn btn-default" @click="showModal=false;itid=0">取消</button>
			    <button type="button" class="btn btn-primary" @click="showModal=false">确定</button> -->
			  </div>
			</modal>
		</validator>
	</form>
	</article>
	<footer>
		<input type="button" class="btn btn-primary" value="提交修改" @click="submitModify">
	</footer>
</template>
<script>
import Util from '../assets/util.js';
import {modal} from 'vue-strap';
import povertyMask from './povertyMask.vue';

export default {
	data () {
		return {
			userType : localStorage.getItem('userType'),
			userId : localStorage.getItem('userId'),
			nickName : "",
			headPath : "",
			realName : "",
			age: "",
			bstGender:"",
			phone : "",
			cardNo : "",
			fillpass : false,
			regionid : "",
			address : "",
			hasOpenRegion : false,
			telDisabled : true,
			showModal_region : false,
			showModal_gender : false,
			regionArr : [],
			aaa002 : '',
			regionNum : 0,		//第几次
			addressNameArr : [],
			addressCodeArr : [],
			loading:false
		}
	},
	computed : {
		gender : function(){
			if(this.bstGender=="1"){
				return "男";
			}else if(this.bstGender=="2"){
				return "女";
			}else{
				return "";
			}
		}
	},
	components : {modal,povertyMask},
	methods : {
		submitModify : function(){
			if(this.$validation.invalid){
				if(window.toast){
					window.toast.h5Toast('请重新填写提示区域！');
				}else{
					alert("请重新填写提示区域！")
				}
				
				return;
			}
			this.modifyInfo();
		},
		getRegionData : function(addressCode,addressName){

			this.aaa002 = addressCode;
			this.regionNum++;
			console.log(this.regionNum);
			
			if(this.regionNum!=1)			//每次都往数组里推
			{
				this.addressNameArr.push(addressName);
				this.addressCodeArr.push(addressCode);
			}
			
			if(this.regionNum ==6)
			{
				this.showModal_region = false;
				this.address = this.addressNameArr.join(',');
				this.regionid = this.addressCodeArr.join(',');

				this.regionNum = 0;
				this.addressNameArr = [];
				this.addressCodeArr = [];
			}
			

		    var jsonStr = {
		        aaa002 :this.aaa002
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
		modifyInfo : function(){
			if(this.userType==2&&this.regionid==""){
				window.toast.h5Toast('请选择户籍所在地');
				return;
			}

			var jsonStr = {
				userType : this.userType,
				Id : this.userId,
				nickName :this.nickName,
				headPath : this.headPath,
				realName : this.realName,
				age :this.age,
				gender : this.bstGender,
				phone : this.phone,
				cardNo : this.cardNo,
				regionid : this.regionid,
				address : this.address
			};

			this.$http.jsonp(Util.url,{
			    params : {
			        marked : "changeAppUsersInfo",
			        jsonStr : JSON.stringify(jsonStr)
			    },
			    jsonp: "callbackparam"
			}).then((response) => {
			    if(response.data.rspCode=="000")
				{
					if(window.toast){
						window.toast.h5Toast('修改成功');
					}else{
						alert("修改成功");
					}
					this.getInfo();
					window.history.back();
				}else{
					if(window.toast){
						window.toast.h5Toast('修改失败');
					}else{
						alert("修改失败");
					}
				}
			}, (response) => {

			});
		},
		getInfo :function(){
			var jsonStr = {
				userType : localStorage.getItem('userType'),
				userId : localStorage.getItem('userId')
			};
			/*var jsonStr = {
				userType : "2",
				userId : "1720"
			};*/

			var that = this;

			this.$http.jsonp(Util.url,{
				params: {
					'marked' : 'getAppUsersInfo',
					jsonStr : JSON.stringify(jsonStr)
				},
	        	jsonp: "callbackparam"
			}).then((response) => {
				var viewdata = response.data;
		        for(var _it in viewdata)
				{
					that[_it] = viewdata[_it];
				}

				if(!viewdata.phone){
					that.telDisabled = false;
				}	    
			}, (response) => {

		    })
		},
		changeRegion : function(){
			this.showModal_region=true;
			this.addressNameArr = [];
			this.addressCodeArr = [];
			this.getRegionData('100');
		},
		gender2man : function(){
			this.bstGender = "1";
			this.showModal_gender = false;
		},
		gender2woman : function(){
			this.bstGender = "2";
			this.showModal_gender = false;
		}

	},
	validators : {
		tel : function(val){
			return /^\d{11}$/.test(val);
		},
		IDcard : function(val){
			return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(val);
		}
	},
	created : function(){
		this.getInfo();
	},
	ready : function(){
	}
}
</script>
<style lang="less" scoped>
	@import '../assets/common_in.less';
	article{
		margin-top: 0.54rem;
	}
	.gender{
		display: inline-block;
		width: 50%;
		height:1rem;
		line-height: 1rem;
		font-size: 0.18rem;
		float: left
	}
	form>div{
		margin-bottom: 0.12rem;
		padding: 0 0.12rem;
	}

	div.input-group{
		width: 100%;

		span{
			width: 30%;
		}
		
	}
	.addressCss{
		margin: 0.12rem 0.14rem;

		small{
			font-size: 0.14rem;
		}
	}
	p{
		font-size: 0.14rem;
		margin-bottom: 0.1rem;
		span{
			color:#337ab7;
		}
	}
	div.form-group{
		margin-bottom: 0.06rem;
		margin-top:-0.1rem;
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
	  height: 0.4rem;
	}
	#one,#two{
		width: 0.2rem;
		height: 0.2rem;
		padding-right: 1rem;
		padding-left: 1rem;
	}
	#one+label{
		font-size: 0.16rem;
	}

	#genderSelect{
		text-align: center
	}

</style>