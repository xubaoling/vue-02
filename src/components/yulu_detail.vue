<template>
	<div class="goods_category">
		<span>个人信息<em>保存未提交</em></span>
	</div>
	<ul>
		<li>
			<span class="unchang">姓名 : </span>
			<em style="color:#ccc">&nbsp{{realName}}</em>
		</li>
		<li class="ln_solid"></li>
		<li>
			<span class="unchang">身份证 : </span>
			<em style="color:#ccc">&nbsp{{cardNo}}</em>
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>性别 : </span>
			<select name="">
				<option value="男">男</option>
				<option value="女">女</option>
			</select>
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>民族 : </span>
			<p style="display:inline-block">
				<em>&nbsp{{nation}}</em>
				
			</p>
			<button type="button" class="btn btn-default btn-xs" style="margin:0" data-toggle="dropdown" @click="showModal_nation=true"><span class="caret"></span></button>
			<modal :show.sync="showModal_nation" width="300">
			  <div slot="modal-header" class="modal-header">
			    <h4 class="modal-title">选择民族</h4>
			  </div>
			  <div slot="modal-body" class="modal-body">
			    <ul class="list-unstyled timeline nationList clearfix">
      				    <li @click="setNation">汉族</li>
      					<li @click="setNation">壮族</li>
      					<li @click="setNation">满族</li>
      					<li @click="setNation">回族</li>
      					<li @click="setNation">苗族</li>
      					<li @click="setNation">维吾尔族</li>
      					<li @click="setNation">土家族</li>
      					<li @click="setNation">彝族</li>
      					<li @click="setNation">蒙古族</li>
      					<li @click="setNation">藏族</li>
      					<li @click="setNation">布依族</li>
      					<li @click="setNation">侗族</li>
      					<li @click="setNation">瑶族</li>
      					<li @click="setNation">朝鲜族</li>
      					<li @click="setNation">白族</li>
      					<li @click="setNation">哈尼族</li>
      					<li @click="setNation">哈萨克族</li>
      					<li @click="setNation">黎族</li>
      					<li @click="setNation">傣族</li>
      					<li @click="setNation">畲族</li>
      					<li @click="setNation">傈僳族</li>
      					<li @click="setNation">仡佬族</li>
      					<li @click="setNation">东乡族</li>
      					<li @click="setNation">高山族</li>
      					<li @click="setNation">拉祜族</li>
      					<li @click="setNation">水族</li>
      					<li @click="setNation">佤族</li>
      					<li @click="setNation">纳西族</li>
      					<li @click="setNation">羌族</li>
      					<li @click="setNation">土族</li>
      					<li @click="setNation">仫佬族</li>
      					<li @click="setNation">锡伯族</li>
      					<li @click="setNation">柯尔克孜族</li>
      					<li @click="setNation">达斡尔族</li>
      					<li @click="setNation">景颇族</li>
      					<li @click="setNation">毛南族</li>
      					<li @click="setNation">撒拉族</li>
      					<li @click="setNation">布朗族</li>
      					<li @click="setNation">塔吉克族</li>
      					<li @click="setNation">阿昌族</li>
      					<li @click="setNation">普米族</li>
      					<li @click="setNation">鄂温克族</li>
      					<li @click="setNation">怒族</li>
      					<li @click="setNation">京族</li>
      					<li @click="setNation">基诺族</li>
      					<li @click="setNation">德昂族</li>
      					<li @click="setNation">保安族</li>
      					<li @click="setNation">俄罗斯族</li>
      					<li @click="setNation">裕固族</li>
      					<li @click="setNation">乌孜别克族</li>
      					<li @click="setNation">门巴族</li>
      					<li @click="setNation">鄂伦春族</li>
      					<li @click="setNation">独龙族</li>
      					<li @click="setNation">塔塔尔族</li>
      					<li @click="setNation">赫哲族</li>
      					<li @click="setNation">珞巴族</li>
			    </ul>
			  </div>
			  <div slot="modal-footer" class="modal-footer">
			    <!-- <button type="button" class="btn btn-default" @click="showModal=false;itid=0">取消</button>
			    <button type="button" class="btn btn-primary" @click="showModal=false">确定</button> -->
			  </div>
			</modal>
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>与户主关系 : </span>
			<select name="" id="">
				<option value="户主">户主</option>
				<option value="之子">之子</option>
				<option value="之儿媳">之儿媳</option>
				<option value="之孙子">之孙子</option>
				<option value="之外孙子">之外孙子</option>
				<option value="之父">之父</option>
				<option value="之岳父">之岳父</option>
				<option value="之公公">之公公</option>
				<option value="之祖父">之祖父</option>
				<option value="之外祖父">之外祖父</option>
				<option value="配偶">配偶</option>
				<option value="之女">之女</option>
				<option value="之女婿">之女婿</option>
				<option value="之孙女">之孙女</option>
				<option value="之外孙女">之外孙女</option>
				<option value="之母">之母</option>
				<option value="之岳母">之岳母</option>
				<option value="之婆婆">之婆婆</option>
				<option value="之祖母">之祖母</option>
				<option value="之外祖母">之外祖母</option>
				<option value="其他">其他</option>
			</select>
		</li>
	</ul>
	<div class="goods_category">
		<span>家庭信息</span>
	</div>
	<ul>
		<li>
			<span>户主姓名 : </span>
			<input type="text" style="border:1px solid #ddd;height:26px">
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>户主身份证 : </span>
			<input type="text" style="border:1px solid #ddd;height:26px">
			<button class="btn btn-sm pull-right" style="margin-top:5px;padding:0">验证</button>
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>家庭住址 : </span>
			<input type="text" style="border:1px solid #ddd;height:26px">
		</li>
		<li class="ln_solid"></li>
		<li>
			<span class="unchang">银行名称 : </span>
			<em style="color:#ccc">&nbsp农村信用社</em>
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>银行卡号 : </span>
			<input type="text" style="border:1px solid #ddd;height:26px">
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>开户人姓名 : </span>
			<input type="text" style="border:1px solid #ddd;height:26px">
		</li>
		<li class="ln_solid"></li>
		<li>
			<span class="unchang">初审结果 : </span>
			<em style="color:#ccc">&nbsp双不在档</em>
		</li>
	</ul>
	<div class="goods_category">
		<span>学籍内容</span>
	</div>
	<ul>
		<li>
			<span>入学时间 : </span>
			<!-- <datepicker
			  :value.sync="value"
			  :disabled-days-of-Week="disabled"
			  :Width = "width"
			  :format="format"
			  :show-reset-button="reset">
			</datepicker> -->
			<input type="date" value="2016/07/21">
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>就读学校 : </span>
			<input type="text" style="border:1px solid #ddd;height:26px">
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>就读专业 : </span>
			<input type="text" style="border:1px solid #ddd;height:26px">
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>学校性质 : </span>
			<select name="" id="">
				<option value="">中职</option>
				<option value="">高职</option>
				<option value="">大专</option>
				<option value="">其他</option>
			</select>
		</li>
		<li class="ln_solid"></li>
		<li>
			<span>学制年限 : </span>
			<input type="text" style="border:1px solid #ddd;height:26px">
		</li>
		
	</ul>
	<button class="btn btn-primary submit"  style="width: 100%" v-link="{name:'yulu-detail'}">申请</button>
