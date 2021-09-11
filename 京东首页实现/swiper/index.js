

function Swiper(options, wrap) {
    this.wrap = wrap;
    this.contentList = options.contentList || []; // 切换内容
    this.autoChangeTime = options.autoChangeTime || 5000; // 自动切换时间
    this.type = options.type || 'animate'; // 轮播动画类型
    this.isAuto = options.isAuto == undefined ? true : !!options.isAuto; // 是否自动轮播
    this.showChangeBtn = options.showChangeBtn || 'always'; // 左右按钮显示状态：always一直显示，hide隐藏，hover鼠标移入显示
    this.showSpots = options.showSpots == undefined ? true : !!options.showSpots; // 是否显示小圆点
    this.spotSize = options.spotSize || 10; // 小圆点大小
    this.spotPosition = options.spotPosition || 'center'; // 小圆点位置 center居中，left左侧，right右侧
    this.spotColor = options.spotColor || '#fff';  // 小圆点颜色
    this.width = options.width || $(wrap).width();
    this.height = options.height || $(wrap).height();
    this.len = this.contentList.length;
    this.current = 0;
    this.timer = null;
}

// 初始化轮播图
Swiper.prototype.init = function () {
    // 1、创建结构
    this.createElement();
    // 2、初始化样式
    this.initStyle();
    // 3、功能绑定
    this.bindEvent();
    // 4、自动轮播
    if(this.isAuto){
        this.autoPlay();
    }
}

// 功能绑定
Swiper.prototype.bindEvent = function () {
    const that = this;
    // 左箭头点击
    $(this.wrap).find('.swiper-lbtn').click(function () {
        if (this.type === 'fade') {
            // 淡入淡出 正常操作
            that.current--;
            if (that.current < 0) {
                that.current = that.len - 1;
            }
        } else {
            // 滑动，当前页为0时，需要瞬间切换到最后一张
            if (that.current === 0) {
                $(that.wrap).find('.swiper-items').css({
                    left: -that.len * that.width
                })
                that.current = that.len - 1;
            } else {
                that.current--;
            }
        }
        that.render();
    })
    // 右箭头点击
    $(this.wrap).find('.swiper-rbtn').click(function () {
        if (that.type === 'fade') {
            // 淡入淡出 正常操作
            if (that.current === that.len - 1) {
                that.current = 0;
            } else {
                that.current++;
            }
            that.render();
        } else {
            // 滑动，当前页为that.len时，需要瞬间切换到第一张
            if (that.current === that.len) {
                $(that.wrap).find('.swiper-items').css({
                    left: 0
                })
                that.current = 1;
            } else {
                that.current++;
            }
            that.render();
        }

    })
    // 小圆点进入
    $(this.wrap).find('.swiper-spots').on('mouseenter','span',function(){
        that.current = $(this).index();
        that.render();
    })
    $(this.wrap).mouseenter(function(){
        clearInterval(that.timer)
    }).mouseleave(function(){
        if(that.isAuto){
            that.autoPlay();
        }
    })
}


// 创建轮播结构
Swiper.prototype.createElement = function () {
    // 轮播区域
    const swiperWrapper = $('<div class="swiper-wrapper"></div>');
    // 轮播内容区
    const swiperItems = $('<ul class="swiper-items"></ul>');
    // 轮播图中的左右切换按钮区域
    const leftBtn = $('<div class="swiper-btn swiper-lbtn">&lt;</div>');
    const rightBtn = $('<div class="swiper-btn swiper-rbtn">&gt;</div>');
    // 轮播区小圆点
    const spotsWrapper = $('<div class="swiper-spots"></div>');
    // 循环轮播内容，创建轮播结构
    for (let i = 0; i < this.len; i++) {
        $('<li class="swiper-item"></li>').html(this.contentList[i]).appendTo(swiperItems)
        $('<span></span>').appendTo(spotsWrapper);
    }
    if (this.type === 'animate') {
        // 从左到右无缝衔接，在最后添加第一项元素内容
        swiperItems.append($('<li class="swiper-item"></li>').html($(this.contentList[0]).clone(true)))
    }

    // 左右箭头是否显示
    switch (this.showChangeBtn) {
        case "hide":
            leftBtn.hide();
            rightBtn.hide();
            break;
        case "hover":
            leftBtn.hide();
            rightBtn.hide();
            swiperWrapper.hover(function () {
                leftBtn.show();
                rightBtn.show();
            }, function () {
                leftBtn.hide();
                rightBtn.hide();
            })
            break;
        default:
            break;
    }

    // 小圆点是否显示
    if(!this.showSpots){
        spotsWrapper.hide()
    }

    // 是否自动轮播
    // if(this.isAuto){
    //     const that = this;
    //     setInterval(function(){
    //         that.current++
    //         that.current %= (that.len)
    //         that.render();
    //     },this.autoChangeTime)
    // }



    swiperWrapper.append(swiperItems)
        .append(leftBtn)
        .append(rightBtn)
        .append(spotsWrapper)
        .appendTo(this.wrap)
        .addClass('swiper-wrapper_' + this.type)
}

// 初始化样式
Swiper.prototype.initStyle = function () {
    $(this.wrap).find('.swiper-items').css({
        // 设置ul的宽度，animate时等于所有子项宽度和
        width: this.type == 'animate' ? this.width * (this.len + 1) : this.width
    }).find('.swiper-item').css({
        width: this.width,
        height: this.height
    })
    if (this.type == 'fade') {
        // 淡出效果
        $(this.wrap).find('.swiper-item').eq(this.current).show();
    } else {
        // 滑动效果
        $(this.wrap).find('.swiper-items').css({
            left: -this.current * this.width
        })
    }


    // 小圆点样式
    $(this.wrap).find('.swiper-spots').css({
        textAlign: this.spotPosition
    }).find('span').css({
        width: this.spotSize,
        height: this.spotSize,
    }).eq(this.current).css({
        backgroundColor: this.spotColor
    })
}

// 渲染页面
Swiper.prototype.render = function () {
    if (this.type === 'fade') {
        $(this.wrap).find('.swiper-item').fadeOut()
            .eq(this.current)
            .fadeIn();

    } else {
        $(this.wrap).find('.swiper-items').stop().animate({
            left: -this.current * this.width
        })
    }
    $(this.wrap)
        .find('.swiper-spots > span')
        .css({
            backgroundColor: 'rgba(255,255,255,.4)'
        })
        .eq(this.current % this.len)
        .css({
            backgroundColor: this.spotColor
        })

}

// 自动轮播
Swiper.prototype.autoPlay = function(){
    this.timer = setInterval(() => {
        $(this.wrap).find('.swiper-rbtn').trigger('click');
    }, this.autoChangeTime);
}
$.fn.extend({
    swiper: function (options) {
        const obj = new Swiper(options, this);
        obj.init();
    }
})