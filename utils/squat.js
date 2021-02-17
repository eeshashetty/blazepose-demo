// All Squat Exercises

// import functions
import { endScreen } from './games.js';

// global vars
let count = 0;
let down = false;
let up = false;
let color = "red";
let xc, yc, xcr, xcl, xd;
let radius = 35;
let kick = false;
let kickl = false;
let kickr = false;
let upc = 0;
let wait = 0;
let first = true;

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
        
    // draw keypoints
    draw(color, ctx, poses);

    // check if in squat
    checkSquat(poses)

    } else {
        endScreen(ctx);
    }
    


}

// squat+jump
export function JumpSquat(poses, ctx) {
      
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
        ctx.fillStyle = 'yellow';
        ctx.fill();

        // Blazepose returns coordinates in a scale of 0 -1, so reduce rectangle coordinates to a scale of 0 to 1 as well
        let xcc =  xc/videoWidth;
        let ycc = yc/videoHeight;
        
        // fetch head points
        let head = poses[33];
        
        // check if head collision occurs
        // point is inside rectangle if x > x1 and y > y1 and x < x2 and y < y2 (x1,y1 are top left coordinates - x2,y2 are bottom right coordinates)
        if(head.x > xcc && head.y > ycc && head.x < xcc + 0.2 && head.y < ycc + 0.13) {
            count++;
            down = false; // reset
        }

        // draw keypoints
        draw(color, ctx, poses);
    } 
    
    else {
        // draw keypoints
        draw(color, ctx, poses);
        // check squat
        checkSquat(poses)
    }
} else {
    endScreen(ctx);
    }


}


// squat count
export function SquatCount(poses, ctx) {
    
    // count seconds by dividing frame count by frame per second rate
    if(Math.floor(count/window.fps) > 5) {
        endScreen(ctx);
    } else {

    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Squat Count : " + Math.floor(count/window.fps), window.videoWidth/2, window.videoHeight*3/40);

    // skeleton color is green if in squat, white if standing up
    let color = down ? "#00ff00" : (up ? "white": "#ff0000");
    
    // check if in squat
    checkSquat(poses);
    
    // start counting once in squat
    if(down) {
        count++;
    } else {
        count = 0; // reset to 0 if leaves squat
    }

    // draw Keypoints
    draw(color, ctx, poses);

    }

  
}

