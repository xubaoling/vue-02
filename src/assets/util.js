//const url = "http://192.168.16.153:8080/server/receiveWebHttp/receive";
/*const url = "http://192.168.16.153:81/receiveWebHttp/receive";*/
const url = "http://www.zgshfp.com.cn/server/receiveWebHttp/receive";
/*const url = "http://192.168.15.117:8080/server/receiveWebHttp/receive"*/


const ajaxJsonp = function(url,data,fnSuccess){
/*	$.ajax({
		type: "GET",
        url: url,
        data: data,
        dataType: 'jsonp',   
        jsonp: "callbackparam", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback: ("success_jsonpCallback"+Math.random()).replace(/\D/g,''),                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        success: function(data){
        	fnSuccess&&fnSuccess(data);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert('error 状态码'+XMLHttpRequest.status+' 错误码'+XMLHttpRequest.readyState+textStatus);
        }
    });*/

};

const _doAbsoluteURI = (function(){
            var _xxx = !1,//false
                _anchor = document.createElement('a');
            var _append = function(){
                if (_xxx) return;
                _xxx = !0;
                _anchor.style.display = 'none';
                document.body.appendChild(_anchor);
            };
            return function(_uri){
                _append();
                _anchor.href = _uri;
                _uri = _anchor.href;
                return _uri.indexOf('://')>0&&_uri.indexOf('./')<0 ?
                       _uri : _anchor.getAttribute('href',4); // ie6/7
            };
        })();

export default {
	url : url,
	ajaxJsonp : ajaxJsonp,
    doAbsolute : _doAbsoluteURI
};