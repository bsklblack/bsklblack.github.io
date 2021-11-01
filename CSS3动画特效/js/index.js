var boxBg = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f'];	//box背景色
var bodyBg = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#616161'];	//body背景色
var rot = ['rotateX(-180deg)', 'rotateY(-180deg)', 'rotateX(180deg)', 'rotateY(180deg)'];	//旋转方向：下(0)左(1)上(2)右(3)

var style = document.createElement('style');
var str = '';

for(var i = 0;  i < boxBg.length;i ++){
	str += `.box:nth-child(${i+1}) div{
	background: ${boxBg[i]} url(images/${i+1}.png) no-repeat center;
}`
}
style.innerHTML = str;
document.head.appendChild(style);


var boxes = document.querySelectorAll(".box");

boxes.forEach(function(box){
	box.onmouseenter = function(ev){
		var dir = getDir(ev, this);
		this.style.transform = 'translateZ(150px)' + rot[dir];
		document.body.style.background = bodyBg[Math.round(Math.random() * bodyBg.length)]
	}
	box.onmouseleave = function(){
		this.style.transform = ''
	}
	
})



function getDir(ev, box){
	var l = box.getBoundingClientRect().left;
	var t = box.getBoundingClientRect().top;
	var w = box.offsetWidth;
	var h = box.offsetHeight;
	var x = ev.clientX - l - w / 2;
	var y = ev.clientY - t - h / 2;
	// Math.atan2(y , x)计算弧度值
	// 角度值 = 弧度值 * 180 / Π
	var deg = Math.atan2(y , x) * 180 / Math.PI;
	// 区域划分为4块如下
	// 右		下		上			左
	// -45~45	45~135	-45~-135	-135~-180和135~180
	// 加180，将角度区间变为0~360度
	// 135~225	225~315	45~135		45~0	315~360	
	// 除90分4份
	// 2		3		1			4或0
	// 加3模4，消除左边的或
	var d = (Math.round((deg + 180)/90) + 3) % 4
	
	return d;
}


var content = document.querySelector('.content');
document.onmousemove = function (ev) {
	/*
		鼠标往右走，旋转Y轴的正值；往左走旋转y轴的负值 
		鼠标往上走，旋转X轴的正值；往下走旋转x轴的负值 

		鼠标在x轴上的数值
		0	1	2	3	4	5	6	7	8
		-4	-3	-2	-1	0	1	2	3	4

		鼠标在y轴上的数值
		0	1	2	3	4	5	6	7	8
		4	3	2	1	0	-1	-2	-3	-4
	 */

	//上下转，取y轴
	var x = (0.5 - ev.clientY / window.innerHeight) * 15;	//乘15是为了让数值大一点
	var y = (ev.clientX / window.innerWidth - 0.5) * 15;	//乘15是为了让数值大一点

	content.style.transform = 'perspective(1000px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
}