// squat + sidekick and squat + frontkick
export function KickSquat(poses, ctx) {
      
    if(count < 6) {

    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Squat Kicks = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    // generate circle for kick if in squat
    if(down)
    {   
        // game7 is side kick, game8 is front kick
        if(window.game == 7){
        // for game 7, generate circle on alternate sides
            xc = (count%2 == 0)? xcr : xcl;
            xc = xc*window.videoWidth;
        }

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
            if(distl <= Math.pow(radius/window.videoHeight, 2) || distr <= Math.pow(radius/window.videoHeight, 2)) {
              count++;
              down = false; // reset squat
              kick = true; // trigger kick as true for green circle
            } else {
                kick = false;
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
        checkSquat(poses);
        let color = down ? "#00ff00" : "#ff0000";
        // draw keypoints
        draw(color, ctx, poses);
        
    }
} else {
    endScreen(ctx);
    }

}

// Squat and Alternate Punch
export function PunchSquat(poses, ctx) {
      
    if(count < 6) {

    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Squat Kicks = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    // generate circles for punch if in squat
    if(down)
    {   
        // create circle on both sides
        // coordinates generated in checkSquat()
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
                down = false; // reset
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
        // draw keypoints
        draw(color, ctx, poses);
        // check squat
        checkSquat(poses)
    }
} else {
    endScreen(ctx);
    }

}

// shuffle squats 
// logic - first make person stand in the center, after that make them do shuffle squats
export function ShuffleSquat(poses, ctx) {
      
    if(count < 6) {

    color = "red";
    let xcc, ycc;

    // person has stood in the center
    if(!first){

        ctx.font = "30px Arial";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.fillText("Shuffle Squats = " + count, window.videoWidth/2, window.videoHeight*3/40);
        
        // generate box area on alternate sides on alternate counts
        if(count%2 == 0) {
            xcc = 0.16;
            ycc = 0.09;
            ctx.font = "25px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("squat here", 0.18*window.videoWidth, 0.08*window.videoHeight);  

            ctx.beginPath();
            ctx.rect(xcc*videoWidth, ycc*videoHeight, videoWidth/3.5, 0.84*videoHeight);
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = (up&&down)?"#00ff00":"yellow";
            ctx.fill();
            ctx.closePath();
            
        } else {
            xcc = 0.56;
            ycc = 0.09;

            ctx.font = "25px Arial";
            ctx.globalAlpha = 1;
            ctx.fillStyle = "white";
            ctx.fillText("squat here", 0.80*window.videoWidth, 0.08*window.videoHeight);

            ctx.beginPath();
            ctx.rect(xcc*videoWidth, ycc*videoHeight, videoWidth/3.5, 0.84*videoHeight);
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = (up&&down)?"#00ff00":"yellow";
            ctx.fill();
            ctx.closePath();
        }

        // fetch hip points
        let hip = poses[34];
        
        // check if person is standing inside the box
        if(hip.x > xcc && hip.y > ycc && hip.x < xcc + 0.28 && hip.y < ycc + 0.84) {
            // check squat
            checkSquat(poses);

            // skeleton turns green if in squat, white if inside the box. otherwise red
            color = down?"#00ff00":"white";

            // count one squat if person squatted and stood up
            if(up && down)
            {   // wait incrementer so that color can be seen for a few frames
                wait++;
                console.log(wait);
                if(wait>10) {
                    wait = 0;
                    count++;
                    up = false; // reset
                    down = false; // reset
                }

            }
        }
    } else {

    // person has not stood in the center yet
    if(first) {
        let xcc = 0.36;
        let ycc = 0.09;

        ctx.beginPath();
        ctx.rect(xcc*videoWidth, ycc*videoHeight, videoWidth/3.5, 0.84*videoHeight);
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();

        ctx.font = "25px Arial";
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        ctx.fillText("stand here", 0.45*window.videoWidth, 0.08*window.videoHeight);

        // fetch hip points
        let hip = poses[34];
        
        // check if person is standing in the box
        if(hip.x > xcc && hip.y > ycc && hip.x < xcc + 0.28 && hip.y < ycc + 0.84) {
            first = false; // start shuffle squats
        }

    }

    }
     
        
    // draw keypoints
    draw(color, ctx, poses);


    } else {
        endScreen(ctx);
    }
    


}

// function to check squat (angle logic)
function checkSquat(poses) {
    if(poses[27].visibility > 0.2 && poses[28].visibility > 0.2)
        {   
            // find squat angle
            let a = find_angle(poses[24],poses[26],poses[28]);
            let b = find_angle(poses[23],poses[25],poses[27]);
            
            // standing, if angle is >= 150
            if(a>=150 && b>=150) {
                up = true;

                // a lot of squat functions need fixed coordinates. So this function fixes them on the first time the user is standing upright
                if(upc == 0) {
                // for jump squat
                if(window.game == 5) {
                    // y coordinates are fixed above the head
                    yc = (poses[33].y - 0.5*poses[0].y)*window.videoHeight;
                }

                // for front kick
                if(window.game == 8) {
                    // take 20% of distance from the hip
                    xcl = (0.8*poses[23].x)*window.videoWidth;
                    xcr = (poses[24].x + 0.2*poses[23].x)*window.videoWidth;

                    // y coordinate is y coordinate of hip
                    yc = poses[23].y*window.videoHeight;
                } 
                
                // for side kick
                else if (window.game == 7) {
                yc = (poses[23].y)*window.videoHeight;

                // take distance between knee and heel
                xcl = poses[23].x - 1.3*Math.sqrt(Math.pow(poses[25].x - poses[29].x, 2) + Math.pow(poses[25].y - poses[29].y, 2));
                xcr = poses[24].x + 1.3*Math.sqrt(Math.pow(poses[25].x - poses[29].x, 2) + Math.pow(poses[25].y - poses[29].y, 2));  
                }

                // for squat and punch
                else if(window.game == 9) {
                    // fix x coordinate as the distance of difference between both shoudlers from each shoulder
                    xcr = (2*poses[12].x - poses[11].x)*window.videoWidth;
                    xcl = (2*poses[11].x - poses[12].x)*window.videoWidth;
                    
                    // y coordinate is that of mouth
                    yc = poses[9].y*window.videoHeight;
                }
            }
                upc++;
                // skeleton is white if up
                color = "white";

            } 
            // squat angle is <=100
            else if(a<=100 && b<=100) {
                // skeleton is green if in squat
                color = "#00ff00";
                
                // keep head x constant
                xc = poses[33].x*window.videoWidth;
                
                down = true;
                up = false;
            }
        }
}

// calculate angle of hip-knee-ankle
function find_angle(A,B,C) {
    
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB))*180/Math.PI;
}

// draw keypoints - shoulders, hips, knees, ankles
function draw(color, ctx, poses) {
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