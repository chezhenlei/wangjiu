
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
//			alert(w);//yz ww
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



//banner轮播图
function banner() {
    var $rounds = $(".round");
    var $pics = $("#banner div");
    //console.log($pics)
    var index = 0;
    var timer = null;
    function  autoPlay() {
        timer = setInterval(function () {
            index++;
            if (index>$pics.size()-1) {
                index = 0;
            }
            showImage();
        },3000);
    }
    function  showImage() {       		$pics.eq(index).stop(true).fadeIn(600).siblings().stop(true).fadeOut(600);
		$rounds.eq(index).stop(true).css("background","#000").siblings().stop(true).css("background","");
    }
    autoPlay();
    $rounds.mouseover(function () {
        index = $(this).index();
        showImage()
    });
    $("#banner").hover(function () {
        clearInterval(timer);
    }, function () {
        autoPlay();
    });
    $rounds.hover(function () {
        clearInterval(timer);
    }, function () {
        autoPlay();
    });
}

//滚动的公告
function notice() {
	var index = 0;//要显示的li
    var preindex = 0;//要显示的前一个li
    var timer = null;//自动滚动
    var $nu = $("#notice_ul");
    autoPlay();
    function autoPlay() {
        timer = setInterval(function () {
            index++;//显示下一条
            if(index > 3) {
                index = 0;
                preindex = 3;
            }
            scrollTop();//向左移动之后,index对应的preindex也需要改变
            preindex = index;//当前显示的这一条li,将成为下一个要显示的前一条li
        },3000);
    }
    //向上滚动
   function  scrollTop() {
       //从0运动到-24,因为preindex是当前显示的图,top: 0
       $nu.children().eq(preindex).stop(true).animate({top: -24},2000);
       //.css({left: 24})保证要显示的li,每次都从 24开始运动
       $nu.children().eq(index).stop(true).css({top: 24}).animate({top: 0},2000);
      
   }
}
   
// 价格标签滑动效果
function animate() {
	var index = 0;
	$(".wine").mouseenter(function(){
	   	index = $(this).index();
	   	$(".wine_price").eq(index).stop(true).animate({"width": 180,"paddingLeft": 10,"opacity": 1});
	})
	$(".wine").mouseleave(function(){
	   	index = $(this).index();
	   	$(".wine_price").eq(index).stop(true).animate({"width": 0,"opacity": 0})  
	})
}


//首页商品列表
function listGet(){
		//ajax请求JSON数据
		var ajax = new XMLHttpRequest();
		ajax.open('GET','data/goodsList.json',true);
		ajax.send(null);
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				var obj = eval(ajax.responseText);
				fn_succ(obj)
			}
		}
		function fn_succ(obj){
			//获取元素
			var pr = document.getElementById("product_right");
//			console.log(pr);
			//定义变量
			var html ="";
			for(var i=0;i<36;i++){
//				console.log(obj[i]);
				//拼接字符串
				html += '<li class="lie" id="' 
					 + obj[i].id + '"><a href=""><img src="'
					 + obj[i].image
				 	 + '" /></a><p>'
					 + obj[i].country
					 + '</p><h3><a href="">'
					 + obj[i].name
					 + '</a></h3><div><span>'
					 + obj[i].price
					 + '</span><a href=""></a></div></li>';
			}
			//赋值
			pr.innerHTML=html;
		}
}

//点击li存入相应商品的id并进入相应商品的详情页
function setCookies(){
	$("body").on("click",".lie",function(){
		CookieUtil.saveCookie("id",this.id);
		window.open("details.html","_blank");
	})
}

//网页加载完毕再加载JavaScript函数
window.onload = function() {
	lead_in();//引入头尾部分函数
	banner();//banner函数
	animate();//价格标签动画函数
	listGet();//ajax获取商品列表函数
	notice();//滚动公告函数
	setCookies()//点击li存入相应商品的id并进入相应商品的详情页 
}
