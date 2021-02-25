// global vars
let down = false;
let up = false;
let xc, yc;
let upc = 0;
let downc = 0;
let touch = false;
let progress = true;
let color;
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

    if(upc == 0) {
      yc = (2*poses[33].y - poses[0].y);
      if(yc<0.05)
        yc = 0.05;

      yc = yc*canvasHeight;
      upc++;
    }

    // generate rectangle for jump if in squat
    if(down)
    {   
        // x and y coordinates are set in checkSquat() - line 
        if(downc == 0)
        {
            xc = poses[33].x*canvasWidth;
            xc = xc - (0.09*canvasWidth);
            downc++;
        }

        ctx1.rect(xc ,yc, 0.18*canvasWidth, 0.05*canvasHeight);
        fill = "yellow";

        // Blazepose returns coordinates in a scale of 0 -1, so reduce rectangle coordinates to a scale of 0 to 1 as well
        let xcc =  xc/canvasWidth;
        let ycc = yc/canvasHeight;
        
        // fetch head points
        let head = poses[33];
        
        // check if head collision occurs
        // point is inside rectangle if x > x1 and y > y1 and x < x2 and y < y2 (x1,y1 are top left coordinates - x2,y2 are bottom right coordinates)
        if(head.x > xcc && head.y > ycc && head.x < xcc + 0.18 && head.y < ycc + 0.05) {
                bump.play();
                count++;
                play(count);
                down = false;
                upc = 0;
                downc = 0;
                fill = "#00ff00";
        }
        ctx1.fillStyle = fill;
        ctx1.fill();


    } 
    // check squat
    let res = checkSquat(poses);
    up = (res[0] == undefined)?up:res[0];
    down = (res[1] == undefined)?down:res[1];
    progress = (res[2] == undefined)?down:res[2];
    
    // draw keypoints
    color = progress?"red":(up?"white":(down?"#00ff00":"red"));
    
   
    let arru = new Image();
    arru.src = "Arrow icons/Arrow 8-up.png"
    let size = (canvasWidth*80)/720;
    
    ctx2.beginPath();
    ctx2.globalAlpha = down?1:0.1;;
    ctx2.fillStyle = down?"#FFC107":"black";
    ctx2.drawImage(arru, 0.77*canvasWidth, 0.13*canvasHeight, size,size);
    
    ctx2.font = Math.floor((canvasWidth*40)/720) + "px Algerian";
    ctx2.fillText("JUMP", 0.74*canvasWidth, 0.4*canvasHeight);
    ctx2.closePath();

    let arrd = new Image();
    arrd.src = "Arrow icons/Arrow 8-down.png"
    
    ctx2.font = Math.floor((canvasWidth*40)/720) + "px Algerian";
    ctx2.globalAlpha = down?0.1:1;
    ctx2.fillStyle = down?"black":"#FFC107";
    ctx2.fillText("SQUAT", 0.74*canvasWidth, 0.53*canvasHeight);
    ctx2.drawImage(arrd, 0.77*canvasWidth, 0.54*canvasHeight, size, size);


    draw(color, ctx1, poses);
    


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
  } else if(count % 3 == 0) {
      great[Math.floor(Math.random()*great.length)].play();
  } 
}  
