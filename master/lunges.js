
// ==========================================================================================================



var instructstate=0;
var lungestate=0;
POSE_CONNECTIONS=[[24,26],[26,28],[23,25],[25,27],[12,24],[11,23],[24,23],[11,12]];
// ==========================================================================================================





function Exercise(results) {
    if (results.poseLandmarks[23].visibility>0.8 && results.poseLandmarks[24].visibility>0.8 && results.poseLandmarks[25].visibility>0.8 && results.poseLandmarks[26].visibility>0.8 && results.poseLandmarks[27].visibility>0.8 && results.poseLandmarks[28].visibility>0.8){
        a=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
        b=find_angle(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
        var clr='blue';
        
            // if(!instructstate){
            //     instruct.innerHTML='Face right and move right leg forward.';
            // }
            // else{
            //     instruct.innerHTML='Face left and move left leg forward.';
            // }
            if (results.poseLandmarks[26].y>=((results.poseLandmarks[25].y+results.poseLandmarks[27].y)/2) || results.poseLandmarks[25].y>=((results.poseLandmarks[26].y+results.poseLandmarks[28].y)/2)){
                if (a<=120 && b<= 120){
                    clr='green';
                    if (!lungestate){
                        count+=1;
                        // countElement.innerHTML=count;
                        lungestate=1;
                        instructstate=(instructstate+1)%2;
                    }
                }
            }
            else{
                lungestate=0;
            }
        }

    drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: clr, lineWidth: 4});
    // drawLandmarks(ctx1, results.poseLandmarks,
    //               {color: clr, lineWidth: 2});
    // console.log(results.poseLandmarks);
  }
  
  
