import { endScreen } from './games.js';

// global vars
let count = 0;
let down = false;
let up = false;
let color = "red";
let xc, yc, xcr, xcl, xd;
let radius = 50;
let kick = false;
let kickl = false;
let kickr = false;
let upc = 0;
// count squats 
export function Squat(poses, ctx) {
      
    if(count < 5) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Squats = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    // count one squat if person squatted and stood up
    if(up && down)
    {   
        count++;
        up = false;
        down = false;
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
        // create rectangle above head
        yc = 0.07* window.videoHeight;
        
        ctx.rect(xc,yc, 0.18*window.videoWidth, 0.05*window.videoHeight);
      
        ctx.fillStyle = 'yellow';
        ctx.fill();

        let xcc =  xc/videoWidth;
        let ycc = yc/videoHeight;
        
        // fetch head points
        let head = poses[33];
        
        // check if head collision occurs
        if(head.x > xcc && head.y > ycc && head.x < xcc + 0.2 && head.y < ycc + 0.13) {
            count++;
            down = false; 
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


// squat hold
export function SquatCount(poses, ctx) {
    
    if(Math.floor(count/window.fps) > 5) {
        endScreen(ctx);
    } else {

    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Squat Count : " + Math.floor(count/window.fps), window.videoWidth/2, window.videoHeight*3/40);

    let color = down ? "#00ff00" : "#ff0000";
    
    // check if in squat
    checkSquat(poses);
    
    if(down) {
        count++;
    } else {
        count = 0;
    }

    // draw Keypoints
    draw(color, ctx, poses);

    }

  
}

// squat + side kick
export function KickSquat(poses, ctx) {
      
    if(count < 6) {

    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Squat Kicks = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    // generate rectangle for kick if in squat
    if(down)
    {   
        // create circle on the side
        if(window.game == 7){
        xc = (count%2 == 0)? xcr : xcl;
        xc = xc*window.videoWidth;
        }

        ctx.beginPath();
        ctx.globalAlpha = 0.6;
        console.log(xc,yc);
        ctx.arc(xc, yc, radius, 0, 2 * Math.PI);
        ctx.fillStyle = kick?'#00ff00':'yellow';
        ctx.fill();
        ctx.closePath();

        // check if leg collides with circle
        if(poses[31].visibility > 0.9 || poses[32].visibility > 0.9) {    
            let xcc =  xc/videoWidth;
            let ycc = yc/videoHeight;
            let distr = Math.pow((xcc-poses[31].x),2) + Math.pow((ycc-poses[31].y),2);
            let distl = Math.pow((xcc-poses[32].x),2) + Math.pow((ycc-poses[32].y),2);
            
            if(distl <= Math.pow(radius/window.videoHeight, 2) || distr <= Math.pow(radius/window.videoHeight, 2)) {
              count++;
              down = false;
              kick = true;
            } else {
                kick = false;
            }
          } else {
              kick = false;
          }

        // draw keypoints
        drawLandmarks(
            ctx, [poses[31], poses[32]],
            {color: 'yellow', fillColor: 'yellow', lineWidth: 4, radius: 20});
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

export function PunchSquat(poses, ctx) {
      
    if(count < 6) {

    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Squat Kicks = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    // generate rectangle for kick if in squat
    if(down)
    {   
        console.log(xcr,xcl,yc);
        // create circle on both sides
        ctx.beginPath();
        ctx.globalAlpha = 0.6;
        ctx.arc(xcr, yc, radius, 0, 2 * Math.PI);
        ctx.fillStyle = kickr?'#00ff00':'red';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.globalAlpha = 0.6;
        ctx.arc(xcl, yc, radius, 0, 2 * Math.PI);
        ctx.fillStyle = kickl?'#00ff00':'blue';
        ctx.fill();
        ctx.closePath();


        // check if hand collides with circle
        if(poses[19].visibility > 0.9 || poses[20].visibility > 0.9) {    
            let xcc =  xcr/videoWidth;
            let xcd = xcl/videoWidth;
            let ycc = yc/videoHeight;
            let distr = Math.pow((xcc-poses[19].x),2) + Math.pow((ycc-poses[19].y),2);
            let distl = Math.pow((xcd-poses[20].x),2) + Math.pow((ycc-poses[20].y),2);
            
            if(distl <= Math.pow(radius/window.videoHeight, 2)) {
              kickl = true;
            }

            if(distr <= Math.pow(radius/window.videoHeight, 2)){
                kickr = true;
            }

            if(kickl && kickr) {
                count++;
                down = false;
                kickl = false;
                kickr = false;
            }  
        }

        // draw keypoints
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

// function to check squat (angle logic)
function checkSquat(poses) {
    if(poses[27].visibility > 0.2 && poses[28].visibility > 0.2)
        {   
            // find squat angle
            let a = find_angle(poses[24],poses[26],poses[28]);
            let b = find_angle(poses[23],poses[25],poses[27]);
            
            if(a>=150 && b>=150) {
                up = true;
                if(upc == 0) {

                if(window.game == 8) {
                    xc = (poses[23].x+poses[24].x)*window.videoWidth/2;
                    yc = poses[23].y*window.videoHeight;
                } 
                
                else if (window.game == 7) {
                yc = (poses[23].y)*window.videoHeight;
                xd = Math.sqrt(Math.pow(poses[24].x - poses[28].x, 2) +
                               Math.pow(poses[24].y - poses[28].y, 2) - 
                               Math.pow(poses[23].x - poses[25].x, 2) -
                               Math.pow(poses[23].y - poses[25].y, 2))
                xcl = poses[24].x - xd;
                xcr = poses[25].x + xd;  
                }

                else if(window.game == 9) {
                    xcr = (2*poses[12].x - poses[11].x)*window.videoWidth;
                    xcl = (2*poses[11].x - poses[12].x)*window.videoWidth;
                    yc = poses[9].y*window.videoHeight;
                }
            }
                upc++;
                color = "white";
            } else if(a<=100 && b<=100) {
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