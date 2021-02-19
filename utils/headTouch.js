import {genShape, endScreen} from '../index.js';
// global vars
let count = 0;
let maxCount = 3;
let newc = true;
let xc,yc;
let touch = false;
let frame = 0;

// Head Collision Game
export function headTouch(poses, ctx) {
    if(count <= maxCount) {
      if(frame == 0)
        yc = (poses[33].y - 0.5*poses[0].y)*window.videoHeight;
      
      let a = genShape(ctx, count, xc, yc, maxCount, newc);

      xc = a[0];
      yc = a[1];
      newc = a[2];

      ctx.beginPath();
      
      ctx.rect(xc,yc, 0.18*window.videoWidth, 0.05*window.videoHeight);
      
      ctx.fillStyle = touch?'#00ff00':'yellow';
      ctx.fill();
      ctx.closePath();

      let xcc =  xc/videoWidth;
      let ycc = yc/videoHeight;
      
      let head = poses[33];
      
      drawLandmarks(
        ctx, [poses[33], poses[33]],
        {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 20});
    
      if(head.x > xcc && head.y > ycc && head.x < xcc + 0.2 && head.y < ycc + 0.13) {
              touch = true;
            } else {
              console.log("in");  
              if(touch) {
                    frame = 0;
                    count++;
                    newc = true;
                    touch = false;
                } else {
                    touch = false;
                    newc = false;
                }
            }

      frame++;

    } else {
        endScreen(ctx);
    }
}