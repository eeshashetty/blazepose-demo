// import functions
import { endScreen, draw, checkSquat } from '../index.js';

// global vars
let count = 0;
let down = false;
let up = false;
let progress = true;
// squat+jump
export function SquatCount(poses, ctx) {

    // count seconds by dividing frame count by frame per second rate
    if(Math.floor(count/window.fps) > 5) {
        endScreen(ctx);
    } else {

    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Squat Count : " + Math.floor(count/window.fps), window.videoWidth/2, window.videoHeight*3/40);

    // check squat
    let res = checkSquat(poses);
    up = (res[0] == undefined)?up:res[0];
    down = (res[1] == undefined)?down:res[1];
    progress = (res[2] == undefined)?down:res[2];

    // skeleton color is green if in squat, white if standing up
    let color = progress?"red":(up?"white":(down?"#00ff00":"red"));

    // start counting once in squat
    if(down && !progress && !up) {
        count++;
    } else {
        count = 0; // reset to 0 if leaves squat
    }

    // draw Keypoints
    draw(color, ctx, poses);

    }
}