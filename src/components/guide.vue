<template>
	<!-- <header>引导</header>
	    <validator name="validation1" @valid="fillpass=true" @invalid="fillpass=false">
	        <form name="validation1">
	          <div>
	            <button class="btn btn-primary submit" style="width: 100%" v-link="{name:'register',params:{userType:1}}">注册为捐赠者</button>
	            <button class="btn btn-primary submit" style="width: 100%" v-link="{name:'register',params:{userType:2}}">注册为受助者</button>
	          </div>
	          <p class="change_link">
	            <a v-link="{name:'login'}" class="to_register">已经注册过了？现在去登陆</a>
	          </p>
	        </form>
	    </validator> -->
	    <div class="denglu">
		    <div class="top">
		      引导
		    </div>
		    <div class="denglukuang">
		        <a href="javascript:;" v-link="{name:'register',params:{userType:1}}"><div class="juan_input">注册为捐赠者</div></a>
		        <a href="javascript:;" v-link="{name:'register',params:{userType:2}}"><div class="juan_input01">注册为受助者</div></a>
		        <a href="javascript:;" v-link="{name:'login'}"><div class="forget">已经注册过了?现在去登录</div></a>
		    </div>
	    <div>
</template>
<script>
	export default {
		methods : {

		}
	}
</script>
<style lang="less" scoped>
	/* @import '../assets/common_in.less';
	
	form{
		margin-top: 0.56rem;
	}
	button{
		margin-bottom: 0.16rem;
	}
	p{
		text-align: center;
		a{
			color:#337ab7;
		}
	} */
	/*login*/
	.top{ width:100%; background:#f75354; padding-bottom:0.2em; overflow:hidden; position:relative;height: 52px;line-height: 52px;font-size: 24px;text-align: center;color: #fff}
	.denglu{ float:left; width:100%; height:100%;}
	.bg_login{ width:100%; height:14em; float:left; background:url(../img/001.png) center top no-repeat; background-size:cover;}
	.denglukuang{ width:100%;  float:left;}
	.denglu_01{ width:90%; padding:0 5%;}
	.denglu_01 input{ margin-top:0.2em; width:90%; height:3em; border:none; border-bottom:1px solid #e3e5da; padding-left:10%; font-size:1.2em; font-family:Microsoft Yahei; color:#3d4c4f;}
	#input_00{ margin-top:0.6em; background:url(../img/002.png) left no-repeat; background-size:1.4em;}
	#input_000{ margin-top:0.6em; background:url(../img/004.png) left no-repeat; background-size:1.4em;}
	#input_01{ background:url(../img/003.png) left no-repeat; background-size:1.4em;}
	#input_02{ background:url(../img/002.png) left no-repeat; background-size:1.4em;}
	.juan_input{ width:70%; margin:2em auto; background:#f75354; border-radius:1em; line-height:2.4em; margin-bottom:1em; text-align:center; font-size:1.2em; font-family:Microsoft Yahei; color:#fff;}
	.juan_input01{ width:70%; margin:0 auto; background:#f75354; border-radius:1em; line-height:2.4em; margin-bottom:1em; text-align:center; font-size:1.2em; font-family:Microsoft Yahei; color:#fff;}
	.forget{ width:60%; margin:0 auto; text-align:center; font-size:1em; font-family:Microsoft Yahei; margin-top:4em; color:#999;}
</style>
