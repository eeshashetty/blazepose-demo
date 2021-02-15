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

export function inLine(poses, ctx , xc = -1, yc = -1, wait = -1) {

    let head = (poses[33].visibility > 0.9)? true : false;
    let rightAnkle = (poses[28].visibility > 0.9)? true : false;
    let leftAnkle = (poses[27].visibility > 0.9)? true : false;
    let rightShoulder = (poses[12].visibility > 0.9)? true : false;
    let leftShoulder = (poses[11].visibility > 0.9)? true : false;
    console.log(poses[27].y,poses[28].y);
    if(poses[33].y >= 0.1 && poses[27].y < 0.75 && poses[28].y < 0.75)
    { 
      window.start = false;
    }
  }