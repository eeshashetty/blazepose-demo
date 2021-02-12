import '../index.js';

export function drawSegment([ay, ax], [by, bx], color, ctx) {
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  
export function drawSkeleton(keypoints, minConfidence, ctx, color = "#ff0000") {
    const adjacentKeyPoints =
        posenet.getAdjacentKeyPoints(keypoints, minConfidence);
  
    function toTuple({y, x}) {
      return [y, x];
    }
  
    adjacentKeyPoints.forEach((keypoints) => {
      drawSegment(
          toTuple(keypoints[0].position), toTuple(keypoints[1].position), color, ctx);
    });
}

export function drawKeypoints(poses, ctx , color="red", xc = -1, yc = -1, wait = -1) {
    let nose = false;
    let rightAnkle = false;
    let leftAnkle = false;
    let rightShoulder = false; 
    let leftShoulder = false;
    let rightShoulderC, leftShoulderC, noseC;
    let keypoint = [];
    let pose = poses[0];
    
    for (let j = 0; j < pose.keypoints.length; j++) {
        
        keypoint = pose.keypoints[j];
        
        if (keypoint.score > 0.2) {
       
        ctx.beginPath();
        ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2*Math.PI);
        
        ctx.fillStyle = color;
        
        ctx.fill();
  
        if(keypoint.part == 'nose' && keypoint.position.y > 0.25 * window.videoHeight)
          {
            nose = true;
            noseC = keypoint.position;
          }

        else if(keypoint.part == 'rightShoulder')
          { 
            rightShoulder = true;
            rightShoulderC = keypoint.position;
          }

        else if(keypoint.part == 'leftShoulder')
          {
            leftShoulder = true;
            leftShoulderC = keypoint.position;
          }

        else if(keypoint.part == 'rightAnkle' && keypoint.position.y < 0.9 * window.videoHeight)
            rightAnkle = true;
        
        else if(keypoint.part == 'leftAnkle' && keypoint.position.y < 0.9 * window.videoHeight)
            leftAnkle = true;
        
        }
    }
  
    if(rightShoulder && leftShoulder && nose)
  {
    let shoulderX = (leftShoulderC.x + rightShoulderC.x)/2;
    let shoulderY = (rightShoulderC.y + leftShoulderC.y)/2;
  
    let headY = noseC.y - (shoulderY - noseC.y)/2; 
  
    ctx.fillStyle = "#00ff00";
    
    ctx.beginPath();
    ctx.arc(noseC.x, shoulderY, 5, 0, 2*Math.PI);
    ctx.fill();
  
    ctx.fillStyle = "#00ff00";
    
    ctx.beginPath();
    ctx.arc(noseC.x, headY, 5, 0, 2*Math.PI);
    ctx.fill();
  
    if(window.game >= 3)
    {
     if(noseC.x > xc && headY > yc && noseC.x < xc + 0.2*window.videoWidth && headY < yc + 0.13*window.videoHeight) {
        return true;
      } else {
            return false;
        }
    }
  
    if(headY >= 0.1*window.videoHeight && leftAnkle && rightAnkle)
      {console.log("in"); window.start = false;}
  
   }
  
   return false;
    
}