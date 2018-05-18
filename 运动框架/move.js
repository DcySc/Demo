function getStyle(obj,attr){//obj:对象 attr:样式
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}
/*
    obj:运动对象 
    attrValue:样式
    fn:后续运动
*/
function move(obj,attrValue,fn){
    var flag =true;//标记所有运动的完成情况
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        for(attr in attrValue){
            //获取当前值
            var cur = 0;//当前值
            if(attr === 'opacity'){
                cur = Math.round(parseFloat(getStyle(obj,attr))*100);
            }else{
                cur = parseInt(getStyle(obj,attr));
            }
            //计算速度
            var speed = (attrValue[attr] - cur)/8;//当前速度
            speed = speed > 0? Math.ceil(speed) : Math.floor(speed);

            if(attrValue[attr] !== cur) flag = false;

            //执行运动
            if(attr === 'opacity'){
                obj.style.filter = 'alpha(opacity('+(cur + speed)+'))';
                obj.style.opacity = (cur + speed)/100;
            }else{
                obj.style[attr] = cur + speed +"px";
            } 

            //判断结束
            if(flag){
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }
        }
    },30)
}
