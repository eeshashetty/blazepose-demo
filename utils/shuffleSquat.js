// import functions
import { endScreen, find_angle, draw, checkSquat } from '../index.js';

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

// squat+jump
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
                
                ctx.beginPath();
                ctx.rect(xcc*videoWidth, ycc*videoHeight - 30, videoWidth/3.5, 30);
                ctx.fillStyle = (up&&down)?"#00ff00":"yellow";
                ctx.fill();
                ctx.strokeStyle = (up&&down)?"#00ff00":"yellow";
                ctx.lineWidth = "8";
                ctx.stroke();        
                ctx.closePath();
    
                ctx.font = "25px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("squat here", 0.18*window.videoWidth, 0.08*window.videoHeight);  
    
                ctx.beginPath();
                ctx.rect(xcc*videoWidth, ycc*videoHeight, videoWidth/3.5, 0.84*videoHeight);
                ctx.strokeStyle = (up&&down)?"#00ff00":"yellow";
                ctx.lineWidth = "8";
                ctx.stroke();
                ctx.closePath();
                
            } else {
                xcc = 0.56;
                ycc = 0.09;
    
    
                ctx.beginPath();
                ctx.rect(xcc*videoWidth, ycc*videoHeight - 30, videoWidth/3.5, 30);
                ctx.fillStyle = (up&&down)?"#00ff00":"yellow";
                ctx.fill();
                ctx.strokeStyle = (up&&down)?"#00ff00":"yellow";
                ctx.lineWidth = "8";
                ctx.stroke();        
                ctx.closePath();
    
                ctx.font = "25px Arial";
                ctx.globalAlpha = 1;
                ctx.fillStyle = "white";
                ctx.fillText("squat here", 0.80*window.videoWidth, 0.08*window.videoHeight);
    
                ctx.beginPath();
                ctx.rect(xcc*videoWidth, ycc*videoHeight, videoWidth/3.5, 0.84*videoHeight);
                ctx.strokeStyle = (up&&down)?"#00ff00":"yellow";
                ctx.lineWidth = "8";
                ctx.stroke();
                ctx.closePath();
            }
    
            // fetch hip points
            let hip = poses[34];
            
            // check if person is standing inside the box
            if(hip.x > xcc && hip.y > ycc && hip.x < xcc + 0.28 && hip.y < ycc + 0.84) {
                // check squat
                let res = checkSquat(poses);
                up = (res[0] == undefined)?up:res[0];
                down = (res[1] == undefined)?down:res[1];
    
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
            ctx.strokeStyle = "blue";
            ctx.lineWidth = "8";
            ctx.stroke();    
            ctx.closePath();
    
            ctx.beginPath();
            ctx.rect(xcc*videoWidth, ycc*videoHeight - 30, videoWidth/3.5, 30);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.strokeStyle = "blue";
            ctx.lineWidth = "8";
            ctx.stroke();        
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
