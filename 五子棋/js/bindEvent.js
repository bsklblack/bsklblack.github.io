import Piece from "./Piece.js";
import {checkerData} from "./createCheckerboard.js"
import isWin from "./isWin.js";

let flag = Boolean(Math.random() > 0.5);

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const win = document.querySelector(".win");

canvas.onclick = function(e){
    let disX = round(e.layerX);
    let disY = round(e.layerY);
    let y = disX / 40 - 1;
    let x = disY / 40 - 1;
    if(checkerData[x][y] !== 0){
        return;
    }
    let color = "";
    if(flag){
        color = "#fff";
        checkerData[x][y] = 1;
    }else{
        color = "#000"
        checkerData[x][y] = 2;
    }
    flag = !flag;
    
    new Piece(disX,disY,color,ctx).rander();

    if(isWin(checkerData,x,y)){
        canvas.onclick = null;
        if(color==="#fff"){
            win.style.display = "block";
            win.innerHTML = "白棋胜！"
        }else{
            win.style.display = "block";
            win.innerHTML = "黑棋胜！"
        }
    }
    
    
}


function round(num){
    let integer = Math.floor(num / 40);
    let remainder = num % 40;
    if(remainder > 20){
        integer ++; 
    }
    return integer * 40;
}