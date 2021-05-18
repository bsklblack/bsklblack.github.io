// 0为空白
// 1为玩家
// 2为墙
// 3为未完成箱子
const SPACE = 0;
const PLAYER = 1;
const WALL = 2;
const BOX = 3

export { SPACE, PLAYER, WALL, BOX }




const mapPoint = [
    [0, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [2, 2, 0, 0, 0, 2, 2, 0, 0, 0],
    [2, 0, 0, 3, 0, 0, 2, 2, 0, 0],
    [2, 0, 3, 0, 3, 0, 0, 2, 2, 0],
    [2, 2, 2, 3, 2, 0, 0, 0, 2, 2],
    [0, 0, 2, 0, 2, 0, 0, 0, 0, 2],
    [0, 2, 2, 0, 2, 2, 0, 0, 0, 2],
    [0, 2, 0, 1, 0, 0, 0, 0, 2, 2],
    [0, 2, 0, 0, 0, 2, 0, 0, 2, 2],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
]
export { mapPoint }

const rightPosition = [
    { row: 4, col: 6 },
    { row: 5, col: 6 },
    { row: 6, col: 6 },
    { row: 7, col: 6 },

]
export { rightPosition }



let colNumber = mapPoint[0].length
let rowNumber = mapPoint.length
export { colNumber }
export { rowNumber }


