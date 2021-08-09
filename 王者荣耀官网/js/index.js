
function createSlider(container, duration, callback) {

    var firstItem = container.querySelector(".slider-item");
    var cw = container.clientWidth; // 轮播窗口宽度
    var count = container.children.length;  // item数量
    var currentIndex = 0;   // 当前item项
    var timer = null;   // 定时器

    // 移动到指定item
    function switchTo(index) {
        if (index < 0) {
            index = 0;
        }
        if (index > count - 1) {
            index = count - 1;
        }
        currentIndex = index
        firstItem.style.marginLeft = -cw * index + "px"
        firstItem.style.transition = "margin 1s"
        callback && callback(currentIndex)
    }

    // 开始自动轮播
    function startAuto() {
        if (timer || duration === 0) {
            return
        }
        timer = setInterval(() => {
            switchTo((currentIndex + 1) % count);
        }, duration);
    }

    // 停止自动轮播
    function stopAuto() {
        clearInterval(timer);
        timer = null;
    }
    startAuto();

    // 手指滑动
    container.ontouchstart = function (e) {
        stopAuto()
        firstItem.style.transition = null;
        var startX = e.touches[0].clientX;
        var mL = parseFloat(firstItem.style.marginLeft) || 0;
        container.ontouchmove = function (e) {
            var disX = e.touches[0].clientX - startX
            var newX = mL + disX;
            if (newX > 0) {
                newX = 0
            }
            if (newX < - cw * (count - 1)) {
                newX = - cw * (count - 1)
            }
            firstItem.style.marginLeft = newX + "px"
        }
        container.ontouchend = function (e) {
            var disX = e.changedTouches[0].clientX - startX
            if (disX < 0) {
                switchTo(currentIndex + 1);
            } else {
                switchTo(currentIndex - 1);
            }
            startAuto();
        }
    }
    return switchTo;
}

// banner轮播图
(function () {
    var banner = $(".banner .slider-container");
    var dots = $(".banner .dots");
    createSlider(banner, 2000, function (index) {
        var ac = dots.querySelector(".active");
        ac && ac.classList.remove("active")
        dots.children[index].classList.add("active");
    });
})();


// 菜单区域
(function () {
    var isExpand = false;
    $('.menu .expand').onclick = function () {
        var txt = this.querySelector(".txt");
        var spr = this.querySelector(".spr");
        var list = $(".menu .menu-list");
        if (isExpand) {
            // 展开状态
            txt.innerText = "展开";
            spr.classList.add("spr_expand")
            spr.classList.remove("spr_collapse")
            list.style.flexWrap = "";

        } else {
            // 折叠状态
            txt.innerText = "折叠";
            spr.classList.add("spr_collapse")
            spr.classList.remove("spr_expand")
            list.style.flexWrap = "wrap";

        }


        isExpand = !isExpand;
    }

})();

/**
 * 进一步封装板块功能
 * @param {HTMLElement} blockContainer
 */

function createBlock(blockContainer) {
    var sliderContainer = blockContainer.querySelector(".slider-container");
    var blockMenu = blockContainer.querySelector(".block-menu");
    var switchTo = createSlider(sliderContainer, 0, function (index) {
        var ac = blockMenu.querySelector(".active");
        ac && ac.classList.remove("active");
        blockMenu.children[index].classList.add("active")
    })
    for (let i = 0; i < blockMenu.children.length; i++) {
        blockMenu.children[i].onclick = function () {
            switchTo(i);
        }
    }
}


(async function () {
    var resp = await fetch('./data/news.json').then(function (resp) {
        return resp.json()
    })
    var sliderContainer = $('.news-list .slider-container')
    // 生成新闻元素
    for (const key in resp) {
        var news = resp[key];
        // 生成一个slider-item
        var div = document.createElement('div');
        div.classList.add('slider-item')
        var html = '';
        html += news.map((item) => {
            return `<div class="news-item ${item.type}">
            <a href="${item.link}">${item.title}</a>
            <span>${item.pubDate}</span>
          </div>`;
        }).join('');


        div.innerHTML = html;
        sliderContainer.appendChild(div)
    }

    createBlock($(".news-list"));
})()



