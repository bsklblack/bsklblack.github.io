import * as map from "./map.js"
import random from "./ul.js"


let recall = []


function getNextPosition(direction, row, col) {
    if (direction === "left") {
        return {
            value: map.mapPoint[row][col - 1],
            row: row,
            col: col - 1
        }
    } else if (direction === "right") {
        return {
            value: map.mapPoint[row][col + 1],
            row: row,
            col: col + 1
        }
    } else if (direction === "up") {
        return {
            value: map.mapPoint[row - 1][col],
            row: row - 1,
            col: col
        }
    } else if (direction === "down") {
        return {
            value: map.mapPoint[row + 1][col],
            row: row + 1,
            col: col
        }
    }
}

function getPlayerPosition() {
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            if (map.mapPoint[row][col] === map.PLAYER) {
                return {
                    row: row,
                    col: col
                }
            }
        }
    }
    throw new Error("没有玩家玩个嘚")
}


function changePosition(point1,point2){

    let temp = map.mapPoint[point1.row][point1.col];
    map.mapPoint[point1.row][point1.col] = map.mapPoint[point2.row][point2.col];
    map.mapPoint[point2.row][point2.col] = temp;

}


function move(direction) {
    let player = getPlayerPosition();
    let next = getNextPosition(direction, player.row, player.col);

    // 如果下一个是墙
    if(next.value === map.WALL){
        return 
    }

    // 如果下一个是空白
    if(next.value === map.SPACE){
        changePosition(player,next)
    }

    // 如果下一个是箱子
    if(next.value === map.BOX){
        let nextNext = getNextPosition(direction, next.row, next.col);
        console.log(nextNext,map.BOX);
        if(nextNext.value === map.WALL || nextNext.value === map.BOX){
            return ;
        }else{
            changePosition(next,nextNext);
            changePosition(next,player)
        }
    }
    random();
}

function isWin(){
    for (const position of map.rightPosition) {
        if(map.mapPoint[position.row][position.col] !== map.BOX){
            return false
        }
    }
    return true
}
export {isWin,move}







