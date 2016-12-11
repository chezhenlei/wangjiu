//头部尾部引入
function lead_in(){
	//引入侧边栏
	$("#side").load("same.html #side",function(){
		$("#side").find("ul").find("li").hover(function(){
			$(this).find("span").stop(true).animate({left:-90},200);
		},function(){
			$(this).find("span").stop(true).animate({left:30},200);
		});
		$("#back_top").click(function(){
			$("body,html").animate({scrollTop: 0},200);
		});
		$(".li1").click(function(){
//			alert(1)
			var w = $("#shoppingBag").width();
//			alert(w);yz ww
			if(w==0){
				$(".sideul").animate({right:300});
				$("#shoppingBag").animate({width:300});
				$("#shoppingBagDiv").animate({width:280});
				$("#shoppingBagDiv").css({paddingLeft:20});
			} else{
				$("#shoppingBag").animate({width:0});
				$(".sideul").animate({right:0});
				$("#shoppingBagDiv").animate({width:0});
				$("#shoppingBagDiv").css({paddingLeft:0});
			}			
		})
	});
	//引入头部
	$("#top_fir").load("same.html #top_fir",function() {
		//获取cookie，并判断有无username
		var uN = CookieUtil.getCookie('userName')==null?false:true;
		//进行判断，如果cookie中有username就改变顶部内容
		if(uN) {
			var n=	CookieUtil.getCookie("userName");
			$("#top_ul").find(".userName").html(n + "，欢迎您回来！"+"<span id='tui'>【退出】</span>").css({"color":"#ae1219"});
		}
		//给退出按钮绑定事件
		$('#tui').click(function(){
			//alert(1)yz ww
			//删除用户cookie
			CookieUtil.deleteCookie('userName');
			//console.log(userName) 
			//刷新页面
			window.location.href='index.html';
		})
	});
	//引入边框部分
	$("#border").load("same.html #border");
	//引入吸顶菜单部分
	$("#top_fixed0").load("same.html #top_fixed0",function() {
		$(window).scroll(function(){
			var $top= document.body.scrollTop || document.documentElement.scrollTop;/*滚动距离*/
			if($top>100) {
				//判断如果滚动条顶部大于100，就显示吸顶菜单
				$('#top_fixed0').css({'display':'block'});
			} else {
				//否则隐藏掉
				$('#top_fixed0').css({'display':'none'});
			}
		})
	});
	//引入导航部分
	$("#top_sec0").load("same.html #top_sec0",function(){
		//用ajax请求JSON数据，并获取出来显示到相应的地方
		$.ajax({
			url:'data/goodsList.json',
			type:'GET',
			success:function(res){
				//获取cookie字符串
				var sc_str = CookieUtil.getCookie('goods');
				//若不为空，转化成对象形式
				if(sc_str){
					var sc_obj = eval(sc_str);
					//定义变量
					var html = "";
					var html1 = null;
					var html2 = "";
					var html3 = "";
					var l = null;
					for(var i in sc_obj){
						var p = sc_obj[i].num;//对应商品数量
						var n = res[sc_obj[i].id-1].price;//对应商品价格，id-1和JSON中的id有关
						var k = (n.substring(1))*p;//截除第一位和JSON数据有关"¥00"
						    l += k; //选择商品的总价  
						    
						html1 += Number(p);//商品总数量
						html3 = '共<h5>' + html1 + '</h5>件商品，' 
							  + '共计' + '<h5>¥' + l + '.00</h5>'
							  + '<a href="shoppingCat.html" target="_blank">去购物车结算</a>';
						html2 = '<div>共<h5>' + html1 + '</h5>件商品，' 
							  + '共计' + '<h5>¥' + l + '.00</h5>'
							  + '<a href="shoppingCat.html" target="_blank">去购物车结算</a></div>';
						//购物车中的商品列表拼接
						html +='<li id='+sc_obj[i].id+'>'
						html +=	"<img src="+res[sc_obj[i].id-1].image+" />"
						html +="<a href=''>"+res[sc_obj[i].id-1].name+"</a>"
						html +="<span class='pri'>"	
						     + res[sc_obj[i].id-1].price
						     + '×' + sc_obj[i].num+"</span>"
						html +='<input type="button" id="del" name="'
							 + sc_obj[i].id +'" value="删除" />'
						html +='</li>'
					}					
					$(document).find('.car0 a').find('span').html(html1);
					$(document).find('.car1').find('ul').html(html);
					$(document).find('.car1 div').html(html2);
					$(document).find('#carNum').html(html1);
					$(document).find('#shoppingBag ul').html(html);
					$(document).find('#shoppingBag div').html(html3);
				} 
			}
		})
		$(document).find(".nav_menu").children().css({"cursor":"pointer"}).click(function(){
			window.open('goodsList.html');
		})
	});
	//加载底部
	$("#footer").load("same.html #footer");
}

