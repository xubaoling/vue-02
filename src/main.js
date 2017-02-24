import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import Loadmore from 'mint-loadmore'

import bootCss from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import fontAwesome from '../node_modules/font-awesome/css/font-awesome.min.css'

import loadingMask from './components/povertyMask.vue'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('loadmore', Loadmore);
Vue.component('loadingMask',loadingMask);

Vue.http.interceptors.push(function(request, next){

		this.loading = true;
		var timeout;
		request._timeout = 8000;
		// 這裡改用 _timeout ，就不會觸發原本的
	    if (request._timeout) {
	    	// 一樣綁定一個定時器，但是這裡是只要觸發了，就立即返回 response ， 並且這邊自定義了 status 和 statusText
	        timeout = setTimeout(() => {
	            next(request.respondWith(request.body, {
	                 status: 408,
	                 statusText: 'Request Timeout'
	            }));
	        }, request._timeout);
	    }

	    next((response) => {
	    	this.loading = false;
	        clearTimeout(timeout);
	    });
});

Vue.use(VueValidator);

import App from './components/app.vue'

Vue.config.debug = true;

var router = new VueRouter({
	hashbang: true,
	history: false,//当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
	saveScrollPosition: false,
	transitionOnLoad: true,
	linkActiveClass:'nav-active' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
});


require('./router')(router);
router.start(App,"au-app");	//router-view标签再App视图里面

