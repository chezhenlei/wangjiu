/**
 * Created by czl on 2016/7/20.
 */

//封装一个$对象，这个对象用于发起请求
    //  $.ajax()

var  $ = {
    ajax : function(url,successFn) {
        var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
              if(xhr.readyState==4 && xhr.status==200) {
                  //一般调用接口都是返回json，直接解析为对象
                  successFn(JSON.parse(xhr.responseText));
              }
            };
            xhr.open("get",url,true);
            //console.log("readyState"+xhr.readyState);// 0
            xhr.send();
    }
};
