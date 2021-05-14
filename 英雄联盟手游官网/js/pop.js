let showPop = (function () {
    function showPop(id) {
        let container = $("#" + id)
        container.style.display = "";
        // 视频打开时，自动播放
        if(id === "popVideo"){
            container.querySelector("video").play();
        }
    }
    // 获取所有关闭按钮，注册事件
    let closeBtns = $$(".pop-close");
    for (const closeBtn of closeBtns) {
        closeBtn.onclick = function () {
            this.parentElement.parentElement.style.display = "none"
        }
    }

    // 微信qq选中切换
    const popWx = $(".pop-wx");
    const popQq = $(".pop-qq");
    popWx.onclick = function(){
        this.classList.add("selected");
        popQq.classList.remove("selected")
    }
    popQq.onclick = function(){
        this.classList.add("selected");
        popWx.classList.remove("selected")
    }

    // 关闭时，视频停止
    $("#popVideo .pop-close").addEventListener("click",function(){
        $("#popVideo video").pause()
    })
    return showPop;
})()

