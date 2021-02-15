import { Game1, Game2 } from "./games.js";
import {drawSegment, drawSkeleton, inLine} from "./posenet-utils.js";
import {Squat, SquatCount} from './squat.js';

// global vars
let poses = [];
let lim = 0;
window.start = true;
window.game = 1;
let lastLoop = new Date();
export function detect(results) {

  if(lim < 10) {
    var thisLoop = new Date();
    window.fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    lim++;
  }

  const canvas = document.getElementById('output'); // Initialize canvas
  const ctx = canvas.getContext('2d');
  try{
    // create head point
    var headx=results.poseLandmarks[0].x;
    var heady=results.poseLandmarks[0].y-(2*Math.abs(results.poseLandmarks[7].x-results.poseLandmarks[8].x));
    results.poseLandmarks.push({x:headx,y:heady});
    
  } catch(e) {
    
  } 
  window.videoHeight = canvas.height;
  window.videoWidth = canvas.width;

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
      results.image, 0, 0, canvas.width, canvas.height);

  if(window.start) {
    ctx.rect(0, 0, canvas.width, canvas.height/8);
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Stand Between the Lines", canvas.width/2, canvas.height*3/40);

    drawConnectors(
      ctx, results.poseLandmarks, POSE_CONNECTIONS,
      {color: '#00FF00'});
    drawLandmarks(
      ctx, results.poseLandmarks,
      {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 10});
  

    drawSegment([0.1*window.videoHeight, 0], [0.1*window.videoHeight, window.videoWidth], "yellow", ctx);
    drawSegment([0.95*window.videoHeight, 0], [0.95*window.videoHeight, window.videoWidth], "yellow", ctx);

    try {
    inLine(results.poseLandmarks, ctx);
    } catch(e) {

    }

  } else {
    try{
    switch(window.game) {
      case 1: Game1(results.poseLandmarks, ctx); break;
      case 2: Game1(results.poseLandmarks, ctx); break;
      case 3: Game2(results.poseLandmarks, ctx); break;
      case 4: Squat(results.poseLandmarks, ctx); break;
      case 5: SquatCount(results.poseLandmarks, ctx); break;
    }} catch(e) {
    }
}



  ctx.restore();

}

/*

  // Function for processing each frame on canvas
  async function poseDetect(){
    
    if(lim < 10)
    {
      var thisLoop = new Date();
      window.fps = 1000 / (thisLoop - lastLoop);
      lastLoop = thisLoop;
      lim++;
    }
    const flipPoseHorizontal = true;
    
    poses = await net.estimatePoses(video, {
      flipHorizontal: flipPoseHorizontal,
      decodingMethod: 'single-person'
    })

    ctx.save();
    ctx.scale(-1,1);
    ctx.translate(-window.videoWidth, 0);
    ctx.drawImage(video, 0, 0, window.videoWidth, window.videoHeight);

    if(window.start) {

      ctx.scale(-1,1);
      ctx.translate(-window.videoWidth, 0);
      ctx.rect(0, 0, window.videoWidth, window.videoHeight/8);
      ctx.font = "30px Arial";
      ctx.fillStyle = "yellow";
      ctx.textAlign = "center";
      ctx.fillText("Stand Between the Lines", window.videoWidth/2, window.videoHeight*3/40);
  
      drawSegment([0.1*window.videoHeight, 0], [0.1*window.videoHeight, window.videoWidth], "yellow", ctx);
      drawSegment([0.95*window.videoHeight, 0], [0.95*window.videoHeight, window.videoWidth], "yellow", ctx);

      drawSkeleton(poses[0].keypoints, 0.5, ctx);
      drawKeypoints(poses, ctx);

    } else {
            switch(window.game) {
              case 1: Game1(ctx); break;
              case 2: Game1(ctx); break;
              case 3: Game2(poses, ctx); break;
              case 4: Squat(poses, ctx); break;
              case 5: SquatCount(poses, ctx, new Date()); break;
            }
        }
      
    ctx.restore();
    requestAnimationFrame(poseDetect);
  }

  poseDetect();

*/
