// global vars
let newc = true;
let xc,yc;
let touch = false;
let frame = 0;

// Head Collision Game
function Exercise(results) {
    let poses = results.poseLandmarks;
    
    if(frame == 0)
    {
      yc = (poses[33].y - 0.5*poses[0].y)*canvasHeight;
      frame++;
    }
    
    let a = genShape(xc, newc);
    xc = a[0];
    yc = a[1];
    newc = a[2];
    
    ctx1.beginPath();
    
    ctx1.rect(xc,yc, 0.18*canvasWidth, 0.05*canvasHeight);
    
    ctx1.fillStyle = touch?'#00ff00':'yellow';
    ctx1.fill();
    ctx1.closePath();

    let xcc =  xc/canvasWidth;
    let ycc = yc/canvasHeight;
    
    let head = poses[33];
  
    if(head.x > xcc && head.y > ycc && head.x < xcc + 0.18 && head.y < ycc + 0.05) {
            touch = true;
          } 
    else {
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
}

function genShape(xc, newc) {
  if(newc)
  { 
    xc = Math.floor(Math.random()*(canvasWidth - 0.2*canvasWidth));
    newc = false;
  }

  return [xc, yc, newc]
}