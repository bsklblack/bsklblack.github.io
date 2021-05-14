var tableData = [];
// 当前数据的页码
var currentPage = 1;
// 每页数据条数
var pageSize = 10;
// 总页数
var totalPage = 1;



window.onload = function(){
	bindEvent();
	getTableData()
}


// 绑定事件
function bindEvent(){
	// 菜单样式切换
	$('.left-menu').on('click', 'dd', function(){
		$(this).addClass('active')
			   .siblings()
					.removeClass('active')
	});
	
	// 添加学生
	$('#student-add-btn').click(function(e){
		e.preventDefault()
		var addStuForm =  getFormData($("#student-add-form")[0]);
		if(addStuForm.status === "success"){
			api.addStudent(addStuForm.data,function(){
				alert("新增成功")
				getTableData()
				// 菜单样式改变
				$("a[href='#stuList']").trigger('click');
				// 锚点改变
				location.hash = "#stuList";
				// 表单重置
				$("#student-add-reset").trigger('click');
			})
		}else{
			alert(addStuForm.msg)
		}
	});
	
	// 编辑按钮
	$("#stuList tbody").on("click", ".btn-edit", function(){
		var index = $(this).parents("tr").index();
		// 渲染弹窗数据
		renderEditForm(tableData[index])
		// 弹窗显示
		$(".mask").slideDown();
	})
	// 删除按钮
	$("#stuList tbody").on("click", ".btn-delete", function(e){
		e.preventDefault();
		var index = $(this).parents("tr").index();
		if(confirm("确定删除？")){
			api.deleteStudent(tableData[index].sNo,function(result){
				alert(result.msg);
				getTableData();
			});
		}
	
	})
	
	
	
	
	// 修改按钮
	$("#student-edit-btn").click(function(e){
		e.preventDefault();
		var editStuForm =  getFormData($("#student-edit-form")[0]);
		if(editStuForm.status == "success"){
			api.updateStudent(editStuForm.data,function(){
				getTableData()
				$(".mask").slideUp();
				alert("修改成功")
			})
		}else{
			alert(editStuForm.msg)
		}
		
	})
	
	
	
	
	
	// 点击空白，弹窗关闭
	$(".mask").click(function(e){
		if(this == e.target){
			$(this).slideUp();
		}
	})
}

// 渲染弹窗
function renderEditForm(data){
	// 编辑表单元素
	
	var form = $("#student-edit-form")[0];
	for(var prop in data){
		if(form[prop]){
			form[prop].value = data[prop];
		}
	}
	
}




// 获取表格数据
function getTableData(){
	api.getStudentData(pageSize, currentPage, function(result){
		tableData = result.data;
		totalPage = Math.ceil(result.count / pageSize);
		renderTable(tableData);
	})
}


// 获取表单数据
function getFormData(form){
	var name = form.name.value;
	var sex = form.sex.value;
	var email = form.email.value;
	var sNo = form.sNo.value;
	var birth = form.birth.value;
	var phone = form.phone.value;
	var address = form.address.value;
	
	// 最终返回信息
	var result = {
		data : {},
		status : 'success',
		msg : ''
	}
	// 判断表单是否全部填写
	if(!name || !email || !sNo || !birth || !address || !phone){
		result.status = 'fail';
		result.msg = "信息填写不全";
		return result;
	}
	
	// 判断邮箱格式
	var emailReg = /^\w+[\.\-_]*\w+@(\w+[\-_]?)+\.com$/
	if(!emailReg.test(email)){
		result.status = 'fail';
		result.msg = "邮箱格式不正确";
		return result;
	}
	
	// 判断学号的规则：  4 - 16位数字
	var sNoReg = /^\d{4,16}$/;
	if (!sNoReg.test(sNo)) {
	  result.status = 'fail';
	  result.msg = '学号应为4-16位有效数字';
	  return result;
	}
	// 出生年份的校验 1975 - 2020
	if (birth < 1975 || birth > 2020) {
	  result.status = 'fail';
	  result.msg = '出生年份不正确';
	  return result;
	}
	
	// 手机号的校验
	var phoneReg = /^1[3456789]\d{9}$/;
	if (!phoneReg.test(phone)) {
	  result.status = 'fail';
	  result.msg = '手机号码不正确';
	  return result;
	}
	result.data = {
	  name,
	  sex,
	  email,
	  sNo,
	  birth,
	  address,
	  phone
	};
	return result;
}




// 渲染数据
function renderTable(data){
	var str = data.reduce(function(pre, ele, index){
		return pre + `
			<tr>
				<td>${ele.sNo}</td>
				<td>${ele.name}</td>
				<td>${ele.sex == 0 ? '男' : '女'}</td>
				<td>${ele.email}</td>
				<td>${ele.birth}</td>
				<td>${ele.phone}</td>
				<td>${ele.address}</td>
				<td>
					<button class="btn btn-edit">编辑</button>
					<button class="btn btn-delete">删除</button>
				</td>
			</tr>
		`
	}, '');
	$('#stuList > table > tbody').html(str);
	$(".turnpage").page({
		current : currentPage,
		total : totalPage,
		change : function(page){
			currentPage = page;
			getTableData();
		}
	})
}
