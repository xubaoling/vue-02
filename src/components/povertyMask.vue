<template>
	<div class="mask" v-if="loading">
	    <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
	</div>
</template>
<style lang="less" scoped>
	div.mask{
	  position: fixed;
	  top: 0;
	  left:0;
	  width: 100%;
	  height: 100%;
	  z-index: 10000;
	  background-color: #000;
	  opacity:0.4;

	  div.v-spinner{
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform:translate(-50%,-50%);
	  }
	}
</style>
<script>
	import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

	export default {
		props : ['loading'],
		data(){
			return {
				size : '24px'
			}
		},
		created : function(){
		},
		components : {PulseLoader}
	}
</script>