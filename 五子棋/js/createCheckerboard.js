
function createCheckerboard(){
    const canvas = document.querySelector("#can");
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = .4;
    ctx.strokeStyle = "#000";
    for(var i = 1; i <= 14; i++){
        ctx.beginPath();
        ctx.moveTo(i * 40,40);
        ctx.lineTo(i * 40, 600 - 40);
        ctx.stroke()
        ctx.beginPath();
        ctx.moveTo(40, i * 40);
        ctx.lineTo(600 - 40, i * 40);
        ctx.stroke();
    }
}

const checkerData = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

export{createCheckerboard,checkerData};