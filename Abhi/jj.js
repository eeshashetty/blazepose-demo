
var high=1;
var low=0;
var clap=0;
var clr='blue';
POSE_CONNECTIONS=[[24,26],[26,28],[23,25],[25,27],[12,24],[11,23],[24,23],[11,12],[11,13],[13,15],[12,14],[14,16]];
// ==========================================================================================================


function Exercise(results) {
    
    if (results.poseLandmarks[11].visibility>0.8 && results.poseLandmarks[12].visibility>0.8 && results.poseLandmarks[13].visibility>0.8 && results.poseLandmarks[14].visibility>0.8 && results.poseLandmarks[27].visibility>0.8 && results.poseLandmarks[28].visibility>0.8 ){
        var tx=(results.poseLandmarks[24].x+results.poseLandmarks[23].x)/2;
        
        var a=find_angle(results.poseLandmarks[27],{x:tx,y:results.poseLandmarks[24].y},results.poseLandmarks[28]);
        
        high = Math.min(high,results.poseLandmarks[0].y);
        low= Math.max(low,results.poseLandmarks[0].y);

        
        if (a>=20 && results.poseLandmarks[14].y<results.poseLandmarks[12].y && results.poseLandmarks[13].y<results.poseLandmarks[11].y && (((low-high)/high)>0.3)){
            clr='green';
            if (!clap){
                clap=1;
                count+=1;
                // countElement.innerHTML=count;
                instruct.innerHTML='Jump and relax';
            }
            high=1;
            low=0;
        }
        else if (a<20 && results.poseLandmarks[14].y>results.poseLandmarks[12].y && results.poseLandmarks[13].y>results.poseLandmarks[11].y && (((low-high)/high)>0.3)){
            if(clap){
                clr='blue';
                clap=0;
                count+=1;
                instruct.innerHTML='Jump and lift your hands and put legs apart';
                // countElement.innerHTML=count;
            }
            high=1;
            low=0;
        }
        // ctx2.beginPath();
        // ctx2.globalAlpha=0.6;
        // ctx2.fillStyle='black';
        // ctx2.fillRect(0,canvasHeight*0.9,canvasWidth,canvasHeight*0.2);

        // ctx2.globalAlpha=1;
        // ctx2.fillStyle='yellow';
        // ctx2.font = "900 "+canvasHeight*0.05+"px Arial";
        // ctx2.fillText('Score: '+count,0,canvasHeight*0.975);
    }
    drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: clr, lineWidth: 4});
    // drawLandmarks(ctx, results.poseLandmarks,
    //               {color: clr, lineWidth: 2});
    
  }
  
  