// import {drawKeypoints} from './posenet-utils.js';

let count = 0;
let maxCount = 3;
let newc = true;
let wait = -1;
let x = [];
let xc,yc;
let radius = 50;

export function genShape(ctx) {
    // ctx.scale(-1,1);
    // ctx.translate(-window.videoWidth, 0);
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    
    if(newc)
    { 

      if(wait>3 || wait == -1)
      {

        count++;
        if(window.game < 3)
        {
          if(count%2 == 0)
            xc = Math.floor((0.1 + Math.random()*0.05) * window.videoWidth)
          else
            xc = Math.floor((0.9 - Math.random()*0.05) * window.videoWidth)
        
            console.log(window.game, count);
          if(window.game == 1 && count <= maxCount)
            yc = Math.floor((0.3 + Math.random()*0.4) * window.videoHeight);
          else if((window.game == 1 && count==maxCount+1) || (window.game == 2 && count <= maxCount))

            {yc = Math.floor((0.55 + Math.random()*0.25) * window.videoHeight)}
          
          else{
              xc = Math.floor(Math.random()*(window.videoWidth - 0.2*window.videoWidth));
            yc = Math.floor(0.1*window.videoHeight + Math.random()*((0.17*window.videoHeight)));
          }
        }
        
        else {

            xc = Math.floor(Math.random()*(window.videoWidth - 0.2*window.videoWidth));
            yc = Math.floor(0.1*window.videoHeight + Math.random()*((0.17*window.videoHeight)));
        }

        newc = false;
        wait = -1;
        
      }
    }

    ctx.rect(window.videoWidth*3/10,0,window.videoWidth*4/10,window.videoHeight/8);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    
    let str = (window.game==1)?"Use Hands ":(window.game==2)?"Use Legs ": "Use Head ";
    ctx.fillText(str + (count-1), window.videoWidth/2, window.videoHeight*3/40);
}

export function Game2(poses, ctx) {
    if(count <= maxCount) {
      genShape(ctx, 3);
      ctx.rect(xc,yc, 0.2*window.videoWidth, 0.13*window.videoHeight);
      ctx.fillStyle = 'black';
      ctx.fill();

      let xcc =  xc/videoWidth;
      let ycc = yc/videoHeight;
      
      let head = poses[33];
      
      drawLandmarks(
        ctx, [poses[33], poses[33]],
        {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 20});
    
      if(head.x > xcc && head.y > ycc && head.x < xcc + 0.2 && head.y < ycc + 0.13) {
              newc = true;
              wait++;
            } 

    } else {
        start = true;
        window.game++;
    }
}

export function Game1(poses, ctx) {
    if(count<=maxCount)
    {
      genShape(ctx);
     
      // var data = ctx.getImageData(xc-(radius*1.5), yc-(radius*1.5), radius*3, radius*3);
    
      
      ctx.beginPath();
      ctx.globalAlpha = 0.6;
      ctx.arc(xc, yc, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'lightblue';
      ctx.fill();
      ctx.stroke();
      
      let l = (game==1)?19:31;
      let r = (game==1)?20:32;
      drawLandmarks(
        ctx, [poses[l], poses[r]],
        {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 20});
        
        if(poses[l].visibility > 0.9 || poses[r].visibility > 0.9) {    
          let xcc =  xc/videoWidth;
          let ycc = yc/videoHeight;
          let distr = Math.pow((xcc-poses[l].x),2) + Math.pow((ycc-poses[l].y),2);
          let distl = Math.pow((xcc-poses[r].x),2) + Math.pow((ycc-poses[r].y),2);
          
          if(distl <= Math.pow(radius/window.videoHeight, 2) || distr <= Math.pow(radius/window.videoHeight, 2)) {
            wait++;
            newc = true;
          }
        }

    } else {
        window.game+=1;
        count = 1;
        wait = -1;
        genShape(ctx);
    }
}
