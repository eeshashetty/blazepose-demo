
// ==========================================================================================================



var instructstate=0;
var down=0;
POSE_CONNECTIONS=[[11,13],[13,15],[11,23]];
// ==========================================================================================================





function Exercise(results) {

    var clr='blue';
    if (results.poseLandmarks[11].y>0.5){
        a=find_angle(results.poseLandmarks[11],results.poseLandmarks[13],results.poseLandmarks[15]);
        if(a<120 ){
            clr='yellow';
            if( results.poseLandmarks[11].y>results.poseLandmarks[23].y){
                clr='green';
                if(!down){
                    count+=1;
                    down=1;
                }
            }
        }
        else{
            down=0;
        }

    }
      


    drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: clr, lineWidth: 4});
    // drawLandmarks(ctx1, results.poseLandmarks,
    //               {color: clr, lineWidth: 2});
    // console.log(results.poseLandmarks);
  }
  
  
