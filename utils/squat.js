import { drawKeypoints, drawSkeleton } from './posenet-utils.js';
let count = 0;
let start = 0;
let down = false;

export function Squat(poses, ctx) {
    ctx.scale(-1,1);
    ctx.translate(-window.videoWidth, 0);
      
    if(count == 5) {
        count = 0;
        window.game++;
    }
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Squat Jumps = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    if(down)
    {   
        let xc = window.videoWidth/2;
        let yc = 0.1* window.videoHeight;
        ctx.rect(xc,yc, 0.2*window.videoWidth, 0.13*window.videoHeight);
        ctx.fillStyle = 'black';
        ctx.fill();
        
        
        let jump = drawKeypoints(poses, ctx, "red", xc = xc, yc = yc);
        
        if(jump) {
            count++;
            jump = false;
            down = false;
        }
    } 
    
    else {
        drawSquatKeypoints(ctx, poses);
        let color = down ? "#00ff00" : "#ff0000";
        drawSkeleton(poses[0].keypoints, 0.5, ctx, color);
    }

}

export function SquatCount(poses, ctx, now) {
    

    ctx.scale(-1,1);
    ctx.translate(-window.videoWidth, 0);
    
    if(Math.floor(count/fps) > 5) {
        endScreen(ctx);
    } else {

    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Squat Count : " + Math.floor(count/fps), window.videoWidth/2, window.videoHeight*3/40);

    drawSquatKeypoints(ctx, poses);
    let color = down ? "#00ff00" : "#ff0000";
    drawSkeleton(poses[0].keypoints, 0.5, ctx, color);
    if(down) {
        count++;
    } else {
        count = 0;
    }
    }
  
}

function checkSquat(rightKnee,leftKnee,rightHip,leftHip) {

  // calculate slope of right hip+knee and left hip+knee
  let a1 = Math.abs((rightHip.y - rightKnee.y)/(rightHip.x - rightKnee.x));
  let a2 = Math.abs((leftHip.y - leftKnee.y)/(leftHip.x - leftKnee.x));
  
  // slope while standing is more than 5
  if(a1 >=5 && a2 >= 5)
      return "up"
  
  // slope while in squat is close to 0
  else if(a1 >=0 && a1 <=1.5 && a2 >= 0 && a1 <= 1.5)
      return "down";    
  else
      return "";
}

function drawSquatKeypoints(ctx, poses)  {
  let rightKnee = null;
  let leftKnee = null;
  let rightHip = null;
  let leftHip = null;
  let rightAnkle = null;
  let leftAnkle = null;
  let keypoint = [];
  let pose = poses[0];
  for (let j = 0; j < pose.keypoints.length; j++) {
      
      keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
     
      ctx.beginPath();
      ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2*Math.PI);
      
      // assign color based on whether in squat or not
      ctx.fillStyle = down ? "#00ff00" : "#ff0000";
      
      ctx.fill();

      // save coordinates for knee and hip
      if(keypoint.part == 'rightKnee')
          rightKnee = keypoint.position;
      else if(keypoint.part == 'leftKnee')
          leftKnee = keypoint.position;
      else if(keypoint.part == 'rightHip')
          rightHip = keypoint.position;
      else if(keypoint.part == 'leftHip')
          leftHip = keypoint.position;
      else if(keypoint.part == 'rightAnkle')
          rightAnkle = keypoint.position;
      else if(keypoint.part == 'leftAnkle')
          leftAnkle = keypoint.position;
  }
  }
  // return if all keypoints aren't detected
  if(rightKnee == null || leftKnee == null || rightHip == null || leftHip == null || rightAnkle == null || leftAnkle == null)
      return;
  
  else 
      {   
          const res = checkSquat(rightKnee,leftKnee,rightHip,leftHip);
          
          // check if in squat position
          if(res == 'down')
          {
              
              down = true;
          }
          else
            {
                start = 0;
                down = false;
            }

      }
    }

    function endScreen(ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.fillText("Done!", window.videoWidth/2, window.videoHeight/2);
      
    }