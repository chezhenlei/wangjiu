//头部尾部引入
function lead_in(){
	$("#top_fir").load("same.html #top_fir",function(){
		var uN = CookieUtil.getCookie('userName')==null?false:true;
		if(uN){
			var n=	CookieUtil.getCookie("userName");
			$("#top_ul").find(".userName").html( n + "，欢迎您回来！" + "<span id='tui'>【退出】</span>").css({"color":"#ae1219"});
		}
		$('#tui').click(function(){
			//alert(1)yz ww
			CookieUtil.deleteCookie('userName')//删除用户cookie
//				console.log(userName) 
			window.location.href='index.html'
		})
	});
	$("#border").load("same.html #border");
	$("#top_sec0").load("same.html #top_sec0");
	$("#footer").load("same.html #footer");
}



//添加购物车
function list(){
	$.ajax({
		url:'data/goodsList.json',
		type:'GET',
		success:function(res){
			var sc_str = CookieUtil.getCookie('goods');
			if(sc_str){
				var sc_obj = eval(sc_str);
				var html = ''; 
				for(var i in sc_obj){
					var p = sc_obj[i].num;
					var n = res[sc_obj[i].id-1].price;
					var k = (n.substring(1))*p;//对应的商品*对应的数量算出的总价
					
					html +='<li id='+sc_obj[i].id+'>'
					html +="<input class='btn1' type='checkbox' checked/>"
					html +=	"<img src="+res[sc_obj[i].id-1].image+" />"
					html +="<a href=''>"+res[sc_obj[i].id-1].name+"</a>"
					html +="<span class='pri'>"
					     + res[sc_obj[i].id-1].price + "</span>"
					html +="<form class='jia'>"
					html +='<input type="button" name="'
					     + sc_obj[i].id+'" class="cut" value="-"/>'
					html +='<input type="text" name="'
					     + sc_obj[i].id+'" class="txt" value='
						 +sc_obj[i].num+'>'
					html +='<input type="button" name="'
					     +sc_obj[i].id+'" class="add" value="+"/>'
					html +='</form>'
					html +='<span style="color:#c01a6d;">￥'+k+'.00</span>'
					html +='<input type="button" id="del" name="'
						 + sc_obj[i].id +'" value="删除" />'
					html +='</li>'
				}
				$('#contain').find('ul').html(html);
				$('#sum').css({'display':'block'});
				$('#msg').css({'display':'block'});
				add();
				calculation();
			}
		}
	})
}

//购物车加减功能
function add() {
	//加号功能
	$(".add").click(function(){
		var n=$(this).siblings('.txt').val();
		if(n>=999){
			alert("商品库存不足！最多购买999件！")
		}else{
			n++;
			$(this).siblings('.txt').val(n);
			var id = this.name;
			var str = CookieUtil.getCookie('goods');
			var arr = eval(str);
			//遍历所有对象。如果id相同，让该商品数量递增 ;
			for(var attr in arr){
				if(arr[attr].id == id){	
					//让json结构中num自增。
					arr[attr].num = Number(n) ;  
					var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
					CookieUtil.saveCookie('goods',cookieStr);
				}
			}
			calculation();
			window.location.href='shoppingCat.html';
		}
	})
	//文本框功能
	$(".txt").blur(function(){
		var n=$(this).val();
		var reg = /^[1-9]\d{0,2}$/;	
		var id = this.name;
		var str = CookieUtil.getCookie('goods');
		var arr = eval(str);
		if(reg.test(n)){
			$(this).val(n);
			if(n>=999){	
				$(this).val(999);
				alert("该商品库存不足！");
			} else if(n < 1) {
				$(this).val(1);
				alert("所选商品不能少于1件！");
			}
			//遍历所有对象。如果id相同，让该商品数量递增 ;
			for(var attr in arr){
				if(arr[attr].id == id){	
					//让json结构中num自增。
					arr[attr].num = Number(n) ;  
					var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
					CookieUtil.saveCookie('goods',cookieStr);
				}
			}
			calculation();
			window.location.href='shoppingCat.html';
		} else {
			alert("请输入正确数量！小于999的数字")
			for(var attr in arr){
				if(arr[attr].id == id){	
					//让json结构中num自增。
	//				arr[attr].num = Number(n) ;
					$(this).val(arr[attr].num);
					var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
					CookieUtil.saveCookie('goods',cookieStr);
				}
		    }
		}
	})
	//减号功能
	$(".cut").click(function(){
		var n=$(this).siblings('.txt').val();
		if(n<=1){
			alert("所选商品不能少于1件！")
		}else{
			n--
			$(this).siblings('.txt').val(n);
			var id = this.name;
			var str = CookieUtil.getCookie('goods');
			var arr = eval(str);
			//遍历所有对象。如果id相同，让该商品数量递增 ;
			for(var attr in arr){
				if(arr[attr].id == id){	
					//让json结构中num自增。
					arr[attr].num = Number(n) ;  
					var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
					CookieUtil.saveCookie('goods',cookieStr);
				}
			}
			calculation();
			window.location.href='shoppingCat.html';
		}
	})	
}

