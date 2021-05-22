export default function (arr, disX, disY) {
    let res1 = next(arr, disX, disY, 0, 1);
    let res2 = next(arr, disX, disY, 1, 0);
    let res3 = next(arr, disX, disY, 1, 1);
    let res4 = next(arr, disX, disY, 1, -1);

    return res1 || res2 || res3 || res4
}
function next(arr, disX, disY, stepX, stepY) {
    let str = "" + arr[disX][disY];
    for (let i = 1; i <= 4; i++) {
        let x = disX + stepX * i;
        let y = disY + stepY * i;
        if(x > arr.length - 1 || y > arr.length - 1){
            str += "-1"
        }else{
            str += arr[x][y];
        }

        x = disX - stepX * i;
        y = disY - stepY * i;
        if(x < 0 || y < 0){
            str = "-1" + str;
        }else{
            str = arr[x][y] + str;
        }
    }
    return /11111/.test(str) || /22222/.test(str);
}