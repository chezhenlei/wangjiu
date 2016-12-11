
function w(id) {
	return document.getElementById(id);
}
function creatCode() {  
    var code = "";    
    var arr = new 	Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
       
    for(var i = 0; i < 4; i++) { 
        var index = Math.floor(Math.random()*36);  
        code += arr[index];  
    }
    w("code2").innerHTML=code;
}

function chkPassword() {
	var reg = /^.{6,12}$/;
	if(reg.test(w("pwd").value)){
		w("error").innerHTML = "";
		return true;
	} else {
		w("error").innerHTML = "密码必须由6~16位字母/数字/符号组合而成!";
		return false;
	}
}

function chkPassword2() {	
	if (w("pwd").value == w("pwd2").value && w("pwd").value != "") {
		w("error").innerHTML = "";
		return true;
	} else {
		w("error").innerText = "两次密码不一致！";
		return false;
	}
}
	
	
function chkPhone() {
	var reg = /^\d{11}$/;
	if(reg.test(w("phone").value)){
		w("error").innerHTML = "";
		return true;
	} else {
		w("error").innerHTML = "必须是十一位数字！";
		return false;
	}
}
function chkCode(){
	if(w("code").value == w("code2").innerHTML){
		w("error").innerHTML = "";
		return true;
	} else {
		w("error").innerHTML = "验证码输入有误！";
		return false;
	}

}
function chkSubmit() {
	if (chkPassword() 
		&& chkPassword2() 
		&& chkPhone()
		&& chkCode() ) {			
		return true;	
	} else {
		return false;
	}
}
	
$(function(){

	//注册验证
	$('#sub').click(function(){  //点击【注册】按钮触发事件
		var user = $('input[name=userID]').val(); //获取ID名
		var pasd = $('input[name=password]').val();//获取密码
		var err = $('#error').html();
		//console.log(user+":"+pasd)//yz ww
		//console.log($('form').find('label').length)//yz ww
		
		if (err == "") {
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				type:"POST",
				data:{
					status:"register",
					userID:user,
					password:pasd
				},
				success:function(res){
					//console.log(typeof res)
					//console.log(res);
					switch(res){
						case "0":alert('用户名已存在');
								 break;
						case "1":alert('恭喜您注册成功！');
						         window.location.href='login.html';
						         break;
						case "2":alert('由于服务器原因，页面加载失败');
								 break;
	
					}
				}
			})
		} else {
			alert("信息格式有误！");
		}
	})
				
	
})