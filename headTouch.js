// global vars
let newc = true;
let xc,yc;
let touch = false;
let frame = 0;
let fill;

// Head Collision Game
function Exercise(results) {
    let poses = results.poseLandmarks;
    
    if(frame == 0)
    {
      yc = (2*poses[33].y - poses[0].y);
      if(yc<0.05)
        yc = 0.05;

      yc = yc*canvasHeight;
      frame++;
    }
    
    let a = genShape(xc, newc);
    xc = a[0];
    yc = a[1];
    newc = a[2];
    
    ctx1.beginPath();
    
    ctx1.rect(xc,yc, 0.18*canvasWidth, 0.05*canvasHeight);
    fill = "yellow"; 
    
    let xcc =  xc/canvasWidth;
    let ycc = yc/canvasHeight;
    
    let head = poses[33];
  
    if(head.x > xcc && head.y > ycc && head.x < xcc + 0.18 && head.y < ycc + 0.05) {
        frame = 0;
        count++;
        newc = true;
        fill = "#00ff00"; 
    }

    ctx1.fillStyle = fill;
    ctx1.fill();
    ctx1.closePath();

}

function genShape(xc, newc) {
  if(newc)
  { 
    xc = Math.floor(Math.random()*(canvasWidth - 0.2*canvasWidth));
    newc = false;
  }

  return [xc, yc, newc]
}