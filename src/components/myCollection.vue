<template>
	<header><span class="pull-left" v-link="{name:'personal'}">返回</span>我的收藏</header>

	<article data-page="personal-donator-collection1" >
	    <ul class="menu" id="navList">
	        <li :class="{'active':showNow=='release'}" @click="showNow='release'"><p>发布</p></li>
	        <li :class="{'active':showNow=='goods'}" @click="showNow='goods'"><p>物资</p></li>
	        <li :class="{'active':showNow=='money'}" @click="showNow='money'" v-if="false"><p>善款</p>
	        <!-- <li><p>消费扶贫</p></li> -->
	    </ul>
	  	<!--发布-->
	    <release v-if="showNow=='release'"></release>
	    <!--物资-->
	    <goods v-if="showNow=='goods'"></goods>
	    <!--善款-->
	    <money v-if="showNow=='false'"></money>
	    
	</article>
</template>

<script>
	import Util from '../assets/util.js';
	import release from './myCollection_release.vue';
	import goods from './myCollection_goods.vue';
	import money from './myCollection_money.vue'


	export default {
		data(){
			return {
				showNow:'release'
			}
		},
		components : {
			release,goods,money
		}
	}
</script>
<style lang="less" scoped>
@import '../assets/common_in.less';
	article{
		margin-top: 0.46rem;
	}
	ul.menu{
	  height: 0.45rem;
	  background-color: #f7f7f7;
	  font-size: 0.15rem;


	  li{
	    width: 50%;
	    height: 0.45rem;
	    float: left;
	    text-align: center;
	    border-bottom: 0.01rem solid #e6e9ed;

	    p{
	      line-height: 0.33rem;
	      vertical-align: bottom;
	      margin-top: 0.06rem;
	    }
	  }
	  li:first-child{
	    p{
	      border-right: 0.01rem solid #e6e9ed;
	    }
	  }
	  li.active{
	    border-bottom: 0.01rem solid #26ba9b;
	    color: #26ba9b;
	  }
	}
</style>