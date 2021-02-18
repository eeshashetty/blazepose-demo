

var blockx=-50;
var ylist=[canvasHeight*0.2,canvasHeight*0.05]
var blocky=ylist[Math.floor(Math.random() * 2)];
var speed=20;
var rst=0;

// ==========================================================================================================
// var audio= new Audio('hit.mpeg');


function Exercise(results) {
    // console.log('a');

    var clr='blue';
        ylist=[canvasHeight*0.2,canvasHeight*0.05];
        var blockwidth=0.1*canvasWidth;
        var blockheight=0.05*canvasHeight;
        // ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx2.globalAlpha=1;
        ctx2.font = "900 "+canvasHeight*0.05+"px Arial";
        // ctx2.textAlign='center';
        ctx2.fillStyle = "yellow";
        ctx2.fillText('Dodging game',canvasWidth*0.45,canvasHeight*0.075);
        if (!(results.poseLandmarks[33].y > (blocky+blockheight)/canvasHeight) && (((blockx+blockwidth)/canvasWidth>=results.poseLandmarks[11].x && (blockx+blockwidth)/canvasWidth<=results.poseLandmarks[12].x) || (blockx/canvasWidth>=results.poseLandmarks[11].x && blockx/canvasWidth<=results.poseLandmarks[12].x) || ((blockx+blockwidth)/canvasWidth>=results.poseLandmarks[12].x && blockx/canvasWidth<=results.poseLandmarks[11].x))){
            hitState=true;
        }
        else{
            hitState=false;
        }

        ctx1.font = "900 50px Arial";
        ctx1.textAlign = "center";

        if (blocky==canvasHeight*0.2){
            ctx1.fillStyle = "yellow";
            ctx1.fillText("Dodge", 0.5*canvasWidth, 0.8*canvasHeight);
            if (blockx>=canvasWidth || hitState){
                if (blockx>=canvasWidth){
                    count+=1;
                    // countElement.innerHTML=count;
                    // audio.play()
                }
            rst=1;
            }
            else{
            rst=0;}
        }
        else{
            ctx1.fillStyle = "red";
            ctx1.fillText("Hit", 0.5*canvasWidth, 0.8*canvasHeight);
            if (blockx>=canvasWidth || hitState){
                if (hitState){
                    count+=1;
                    // countElement.innerHTML=count;
                    // audio.play();
                }
            rst=1;
            }
            else{
            rst=0;}
        }
        ctx1.fillRect(blockx, blocky, blockwidth, blockheight);

        // ctx2.beginPath();
        // ctx2.globalAlpha=0.6;
        // ctx2.fillStyle='black';
        // ctx2.fillRect(0,canvasHeight*0.9,canvasWidth,canvasHeight*0.2);

        // ctx2.globalAlpha=1;
        // ctx2.fillStyle='yellow';
        // ctx2.font = "900 "+canvasHeight*0.05+"px Arial";
        // ctx2.fillText('Score: '+count,0,canvasHeight*0.975);

        
        if(rst){
            blockx=-blockwidth;
            blocky=ylist[Math.floor(Math.random() * 2)];
        }
        speed=blockwidth/5;
        blockx+=speed;
    

  }
  
  