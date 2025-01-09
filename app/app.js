var runcointcounter = 0; //признак, что нажата старт
var wallet = 3; // где кошелек 0-3
var score = 0; //счетчик пойманных
var badscore = 0; //счетчик не пойманных
var lostcoint; //счетчик упавших
var delayCoint = 300;
var delayCounter =  5000;
var soundOFF = 1; //0 sound off

//var arrCounter = [0,0,0,0]; // массив с признаками, что машинка запущена.
//var arrPathCoint = [[670,195],[670,200],[670,200],[670,200],[650,203],[630,205],[600,209],[575,215],[570,230]];
var arrPathCoint = [
[[110,314],[110,314],[110,314],[110,314],[110,314],[110,319],[130,321],[165,327],[205,334],[220,354],[220,354]],
[[110,195],[110,195],[110,195],[110,195],[110,195],[110,200],[130,202],[165,208],[205,215],[220,235],[220,235]],
[[670,195],[670,195],[670,195],[670,195],[670,195],[670,200],[650,202],[615,208],[575,215],[560,235],[560,235]],
[[670,314],[670,314],[670,314],[670,314],[670,314],[670,319],[650,321],[615,327],[575,334],[560,354],[560,354]]];

const audioCounter = new Audio("cash-counter-machine-count-50-bills-1.mp3");
const audioCointRun = new Audio("coins-dropped-1_mkw1uzv_1.mp3");
const audioCointPlus = new Audio("Moneta-sobrana.mp3");
const audioCointLost = new Audio("Moneta-Upala.mp3");



document.getElementById("Button3").onclick = function(){
	document.getElementById("Groshyk").src = "PIC/LeftTop.png";
	wallet = 2;
	};
document.getElementById("Button4").onclick = function(){
	document.getElementById('Groshyk').src = "PIC/LeftDown.png";
	wallet = 3;
	};
document.getElementById("Button1").onclick = function(){
	document.getElementById('Groshyk').src = "PIC/RightDown.png";
	wallet = 0;
	};
	
document.getElementById("Button2").onclick = function(){
	document.getElementById('Groshyk').src = "PIC/RightTop.png";
	wallet = 1;
	};
	
document.getElementById("SButton").onclick = function(){
	if (soundOFF == 1) {
	var sImg  = document.getElementById("SButtonImg").src = "PIC/SoundOff.png";
	soundOFF = 0;
	}
	else {document.getElementById('SButtonImg').src = "PIC/SoundOn.png";
	soundOFF = 1;}
	};	
	
document.getElementById("StartButton").onclick = function(){
       
	   //audioCounter.play();
           if (runcointcounter == 1){
           runcointcounter = 0;
           var startIm = document.getElementById("StartButtonImg").src = "PIC/StartS.png";
           document.getElementById("status").textContent = "Пауза";
           }
           else {
           //
          // locOrientation = screen.lockOrientation ||
          // screen.mozLockOrientation ||
          // screen.msLockOrientation || screen.orientation.lock;
          //locOrientation('landscape');
            function fullScreen(element) {
            if(element.requestFullscreen) {
                element.requestFullscreen();
                  } else if(element.webkitrequestFullscreen) {
                  element.webkitRequestFullscreen();

                    } else if(element.mozRequestFullscreen) {
                        element.mozRequestFullScreen();

                          }
                          };
            var html = document.documentElement;
            fullScreen(html);
            //screen.lockOrientation("landscape");
            //document.body.style.transform = 'rotate(90deg)';

            //
           runcointcounter = 1;
           var startIm = document.getElementById("StartButtonImg").src = "PIC/StartP.png";
           document.getElementById("status").textContent = "Игра";
           };
	   //(runcointcounter == 1) ? runcointcounter = 0:runcointcounter = 1;
       setTimeout(function Start(){
	   if (runcointcounter == 1)
       {
        cointer = Math.floor(Math.random() * (4) + 1)-1;
		let promise = new Promise(resolve => {
		CointCounter(cointer);
		setTimeout(() => resolve(cointer), delayCoint * 5);
		});
		promise.then(CointRun); 
        setTimeout(Start, delayCounter);
		//runcointcounter = 0;
	   };
	   if (delayCounter>1000){delayCounter = delayCounter - 50;} 
       }, delayCounter);
	   //delayCounter = delayCounter - 10;
    };
	

//Запуск машинки с номером cointer
function CointCounter(cointer){
	
	var imgname = '';
	var i=1;
	var max = 5;
	
	//counter sound	
	if (soundOFF) audioCounter.play();
	
	setTimeout(function runcounter(){
		
	if (i < max)
		{
                (cointer < 2) ?
		imgname = "PIC/countL" + i.toString() + ".png":
        imgname = "PIC/countR" + i.toString() + ".png";
		
		document.getElementById('counter'+cointer).src = imgname;
		i++;
		setTimeout(runcounter, delayCoint);
		};
	}, delayCoint);

	};

//монетка бeжит по желобу
function CointRun(cointer){
	// выбор машинки и вставкa рисунка в DOM
	var x = arrPathCoint[cointer][0][0];
	var y = arrPathCoint[cointer][0][1];
	let imgcoint = document.createElement("IMG");
	//imgcoint.id = "coint0";//+cointer;
	imgcoint.src ='PIC/coint0.png';
    imgcoint.style.position = 'absolute';	
	imgcoint.style.left = x+'px';
	imgcoint.style.top = y+'px';
	//sound audioCointRun
	if (soundOFF) audioCointRun.play();
	document.body.append(imgcoint);	
	//var imgname = '';
	var i=0;
	var max = 11;
	setTimeout(function runcoint(){
	if (i <= max)
		{
		imgcoint.src = "PIC/coint"+i+".png";
		imgcoint.style.left = arrPathCoint[cointer][i][0]+'px';
		imgcoint.style.top = arrPathCoint[cointer][i][1]+'px';
		i++;
		setTimeout(runcoint, delayCoint);
		};
	}, delayCoint);
		setTimeout(()=>{
		if (wallet == cointer){
		if (soundOFF) audioCointPlus.play();
		score++;
		document.getElementById('score').textContent = "Собрано: "+score;
		}
		else {
		if (soundOFF) audioCointLost.play();
		badscore++; 
		document.getElementById('badscore').textContent = "Потеряно: "+badscore;
		};
		},delayCoint*11);
		
	};	