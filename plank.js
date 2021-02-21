
// ==========================================================================================================



var instructstate=0;
var t0=null;
var t1=null;
var plankpose=0;
var inposition=0;
POSE_CONNECTIONS=[[11,13],[13,15],[11,23]];
// ==========================================================================================================




function Exercise(results) {

    var clr='blue';
    if ((results.poseLandmarks[11].visibility>0.8 && results.poseLandmarks[15].visibility>0.8 && results.poseLandmarks[13].visibility>0.8) || (results.poseLandmarks[12].visibility>0.8 && results.poseLandmarks[14].visibility>0.8 && results.poseLandmarks[16].visibility>0.8)){
        
        if (inposition){
            a=find_angle(results.poseLandmarks[11],results.poseLandmarks[13],results.poseLandmarks[15]);
            b=find_angle(results.poseLandmarks[12],results.poseLandmarks[14],results.poseLandmarks[16])
            if(a<120 || b<120){
                
                    if(t0==null || !plankpose){
                        t0=timecounter;
                        plankpose=1;
                    }
                    clr='green';
                    t1=timecounter;
                    if((t1-t0)==1){
                        count+=1;
                        t0=null;
                    }
                

                    
            }
            else{
                plankpose=0;

            }


        }
        else{
            // Play audio
            if(results.poseLandmarks[11].y>0.5 && (Math.abs(results.poseLandmarks[11].x-results.poseLandmarks[23].x)>0.2 || Math.abs(results.poseLandmarks[12].x-results.poseLandmarks[24].x)>0.2)){
                inposition=1;
            }
        }
    }
      


    drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: clr, lineWidth: 4});
    // drawLandmarks(ctx1, results.poseLandmarks,
    //               {color: clr, lineWidth: 2});
    // console.log(results.poseLandmarks);
  }
  
  
