var isBlack = true;
var over = false;
var chess = document.getElementById("chess");
var context = chess.getContext('2d');
var chessBoard = [];
var wins = [];//赢法数组
var count = 0;//赢法的数量
var myWin = [];
var computerWin = [];
//初始化棋盘数组
for(var i=0;i<15;i++){
    chessBoard[i] = [];
    for(var j=0;j<15;j++){
        chessBoard[i][j] = 0;
    }
}
//初始化赢法数组
for(var i=0;i<15;i++){
    wins[i] = [];
    for(var j=0;j<15;j++){
        wins[i][j] = [];
    }
}
//横向五连子
for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
    
}

//纵向五连子
for(var i=0;i<15;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}
//正斜向五连子
for(var i=0;i<11;i++){
    for(var j=0;j<11;j++){
        for(var k=0;k<5;k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}
//反斜向五连子
for(var i=0;i<11;i++){
    for(var j=14;j>3;j--){
        for(var k=0;k<5;k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}

for(var i=0;i<count;i++){
    myWin[i] = 0;
    computerWin[i] = 0;
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
    if(over) return;
    if(!isBlack) return;
    
    var x = e.offsetX;
    var y = e.offsetY;
    var i = x / 30 | 0;
    var j = y / 30 | 0; 

    if(!chessBoard[i][j]){
        oneStep(i,j,isBlack);       
        chessBoard[i][j] = 1;

        //每次落子判断胜负
        for(var k=0;k<count;k++){
            if(wins[i][j][k]){
                myWin[k]++;
                computerWin[k] = 6;
                if(myWin[k] === 5){
                    alert("你赢了")
                    over = true;  
                }
            }
        }   
        if(!over){
            isBlack = !isBlack;
            computerAI();
        }
    }
}

function computerAI(){
    var computerScore = [];
    var myScore = [];
    var max = 0;
    var x=0,y=0;
    for(var i=0;i<15;i++){
        computerScore[i] = [];
        myScore[i] = [];
        for(var j=0;j<15;j++){
            computerScore[i][j] = 0;
            myScore[i][j] = 0;
        }
    }
    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(chessBoard[i][j] === 0){
                for(var k=0;k<count;k++){
                    if(wins[i][j][k]){
                        if(myWin[k] === 1){
                            myScore[i][j] += 200;
                        }else if(myWin[k] === 2){
                            myScore[i][j] += 400;
                        }else if(myWin[k] === 3){
                            myScore[i][j] += 2000;
                        }else if(myWin[k] === 4){
                            myScore[i][j] += 10000;
                        }
                        if(computerWin[k] === 1){
                            computerScore[i][j] += 399;
                        }else if(myWin[k] === 2){
                            computerScore[i][j] += 1999;
                        }else if(myWin[k] === 3){
                            computerScore[i][j] += 9999;
                        }else if(myWin[k] === 4){
                            computerScore[i][j] += 50000;
                        }
                    }
                }
                console.log(computerScore[i][j],myScore[i][j])
                if(myScore[i][j] > max){
                    max = myScore[i][j];
                    x = i;
                    y = j;
                }else if(myScore[i][j] === max){
                    if(computerScore[i][j] > computerScore[x][y]){
                        x = i;
                        y = j;
                    }
                }
                if(computerScore[i][j] > max){
                    max = computerScore[i][j];
                    x = i;
                    y = j;
                }else if(computerScore[i][j] === max){
                    if(myScore[i][j] > myScore[x][y]){
                        x = i;
                        y = j;
                    }
                }
            }
        }
    }
    oneStep(x,y,false);
    chessBoard[x][y] = 2;
    for(var k=0;k<count;k++){
        if(wins[x][y][k]){
            computerWin[k]++;
            myWin[k] = 6;
            if(computerWin[k] === 5){
                alert("电脑赢了")
                over = true;  
            }
        }
    }   
    if(!over){
        isBlack = !isBlack;
    }
}