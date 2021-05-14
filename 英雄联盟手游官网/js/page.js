let pageIndex = 0; // 当前显示页面
const pages = $$(".page-container .page")
let nextIndex = null;   // 下一个页面

// 设置静止状态
function setStatic() {
    nextIndex = null;
    for (let i = 0; i < pages.length; i++) {
        let page = pages[i];
        page.style.top = (i - pageIndex) * height() + "px"
        if (i === pageIndex) {
            page.style.zIndex = 0;
        } else {
            page.style.zIndex = 10;
        }
    }
}
setStatic();

// 移动中
function moving(offset) {
    for (let i = 0; i < pages.length; i++) {
        if (i !== pageIndex) {
            pages[i].style.top = (i - pageIndex) * height() + offset + "px"
        }
    }
    // 判断下一个页面
    if (offset > 0 && pageIndex !== 0) {
        nextIndex = pageIndex - 1;
    } else if (offset < 0 && pageIndex !== pages.length - 1) {
        nextIndex = pageIndex + 1;
    } else {
        nextIndex = null;
    }

}

// 移动完成
function finishMove() {
    if (nextIndex == null) {
        setStatic();
        return;
    }
    pages[nextIndex].style.top = 0;
    pages[nextIndex].style.transition = ".5s"
    setTimeout(() => {
        pageIndex = nextIndex;
        pages[nextIndex].style.transition = "";
        setStatic();
    }, 500);
}


// 事件
const pageContainer = $(".page-container");

pageContainer.ontouchstart = function(e){
    var y = e.touches[0].clientY;
    function handler(e){
        let dis = e.touches[0].clientY - y;
        if(Math.abs(dis) < 20){
            // 防止误触
            dis = 0;
        }
        moving(dis);

        if(e.cancelable){
            e.preventDefault();
        }

    }
    pageContainer.addEventListener("touchmove",handler,{passive:false})

    pageContainer.ontouchend = function(){
        finishMove()
        pageContainer.removeEventListener("touchmove",handler);
    }
}


// 跳转页面
function showPage(index){
    if(pageIndex < index){
        // 下一个页面在当前页面的下面
        pages[index].style.top = height() + "px";
    }else if(pageIndex > index){
        // 下一个页面在当前页面的上面
        pages[index].style.top = -height() + "px";
    }else{
        if(index == 0){
            pageIndex++
            
        }else{
            pageIndex--
        }
    }
    setStatic();
    nextIndex = index;
    pages[index].clientHeight; // 让浏览器强制渲染
    finishMove()
}