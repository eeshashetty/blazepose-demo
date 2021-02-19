// import functions
import { endScreen, draw, checkSquat } from '../index.js';

// global vars
let count = 0;
let down = false;
let up = false;
let progress = true;
let a = 0;
let b = 0;
// count squats 
export function Squat(poses, ctx) {
    
    // only when count is under max limit
    if(count < 5) {
    
    // window title
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Squats = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    ctx.beginPath();
    ctx.rect(window.videoWidth/2.5, window.videoHeight*0.1, 0.2*window.videoWidth, 0.1*window.videoHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Angle = " + a + ", " + b, window.videoWidth/2, window.videoHeight*0.16);
    ctx.closePath()
    // one squat occurs when person goes in squat position and stands up after - hence up and down are both true
    if(up && down)
    {   
        count++;
        up = false; // reset
        down = false; // reset
    } 
        
    let color = progress?"red":(up?"white":(down?"#00ff00":"red"));
    // draw keypoints
    draw(color, ctx, poses);

    // check if in squat
    let res = checkSquat(poses);
    up = (res[0] == undefined)?up:res[0];
    down = (res[1] == undefined)?down:res[1];
    progress = (res[2] == undefined)?down:res[2];
    a = (res[3] == undefined)?down:res[3];
    b = (res[4] == undefined)?down:res[4];
    } else {
        endScreen(ctx);
    }
    
}