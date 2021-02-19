// import functions
import { endScreen, draw, checkSquat } from '../index.js';

// global vars
let count = 0;
let down = false;
let up = false;

// count squats 
export function Squat(poses, ctx) {
    
    // only when count is under max limit
    if(count < 5) {
    
    // window title
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Squats = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    // one squat occurs when person goes in squat position and stands up after - hence up and down are both true
    if(up && down)
    {   
        count++;
        up = false; // reset
        down = false; // reset
    } 
        
    let color = down?"#00ff00":(up?"white":"red");
    // draw keypoints
    draw(color, ctx, poses);

    // check if in squat
    let res = checkSquat(poses);
    up = (res[0] == undefined)?up:res[0];
    down = (res[1] == undefined)?down:res[1];

    console.log(up,down);
    // console.log(up,down);

    } else {
        endScreen(ctx);
    }
    
}