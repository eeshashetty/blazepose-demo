import { Game1 } from "./utils/games.js";
import { headTouch } from './utils/headTouch.js';
import { Squat } from './utils/squat.js';
import  { JumpSquat } from './utils/jumpSquat.js';
import { SquatCount } from './utils/squatCount.js';
import { KickSquat } from './utils/squatKicks.js';
import { PunchSquat } from './utils/punchSquat.js';
import { ShuffleSquat } from './utils/shuffleSquat.js';
import { PunchBag } from './utils/punch.js';
import { LegRaise } from './utils/LegRaise.js';
import { punchHand } from './utils/punchHand.js';
import { highKnee } from './utils/highKnee.js';

// global vars
window.videoHeight = 720;
window.videoWidth = 1280;
window.start = false;
window.game = parseInt(localStorage.getItem("game"));
let lim = 0;
let first = 0;
let lastLoop = new Date();

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
  canvas.height = window.videoHeight;
  canvas.width = window.videoWidth;

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
      results.image, 0, 0, canvas.width, canvas.height);

  // if((window.game == 3 || window.game == 5) && first == 0){
  //   window.start = true;
  //   first++;
  // }
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
        case 3: headTouch(results.poseLandmarks, ctx); break;
        case 4: Squat(results.poseLandmarks, ctx); break;
        case 5: JumpSquat(results.poseLandmarks, ctx); break;
        case 6: SquatCount(results.poseLandmarks, ctx); break;
        case 7: KickSquat(results.poseLandmarks, ctx); break;
        case 8: KickSquat(results.poseLandmarks, ctx); break;
        case 9: PunchSquat(results.poseLandmarks, ctx); break;
        case 10: ShuffleSquat(results.poseLandmarks, ctx); break;
        case 11: PunchBag(results.poseLandmarks, ctx); break;
        case 12: LegRaise(results.poseLandmarks, ctx); break;
        case 13: punchHand(results.poseLandmarks, ctx); break;
        case 14: highKnee(results.poseLandmarks, ctx); break;
      }} catch(e) {console.log(e)}
  }

  ctx.restore();

}

// utility functions

// calculate angle of hip-knee-ankle
export function find_angle(A,B,C) {
    
  var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
  var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
  var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
  
  return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB))*180/Math.PI;
}

// draw keypoints - shoulders, hips, knees, ankles
export function draw(color, ctx, poses) {
  // overriding POSE_CONNECTIONS
  let connections = [[0,1], [1,3], [2,3], [3,5], [5,7], [0,2], [2,4], [4,6]]

  drawConnectors(
      ctx, [
          poses[11], poses[12],
          poses[23], poses[24],
          poses[25], poses[26],
          poses[27], poses[28],  
      ], connections,
      {color: color});
  
  drawLandmarks(
      ctx, [
          poses[11], poses[12],
          poses[23], poses[24],
          poses[25], poses[26],
          poses[27], poses[28],  
      ],
      {color: color, fillColor: color, lineWidth: 4, radius: 10});
  
}

// generate collision shapes
export function genShape(ctx, count, xc, yc, maxCount, newc, hip = null, ankle = null) {

  ctx.beginPath();
  ctx.globalAlpha = 0.6;
  
  if(newc)
  { 
      if(window.game < 3)
      {
        if(count%2 == 0)
          xc = Math.floor((0.1 + Math.random()*0.05) * window.videoWidth)
        else
          xc = Math.floor((0.9 - Math.random()*0.05) * window.videoWidth)
      
          console.log(window.game, count);
        if(window.game == 1 && count <= maxCount)
          yc = Math.floor((0.3 + Math.random()*0.4) * window.videoHeight);
        else if(window.game == 2 && count <= maxCount)

          { yc = Math.floor((hip + Math.random()*(ankle-hip)) * window.videoHeight) }
        
        else{
            xc = Math.floor(Math.random()*(window.videoWidth - 0.2*window.videoWidth));
          yc = Math.floor(0.1*window.videoHeight + Math.random()*((0.17*window.videoHeight)));
        }
      }
      
      else {
          xc = Math.floor(Math.random()*(window.videoWidth - 0.2*window.videoWidth));
        }

      newc = false;
  }

  ctx.beginPath();
  ctx.rect(window.videoWidth*3/10,0,window.videoWidth*4/10,window.videoHeight/8);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();
  ctx.font = "30px Arial";
  ctx.fillStyle = "yellow";
  ctx.textAlign = "center";
  
  let str = (window.game==1)?"Use Hands ":(window.game==2)?"Use Legs ": "Use Head ";
  ctx.fillText(str + count, window.videoWidth/2, window.videoHeight*3/40);

  return [xc,yc,newc];

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

export function checkSquat(poses) {
  let up, down, progress, a,b;  
  if(poses[27].visibility > 0.2 && poses[28].visibility > 0.2)
        {   
            // find squat angle
            a = find_angle(poses[24],poses[26],poses[28]);
            b = find_angle(poses[23],poses[25],poses[27]);
            
            // standing, if angle is >= 150
            if(a>=150 && b>=150) {
                up = true;
                progress = false;
                console.log("up");
            }
            
            // squat angle is <=100
            else if(a<=100 && b<=100) {
                down = true;
                up = false;
                progress = false;
                console.log("squat");
            }

            else {
              progress = true;
            }
        }
      return [up, down, progress, a,b]
}

export function endScreen(ctx) {
  ctx.font = "40px Arial";
  ctx.fillStyle = "yellow";
  ctx.textAlign = "center";
  ctx.fillText("Done!", window.videoWidth/2, window.videoHeight/2); 
}

// set up blazepose
const pose = new Pose({
  locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.1/${file}`;
},
});

// set blazepose options
pose.setOptions({
  selfieMode: true,
  smoothLandmarks: true,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});
pose.onResults(detect);

// set up camera
const videoElement = document.getElementById('video');

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({image: videoElement});
  },
  width: 1280,
  height: 720
});

camera.start();