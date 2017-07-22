/**
 * Created by Administrator on 2017/1/11.
 */
var WIDTH = 1024;
var HEIGHT = 568;
var RADIUS = 8;
var MARGIN_LEFT = 30;
var MARGIN_TOP = 40;
const time = 3;//设置倒计时时常 3小时
var endTime;
var now_time,nowSeconds;
var balls = [];
var speed = {x:-10,y:5,g:5};
var timer;
window.onload = function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    now_time = new Date();
    nowSeconds = now_time.getTime();
    endTime = Math.round(now_time.getTime()/1000) + time * 3600;
    timer = setInterval(function(){
        setTime(context);
        update();
    },50);

}

function setTime(cxt){
    cxt.clearRect(0,0,WIDTH,HEIGHT);
    var nowTime = new Date();
//    var timeCount = endTime - Math.round(nowTime.getTime()/1000);//倒计时
    var timeCount = nowTime.getTime() - nowSeconds;//时钟；
//    var time_hour = parseInt(timeCount/3600);//
//    var time_min = parseInt((timeCount - time_hour * 3600)/60);//
//    var time_second = parseInt(timeCount % 60);//

    var time_hour = nowTime.getHours();
    var time_min = nowTime.getMinutes();
    var time_second = nowTime.getSeconds();
    if(timeCount <= 0){
        time_hour = time_min = time_second = 0;
    }
    drawNum(MARGIN_LEFT,MARGIN_TOP,parseInt(time_hour/10),cxt);
    drawNum(MARGIN_LEFT + 15 * (RADIUS + 1),MARGIN_TOP,parseInt(time_hour%10),cxt);
    drawNum(MARGIN_LEFT + 30 * (RADIUS + 1),MARGIN_TOP,10,cxt);
    drawNum(MARGIN_LEFT + 40 * (RADIUS + 1),MARGIN_TOP,parseInt(time_min/10),cxt);
    drawNum(MARGIN_LEFT + 55 * (RADIUS + 1),MARGIN_TOP,parseInt(time_min%10),cxt);
    drawNum(MARGIN_LEFT + 70 * (RADIUS + 1),MARGIN_TOP,10,cxt);
    drawNum(MARGIN_LEFT + 80 * (RADIUS + 1),MARGIN_TOP,parseInt(time_second/10),cxt);
    drawNum(MARGIN_LEFT + 95 * (RADIUS + 1),MARGIN_TOP,parseInt(time_second%10),cxt);
    createBalls(cxt);
}
function drawNum(x,y,num,cxt){
    cxt.fillStyle = 'blue';
    for(var i = 0;i < digit[num].length;i++){
        for(var j = 0;j < digit[num][i].length;j++){
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1),y + i * 2 * (RADIUS + 1) + (RADIUS + 1),RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}

function update(){
    var nowTime = new Date();
//    var timeCount = endTime - Math.round(nowTime.getTime()/1000);
    var timeCount = nowTime.getTime();
//    var time_hour = parseInt(timeCount/3600);
//    var time_min = parseInt((timeCount - time_hour * 3600)/60);
//    var time_second = parseInt(timeCount % 60);

    var time_hour = nowTime.getHours();
    var time_min = nowTime.getMinutes();
    var time_second = nowTime.getSeconds();

    var last_hour = now_time.getHours();
    var last_min = now_time.getMinutes();
    var last_second = now_time.getSeconds();


//    var last_hour = parseInt(nowSeconds/3600);
//    var last_min = parseInt((nowSeconds - last_hour * 3600)/60);
//    var last_second = parseInt(nowSeconds % 60);
    if(timeCount != nowSeconds && timeCount >= 0){
        now_time = nowTime;
        nowSeconds = timeCount;
        if(parseInt(time_second%10) != parseInt(last_second%10)){
            colorBall(MARGIN_LEFT + 95 * (RADIUS + 1),MARGIN_TOP,parseInt(time_second%10));
        }
        if( parseInt(time_second/10) != parseInt(last_second/10)){
            colorBall(MARGIN_LEFT + 80 * (RADIUS + 1),MARGIN_TOP,parseInt(time_second/10));
        }
        if(parseInt(time_min%10) != parseInt(last_min%10)){
            colorBall(MARGIN_LEFT + 40 * (RADIUS + 1),MARGIN_TOP,parseInt(time_min/10));
        }
        if(parseInt(time_min/10) != parseInt(last_min/10)){
            colorBall(MARGIN_LEFT + 55 * (RADIUS + 1),MARGIN_TOP,parseInt(time_min%10));
        }
        if(parseInt(time_hour%10) != parseInt(last_hour%10)){
            colorBall(MARGIN_LEFT + 15 * (RADIUS + 1),MARGIN_TOP,parseInt(time_hour%10));
        }
        if(parseInt(time_hour/10) != parseInt(last_hour/10 )){
            colorBall(MARGIN_LEFT,MARGIN_TOP,parseInt(time_hour/10));
        }

    }
}

function colorBall(x,y,num){
    var colors = ['red','pink','green','yellow','blue','orange','#7698BC','#7698BC','#DEA71F','#4040CB'];
    for(var i = 0;i < digit[num].length;i++){
        for(var j = 0;j < digit[num][i].length;j++){
            if(digit[num][i][j] == 1){
                var aball = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    color:colors[Math.floor(Math.random() * 10)],
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5
                }
                balls.push(aball);
            }
        }
    }
}

function createBalls(cxt){
    for(var i = 0;i < balls.length;i++){
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
        cxt.closePath();
        cxt.fill();
        balls[i].x +=  balls[i].vx;
        balls[i].y +=  balls[i].vy;
        balls[i].vy += balls[i].g;
        if(balls[i].y >= HEIGHT - RADIUS){
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }
    while(balls.length > 900){
        balls.shift();
    }
}
