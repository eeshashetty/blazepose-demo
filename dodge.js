

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


        if(results.poseLandmarks[0].visibility>0.8 && results.poseLandmarks[7].visibility>0.8 && results.poseLandmarks[8].visibility>0.8 ){
            if (!(results.poseLandmarks[33].y > (blocky+blockheight)/canvasHeight) && (((blockx+blockwidth)/canvasWidth>=results.poseLandmarks[7].x && (blockx+blockwidth)/canvasWidth<=results.poseLandmarks[8].x) || (blockx/canvasWidth>=results.poseLandmarks[7].x && blockx/canvasWidth<=results.poseLandmarks[8].x) || ((blockx+blockwidth)/canvasWidth>=results.poseLandmarks[7].x && blockx/canvasWidth<=results.poseLandmarks[8].x))){
                hitState=true;
            }
            else{
                hitState=false;
            }
        }
        ctx1.font = "900 50px Arial";
        ctx1.textAlign = "center";

        if (blocky==canvasHeight*0.2){
            ctx1.fillStyle = "yellow";
            if (blockx/canvasWidth>=results.poseLandmarks[8].x || hitState){
                ctx1.fillStyle='yellow';
                ctx1.fillText("Dodge", 0.5*canvasWidth, 0.8*canvasHeight);

                if(blockx>=canvasWidth || hitState){
                    rst=1;
                }
                else if (blockx>=results.poseLandmarks[8].x){
                    count+=1;
                    ctx1.fillStyle='green';
                    // countElement.innerHTML=count;
                    // audio.play()
                }
            }
            else{
                rst=0;}
                
        }
        else{
            ctx1.fillStyle = "purple";
            ctx1.fillText("Hit", 0.5*canvasWidth, 0.8*canvasHeight);
            if (blockx>=canvasWidth ||hitState){
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

        
        if(rst){
            blockx=-blockwidth;
            blocky=ylist[Math.floor(Math.random() * 2)];
        }
        speed=blockwidth/5;
        blockx+=speed;
    

  }
  
  