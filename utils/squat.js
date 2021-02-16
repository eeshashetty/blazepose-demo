import { endScreen } from './games.js';

// global vars
let count = 0;
let down = false;
let up = false;
let color = "red";
let xc;

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
        let yc = 0.07* window.videoHeight;
        ctx.rect(xc,yc, 0.1*window.videoWidth, 0.13*window.videoHeight);
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

// function to check squat (angle logic)
function checkSquat(poses) {
    if(poses[27].visibility > 0.2 && poses[28].visibility > 0.2)
        {   
            // find squat angle
            let a = find_angle(poses[24],poses[26],poses[28]);
            let b = find_angle(poses[23],poses[25],poses[27]);
            
            if(a>=150 && b>=150) {
                up = true;
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