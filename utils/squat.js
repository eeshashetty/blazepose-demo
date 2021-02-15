import { drawSkeleton } from './posenet-utils.js';
let count = 0;
let start = 0;
let down = false;
let color = "red";
let xc;

export function Squat(poses, ctx) {
      
    if(count == 5) {
        count = 0;
        window.game++;
    }

    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Squat Jumps = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
    if(down)
    {   
        let yc = 0.1* window.videoHeight;
        ctx.rect(xc,yc, 0.2*window.videoWidth, 0.13*window.videoHeight);
        ctx.fillStyle = 'yellow';
        ctx.fill();

        let xcc =  xc/videoWidth;
        let ycc = yc/videoHeight;
        
        let head = poses[33];
        
        if(head.x > xcc && head.y > ycc && head.x < xcc + 0.2 && head.y < ycc + 0.13) {
            count++;
            down = false; 
        }

        drawConnectors(
            ctx, poses, POSE_CONNECTIONS,
            {color: color});
        drawLandmarks(
            ctx, poses,
            {color: color, fillColor: color, lineWidth: 4, radius: 10});

    } 
    
    else {
        
        drawConnectors(
            ctx, poses, POSE_CONNECTIONS,
            {color: color});
        drawLandmarks(
            ctx, poses,
            {color: color, fillColor: color, lineWidth: 4, radius: 10});

        checkSquat(poses)
    }


}

function checkSquat(poses) {
    if(poses[27].visibility > 0.2 && poses[28].visibility > 0.2)
        {   
            let a = find_angle(poses[24],poses[26],poses[28]);
            let b = find_angle(poses[23],poses[25],poses[27]);
            
            if(a>=150 && b>=150) {
                color = "white";
            } else if(a<=120 && b<=120) {
                color = "#00ff00";
                xc = poses[33].x*window.videoWidth;
                down = true;
            }
        }
}

function find_angle(A,B,C) {
    
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB))*180/Math.PI;
}

export function SquatCount(poses, ctx) {
    
    if(Math.floor(count/window.fps) > 5) {
        endScreen(ctx);
    } else {

    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Squat Count : " + Math.floor(count/window.fps), window.videoWidth/2, window.videoHeight*3/40);

    let color = down ? "#00ff00" : "#ff0000";
    checkSquat(poses);
    if(down) {
        count++;
    } else {
        count = 0;
    }
    }
  
}

function endScreen(ctx) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Done!", window.videoWidth/2, window.videoHeight/2);
    
}