var api = {
	addStudent(data, cb) {
		transferData('/api/student/addStudent',data,cb)
	},
	deleteStudent(sNo, cb) {
		transferData('/api/student/delBySno', {
			sNo: sNo
		}, cb)

	},
	updateStudent(data, cb) {
		transferData('/api/student/updateStudent', data, cb)
	},
	getStudentData(size, currentPage, cb) {
		transferData('/api/student/findByPage', {
			page: currentPage,
			size: size
		}, cb);
	}

}


function transferData(url, data, success) {
	$.ajax({
		url: url,
		data: $.extend({
			appkey: "xxxxx",
		}, data),
		type: 'get',
		dataType: 'json',
		success: function(res) {
			success(res);
		}
	})
}
