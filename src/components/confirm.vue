<style>
    .fullMask{
        height:100%;
        overflow:hidden;
    }
    .ncf-confirm{
        width:0.45rem;
        text-align: center;
        border-radius: 0.05rem;
        position:fixed;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        z-index:10001;
        background: #fff;
        font-size:0.03rem;
    }
    .conf-cont {
        width:0.39rem;
        margin:0.03rem;
        max-height:0.3rem;
        overflow-y: auto;
    }
    .conf-btn-grp{
        width:100%;
        display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
        display: -moz-box; /* Firefox 17- */
        display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
        display: -moz-flex; /* Firefox 18+ */
        display: flex;
        border-top:#e5e5e5 solid 0.01rem;
    }
    .conf-cancel{
        -webkit-box-flex:1;
        -moz-box-flex:1;
        -webkit-flex: 1;
        -moz-flex: 1;
        flex:1;
        padding:0.015rem 0;
        border-right:0.01rem solid #e5e5e5;
    }
    .conf-sure{
        -webkit-box-flex:1;
        -moz-box-flex:1;
        -webkit-flex: 1;
        -moz-flex: 1;
        flex:1;
        padding:0.015rem 0;
    }
    .mask{
        position: fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        background:rgba(0,0,0,0.5);
        z-index:10000;
    }

</style>
<template>
    <div class="ncf-confirm">
        <div class="conf-cont">
            <vue_demo></vue_demo>
        </div>
        <div class="conf-btn-grp">
            <div class="conf-cancel" v-on:click="doCancel" v-if="canc">取消</div>
            <div class="conf-sure" v-on:click="doSure" v-if="sure">确定</div>
        </div>
    </div>
    <div class="mask" v-on:click="clickHandler"></div>
</template>
<script>
    import diyBox from './vue_demo.vue';//定义弹框内容
    let maskMsg = {
            closeConfirm:false,
        },
        cancelMsg = {
            closeConfirm:false,
            cancelCallback:function(){
                console.log('cancel');
            }
        },
        sureMsg = {
            closeConfirm:false,
            sureCallback:function(){
                console.log('sure');
            }
        };
    export default {
        data:function(){
            return {
                msg:'hello world',
                canc:1,
                sure:0,
            };
        },
        components:{
            vue_demo:diyBox//填充box
        },
        props:['canc','sure','msg'],//获取赋值属性
        methods:{
            clickHandler:function(e){//隐藏
                this.$dispatch('confirm-msg', maskMsg);
            },
            doCancel:function(){//点击取消
                this.$dispatch('confirm-msg', cancelMsg);
            },
            doSure:function(){//点击确定
                this.$dispatch('confirm-msg', sureMsg);
            }
        }
    }
</script>