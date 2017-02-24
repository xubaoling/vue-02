# 扶贫系统 with Vuejs

## 项目概况

此项目是公司为扶贫办开发的项目，具有发起捐赠、发布物品需求等功能，线上地址为[http://djres.zgshfp.org.cn/](http://djres.zgshfp.org.cn/)。由我方和万达协同开发，具体分工可询问相关负责人员。

这是一个移动端的项目，前后端分离，通过接口进行数据的交互。前端主要使用的是vuejs+webpack的技术框架。vuejs与angular的语法相似，主要负责页面的搭建，webpack主要负责项目的编译及打包。

它的好处是可以利用vuejs的特性进行组件化编程，极大的提高了项目性能（经测试可达70%左右），降低了耦合度，极大的提升了项目的可维护性。

vuejs的相关用法如下：[http://cn.vuejs.org/guide/](http://cn.vuejs.org/guide/)。

webpack的相关资料 ： [http://zhaoda.net/webpack-handbook/usage.html](http://zhaoda.net/webpack-handbook/usage.html)

注：平时开发不需要更改webpack的相关配置（除非有特殊需求）；换句话说，就算不懂webpack，也能进行日常的开发与维护。

## 项目相关人员

* 项目负责人 ：董洋
* 产品 ：吴攸 
* 安卓 ：任建、康盼盼
* 页面 ： 迟勇
* web前端 ：孙海洋
* web后端 ：史宏朴 周一川

## Preview

![index](http://7xqgvd.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20160719113243.png)
![my-publish](http://7xqgvd.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20160719113357.png)

## 项目目录
根目录：
![根目录](http://7xqgvd.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20160926173816.png)

src文件夹:
![src](http://7xqgvd.com1.z0.glb.clouddn.com/QQ%E6%88%AA%E5%9B%BE20160926174126.png)

main.js是整个项目的入口（实际上是由webpack配置 的）

## 项目开发与调试调试

1.下载项目

项目在公司git服务器上，地址 http://192.168.16.9/sunhy/vue-povertyRelief.git；

使用git clone 下载即可；

2.下载项目依赖

从git上下载完项目以后，打开命令行工具，运行npm install 命令(因为npm的服务器在国外，下载速度可能比较慢，可能下载失败，推荐使用淘宝的https://npm.taobao.org/，具体用法见官网)，此时下载相关依赖，耐心等待依赖包下载完成；

3.让项目在开发环境下跑起来

打开命令行工具，运行npm run dev;此时项目会进行编译。等到命令行工具中出现webpack:bundle is now valid,此时编译完成；打开浏览器，地址栏中输入localhost,即可访问；

## 项目发布

打开命令行工具，运行npm run build;

运行完成后，此时在项目根目录的build文件夹中会生成打包后的文件；将相关文件交于后台相关负责人员即可（这一块儿的相关部分可以咨询史宏朴）

## 项目中涉及到的其他相关库、插件

- vue-router	路由相关，用来负责页面的跳转；[https://github.com/vuejs/vue-router](https://github.com/vuejs/vue-router)
- vue-resource  用来进行ajax请求； [https://github.com/vuejs/vue-resource](https://github.com/vuejs/vue-resource)
- vue-validator 表单的相关验证；[https://github.com/vuejs/vue-validator](https://github.com/vuejs/vue-validator)
- vue-strap 	项目中的个别组件，如弹窗组件，是使用的vue-strap自带的 [https://yuche.github.io/vue-strap/](https://yuche.github.io/vue-strap/)
- bootstrap		搭建静态页面使用，可咨询迟勇
- less          css语法糖