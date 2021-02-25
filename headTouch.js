// global vars
let newc = true;
let xc,yc;
let touch = false;
let frame = 0;
let fill;
let s = true;
let start = new Audio('Audio files/Instructions/Great-Lets start.mp3');
let bump = new Audio('Audio files/Instructions/Gamebump.mp3');

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

    if(s) {
        start.play()
        s = false;
      }
 
    // fix head point everytime on reset
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
    fill = "#e68214"; 
    
    let xcc =  xc/canvasWidth;
    let ycc = yc/canvasHeight;
    
    let head = poses[33];
  
    if(head.x > xcc && head.y > ycc && head.x < xcc + 0.18 && head.y < ycc + 0.05) {
        bump.play();
        frame = 0;
        count++;
        play(count);
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


function play(count) {
  let one = new Audio('Audio files/Count/1.mp3');
  let two = new Audio('Audio files/Count/2.mp3');
  let three = new Audio('Audio files/Count/3.mp3');
  let great = [
      new Audio('Audio files/Motivation/come on.mp3'),
      new Audio('Audio files/Motivation/Good Work.mp3'),
      new Audio('Audio files/Motivation/Great Going.mp3'),
      new Audio('Audio files/Motivation/Keep breathing.mp3'),
      new Audio('Audio files/Motivation/Keep Going.mp3'),
      new Audio('Audio files/Motivation/Keep Pushing.mp3'),
      new Audio('Audio files/Motivation/Very Good.mp3'),
      new Audio('Audio files/Motivation/Very nice.Keep going.mp3'),
      new Audio('Audio files/Motivation/Very Nice.mp3'),
      new Audio('Audio files/Motivation/you are doing good.mp3'),
  ]
  if(count == 1) {
      one.play();
  } else if (count == 2) {
      two.play();
  } else if (count == 3) {
      three.play();
  } else if(count % 6 == 0) {
      great[Math.floor(Math.random()*great.length)].play();
  } 
}  
