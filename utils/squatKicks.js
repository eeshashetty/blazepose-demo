// import functions
import { endScreen, find_angle, draw, checkSquat } from '../index.js';

// global vars
let count = 0;
let down = false;
let up = false;
let xc, yc, xcl, xcr;
let upc = 0;
let kick = false;
let radius = 30;

// squat+jump
export function KickSquat(poses, ctx) {
    if(upc == 0) {
        fix(poses);
    }

    if(count < 6) {
    
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Squat Kicks = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    // generate circle for kick if in squat
    if(down)
    {   
        // game7 is side kick, game8 is front kick
        // generate circle on alternate sides
        xc = (count%2 == 0)? xcr : xcl;
        xc = xc*window.videoWidth;

        ctx.beginPath();
        ctx.globalAlpha = 0.6;
        ctx.arc(xc, yc, radius, 0, 2 * Math.PI);
        ctx.fillStyle = kick?'#00ff00':'yellow'; // yellow if not kicked, green once kicked
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
            let dist = (count%2==0) ? distr : distl;

            if(dist <= Math.pow(radius/window.videoHeight, 2)) {
                kick = true; // trigger kick as true for green circle
            } else if(dist <= Math.pow(2*radius/window.videoHeight, 2)){
                if(kick) {
                    count++;
                    down = false; // reset squat
                    kick = false;
                }
            }
          } else {
              kick = false;
          }

        // draw keypoints only for ankles
        drawLandmarks(
            ctx, [poses[31], poses[32]],
            {color: 'yellow', fillColor: 'yellow', lineWidth: 4, radius: 20});
    } 
    
    else {
        // check squat
        let res = checkSquat(poses);
        up = (res[0] == undefined)?up:res[0];
        down = (res[1] == undefined)?down:res[1];

        let color = down ? "#00ff00" : (up?"white":"#ff0000");
        // draw keypoints
        draw(color, ctx, poses);
        
    }
    } else {
        endScreen(ctx);
    }
} 

function fix(poses) {
    if(poses[27].visibility > 0.2 && poses[28].visibility > 0.2)
        {   
    
            // find squat angle
            let a = find_angle(poses[24],poses[26],poses[28]);
            let b = find_angle(poses[23],poses[25],poses[27]);
            
            // standing, if angle is >= 150
            if(a>=150 && b>=150) {
                // for front kick
                if(window.game == 8) {
                    // take 20% of distance from the hip
                    xcl = (0.8*poses[23].x);
                    xcr = (poses[24].x + 0.2*poses[23].x);

                    // y coordinate is y coordinate of hip
                    yc = 1.1*poses[23].y*window.videoHeight;
                } 
                
                // for side kick
                else if (window.game == 7) {
                yc = (poses[23].y)*window.videoHeight;

                // take distance between knee and heel
                xcl = poses[23].x - 1.3*Math.sqrt(Math.pow(poses[25].x - poses[29].x, 2) + Math.pow(poses[25].y - poses[29].y, 2));
                xcr = poses[24].x + 1.3*Math.sqrt(Math.pow(poses[25].x - poses[29].x, 2) + Math.pow(poses[25].y - poses[29].y, 2));  
                }

                upc++;
            }
        }
}