import {drawKeypoints} from './posenet-utils.js';

let count = 0;
let maxCount = 10;
let newc = true;
let wait = -1;
let x = [];
let xc,yc;
let radius = 30;

export function genShape(ctx) {
    ctx.scale(-1,1);
    ctx.translate(-window.videoWidth, 0);
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
        
          if(window.game == 1)
            yc = Math.floor((0.3 + Math.random()*0.4) * window.videoHeight);
          else if(window.game == 2)
            yc = Math.floor((0.55 + Math.random()*0.25) * window.videoHeight);
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
      
      newc = drawKeypoints(poses, ctx, "red",xc = xc, yc = yc, wait = wait);
      
      if(newc) {
          wait++;
      }
      
    } else {
        start = true;
        window.game++;
    }
}

export function Game1(ctx) {
    if(count<=maxCount)
    {
      genShape(ctx);
     
      var data = ctx.getImageData(xc-(radius*1.5), yc-(radius*1.5), radius*3, radius*3);
    
      ctx.rect(xc-(radius*1.5), yc-(radius*1.5), radius*3, radius*3);
      ctx.fillStyle = 'black';
      ctx.fill();
      
      ctx.beginPath();
      ctx.globalAlpha = 0.6;
      ctx.arc(xc, yc, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'lightblue';
      ctx.fill();
      ctx.stroke();
      
      let diff = 0;
      
      for(let i = 0; i<data.data.length; i++) {
        diff += Math.abs(x[i] - data.data[i]);
      }

      diff = diff/data.data.length;
      
      if(diff > 4)
        {
          wait++;
          newc = true;
        }

      x = data.data;
      
    } else {
        window.game++;
        count = 0;
        wait = -1;
    }
}