function addDetails() {
	$.ajax({
		url:'data/goodsList.json',
		type:"GET",
		success:function(res){
			var idNum=CookieUtil.getCookie("id");
			//for循环找到id
			for(var i=0;i<res.length;i++){
				if(res[i].id == idNum){
					//商品名称
					$('#goodsName').html(res[i].name);
					$('#magnifying p').html(res[i].name);
					$("#n").html(res[i].name);
					//商品信息
					$("#explain").html(res[i].explain);
					//商品价格
					$('#goodsPrice').html("<span>网酒价：</span>"+res[i].price
					+ "<span class='span2'>共有275条评论</span>");
					//商品主图
					$("#magnifying").find("img").eq(0).attr("src",res[i].image);
					//放大镜主图
					$("#magnifying_big").find("img").eq(0).attr("src",res[i].image);
					$('.catBtn').attr("id",res[i].id);
				}
			}	
		}
	})
}
//放大镜
function magnifying() {		
	var $magnifying = $("#magnifying0");
	var $magnifying_big0 = $("#magnifying_big0");
	var $glass = $("#glass");
	var $magnifying_big = $("#magnifying_big");
	var $p = $("#magnifying_p");
	//获取鼠标在左侧图片上的位置
	$magnifying.mousemove(function(event){
		//console.log(1);//yz ww
		event = event || window.event;
		//鼠标的位置
		var left = event.offsetX - $glass.width()/2;
		var top  = event.offsetY - $glass.height()/2;
		//console.log(left);//yz ww
		//定义变量，posx,posy,确定放大镜移动到右侧的宽度和高度
		var posx  =  $magnifying.width()-$glass.width();
		var posy  =  $magnifying.height()-$glass.height();
		//console.log(posx+":"+posy)
		left = left < 0?0:left ;
		left = left > posx?posx:left ;
		top  = top  < 0? 0: top  ;
		top  = top  > posy ? posy : top  ;
		//鼠标移动时，让透明放大镜的left和top等于鼠标位置
		$glass.css({"left":left,"top" :top });
		//让右侧图片跟随鼠标一起移动
		var  proLeft = left / posx ;
		//console.log(proLeft)
		var  proTop  = top  / posy ;
		$magnifying_big.css({
			"left":-proLeft*($magnifying_big.width()-$magnifying_big0.width()),
			"top":-proTop*($magnifying_big.height()-$magnifying_big0.height()),
		})
	})
	
	$magnifying.mouseenter(function() {
		$glass.css("display","block");
		$magnifying_big0.css("display","block");
		$p.css("display","block");
	});
	$magnifying.mouseleave(function() {
		$glass.css("display","none");
		$magnifying_big0.css("display","none");
		$p.css("display","none");
	});
}

//ajax请求JSON，随机获取顶部和底部的列表，并点击进入该商品的详情
function addList(){
		var a = Math.ceil(Math.random()*50);
		var b = Math.ceil(Math.random()*50);
		//console.log(a) yz ww
		$.ajax({
            url:'data/goodsList.json',
            type:'GET',
            dataType:'json',
            success:function(goods){
            	var html='';//顶部列表变量
            	var html1='';//底部列表变量
            	//顶部列表拼接内容
            	for(var i=a;i<a+5;i++){
            		html += '<li class="lie" id="'+goods[i].id+'">';
                    html += "<img src=" +goods[i].image+ "/>";
                    html +="<a href=''>"+goods[i].name+"</a>";
                    html += "<p>"+goods[i].price+"</p>";
                    html += "</li>";
				}
            	//底部列表拼接内容
            	for(var i=b;i<b+5;i++){
            		html1 += '<li class="lie" id="'+goods[i].id+'">';
                    html1 += "<img src=" +goods[i].image+ "/>";
                    html1 +="<a href=''>"+goods[i].name+"</a>";
                    html1 += "<p>"+goods[i].price+"</p>";
                    html1 += "</li>";
				}
				$('#contain_left2 ul').html(html);//顶部列表赋值
				$('#contain_left3 ul').html(html1);//底部列表赋值
        	}
		})
}

