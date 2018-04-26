var isBlack = true;
var chess = document.getElementById("chess");
var context = chess.getContext('2d');
var chessBoard = [];
//初始化棋盘数组
for(var i=0;i<15;i++){
    chessBoard[i] = [];
    for(var j=0;j<15;j++){
        chessBoard[i][j] = 0;
    }
}

context.strokeStyle = "#BFBFBF";

window.addEventListener('DOMContentLoaded',load,false);
chess.addEventListener('click',fall,false);
/**
 * DOMContentLoaded
 */
function load(){
    drawChessBoard();
}
/**
 * 画棋盘
 */
function drawChessBoard(){
    for(var i=0;i<15;i++){
        context.moveTo(15+i*30,15);
        context.lineTo(15+i*30,435);
        context.stroke();
        context.moveTo(15,15+i*30);
        context.lineTo(435,15+i*30);
        context.stroke();
    }
}
/**
 * 画棋子
 * @param {number} x 横向第x个棋格
 * @param {number} y 纵向第y个棋格
 * @param {boolean} isBlack 是否是黑棋
 */
function oneStep(x,y,isBlack){
    context.beginPath();
    //画圆 圆心x,圆心y,半径,起始角度,结束角度
    context.arc(15 + x*30,15 + y*30, 13, 0, Math.PI*2);
    context.closePath();
    //设置渐变 第一个圆的圆心x,圆心y,半径,第二个圆的圆心x,圆心y,半径
    //必须先设置小圆 在设置大圆?
    var gradient = context.createRadialGradient(15 + x*30 + 2,15 + y*30 -2,0,15 + x*30 + 2,15 + y*30 -2,13);
    if(isBlack){
        gradient.addColorStop(0,'#636766');
        gradient.addColorStop(1,'#0A0A0A');
    }else{
        gradient.addColorStop(0,'#f9f9f9');
        gradient.addColorStop(1,'#d1d1d1');
    }
    context.fillStyle = gradient;
    context.fill();
}

/**
 * 落子
 * @param {*} e 
 */
function fall(e){
    
    var x = e.offsetX;
    var y = e.offsetY;
    var i = x / 30 | 0;
    var j = y / 30 | 0; 
    console.log(x,y,i,j)
    if(!chessBoard[i][j]){
        oneStep(i,j,isBlack);
        if(isBlack){
            chessBoard[i][j] = 1;
        }else{
            chessBoard[i][j] = 2;
        }
        console.log(chessBoard);
        isBlack = !isBlack;
    }
}