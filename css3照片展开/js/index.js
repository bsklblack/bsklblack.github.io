var ul = document.querySelector("ul");
var lis = document.querySelectorAll("li");
var closeBtns = document.querySelectorAll(".close")

var last = null;
var timer = setTimeout(function(){
	ul.className = ""
},200);


lis.forEach(function(li, index){
	li.onclick = function(){
		ul.id = "activeWrap";
		last && (last.className = "");
		this.className = "active";
		last = this;
	}
	
	closeBtns[index].onclick = function(ev){
		ul.id = "";
		lis[index].className = "";
		last = null;
		ev.cancelBubble=true;
	}
	
})