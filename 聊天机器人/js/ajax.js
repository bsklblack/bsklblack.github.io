/**
 * @param {Object} options
 * @desc 封装一个ajax
 * 参数：
 * 	1、type		请求方式
 * 	2、url		请求地址
 * 	3、data		请求参数
 *	4、isAsync	是否异步 
 * 	5、success	请求成功的回调函数
 * 	6、error	请求失败的回调函数
 */
function ajax(options){
	var type = options.type || "GET";
	var url = options.url || "";
	var data = options.data || '';
	var isAsync = options.isAsync != undefined ? options.isAsync : true;
	var success = options.success || function(){};
	var error = options.error || function(){};
	var xhr = null;
	if(XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else if(ActiveXObject){
		xhr = new ActiveXObject("Microsoft.XMLHttp");
	}else{
		return alert("浏览器版本够呛了");
	}
	
	type = type.toUpperCase();
	if(type == "GET"){
		// 判断url中是否带有数据
		if(url.indexOf('?') > -1){
			if(url.indexOf('?') === url.length-1){
				url += data;
			}else{
				url += "&" + data;
			}
		}else{
			url += "?" + data;
		}
		xhr.open("GET", url, isAsync);
		xhr.send()
	}else if(type == "POST"){
		xhr.open("POST", url, isAsync);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(data)
	}
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				success(xhr.responseText)
			}
		}
	}
	xhr.onerror = function(e){
		error(e)
	}
	
}