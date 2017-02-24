<template>
	<textarea class="form-control" rows="18" style="resize:none" readonly="true">
		雨露计划是以提高扶贫对象自我发展能力、促进就业为核心，以政府财政扶贫资金扶持为主、动员社会力量参与，通过资助、引导农村贫困家庭劳动力接受职业教育和各类技能培训、培养贫困村产业发展带头人等途径，扶持和帮助贫困人口增加就业发展机会和提高劳动收入的专项扶贫措施。

		雨露计划是目前各项扶贫措施中， 直接面向扶贫对象“直补到户、作用到人”的专项扶贫措施。目前，雨露计划主要包括四大工程：贫困家庭新生劳动力职业教育培训助学工程、贫困家庭青壮年劳动力转移就业培训工程、贫困家庭劳动力扶贫产业发展技能提升工程、贫困村产业发展带头人培养工程等。
	</textarea>
	<button class="btn btn-primary submit"  style="width: 100%" v-link="{name:'yulu-detail'}">申请</button>
</template>
<script>
import { modal } from 'vue-strap';

	export default {
		data () {
			return {
				showModal : true
			}
			
		},
		components:{modal}

	}
</script>
<style>
	textarea{
		margin-top: 0.56rem;
		margin-bottom: 0.16rem;
	}
</style>