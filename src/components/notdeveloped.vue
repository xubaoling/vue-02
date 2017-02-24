<template>
	<header>
		<a class="pull-left" @click="getback">返回</a>
		<span>我要钱</span>
	</header>
	<p class="undeveloped">该功能尚未开发</p>
</template>
<style scoped lang="less">
	@import '../assets/common_in.less';

	p.undeveloped{
        font-size: 0.20rem;
        text-align: center;
        height: 1rem;
        line-height: 0.160rem;
    }
</style>
<script>
	export default {
		methods : {
			getback : function(){
				window.history.back();
			}
		}
	}
</script>