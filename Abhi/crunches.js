
// ==========================================================================================================
function inbox(landmark,bx,by,bh,bl){
    if (landmark.x>=bx && landmark.x<=bx+bl && landmark.y>=by && landmark.y<=by+bh){
        return true;
    }
    return false;
}



var instructstate=0;
var down=0;
POSE_CONNECTIONS=[[24,26],[26,28],[23,25],[25,27],[12,24],[11,23],[24,23],[11,12],[11,13],[13,15],[12,14],[14,16]];
// ==========================================================================================================





function Exercise(results) {

    var clr='yellow';
    if (results.poseLandmarks[11].y>0.5 &&((results.poseLandmarks[25].y<results.poseLandmarks[23].y)||(results.poseLandmarks[26].y<results.poseLandmarks[24].y))){

        if ((results.poseLandmarks[11].visibility>0.8 && results.poseLandmarks[15].visibility>0.8 && results.poseLandmarks[13].visibility>0.8 && results.poseLandmarks[23].visibility>0.8 && results.poseLandmarks[25].visibility>0.8 && results.poseLandmarks[27].visibility>0.8)){
    
            
            a=find_angle(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
            // b=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
            if(a<150 ){
                // clr='yellow';
                if(inbox(results.poseLandmarks[15],results.poseLandmarks[23].x,0.5,0.1,0.1)){
                    clr='green';
                    if(!down){
                        count+=1;
                        down=1;
                    }
                }
                else{
                    down=0;
                }
            }
            
            
        }
        else if (results.poseLandmarks[12].visibility>0.8 && results.poseLandmarks[14].visibility>0.8 && results.poseLandmarks[16].visibility>0.8 && results.poseLandmarks[24].visibility>0.8 && results.poseLandmarks[26].visibility>0.8 && results.poseLandmarks[28].visibility>0.8){
            a=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
            // b=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
            if(a<150){
                // clr='yellow';
                if(inbox(results.poseLandmarks[16],results.poseLandmarks[24].x,0.5,0.1,0.1)){
                    clr='green';
                    if(!down){
                        count+=1;
                        down=1;
                    }
                }
                else{
                    down=0;
                }
            }
            
        }
    }
    ctx1.fillStyle=clr;
    ctx1.fillRect(canvasWidth*0.40,0.45*canvasHeight, 0.2*canvasWidth, 0.1*canvasHeight);
      

    drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: clr, lineWidth: 4});
    // drawLandmarks(ctx1, results.poseLandmarks,
    //               {color: clr, lineWidth: 2});
    // console.log(results.poseLandmarks);
  }
  
  
