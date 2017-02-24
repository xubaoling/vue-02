<template>
  <router-view></router-view>
</template>

<script>
export default {
	created:function(){
		document.documentElement.style.fontSize = window.innerWidth/3.75 + 'px';
	}
}
</script>
<style>
@import '../assets/reset.less';

html{
	font-size: calc(100vw/3.75);
} 
</style>
