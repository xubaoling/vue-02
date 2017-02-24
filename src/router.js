module.exports = function(router){
    //路由表
    router.map({
      '/index' : {
        name : 'index',
        component : require('./components/index.vue'),
        subRoutes : {
          '/need' : {
            name : 'need',    //router-view里的变化
            component : function(resolve){
              require(['./components/needMarket.vue'],resolve) 
            }
          },
          '/donate' : {
            name : 'donate',
            component : function(resolve){
               require(['./components/donateMarket.vue'],resolve) 
            }
          },
          '/personal' : {
            name : 'personal',
            component : function(resolve){
               require(['./components/personal.vue'],resolve) 
            }
          },
          '/yulu' : {
            name : 'yulu',
            component : function(resolve){
               require(['./components/yulu.vue'],resolve) 
            }
          },
          '/undeveloped':{
            name : 'undeveloped',
            component : function(resolve){
              require(['./components/undeveloped.vue'],resolve) 
            }
          }
        }
      },
      '/notdeveloped':{
        name : 'notdeveloped',
        component : function(resolve){
          require(['./components/notdeveloped.vue'],resolve) 
        }
      },
      '/personalCenter' : {
        name : 'personalCenter',
        component : function(resolve){
               require(['./components/personalCenter.vue'],resolve) 
        }
      },
      'yulu-detail' : {
        name : 'yulu-detail',
        component : function(resolve){
               require(['./components/yulu_detail.vue'],resolve) 
        }
      },
      '/publishOffer' : {
        name : 'publishOffer',
        component : function(resolve){
               require(['./components/publishOffer.vue'],resolve) 
        }
      },
      '/passChange' : {
        name : 'passChange',
        component : function(resolve){
               require(['./components/passChange.vue'],resolve) 
        }
      },
      '/offerDetail/:loveNo' : {
        name : 'offerDetail',
        component : function(resolve){
               require(['./components/offerDetail.vue'],resolve) 
        }
      },
      '/needDetail/:type/:id' : {
        name : 'needDetail',
        component : function(resolve){
               require(['./components/needDetail.vue'],resolve) 
        }
      },
      '/donationInfo/:pmId' : {
        name : 'donationInfo',
        component : function(resolve){
               require(['./components/donateInfo.vue'],resolve) 
        }
      },
      '/donationInfo_money/:pmId' : {
        name : 'donationInfo_money',
        component : function(resolve){
               require(['./components/donationInfo_Money.vue'],resolve) 
        }
      },
      '/collection' : {
        name : 'collection',
        component : function(resolve){
               require(['./components/myCollection.vue'],resolve) 
        }
      },
      '/login' : {
        name : 'login',
        component : function(resolve){
               require(['./components/login.vue'],resolve) 
        }
      },
      '/myRelease_donator' : {
        name : 'myRelease_donator',
        component : function(resolve){
               require(['./components/myRelease_donator.vue'],resolve) 
        }
      },
      '/myRelease_demander' : {
        name : 'myRelease_demander',
        component : function(resolve){
               require(['./components/myRelease_demander.vue'],resolve) 
        }
      },
      '/myDonation_donator':{
        name : 'myDonation_donator',
        component : function(resolve){
               require(['./components/myDonation_donator.vue'],resolve) 
        }
      },
      '/self_deliver/:id/:loveNo' : {
        name : 'self_deliver',
        component : function(resolve){
               require(['./components/self-deliver.vue'],resolve) 
        }
      },
      '/order_send/:id/:loveNo' : {
        name : 'order_send',
        component : function(resolve){
               require(['./components/order_send.vue'],resolve) 
        }
      },
      '/order_final/:loveNo/:ogisticsNo/:ogisticsCompany' : {
        name : 'order_final',
        component : function(resolve){
               require(['./components/order-final.vue'],resolve) 
        }
      },
      '/demander_see_logistics/:loveNo':{
        name : 'demander_see_logistics',
        component : function(resolve){
          require(['./components/demander_see_logistics.vue'],resolve)
        }
      },
      '/publishGoods' : {
        name : 'publishGoods',
        component : function(resolve){
               require(['./components/publishGoods.vue'],resolve) 
        }
      },
      '/publishMoney' : {
        name : 'publishMoney',
        component : function(resolve){
               require(['./components/publishMoney.vue'],resolve) 
        }
      },
      '/applyGoods/:loveNo' : {
        name : 'applyGoods',
        component : function(resolve){
               require(['./components/applyGoods.vue'],resolve) 
        }
      },
      '/myApply':{
        name : 'myApply',
        component : function(resolve){
               require(['./components/myApply.vue'],resolve) 
        }
      },
      '/myDonation_demander' : {
        name : 'myDonation_demander',
        component : function(resolve){
               require(['./components/myDonation_demander'],resolve) 
        }
      },
      '/feedback/:loveNo' : {
        name :'feedback',
        component : function(resolve){
               require(['./components/feedback.vue'],resolve) 
        }
      },
      '/seefeedback/:loveNo' : {
        name : 'seefeedback',
        component : function(resolve){
               require(['./components/seeFeedback.vue'],resolve) 
        }
      },
      '/register/:userType' : {
        name : 'register',
        component : function(resolve){
               require(['./components/register.vue'],resolve) 
        }
      },
      '/guide' : {
        name : 'guide',
        component : function(resolve){
               require(['./components/guide.vue'],resolve) 
        }
      },
      '/forget' : {
        name : 'forget',
        component : function(resolve){
               require(['./components/forget.vue'],resolve) 
        }
      },
      '/applicantList/:loveNo' : {
        name:'applicantList',
        component :function(resolve){
               require(['./components/applicantList.vue'],resolve) 
        }
      },
      '/applicantDetail/:loveNo/:userId/:ahId' : {
        name : 'applicantDetail',
        component : function(resolve){
               require(['./components/applicantDetail.vue'],resolve) 
        }
      },
      '/addUsertype' : {
        name : 'addUsertype',
        component : function(resolve){
          require(['./components/addUsertype.vue'],resolve) 
        }
      }
    });


    //默认List主页
    router.redirect({
        '/':"/index/need"
        /*'/':"/login"*/
    });


    //注册路由切换前
    router.beforeEach(function (transition) {
        transition.next();

    });


    //注册路由切换后
    router.afterEach(function (transition) {
        //console.log('成功浏览到: ' + transition.to.path)
    });

};