//计算总价格和总件数
function calculation() {
	var money = 0;//总钱数
	var count = 0;//总件数
	//console.log(i)yz ww
	var lis =$('#contain').find('ul').find("li");
	for(var i=0;i<lis.length;i++){
		var x = Number(lis.eq(i).find('.txt').val());
		var y = lis.eq(i).find('.pri').html().substring(1);
		money += x*y;//数量*单价
		count += x;//总件数
		//console.log(money)//yz ww
	}
	$('#sum').children().eq(3).html("商品数量："+count+"件");
	$('#sum').children().eq(6).html("¥"+money+".00");
}

//删除商品
function dele() {
	$(document).on('click','#del',function(){//点击删除按钮
		var conf=confirm('确定删除此条商品吗？');
		if(conf){//判断
			id=$(this).parents('li').attr('id');
			var str = CookieUtil.getCookie('goods');
			var arr = eval(str);
				//遍历所有对象。如果id相同，让该商品数量递增 ;
			for(var attr in arr){
				if(arr[attr].id == id){	
					delete arr[attr];	//删除当前商品的cookie信息；
					for(var k=0;k<arr.length;k++){	//两次循环便利所有，冒泡排序，把空的放最后
						for(var i=0;i<arr.length-1;i++){
						if(arr[i]==null){
							var m=arr[i+1];
								arr[i+1]=arr[i];
								arr[i]=m;
						}
					  }
					}
					arr.length=arr.length-1;	//原数组长度减一	
				}
				//删一条商品存一次cookie
				var cookieStr = JSON.stringify(arr);//将json对象转换成字符串
				CookieUtil.saveCookie('goods',cookieStr);
				//console.log($.cookie('goods'))
				flag = true;
			}
			//假如逐条删除完，就出现空购物车内的内容
			if(arr.length == 0){
				//alert(arr.length)//yz ww
				CookieUtil.deleteCookie('goods');
				CookieUtil.deleteCookie('sc_num');
				$('#sum').css({'display':'none'});
				$('#msg').css({'display':'none'});
				window.location.href='shoppingCat.html'
			}
			$(this).parents("li").remove();	//删除购物车里的该商品
			list();//更新购物车商品信息
			calculation();//重新计算总价
		}
	});
	$('#sum').on('click','#clear',function(){
		//alert(1)yz ww
		var conf=confirm('确定清空购物车吗？')
		if(conf){//判断
			CookieUtil.deleteCookie('goods');//清除cookie
			CookieUtil.deleteCookie('sc_num')//清除购物车数量
			window.location.href='shoppingCat.html';
		}
	})

}

//顶部推荐商品列表
function btmList() {
		var a = Math.ceil(Math.random()*30);
		//console.log(a) yz ww
		$.ajax({
            url:'data/goodsList.json',
            type:'GET',
            dataType:'json',
            success:function(goods){
            	var html1='';//底部列表变量
            	//底部列表拼接内容
            	for(var i=a;i<a+5;i++){
            		html1 += '<li id="'+goods[i].id+'" class="lie">';
                    html1 += "<img src=" +goods[i].image+ "/>";
                    html1 +="<a href=''>"+goods[i].name+"</a>";
                    html1 += "<p>"+goods[i].price+"</p>";
                    html1 += "<button>加入购物车</button>";
                    html1 += "</li>";
				}
				$('#btm_ul').html(html1);//底部列表赋值
        	}
		})
}

//点击列表商品进入该商品详情，写入id
function setCookies() {
	$("body").on("click",".lie",function(){
		CookieUtil.saveCookie("id",this.id);
		window.open("details.html");
	})
}

//底部列表点击左右按钮变换列表内容
function changeList() {
	$(".btm_btn").click(function(){
		btmList();
	})
}

//网页加载完毕再加载JavaScript函数
window.onload = function() {
	lead_in();//引入头尾部分函数
	list();//添加购物车中的商品
	add();//加减号功能
	calculation();//计算总价钱的函数
	dele();//删除商品	
	btmList();//底部推荐商品列表加载
	changeList();//底部列表左右按钮切换
	setCookies();//写入cookie进入详情 
}