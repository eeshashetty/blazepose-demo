// global vars
let down = false;
let up = false;
let xc, yc;
let upc = 0;
let downc = 0;
let touch = false;
let progress = true;
let color;

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

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
                count++;
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
    

    ctx2.beginPath();
    ctx2.rect(0.85*canvasWidth,0.3*canvasHeight, 0.15*canvasWidth, 0.4*canvasHeight);
    ctx2.globalAlpha = 0.6;
    ctx2.fillStyle = "black";
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.globalAlpha = 1;
    ctx2.font = Math.floor((canvasWidth*25)/720) + "px Arial";
    ctx2.fillStyle = down?"yellow":"gray";
    ctx2.fillText("Jump", 0.88*canvasWidth, 0.45*canvasHeight);
    ctx2.closePath();

    ctx2.font = Math.floor((canvasWidth*25)/720) + "px Arial";
    ctx2.fillStyle = down?"gray":"yellow";
    ctx2.fillText("Squat", 0.88*canvasWidth, 0.55*canvasHeight);


    draw(color, ctx1, poses);
    


}