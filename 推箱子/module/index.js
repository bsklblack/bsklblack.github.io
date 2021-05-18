import random from "./ul.js";
import {isWin, move} from "./player.js";

// 初始化渲染
random();
// 注册事件
document.body.onkeydown = function(e){
    e.preventDefault();
    // 左按钮37
    // 上按钮38
    // 右按钮39
    // 下按钮40
    if(e.keyCode === 37){
        move("left");
    }else if(e.keyCode === 38){
        move("up")
    }else if(e.keyCode === 39){
        move("right")
    }else if(e.keyCode === 40){
        move("down")
    }
    if(isWin()){
        document.body.onkeydown = null
        alert("恭喜")
    }

}