//点击li存入相应商品的id并进入相应商品的详情页
function setCookies(){
	$("body").on("click",".lie",function(){
		CookieUtil.saveCookie("id",this.id);
		window.open("details.html");
	})
}

//实现加减功能
function add() {
	var n=$('#num').children().eq(0).val();
	$('#num').children().eq(1).click(function(){
		//alert(1)yz ww
		if(n>=99){alert("该商品库存不足或已经下架！")}
		n++
		$('#num').children().eq(0).val(n)
		//$.cookie('n',n)
	})
	$('#num').children().eq(2).click(function(){
		//alert(1)yz ww
		if(n==1){
			alert("所选商品不能少于1件")
		}else{
			n--
			$('#num').children().eq(0).val(n)	
			//$.cookie('n',n)
		}
	})	
}


//添加购物车
function addgoods() {
	$('.catBtn').click(function(){
		//var i=CookieUtil.getCookie('n')
		//购物车数量增加;
		var id = this.id;
//		alert(id)//yz ww
		//判断是否有cookie进行添加，true代表空cookie，一件商品也没有
		var first = CookieUtil.getCookie('goods')==null?true:false;
		//判断是否添加此商品，false代表还未添加，true代表已经添加
		var flag = false;
		var val=$('#num').children().eq(0).val();
		//是否是第一次添加
		if(first){
			//第一次添加,建立json结构。
			CookieUtil.saveCookie('goods','[{id:' + id + ',num:1}]');
		}else{
			var str = CookieUtil.getCookie('goods');
			var arr = eval(str);
			//遍历所有对象。如果id相同，让该商品数量递增 ;
			for(var attr in arr){
				if(arr[attr].id == id){	
					//让json结构中num自增。
					arr[attr].num = Number(arr[attr].num) +Number(val) ;  
					var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
					CookieUtil.saveCookie('goods',cookieStr);
					flag = true;//表示已经添加此商品
				}
			}
			//如果id不同，重新建立商品对象;
			if(!flag){
				var obj={id:id,num:val};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				CookieUtil.saveCookie('goods',cookieStr);
			}
		}
		sc_car();
		alert("已成功加入购物车！");
		window.location.href='details.html';//刷新本页面
	})
}
	
//购物车;
function sc_car(){
	var sc_str = CookieUtil.getCookie('goods');
	if(sc_str){//如果购物车cookie不为空。
		var sc_obj = eval(sc_str);
		var sc_num = 0 ; 
		
		for(var i in sc_obj){
			sc_num = Number(sc_obj[i].num)+ sc_num;
		}
		CookieUtil.saveCookie("sc_num",sc_num);
//		$('#n').html(sc_num);
		//console.log($('#n'))yz ww
	}
}

//选项卡
function tab(){
	$('.top').children().click(function(){
		$(this).addClass('tab1');//添加class名
		$(this).siblings().removeClass('tab1');//移除class名
		//alert($(this).index())yz ww
		var i=$(this).index()
		$('.contain').children().eq(i).addClass('tab2');
		$('.contain').children().eq(i).siblings().removeClass('tab2');
	})
}

//网页加载完毕再加载JavaScript函数
window.onload = function() {
	lead_in();//引入头尾部分函数
	magnifying();//放大镜
	addDetails();//加载商品详情
	addList();//推荐商品列表
	add();//加减增删商品数量
	addgoods();//添加商品
	sc_car();//购物车
	tab();//详情介绍的切换
	setCookies();//存入cookie进入该商品详情
}