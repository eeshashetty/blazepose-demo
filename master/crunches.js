
// ==========================================================================================================
function inbox(landmark,bx,by,bh,bl){
    if (landmark.x>=bx && landmark.x<=bx+bl && landmark.y>=by && landmark.y<=by+bh){
        return true;
    }
    return false;
}

var waiting=0;
var touched=0;
var inpose=0;
var poselist=[];
var down=0;
var xcenter=null;
var ycenter=null;
var radius=null;
POSE_CONNECTIONS=[[24,26],[26,28],[23,25],[25,27],[12,24],[11,23],[24,23],[11,12],[11,13],[13,15],[12,14],[14,16]];
var skeleton='white';
// ==========================================================================================================





function Exercise(results) {

    if (results.poseLandmarks[11].y>0.5 || results.poseLandmarks[12].y>0.5){
        if (!inpose){
            
            a=find_angle(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
            b=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
            if ((a<150 || b<150) && ((results.poseLandmarks[11].y>results.poseLandmarks[25].y)||(results.poseLandmarks[12].y>results.poseLandmarks[26].y))){
                if (poselist.length<50){
                    poselist.push(results.poseLandmarks);
                }
                else{
                    skeleton='green';
                    inpose=1;
                    for (let index = 0; index < 50; index++) {
                        if (poselist[index][23].visibility>0.8) {
                            xcenter+=poselist[index][23].x;
                            ycenter+=(poselist[index][25].y-Math.abs(poselist[index][23].y-poselist[index][25].y));
                        }
                        else{
                            xcenter+=poselist[index][24].x;
                            ycenter+=(poselist[index][26].y-Math.abs(poselist[index][24].y-poselist[index][26].y));
                        }
                        
                    }
                    xcenter=xcenter*canvasWidth/50;
                    ycenter=ycenter*canvasHeight/50;
                    radius=canvasHeight/15;
                }
            }
        }
        else{
            
            lefthand=Math.pow((xcenter-results.poseLandmarks[19].x*canvasWidth),2) + Math.pow((ycenter-results.poseLandmarks[19].y*canvasHeight),2);
            righthand=Math.pow((xcenter-results.poseLandmarks[20].x*canvasWidth),2) + Math.pow((ycenter-results.poseLandmarks[20].y*canvasHeight),2);
            if(lefthand<=(radius*radius) || righthand<=(radius*radius)){
                if(!touched){
                    count+=1;
                    touched=1;
                }
                
            }
            if(!touched){
                ctx1.beginPath();
                ctx1.fillStyle='yellow';
                ctx1.arc(xcenter, ycenter, radius, 0, 2 * Math.PI);
                ctx1.fill();
            }
            else{
                waiting+=1;
                if(waiting==20){
                    touched=0;
                    waiting=0;
                }
            }
        }
    }
    else{
        skeleton='white';
        inpose=0;
        xcenter=null;
        ycenter=null;
        poselist=[];
    }

      

    drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: skeleton, lineWidth: 4});
    // drawLandmarks(ctx1, results.poseLandmarks,
    //               {color: clr, lineWidth: 2});
    // console.log(results.poseLandmarks);
  }
  
  