</template>
<script>
	import {dropdown,modal,datepicker} from 'vue-strap';
	import Util from '../assets/util.js';

	export default {
		data () {
			return {
				showModal_nation : false,
				nation : '汉族',
				cardNo:"",
				bstGender : "",
				phone : "",
				address : "",
				regionid : "",
				nickName : "",
				age : "",
				userId : "",
				realName : "",
				userType : "",
				value : "2016-07-21",
				width : "150px",
				format : "yyyy-MM-dd",
			}
		},
		components : {dropdown,modal,datepicker},
		methods : {
			setNation : function(event){
				this.nation = event.target.innerHTML;
				this.showModal_nation = false;
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
						for(let i in response.data)						
						{
							this[i] = response.data[i];
						}
					}

				}, (response) => {

				});
		}
	}
</script>
<style lang="less" scoped>
	.goods_category {
	  height: 0.3rem;
	  border-top: 0.01rem solid #e7e7e7;
	  border-bottom: 0.01rem solid #e7e7e7;
	  line-height: 0.3rem;
	  font-size: 0.13999999999999999rem;
	  padding: 0 0.12rem;
	  
	  em {
	  	color:#F84747;
	  	padding-left: 0.2rem;
	  	font-size: 0.12rem;
	  	font-weight: bold;
	  	font-family: '黑体'
	  }
	}

	ul{
		li{
			height: 0.3rem;
			padding: 0 0.12rem;
			line-height: 0.3rem;
			font-size: 0.13999999999999999rem;
			span{
				display: inline-block;
				width: 36%;
				font-size: 0.12rem;
				text-align: right;
				font-weight: bold;
				letter-spacing: 0.02rem;
			}
		}
	}
	.unchang{
		color:#ccc
	}
	button {
		margin-top: 0.16rem;
	}
	ul.nationList{
		margin: 0.15rem;
		margin-top: -0.15rem;
		li{
		  width:25%;
		  float: left;
		  font-size: 0.13999999999999999rem;
		  padding: 0.08rem;
		  text-align: center;
		  padding-top: 0rem;
		  padding-bottom: 0rem;
		  height: 0.3rem;
		  line-height: 0.3rem;
		}
	}
	li.ln_solid{
		    height: 0rem;
		    padding: 0rem;
		    border-top: 0.01rem solid #ddd;
	}
	div.modal-footer{
		padding: 0;
	}
	div.modal-body{
		padding-bottom: 0;
	}
	input.datepicker-input{
		padding: 0rem;
	}

</style>