<template>
<poverty-mask :loading="loading"></poverty-mask>
    <header><span class="pull-left" v-link="{name:'personal'}">返回</span>捐赠信息</header>
    <div class="form">
        <section class="login_content">
        <validator name="validation" @valid="fillpass=true" @invalid="fillpass=false">
            <form novalidate>
                <div class="input-group">
                  <span class="input-group-addon" id="basic-addon1">旧密码</span>
                  <input type="password" class="form-control" placeholder="请输入原密码" aria-describedby="basic-addon1" v-model="passwordOld" v-validate:passwordOld="{required:true}">
                </div>

                <div class="input-group">
                  <span class="input-group-addon" id="basic-addon1">新密码</span>
                  <input type="password" class="form-control" placeholder="请输入新密码,最小6位，最长16位" aria-describedby="basic-addon1" v-model="password" v-validate:password="{required:true,maxlength:16,minlength:6}">
                </div>

                <div class="input-group">
                  <span class="input-group-addon" id="basic-addon1">重新输入</span>
                  <input type="password" class="form-control" placeholder="请重新输入新密码" aria-describedby="basic-addon1" v-model="repassword"  v-validate:repassword="{required:true,maxlength:16,minlength:6}">
                </div>
                <button class="btn btn-primary submit"  style="width: 100%" @click.stop.prevent="startSubmit" :disabled="$validation.invalid">修改密码</button>
                <div class="clearfix"></div>
            </form>
        </validator>
        </section>
    </div>
</template>
<script>
import Util from '../assets/util.js';
import povertyMask from './povertyMask.vue';

export default {
    data () {
        return {
            mobile : localStorage.getItem('mobile'),
            passwordOld : "",
            password : "",
            repassword : "",
            fillpass : false,
            loading:false
        }
    },
    methods : {
        startSubmit : function(){
            if(this.repassword!=this.password)
            {
                if(window.toast){
                    window.toast.h5Toast("两次输入的新密码应相同")
                }else{
                    alert("两次输入的新密码应相同");
                }
                return;
            }
            if(!this.fillpass)
            {
                if(window.toast){
                    window.toast.h5Toast("请修改所填信息")
                }else{
                    alert("请修改所填信息");
                }
                return;
            }
            var jsonStr = {
                mobile : this.mobile,
                oldPassWord : this.passwordOld,
                newPassWord : this.password
            };

            this.$http.jsonp(Util.url,{
                params : {
                    marked : "changePass",
                    jsonStr : JSON.stringify(jsonStr)
                },
                jsonp: "callbackparam"
            }).then((response) => {

                if(response.data.rspCode=="000")
                {
                    if(window.toast){
                        window.toast.h5Toast('修改成功');
                    }else{
                        alert('修改成功');
                    }
                    localStorage.clear();
                    this.$router.go({name:'login'});
                }else{
                    if(window.toast){
                        window.toast.h5Toast('修改失败'+response.data.rspDesc);
                    }else{
                        alert('修改失败');
                    }
                }

            }, (response) => {

            });

            return false;
        }
    },
    components : {povertyMask}
}
</script>
<style lang="less" scoped>
    @import "../assets/common_in.less";

    div.form{
        margin-top: 0.70rem;
    }
    div.input-group{
        margin-top: 0.20rem;
        margin-bottom: 0.20rem;
    }
</style>