var ShamikoY=0;
//夏美子的坐标，基于top：50vh的位置的相对坐标，-就是向向上，正就是向下

var ShamikoDeath=0;
//如果夏美子死了，这个标志就会变成1

var StoneL=30;
//障碍物上半段的长度

var StoneX=0;
//障碍物的横坐标,数值是负的，从左往右移动的vh数字

var TheScore=0;
//记录分数

var theVH=(window.innerHeight)/100;
var theVW=(window.innerWidth)/100;

//让夏美子向上移动
function ShamikoUp(){
    ShamikoY=ShamikoY-10;
    document.getElementById("shamiko").style.transform=`translateY(${ShamikoY}vh)`;
    document.getElementById("wa").play();
}

//让夏美子掉落
function ShamikoDown(){
    ShamikoY=ShamikoY+0.5;
    document.getElementById("shamiko").style.transform=`translateY(${ShamikoY}vh)`;
    
}

//检测夏美子别摔地上或者撞天花板了
function CheckY(){
    if(ShamikoY>=50 || ShamikoY<-60){
        ShamikoDeath=1;
        return 1;
    }
    return 0;
}

//检测夏美子有没有撞障碍物上
function CheckStone(){
    var shamiko=document.getElementById("shamiko");
    var HighS=document.getElementById("HighStone");
    var LowS=document.getElementById("LowStone");
    
    
    //这一串都是确认现在shamiko在不在柱子附近
    var shamikoLeft=30*theVW;
    var shamikoWidth=20*theVW;
    var SWidth=16*theVW;
    //柱子的左侧坐标小于shamiko的右侧坐标，柱子的右侧坐标大于shamiko的左侧坐标，他们就是相遇的
    
    if((100+StoneX+5)*theVW <=(shamikoLeft+shamikoWidth) && ((100+StoneX-5)*theVW+SWidth) >= shamikoLeft){
        //alert("魔族死了");
        
        if((50+ShamikoY+7)*theVH<StoneL*theVH){
            //alert("魔族死了"+ShamikoY+" "+StoneL);
            ShamikoY=ShamikoY+5;
            ShamikoDeath=1;
        }
        
        if((50+ShamikoY-5)*theVH + 20*theVW > StoneL*theVH+40*theVW){
            //alert("魔族死了"+((50+ShamikoY-7)*theVH + 15*theVW)+" "+( StoneL*theVH+35*theVW));
            //ShamikoY=ShamikoY+5;
            ShamikoDeath=1;
        }
        
    }
    
}

//让障碍物移动并让其长度变化的函数
function StoneMove(){
    //设置长度
    document.getElementById("HighStone").style.height=`${StoneL}vh`;
    var LowLen=100*theVH-StoneL*theVH-40*theVW;
    document.getElementById("LowStone").style.height=`${LowLen}px`;
    
    //运动过程
    StoneX=StoneX-0.5;
    document.getElementById("HighStone").style.transform=`translateX(${StoneX}vw)`;
    document.getElementById("LowStone").style.transform=`translateX(${StoneX}vw)`;
    
    //反复出现，退回去的时候消失
    if(StoneX<=-130){
        StoneX=30;
        document.getElementById("HighStone").style.display="none";
        document.getElementById("LowStone").style.display="none";
        //设置随机长度
        StoneL=Math.floor(Math.random()*51)+20;
        TheScore=TheScore+1;
        document.getElementById("yada").play();
    }
    else{
        document.getElementById("HighStone").style.display="block";
        document.getElementById("LowStone").style.display="block";
    }
}

//显示分数
function ShowScore(){
    document.getElementById("Score").innerHTML=TheScore;
}

//复活界面
function GameOver(){
    document.getElementById("chibie").play();
    document.getElementById("shamiko").style.backgroundImage="url('./img/shamiko-death.png')";
    document.getElementById("shamiko").style.transform=`translateY(${ShamikoY}vh)`;
    
    document.removeEventListener("click",ShamikoUp);
    //alert("魔族死了");
    document.getElementById("DarkBoard").style.display="block";
    document.getElementById("Score").style.transform=`translate(-50%,30vh)`;
    
    document.getElementById("TryAgain").style.display="block";
    document.getElementById("TryAgain").addEventListener("click",StartGame);
}

//夏美子飞飞飞，启动！
function GameTime(){
    
    document.removeEventListener("click",ShamikoUp);
    document.addEventListener("click",ShamikoUp);
    ShamikoDown();
    
    ShowScore();
    
    StoneMove();
    
    CheckStone();
    
    CheckY();
    if(ShamikoDeath==1){
        GameOver();
        return 1;
    }
    
    requestAnimationFrame(GameTime);
    //这个函数是浏览器API，每次屏幕刷新执行参数里的函数
    //是的，这是一个递归
}

//呃，与GameTime不同，这个是设置游戏记录归0的函数
function StartGame(){
    ShamikoY=0;
    ShamikoDeath=0;
    TheScore=0;
    document.getElementById("DarkBoard").style.display="none";
    document.getElementById("TryAgain").style.display="none";
    document.getElementById("Score").style.transform=`translate(-50%,0)`;
    StoneX=30;
    document.getElementById("HighStone").style.display="none";
    document.getElementById("LowStone").style.display="none";
    document.getElementById("shamiko").style.backgroundImage="url('./img/shamiko.png')";
    GameTime();
}

alert("叉子周围的金光的光之一族留下的，魔族碰到就会死哦~");
alert("补充：这些光是经过河流折射的，如果呈现紫色就是河流被污染了,请让莉莉丝小姐认真的去捡垃圾");
document.addEventListener("click",StartGame,{ once:true });