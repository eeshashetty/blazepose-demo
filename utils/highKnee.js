import {endScreen} from './games.js'
import { find_angle, draw } from './squat.js';

let hip;
let up = false;
let upc = 0;
let count = 0;
let touch = false;
let wait = 0;
let p;

export function highKnee(poses, ctx) {
    let color = "white";
    if(upc == 0) {
        fix(poses);  
    }

    if(count < 6) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        ctx.fillText("High Knee = " + count, window.videoWidth/2, window.videoHeight*3/40);
        
        let xcc = hip.x - 0.2;
        let ycc = hip.y;

        ctx.beginPath();
        ctx.rect(xcc*videoWidth, ycc*videoHeight, 0.4*videoWidth, 0.05*videoHeight);
        ctx.fillStyle = touch?"#00ff00":((count%2==0)?"blue":"red");
        ctx.fill();
        ctx.closePath();

        p = (count%2==0)?25:26;

        if(poses[p].x > xcc && poses[p].x < xcc + 0.4 && poses[p].y < ycc + 0.05) 
            {
                // increment counter to let code wait for a few frames
                wait++;
                touch = true;
                if(wait>3) {
                    count++;
                    wait = 0;
                    touch = false;
                    }
            } else {
                touch = false;
            }

            // draw keypoints for both hands
        drawLandmarks(
            ctx, [poses[25]],
            {color: 'blue', fillColor: 'blue', lineWidth: 4, radius: 10});
    
            drawLandmarks(
                ctx, [poses[26]],
                {color: 'red', fillColor: 'red', lineWidth: 4, radius: 10});
            

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
            if(upc == 0) {
                hip = poses[34];
            }

            upc++;
        }
}