import { draw, find_angle } from './squat.js';
import { endScreen } from './games.js';

let count = 0;
let xc,yc,xcr,xcl;
let radius = 30;
let raise = false;
let up = false;
let upc = 0;
let wait = 0;

export function LegRaise(poses, ctx) {
      
    let color = up?"white":"#ff0000";
    // draw keypoints
    draw(color, ctx, poses);

    if(upc == 0) {
        fix(poses);
    }

    if(count < 6) {

    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Leg Raises = " + count, window.videoWidth/2, window.videoHeight*3/40);
     
        // generate circle on alternate sides
    xc = (count<3)? xcr : xcl;
    xc = xc*window.videoWidth;

    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.arc(xc, yc, radius, 0, 2 * Math.PI);
    ctx.fillStyle = raise?'#00ff00':'yellow'; // yellow if not kicked, green once kicked
    ctx.fill();
    ctx.closePath();

        // check if leg collides with circle
        // first - check if ankles are visible
    if(poses[31].visibility > 0.9 || poses[32].visibility > 0.9) {    
            // reduce circle coords to a scale of 0 to 1 for blazepose
        let xcc =  xc/videoWidth;
        let ycc = yc/videoHeight;

        let distr = Math.pow((xcc-poses[31].x),2) + Math.pow((ycc-poses[31].y),2); // check distance of right ankle from circle
        let distl = Math.pow((xcc-poses[32].x),2) + Math.pow((ycc-poses[32].y),2); // check distance of left ankle from circle
            
        // a point (x1,y1) is inside a circle if (x-x1)^2 + (y-y1)^2 <= radius^2
        let dist = (count<3) ? distr : distl;

        if(dist <= Math.pow(radius/window.videoHeight, 2)) {
            raise = true;
            console.log('in');
             // trigger kick as true for green circle
        } else {
            if(raise) {
                count++;
                console.log("kick");
                raise = false;
            }
            
        }
        } else {
              raise = false;
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
            
            yc = 1.3*(poses[23].y)*window.videoHeight;

            // take distance between knee and heel
            xcl = poses[23].x - 1.3*Math.sqrt(Math.pow(poses[25].x - poses[29].x, 2) + Math.pow(poses[25].y - poses[29].y, 2));
            xcr = poses[24].x + 1.3*Math.sqrt(Math.pow(poses[25].x - poses[29].x, 2) + Math.pow(poses[25].y - poses[29].y, 2));  
            
            upc++;
        }
}