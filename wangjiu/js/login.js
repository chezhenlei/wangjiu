$(function(){
	$('input[type=button]').click(function(){
		var ID = $('input[type=text]').eq(0).val();
		var password = $('input[type=password]').eq(0).val();
		//console.log(ID+":"+password+":"+nub);//yz ww
		if(ID==""||password==""){
			alert('请输入您的账号信息!')
		}else{
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				type:"POST",
				data:{
					status:"login",
					userID:ID,
					password:password
				},
				success:function(res){
					switch(res){
						case "0":alert('用户名不存在');break;
						case "2":alert('用户名密码不符');break;
						default:CookieUtil.saveCookie("userName",ID); window.location.href='index.html';break;
//						console.log(ID)
					}
				}
			})
		}
	})
})
