import { endScreen,find_angle  } from "../index.js";

let xcr,yc,xcl;
let kickr = false;
let kickl = false;
let radius = 30;
let count = 0;
let wait = 0;
let up = false;
let upc = 0;
export function punchHand(poses, ctx) {
    if(upc==0){
        fix(poses);
    }

    if(count < 6) {

        ctx.font = "30px Arial";
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        ctx.fillText("Punches = " + count, window.videoWidth/2, window.videoHeight*3/40);
      
        // generate circles for punch if in squat
        // create circle on both sides
        ctx.beginPath();
        ctx.globalAlpha = 0.6;
        ctx.arc(xcr, yc, radius, 0, 2 * Math.PI);
        ctx.fillStyle = kickl?'#00ff00':'red';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.globalAlpha = 0.6;
        ctx.arc(xcl, yc, radius, 0, 2 * Math.PI);
        ctx.fillStyle = kickr?'#00ff00':'blue';
        ctx.fill();
        ctx.closePath();


        // check if hand collides with circle
        // check for hand visibility
        if(poses[19].visibility > 0.9 || poses[20].visibility > 0.9) {    
            let xcc =  xcr/videoWidth;
            let xcd = xcl/videoWidth;
            let ycc = yc/videoHeight;
            let distr = Math.pow((xcc-poses[19].x),2) + Math.pow((ycc-poses[19].y),2); // distance of right hand from left circle
            let distl = Math.pow((xcd-poses[20].x),2) + Math.pow((ycc-poses[20].y),2); // distance of left hand from right circle
            
            if(distr <= Math.pow(radius/window.videoHeight, 2)) {
                wait++;
                kickl = true; wait = 0; // trigger kick to change red circle to green
            }

            if(distl <= Math.pow(radius/window.videoHeight, 2)){
                kickr = true; // trigger kick to change blue circle to green
            }

            // if both circles are punched, one punch squat
            if(kickl && kickr) {
                // wait counter is done so that the green color can be seen for a few extra frames
                wait++;
                if(wait>10){
                kickl = false; // reset
                kickr = false; // reset
                count++;
            }
            }  
        }

        // draw keypoints for both hands
        drawLandmarks(
        ctx, [poses[20]],
        {color: 'blue', fillColor: 'blue', lineWidth: 4, radius: 20});

        drawLandmarks(
            ctx, [poses[19]],
            {color: 'red', fillColor: 'red', lineWidth: 4, radius: 20});
        
    } 
    
    else {
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
        
        // fix x coordinate as the distance of difference between both shoudlers from each shoulder
        xcr = (2*poses[12].x - poses[11].x)*window.videoWidth;
        xcl = (2*poses[11].x - poses[12].x)*window.videoWidth;
        
        // y coordinate is that of shoulder
        yc = poses[12].y*window.videoHeight;

        upc++;
    }
}