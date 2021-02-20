
// ==========================================================================================================



var instructstate=0;
POSE_CONNECTIONS=[[11,13],[13,15],[11,23]];
// ==========================================================================================================




function Exercise(results) {

    var clr='blue';
    if (results.poseLandmarks[11].y>0.5){
        a=find_angle(results.poseLandmarks[11],results.poseLandmarks[13],results.poseLandmarks[15]);
        if(a<120){
            clr='yellow';
            if(Math.abs(results.poseLandmarks[13].x-results.poseLandmarks[15].x)<0.1){
               
                clr='green';
                count+=(1/15).toFixed(1);
                
            }
            
        }

    }
      


    drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: clr, lineWidth: 4});
    // drawLandmarks(ctx1, results.poseLandmarks,
    //               {color: clr, lineWidth: 2});
    // console.log(results.poseLandmarks);
  }
  
  
