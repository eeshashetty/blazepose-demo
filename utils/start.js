import { Game1, Game2 } from "./games.js";
import {drawSegment, drawSkeleton, drawKeypoints} from "./posenet-utils.js";


// global vars
let poses = [];
window.start = true;
window.game = 1;

export function detect(video, net) {
  const canvas = document.getElementById('output'); // Initialize canvas
  const ctx = canvas.getContext('2d');
  
  // Resize canvas to video resolution
  canvas.width = window.videoWidth; 
  canvas.height = window.videoHeight;
  
  // Function for processing each frame on canvas
  async function poseDetect(){
    
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
            if(window.game < 3)
                Game1(ctx);
            else if(window.game == 3)
                Game2(poses, ctx);
        }
      
    ctx.restore();
    requestAnimationFrame(poseDetect);
  }

  poseDetect();

}
