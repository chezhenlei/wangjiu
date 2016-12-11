
var CookieUtil = {
	saveCookie : function(key,value,days) {
		var date = new Date();
		var d = days || 7; //默认七天，days参数可以省略
			date.setDate(date.getDate()+d);//d天之后过期
		document.cookie = key+"="+value+";expires="+date.toGMTString()+";path=/";
	},
	deleteCookie : function(key) {
		//删除cookie原理： 设置过期时间为过去的时间，浏览器会自动删除
		//调用保存cookie的方法，直接设置过期的时间
		this.saveCookie(key,"",-3);
	},
	// cookie取出来的格式 : "key1=value1; key2=value2; key3=value3"
	getCookie : function(key) { 
		//查找一个值，可以把它转换为数组，通过循环对比来查找
		//arr = ["key1=value1","key2=value2","key3=value3"]
		var arr = document.cookie.split("; ");
		for(var i in arr) {
			var acookie = arr[i];//某一条cookie,是一个字符串，可以再次分割为数组
			//arr2 = ["key1","value1"];
			var arr2 = acookie.split("=");//
			if(arr2[0]==key) {//找到了你要找的那个cookie的key
				return arr2[1];//  arr2[1]就是cookie对应的值
			}
		}
		return null;//没有找到该cookie，返回null
	}
	
};
