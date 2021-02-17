import { endScreen } from './games.js';

let count = 0;
let wait = 0;
let xcc, ycc;

export function PunchBag(poses, ctx) {
      
    if(count < 4)
    {   ctx.font = "30px Arial";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.fillText("Punches = " + count, window.videoWidth/2, window.videoHeight*3/40);
  
        xcc = 0.76;
        ycc = 0.09;
        // Punching Bag - White
        ctx.beginPath();
        ctx.rect(xcc*videoWidth, ycc*videoHeight, videoWidth/10, 0.84*videoHeight);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();

        // Punching Bag - Red 
        // X coordinate keeps on moving down
        ctx.beginPath();
        ctx.rect(xcc*videoWidth, (ycc + count/4)*videoHeight, videoWidth/10, (0.84 - count/4)*videoHeight);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        let rightHand = poses[19];
        let leftHand = poses[20];
    
        // check if hand is in punching bag
        if(rightHand.x > xcc && rightHand.y > ycc && rightHand.x < xcc + 0.1 && rightHand.y < ycc + 0.84 ||
           leftHand.x > xcc && leftHand.y > ycc && leftHand.x < xcc + 0.1 && leftHand.y < ycc + 0.84) 
           {
               // increment counter to let code wait for a few frames
               wait++;
               if(wait>5) {
                count++;
                wait = 0;
               }
            }

        
    // draw keypoints only for hands
    drawLandmarks(
        ctx, [rightHand, leftHand],
        {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 20});
    


    } else {
        endScreen(ctx);
    }
    


}