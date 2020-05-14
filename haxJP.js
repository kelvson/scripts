/**
 * CONSTS
 */
window.gameDocument = document.getElementsByClassName('gameframe')[0].contentWindow.document
console.log("UPDATE!");
const gameUrl   = 'https://www.haxball.com/playaa';
const positions = {
    "up"        : "N",
    "left"      : "W",
    "right"     : "E",
    "down"      : "S",
    "upLeft"    : "NW",
    "upRight"   : "NE",
    "downLeft"  : "SW",
    "downRight" : "SE",
    "stop"      : "C"
}
if(window.location.href == gameUrl){
/*
**************HTML*********************
*/
let jHtml       = '<div id="joyDiv" style="width:125px;height:125px;"></div>';
jHtml       += '<div class="escJ" style="position: fixed; top: 15px; width: 40px; height: 40px; background-color: #252424;  overflow: hidden; border-radius: 10px; opacity: 0.8;">';
jHtml       += '<div style="position: relative; color: white; top: 8px;  text-align: center; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;">ESC</div>';
jHtml       += '</div>';
jHtml       += '<div class="shootJ" style="position: fixed;  width: 40px; height: 40px;  overflow: hidden; background-color: #252424; bottom: 60px;  right: 15px; justify-content: center; border-radius: 10px;"><div style="position: relative; margin-top:8px;  text-align: center;  -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; ">⚽</div></div>';

let myCustomBlockJoystick               = document.createElement('div');
let calc                                = Math.round((35 * window.innerWidth) / 100);
myCustomBlockJoystick.style.paddingTop  = calc+'px';
myCustomBlockJoystick.style.position    = 'fixed';
myCustomBlockJoystick.innerHTML         = jHtml;
document.body.append(myCustomBlockJoystick);

/*
**************FUNCTIONS***************
*/

function sendEvent(obj, type = 'keydown'){
    window.gameDocument.dispatchEvent(new KeyboardEvent(type, obj));
 }

function direct(direction){
    switch(direction){
        case positions.up:       moveUp(); break;
        case positions.down:     moveDown(); break;
        case positions.left:     moveLeft(); break;
        case positions.right:    moveRight(); break;
        case positions.upLeft:   moveUp(); moveLeft(); break;
        case positions.upRight:  moveUp(); moveRight(); break;
        case positions.downLeft: moveDown(); moveLeft();break;
        case positions.downRight: moveDown(); moveRight(); break;
        default:    break;
 }
}

function moveUp(){      sendEvent({"code" : "ArrowUp"}) }
function moveDown(){    sendEvent({"code" : "ArrowDown"})}
function moveLeft(){    sendEvent({"code" : "ArrowLeft"})}
function moveRight(){   sendEvent({"code" : "ArrowRight"})}

function stop(){ 
    sendEvent({"code" : "ArrowUp"},'keyup'); 
    sendEvent({"code" : "ArrowLeft"},'keyup'); 
    sendEvent({"code" : "ArrowRight"},'keyup'); 
    sendEvent({"code" : "ArrowDown"},'keyup'); 
}

if(myCustomBlockJoystick){
    //Shoot
    document.getElementsByClassName('shootJ')[0].ontouchstart = function() { sendEvent({"code" : "KeyX"})}
    document.getElementsByClassName('shootJ')[0].ontouchend = function() { sendEvent({"code" : "KeyX"},'keyup')}
    //Esc
    document.getElementsByClassName('escJ')[0].ontouchstart = function() { sendEvent({"code"  : "Escape", "which" : 27,"keyCode" : 27})}
    document.getElementsByClassName('escJ')[0].ontouchend = function() { sendEvent({"code"  : "Escape", "which" : 27,"keyCode" : 27},'keyup')}
}

/*
**************INJECTIONS***************
*/
let JoyStick=function(t,e){var i=void 0===(e=e||{}).title?"joystick":e.title,n=void 0===e.width?0:e.width,o=void 0===e.height?0:e.height,r=void 0===e.internalFillColor?"#00AA00":e.internalFillColor,h=void 0===e.internalLineWidth?2:e.internalLineWidth,d=void 0===e.internalStrokeColor?"#003300":e.internalStrokeColor,a=void 0===e.externalLineWidth?2:e.externalLineWidth,l=void 0===e.externalStrokeColor?"#008000":e.externalStrokeColor,c=void 0===e.autoReturnToCenter||e.autoReturnToCenter,u=document.getElementById(t),s=document.createElement("canvas");s.id=i,0===n&&(n=u.clientWidth),0===o&&(o=u.clientHeight),s.width=n,s.height=o,u.appendChild(s);var f=s.getContext("2d"),g=0,v=2*Math.PI,w=(s.width-(s.width/2+10))/2,C=w+5,m=w+30,p=s.width/2,L=s.height/2,E=s.width/10,S=-1*E,k=s.height/10,W=-1*k,G=p,x=L;function R(){f.beginPath(),f.arc(p,L,m,0,v,!1),f.lineWidth=a,f.strokeStyle=l,f.stroke()}function T(){f.beginPath(),G<w&&(G=C),G+w>s.width&&(G=s.width-C),x<w&&(x=C),x+w>s.height&&(x=s.height-C),f.arc(G,x,w,0,v,!1);var t=f.createRadialGradient(p,L,5,p,L,200);t.addColorStop(0,r),t.addColorStop(1,d),f.fillStyle=t,f.fill(),f.lineWidth=h,f.strokeStyle=d,f.stroke()}"ontouchstart"in document.documentElement?(s.addEventListener("touchstart",function(t){g=1},!1),s.addEventListener("touchmove",function(t){t.preventDefault(),1===g&&t.targetTouches[0].target===s&&(G=t.targetTouches[0].pageX,x=t.targetTouches[0].pageY,G-=s.offsetLeft,x-=s.offsetTop,f.clearRect(0,0,s.width,s.height),R(),T())},!1),s.addEventListener("touchend",function(t){g=0,c&&(G=p,x=L);f.clearRect(0,0,s.width,s.height),R(),T()},!1)):(s.addEventListener("mousedown",function(t){g=1},!1),s.addEventListener("mousemove",function(t){1===g&&(G=t.pageX,x=t.pageY,G-=s.offsetLeft,x-=s.offsetTop,f.clearRect(0,0,s.width,s.height),R(),T())},!1),s.addEventListener("mouseup",function(t){g=0,c&&(G=p,x=L);f.clearRect(0,0,s.width,s.height),R(),T()},!1)),R(),T(),this.GetWidth=function(){return s.width},this.GetHeight=function(){return s.height},this.GetPosX=function(){return G},this.GetPosY=function(){return x},this.GetX=function(){return((G-p)/C*100).toFixed()},this.GetY=function(){return((x-L)/C*100*-1).toFixed()},this.GetDir=function(){var t="",e=G-p,i=x-L;return i>=W&&i<=k&&(t="C"),i<W&&(t="N"),i>k&&(t="S"),e<S&&("C"===t?t="W":t+="W"),e>E&&("C"===t?t="E":t+="E"),t}};         
let joy = new JoyStick('joyDiv');


if(document.getElementsByClassName('header').length > 0){
    let header = document.getElementsByClassName('header')[0];
    let ads    = document.getElementsByClassName('rightbar')[0];
    header.style.display = 'none';
    ads.style.display = 'none';
  }

/**
 * LOOP
 */
let currentPos = positions.stop;
setInterval(function(){ 
   
    if(joy.GetDir() != currentPos){
        currentPos = joy.GetDir();
        stop();
        direct(joy.GetDir());
    }
    
    direct(joy.GetDir());
    if(window.gameDocument){
        window.gameDocument.querySelector('.bottom-section').style.display = 'none';
    }
 }, 50);
}