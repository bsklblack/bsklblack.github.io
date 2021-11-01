// 获取数据
function getMessage(sendStr){
	ajax({
		type : 'get',
		url : 'https://developer.duyiedu.com/edu/turing/chat',
		success : function(res){
			createReceive(JSON.parse(res).text)
		},
		data : 'text=' + sendStr
	})
}
var oBody = document.querySelector(".wrapper__body");

// 事件注册
function bindEvent(){
	// 发送按钮
	var sendBtn = document.getElementById("btn");
	var oInput = document.getElementById("oInput");
	sendBtn.onclick = function(){
		if(oInput.value != '' && oInput.value != null){
			getMessage(oInput.value);
			createSend(oInput.value);
			oInput.value = '';
		}
	}
	
	
	// 回车发送
	document.onkeydown = function(e){
		if(e.keyCode == 13){
			sendBtn.click();
		}
	}
}	
bindEvent()

// 创建发送消息
function createSend(send){
	var sendStr = `<div class="send">
					<div>${send}</div><img src="../img/dog1.jpg" >
				</div>`;
	oBody.innerHTML += sendStr;
}

// 创建接收消息
function createReceive(receive){
	var receiveStr = `<div class="receive">
					<img src="../img/dog1.jpg" ><div>${receive}</div>
				</div>`
	oBody.innerHTML += receiveStr			
}



