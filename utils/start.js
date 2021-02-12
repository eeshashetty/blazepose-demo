import { Game1, Game2 } from "./games.js";
import {drawSegment, drawSkeleton, drawKeypoints} from "./posenet-utils.js";
import {Squat, SquatCount} from './squat.js';

// global vars
let poses = [];
let lim = 0;
window.start = true;
window.game = 1;
window.fps = 0;

export function detect(video, net) {
  const canvas = document.getElementById('output'); // Initialize canvas
  const ctx = canvas.getContext('2d');
  
  // Resize canvas to video resolution
  canvas.width = window.videoWidth; 
  canvas.height = window.videoHeight;
  var lastLoop = new Date();
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

}
