import { Game1, Game2 } from "./games.js";
import {Squat, JumpSquat, SquatCount, KickSquat, PunchSquat, ShuffleSquat} from './squat.js';
import { PunchBag } from './punch.js';

// global vars
let lim = 0;
window.start = false;
let lastLoop = new Date();
window.game = parseInt(localStorage.getItem("game"));


export function detect(results) {
  
  // set FPS
  if(lim < 10) {
    var thisLoop = new Date();
    window.fps = 1000 / (thisLoop - lastLoop); // finds average FPS for the first 10 frames
    lastLoop = thisLoop;
    lim++;
  }
    
  const canvas = document.getElementById('output'); // Initialize canvas
  const ctx = canvas.getContext('2d');
  
  try{
    // create head point
    var headx=results.poseLandmarks[0].x;
    var heady=results.poseLandmarks[0].y-(2*Math.abs(results.poseLandmarks[7].x-results.poseLandmarks[8].x));
    
    // create hip center point
    var hipx = (results.poseLandmarks[23].x + results.poseLandmarks[24].x)/2;
    var hipy = results.poseLandmarks[23].y;

    // append to poseLandmarks array for easier use
    results.poseLandmarks.push({x:headx,y:heady});
    results.poseLandmarks.push({x:hipx,y:hipy});
    
  } catch(e) {} 

  // set global var videoHeight and videoWidth
  window.videoHeight = canvas.height;
  window.videoWidth = canvas.width;

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
      results.image, 0, 0, canvas.width, canvas.height);

  // if window.start is true, it prompts user to stand between the lines
  // set to False for debugging purposes
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
    // function to check if user is in line
    inLine(results.poseLandmarks, ctx);
    } catch(e) {}

  } else {
    try{
      // switch case to choose Game
      switch(window.game) {
        case 1: Game1(results.poseLandmarks, ctx); break;
        case 2: Game1(results.poseLandmarks, ctx); break;
        case 3: Game2(results.poseLandmarks, ctx); break;
        case 4: Squat(results.poseLandmarks, ctx); break;
        case 5: JumpSquat(results.poseLandmarks, ctx); break;
        case 6: SquatCount(results.poseLandmarks, ctx); break;
        case 7: KickSquat(results.poseLandmarks, ctx); break;
        case 8: KickSquat(results.poseLandmarks, ctx); break;
        case 9: PunchSquat(results.poseLandmarks, ctx); break;
        case 10: ShuffleSquat(results.poseLandmarks, ctx); break;
        case 11: PunchBag(results.poseLandmarks, ctx); break;
      }} catch(e) {}
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
export function inLine(poses) {

  // first check for visibility of points (0.8)
  let rightAnkle = (poses[28].visibility > 0.8)? true : false;
  let leftAnkle = (poses[27].visibility > 0.8)? true : false;
  if(rightAnkle && leftAnkle){
    
    // check if both ankles are between the lines
    if(poses[33].y >= 0.1 && poses[27].y <= 0.9 && poses[28].y <= 0.9)
    { 
      window.start = false;
    }
  }
}