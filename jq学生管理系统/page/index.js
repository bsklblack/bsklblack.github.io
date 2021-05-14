(function(){
	
	// 用于创建翻页组件对象
	function Page(options, wrap){
		this.current = options.current || 1;
		this.total = options.total || 1;
		this.wrap = wrap;
		this.change = options.change || function(){}
	}
	Page.prototype.init = function(){
		// 1.创建dom结构
		this.fillHTML();
		
		// 2.实现用户行为
		this.bindEvent();
	}
	
	Page.prototype.fillHTML = function(){
		var pageWrapper = $('<ul class="my-page-wrap"></ul>');
		// 插入上一页
		if(this.current > 1){
			pageWrapper.append($('<li class="my-page-preBtn">上一页</li>'))
		}
		
		// 插入第一页
		$('<li class="my-page-num">1</li>').appendTo(pageWrapper)
										   .addClass(this.current == 1 ? "my-page-current" : "" );
											
		
		// 插入前面的省略号
		if(this.current - 3 > 0){
			$('<span>...</span>').appendTo(pageWrapper)
		}
		
		// 插入中间五页 
		for(var i = this.current - 2; i <= this.current + 2; i ++){
			if(i > 1 && i < this.total){
				$('<li class="my-page-num"></li>').text(i).appendTo(pageWrapper)
												  .addClass(this.current == i ? "my-page-current" : "" );	
			}
		}
		
		// 插入后面的省略号
		if(this.total - this.current - 2 > 1){
			$('<span>...</span>').appendTo(pageWrapper)
		}
		
		// 插入最后一页
		this.total != 1 && $('<li class="my-page-num"></li>').text(this.total).appendTo(pageWrapper)
															 .addClass(this.current == this.total ? "my-page-current" : "" );
		
		// 插入下一页
		if(this.current < this.total){
			$('<li class="my-page-nextBtn">下一页</li>').appendTo(pageWrapper);
		}
		
		
		this.wrap.html(pageWrapper)
	}
	
	Page.prototype.bindEvent = function(){
		var self = this;
		$(this.wrap).find(".my-page-preBtn").click(function(){
			self.current --;
			self.init()
			self.change(self.current)
		})
		$(this.wrap).find(".my-page-nextBtn").click(function(){
			self.current ++;
			self.init()
			self.change(self.current)
		})
		$(this.wrap).find(".my-page-num").click(function(){
			self.current = +$(this).text();
			self.init()
			self.change(self.current)
		})
	}
	
	
	$.fn.extend({
		page : function(options){
			var obj = new Page(options, this);
			obj.init();
		}
	})
	
	
	
}())