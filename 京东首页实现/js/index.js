// 顶部导航栏下拉操作
$('.nav-pull').hover(function () {
    $(this).find('.title').addClass('title-hover')
    $(this).find('.nav-drop-down').show();
}, function () {
    $(this).find('.title').removeClass('title-hover')
    $(this).find('.nav-drop-down').hide();
})


// banner轮播图
$('.sliderBannerWrapper').load('./components/banner.html', function () {
    $(this).swiper({
        // 切换内容
        contentList: $('.focus-item__core'),
        // 自动切换时间
        autoChangeTime: 3000,
        // 轮播动画类型
        type: "fade",
        // 是否自动轮播
        isAuto: true,
        // 左右按钮显示状态：always一直显示，hide隐藏，hover鼠标移入显示
        showChangeBtn: 'always',
        // 是否显示小圆点
        showSpots: true,
        // 小圆点大小
        spotSize: 10,
        // 小圆点位置 center居中，left左侧，right右侧
        spotPosition: 'left',
        // 小圆点颜色
        spotColor: "#fff",
    })
});

// recommend轮播图
$(".sliderRecommendWrapper").load('./components/recommend.html', function () {
    $(this).swiper({
        // 切换内容
        contentList: $('.focus-item__recommend'),
        // 自动切换时间
        autoChangeTime: 5000,
        // 轮播动画类型
        type: "fade",
        // 是否自动轮播
        isAuto: true,
        // 左右按钮显示状态：always一直显示，hide隐藏，hover鼠标移入显示
        showChangeBtn: 'hover',
        // 是否显示小圆点
        showSpots: false,

    })
})

// seckillList轮播图
$(".seckill-list").load('./components/seckillList.html',function(){
    $(this).swiper({
        // 切换内容
        contentList: $('.slider_item'),
        // 轮播动画类型
        type: "animate",
        // 是否自动轮播
        isAuto: false,
        // 左右按钮显示状态：always一直显示，hide隐藏，hover鼠标移入显示
        showChangeBtn: 'always',
        // 是否显示小圆点
        showSpots: false,
    })
})


// 左侧菜单
$(".cate_menu_item").hover(function () {
    $(this).addClass('cate_menu_item_on');


    // 设置弹出层top值
    const top = $('.fs-nav-left').offset().top;
    const scrollTop = document.documentElement.scrollTop;   // 卷曲高度
    if (scrollTop > top) {
        $('.cate_pop').css('top', scrollTop - top)
    } else {
        $('.cate_pop').css('top', 0)
    }


    // 打开菜单
    $(".cate_pop").show();
    // 显示菜单内容
    $(".cate_part").hide().eq($(this).index()).show();

}, function () {
    $(this).removeClass('cate_menu_item_on')
})


// 关闭左侧菜单
$('.fs-nav-left').mouseleave(function () {
    $(".cate_pop").hide();
});

// 右侧服务
$('.service_ico').hover(function () {
    $(this).find('.service_ico_img_hover').css({
        visibility: 'visible',
        opacity: 1
    })
}, function () {
    $(this).find('.service_ico_img_hover').css({
        visibility: '',
        opacity: ''
    })
});


// 防抖
function trigger(fun, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearInterval(timer)
        }
        timer = setInterval(() => {
            fun();
            clearInterval(timer)
        }, delay);
    }
}



// 搜索提示词
(function () {
    function search() {
        window.callback = function (res) {
            let str = '';
            res.result.forEach((ele) => {
                
                str += `<li>
                <div class="search-item">
                    ${ele[0]}
                </div>
                <div class="search-count">
                    约${parseInt(ele[1])}个商品
                </div>
            </li>`
            })
            $('.search-helper').html(str).show();
        }
        var searchWord = $('#searchIpt').val()
        $.ajax({
            url: `https://suggest.taobao.com/sug?code=utf-8&q=${searchWord}&extras=1&area=c2c&bucketid=atb_search&pid=mm_26632258_3504122_32538762&unid=&clk1=e1e3958390fb442cfd05d149eaa79bca&_=1630388604051&callback=jsonp10`,
            dataType: 'jsonp',
            jsonpCallback: 'callback'
        })
    }

    $('#searchIpt').on('input', trigger(search, 500))
    $('.search').on('mouseleave',function(){
        $('.search-helper').hide();
    })
})();

// 推荐关键词
(function(){
    setInterval(() => {
        $.ajax({
            url : '/recommend',
            dataType : "json",
            success(res){
                $('#searchIpt').attr('placeholder',res.recommend)
            }   
        }) 
    }, 3000);
})();

// 热门关键词
(function(){
    $.ajax({
        url : "/hotWords",
        dataType : 'json',
        success(res){
            let str = '';
            res.data.forEach((ele,index)=>{
                if(index == 0){
                    str += `<a href="${ele.url}" class="text-red">${ele.text}</a>`
                }else{
                    str += `<a href="${ele.url}">${ele.text}</a>`
                }
            })
            $('.hotwords').html(str);
        }
    })
})()