// 全局通用的一些函数或一开始要执行的全局代码

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function width() {
    return document.documentElement.clientWidth;
}

function height() {
    return document.documentElement.clientHeight;
}


function createCarousel(carouselId, datas) {
    const container = $(`#${carouselId}`);
    const carouseList = container.querySelector(".g_carousel-list")
    const indicator = container.querySelector(".g_carousel-indicator");
    const prev = container.querySelector(".g_carousel-prev")
    const next = container.querySelector(".g_carousel-next")

    let curIndex = 0;   // 当前显示的页面索引
    const len = datas.length;   // 数据长度
    // 创建轮播图中的各种元素
    function createCarouselElements() {
        let listHtml = "";  // 轮播图列表内部html
        let indicatorHtml = "";
        datas.forEach(function (data) {
            if (data.link) {
                listHtml += `<li><a href="${data.link}"><img src="${data.image}" /></a></li>`
            } else {
                listHtml += `<li><img src="${data.image}" /></li>`
            }

            indicatorHtml += `<li></li>`

        })
        carouseList.style.width = `${len}00%`
        carouseList.innerHTML = listHtml;
        indicator.innerHTML = indicatorHtml;
    }
    createCarouselElements();

    // 根据目前的索引，设置正确的状态
    function setStatus() {
        carouseList.style.marginLeft = -curIndex * width() + "px"
        let beforeSelected = indicator.querySelector(".selected");
        // 取消之前选中
        if (beforeSelected) {
            beforeSelected.classList.remove("selected")
        }
        // 添加目前选中
        indicator.children[curIndex].classList.add("selected")
        // 处理之前和之后
        if (prev) {
            if (curIndex === 0) {
                // 目前是第一张图
                prev.classList.add("disabled");
            } else {
                prev.classList.remove("disabled");
            }
        }
        if (next) {
            if (curIndex === len - 1) {
                next.classList.add("disabled");
            } else {
                next.classList.remove("disabled");
            }
        }
    }
    setStatus();



    // 去上一个
    function toPrev() {
        if (curIndex === 0) {
            return;
        }
        curIndex--;
        setStatus();
    }
    // 去下一个

    function toNext() {
        if (curIndex === len - 1) {
            return;
        }
        curIndex++;
        setStatus();
    }

    let timer = null;

    // 开始自动切换
    function start() {
        if (timer) {
            return;
        }
        timer = setInterval(() => {
            curIndex++;
            if (curIndex === len) {
                curIndex = 0;
            }
            setStatus();
        }, 2000);
    }
    start()

    function stop() {
        clearInterval(timer)
        timer = null;
    }


    // 事件
    if (prev) {
        prev.onclick = toPrev;
    }
    if (next) {
        next.onclick = toNext;
    }

    container.ontouchstart = function (e) {
        // 阻止事件冒泡,防止翻页
        e.stopPropagation();
        // 停止自动播放
        stop();
        // 删除动画效果
        carouseList.style.transition = "none"
        let startTime = Date.now();
        let x = e.touches[0].clientX
        let dis;
        container.ontouchmove = function (e) {
            dis = e.touches[0].clientX - x;
            carouseList.style.marginLeft = -curIndex * width() + dis + "px"
        }

        // 放手
        container.ontouchend = function (e) {
            // 恢复动画效果
            carouseList.style.transition = "";
            // 开始自动播放
            start();
            // 300ms内都算快速滑动
            let duration = Date.now() - startTime;
            if (duration < 300) {
                if (dis > 20) {
                    toPrev()
                } else if (dis < -20) {
                    toNext()
                }
            } else {
                if (dis > width() / 2) {
                    toPrev()
                } else if (dis < -width() / 2) {
                    toNext()
                }
                container.ontouchmove = null;
                container.ontouchend = null;
            }
            setStatus();
        }

    }
}



// ajax请求
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
        throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
        headers: {
            target,
        },
    }).then((r) => r.json());
}

