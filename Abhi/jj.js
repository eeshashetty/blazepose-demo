
var high=1;
var low=0;
var clap=0;
var clr='blue';
// ==========================================================================================================


function Exercise(results) {
    
    
        var tx=(results.poseLandmarks[24].x+results.poseLandmarks[23].x)/2;
        
        var a=find_angle(results.poseLandmarks[27],{x:tx,y:results.poseLandmarks[24].y},results.poseLandmarks[28]);
        
        high = Math.min(high,results.poseLandmarks[0].y);
        low= Math.max(low,results.poseLandmarks[0].y);

        
        if (a>=20 && results.poseLandmarks[14].y<results.poseLandmarks[12].y && results.poseLandmarks[13].y<results.poseLandmarks[11].y && (((low-high)/high)>0.3)){
            clr='green';
            if (!clap){
                clap=1;
                count+=1;
                countElement.innerHTML=count;
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
                countElement.innerHTML=count;
            }
            high=1;
            low=0;
        }
    
    drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: clr, lineWidth: 4});
    // drawLandmarks(ctx, results.poseLandmarks,
    //               {color: clr, lineWidth: 2});
    // ctx.restore();
    // console.log(results.poseLandmarks[0]);
  }
  
  