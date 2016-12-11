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
						html +=	"<img src="+res[sc_obj[i].id-1].image+">"
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

//顶部和底部推荐商品列表，随机数从JSON数据 中获取
function topList(){
		var a = Math.ceil(Math.random()*72);
		var b = Math.ceil(Math.random()*72);
		//console.log(a) yz ww
		$.ajax({
            url:'data/goodsList.json',
            type:'GET',
            dataType:'json',
            success:function(goods){
            	var html='';//顶部列表变量
            	var html1='';//底部列表变量
            	//顶部列表拼接内容
            	for(var i=a;i<a+4;i++){
            		html += '<li id="'+goods[i].id+'" class="lie">';
                    html += "<img src=" +goods[i].image+ ">";
                    html +="<a href=''>"+goods[i].name+"</a>";
                    html += "<p>"+goods[i].price+"</p>";
                    html += "<button>加入购物车</button>";
                    html += "</li>";
				}
            	//底部列表拼接内容
            	for(var i=b;i<b+5;i++){
            		html1 += '<li id="'+goods[i].id+'" class="lie">';
                    html1 += "<img src=" +goods[i].image+ ">";
                    html1 +="<a href=''>"+goods[i].name+"</a>";
                    html1 += "<p>"+goods[i].price+"</p>";
                    html1 += "<button>加入购物车</button>";
                    html1 += "</li>";
				}
				$('#topList').html(html);//顶部列表赋值
				$('#btm_ul').html(html1);//底部列表赋值
        	}
		})
}

//底部列表点击左右按钮变换列表内容
function changeList() {
	$(".btm_btn").click(function(){
		topList();
	})
}



//加载商品列表并分页    
function paging(num){
    $.ajax({
        url:'data/goodsList.json',
        type:'GET',
        dataType:'json',
        success:function(res){
            //1.计算分页数量
//          console.log(res); //yz ww
            var showNum=num;
            var dataL=res.length;
            //console.log(dataL) yz ww
            var pageNum=Math.ceil(dataL/showNum);
            //引用分页插件中的函数进行分页
            $('#Pagination').pagination(pageNum,{
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                items_per_page: 1, //每页显示1项
                prev_text: "上一页",
                next_text: "下一页",
                callback:function(index){
                	var html = "";
                    for(var i = showNum*index; i < showNum*index+showNum;i++){
                       // console.log(i) yz ww
                        if(i<dataL){
//                          var $id = res[i].id;
                            html += '<li class="lie" id="'+res[i].id+'">';
                            html += "<img src=" 
                                 +res[i].image+ ">";
                            html += "<p>"+res[i].price+"</p>";
                            html +=" <h5><a href='details.html'>"
                                 +res[i].name+"</a></h5>";
                            html += "<span>"+res[i].explain+"</span>";
                            html+="<button class='btn'>加入购物车</button>";
                            html += "</li>";                      
                        }
                    }
                    $('#goodsList').html(html)
                }
            })  
        }
    })
}

//点击li存入相应商品的id并进入相应商品的详情页
function setCookies(){
	$("body").on("click",".lie",function(){
		CookieUtil.saveCookie("id",this.id);
		window.open("details.html");
		//window.location.href = "details.html"
	})
}

//网页加载完毕再加载JavaScript函数
window.onload = function() {
	lead_in();//引入头尾部分函数
	topList();//顶部推荐商品
	paging(12);//分页函数
	changeList();//变换底部列表
	setCookies();//写入cookie
}