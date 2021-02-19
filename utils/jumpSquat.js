// import functions
import { endScreen, find_angle, draw, checkSquat } from '../index.js';

// global vars
let count = 0;
let down = false;
let up = false;
let xc, yc;
let upc = 0;
let touch = false;
let color;

// squat+jump
export function JumpSquat(poses, ctx) {
    if(upc == 0) {
        fix(poses);
    }

    if(count < 5) {

    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Squat Jumps = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    // generate rectangle for jump if in squat
    if(down)
    {   
        // x and y coordinates are set in checkSquat() - line 
        
        ctx.rect(xc,yc, 0.18*window.videoWidth, 0.05*window.videoHeight);
        ctx.fillStyle = touch?"#00ff00":'yellow';
        ctx.fill();

        // Blazepose returns coordinates in a scale of 0 -1, so reduce rectangle coordinates to a scale of 0 to 1 as well
        let xcc =  xc/videoWidth;
        let ycc = yc/videoHeight;
        
        // fetch head points
        let head = poses[33];
        
        // check if head collision occurs
        // point is inside rectangle if x > x1 and y > y1 and x < x2 and y < y2 (x1,y1 are top left coordinates - x2,y2 are bottom right coordinates)
        if(head.x > xcc && head.y > ycc && head.x < xcc + 0.2 && head.y < ycc + 0.13) {
            touch = true;
        } else {
            if(touch) {
                count++;
                touch = false;
                down = false;
            } else {
                touch = false;
            }
        }

        // draw keypoints
        draw(color, ctx, poses);
    } 
    
    else {
        // draw keypoints
        draw(color, ctx, poses);

        // check squat
        let res = checkSquat(poses);
        up = (res[0] == undefined)?up:res[0];
        down = (res[1] == undefined)?down:res[1];

        color = down ? "#00ff00" : (up?"white":"#ff0000");
    }
} else {
    endScreen(ctx);
    }


}

function fix(poses) {
    // find squat angle
    let a = find_angle(poses[24],poses[26],poses[28]);
    let b = find_angle(poses[23],poses[25],poses[27]);
    
    // standing, if angle is >= 150
    if(a>=150 && b>=150) {
        up = true;

        // a lot of squat functions need fixed coordinates. So this function fixes them on the first time the user is standing upright
        
        // keep head x constant
        xc = poses[33].x*window.videoWidth;
        // y coordinates are fixed above the head
        yc = (poses[33].y - 0.5*poses[0].y)*window.videoHeight;
        
        upc++;
    }
}