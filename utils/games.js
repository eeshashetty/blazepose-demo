import {genShape, endScreen} from '../index.js';
// global vars
let count = 0;
let maxCount = 3;
let newc = true;
let xc,yc;
let radius = 30;
let hip, ankle;
let touch = false;

export function Game1(poses, ctx) {
    if(count<=maxCount)
    {
      if(window.game == 2) {
        hip = poses[24].y;
        ankle = poses[28].y;
      } else {
        hip = null;
        ankle = null;
      }

      let a = genShape(ctx, count, xc, yc, maxCount, newc, hip, ankle);
      xc = a[0];
      yc = a[1];
      newc = a[2];
      ctx.beginPath();
      ctx.globalAlpha = 0.6;
      ctx.arc(xc, yc, radius, 0, 2 * Math.PI);
      ctx.fillStyle = touch?'#00ff00':'yellow';
      ctx.fill();
      ctx.closePath();

      let l = (game==1)?19:31;
      let r = (game==1)?20:32;
      
      // draw keypoints
      drawLandmarks(
        ctx, [poses[l], poses[r]],
        {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 20});
        
        // check if hand/leg collides with circle
        if(poses[l].visibility > 0.9 || poses[r].visibility > 0.9) {    
          let xcc =  xc/videoWidth;
          let ycc = yc/videoHeight;
          let distr = Math.pow((xcc-poses[l].x),2) + Math.pow((ycc-poses[l].y),2);
          let distl = Math.pow((xcc-poses[r].x),2) + Math.pow((ycc-poses[r].y),2);
          
          if(distl <= Math.pow(radius/window.videoHeight, 2) || distr <= Math.pow(radius/window.videoHeight, 2)) {
            touch = true;
          } else if(distl <= Math.pow(2*radius/window.videoHeight, 2) || distr <= Math.pow(2*radius/window.videoHeight, 2)) {
            if(touch) {
              count++;
              newc = true;
              touch = false;
            } else {
              newc = false;
            }
          }
        }

    } else {
        endScreen(ctx);
    }
}
