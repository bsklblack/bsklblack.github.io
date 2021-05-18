import * as map from "./map.js"

const unitElementWidth = 50;
const unitElementHeight = 50;

// 设置游戏区大小
let gameContainer = document.querySelector(".game");
gameContainer.style.width = map.colNumber * unitElementWidth + "px"
gameContainer.style.height = map.rowNumber * unitElementHeight + "px"


// 判断是否为正确位置
function isRightPosition(row, col) {
    for (const position of map.rightPosition) {
        if (row === position.row && col === position.col) {
            return true
        }
    }
    return false
}

// 渲染单个元素
function setUnitElement(row, col) {
    // 设置位置
    let value = map.mapPoint[row][col]
    const div = document.createElement("div");
    div.style.left = col * unitElementHeight + "px";
    div.style.top = row * unitElementWidth + "px";
    div.className = "item"
    let isRight = isRightPosition(row, col);
    if (value === map.PLAYER) {
        div.classList.add("player")
    } else if (value === map.WALL) {
        div.classList.add("wall")
    } else if (value === map.BOX) {
        if (isRight) {
            div.classList.add("complete");
        } else {
            div.classList.add("box");
        }
    } else {
        if (isRight) {
            div.classList.add("border")
        } else {
            return
        }
    }
    gameContainer.appendChild(div)
}


// 导出渲染页面方法
export default function() {
    gameContainer.innerHTML = "";
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            setUnitElement(row, col)
        }
    }
}




