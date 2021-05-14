// 学生列表数据
var data = Mock.mock({
	"status": "success",
	"msg": "",
	"data|100" : [{
			"id|+1" :  0,
			"sNo|+1" : 10001,
			"name" : "@cname",
			"email" : /^\w+[\.\-_]*\w+@(\w+[\-_]?)+\.com$/,
			"sex|1" : [0, 1],
			"birth" : "@date",
			"phone" : /^1[3578]\d{9}$/,
			"address" : "@city(true)",
			"ctime" : "@time(T)",
			"utime" : "@time(T)"
	}]
})

Mock.mock(RegExp("/api/student/findAll?[\w\W]*"), function(options){
	return data
})

Mock.mock(RegExp("/api/student/addStudent?[\w\W]*"), function(options){
	var query = decodeURIComponent(options.url.split('?')[1]);
	var stu = queryToObj(query)
	data.data.push(stu);
	return data
})

Mock.mock(RegExp("/api/student/updateStudent?[\w\W]*"), function(options){
	var query = decodeURIComponent(options.url.split('?')[1]);
	var stu = queryToObj(query)
	for(var i = 0; i < data.data.length; i ++){
		if(data.data[i].sNo == stu.sNo){
			data.data[i] = stu;
		}
	}
	return data
})

Mock.mock(RegExp("/api/student/delBySno?[\w\W]*"), function(options){
	var query = decodeURIComponent(options.url.split('?')[1]);
	var reqObj = queryToObj(query)
	if(reqObj.sNo){
		data.data = data.data.filter(function(ele){
			return ele.sNo != reqObj.sNo;
		});
		return {
		    "status": "success",
		    "msg": "删除成功",
		    "data": {}
		}
	}else{
		return {
		    "status": "fail",
		    "msg": "未传递学号",
		    "data": {}
		}
	}
})

// 分页查询
Mock.mock(RegExp("/api/student/findByPage?[\w\W]*"),function(options){
	var query = decodeURIComponent(options.url.split('?')[1]);
	var reqObj = queryToObj(query)
	var current = reqObj.page;
	var pageSize = reqObj.size;
	var result = data.data.filter(function(item, index){
		return index >= (current-1) * pageSize && index < pageSize * current
	})
	return {
		"status": "success",
		"msg": "",
		"data" : result,
		"count" : data.data.length
	}
})


function queryToObj(query){
	var obj = {}
	query.split('&').reduce(function(pre, ele, index){
		var arr = ele.split("=");
		pre[ arr[0] ] = arr[1]
		return pre;
	},obj)
	return obj;
}