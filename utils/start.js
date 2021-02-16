import { Game1, Game2 } from "./games.js";
import {Squat, JumpSquat, SquatCount, KickSquat} from './squat.js';

// global vars
let lim = 0;
window.start = true;
let lastLoop = new Date();
window.game = parseInt(localStorage.getItem("game"));


export function detect(results) {
  // set FPS
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
  

    drawSegment([0, 0.1*window.videoHeight,], [window.videoWidth, 0.1*window.videoHeight], "yellow", ctx);
    drawSegment([0, 0.95*window.videoHeight], [window.videoWidth, 0.95*window.videoHeight], "yellow", ctx);

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
        case 5: JumpSquat(results.poseLandmarks, ctx); break;
        case 6: SquatCount(results.poseLandmarks, ctx); break;
        case 7: KickSquat(results.poseLandmarks, ctx); break;
        case 8: KickSquat(results.poseLandmarks, ctx); break;
      }} catch(e) {
        console.log(e);
      }
  }

  ctx.restore();

}

// draw lines
export function drawSegment([ax, ay], [bx, by], color, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.stroke();
}

// check if person is between the lines
export function inLine(poses, ctx , xc = -1, yc = -1, wait = -1) {

  let rightAnkle = (poses[28].visibility > 0.8)? true : false;
  let leftAnkle = (poses[27].visibility > 0.8)? true : false;
  if(rightAnkle && leftAnkle){
    console.log(poses[27].y);
  if(poses[33].y >= 0.1 && poses[27].y <= 0.9 && poses[28].y <= 0.9)
  { 
    window.start = false;
  }
}
}