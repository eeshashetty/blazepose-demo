// global vars
let down = false;
let up = false;
let xc, yc;
let upc = 0;
let touch = false;
let progress = true;
let color;

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;
    
    if(upc == 0) {
        xc = poses[33].x*canvasWidth;
        upc++;
    }

    yc = 0.9;
  
    // generate rectangle for jump if in squat
    if(down)
    {   
        // x and y coordinates are set in checkSquat() - line 
        
        ctx1.rect(xc,yc, 0.18*canvasWidth, 0.05*canvasHeight);
        ctx1.fillStyle = touch?"#00ff00":'yellow';
        ctx1.fill();

        // Blazepose returns coordinates in a scale of 0 -1, so reduce rectangle coordinates to a scale of 0 to 1 as well
        let xcc =  xc/canvasWidth;
        let ycc = yc/canvasHeight;
        
        // fetch head points
        let head = poses[33];
        
        // check if head collision occurs
        // point is inside rectangle if x > x1 and y > y1 and x < x2 and y < y2 (x1,y1 are top left coordinates - x2,y2 are bottom right coordinates)
        if(head.x > xcc && head.y > ycc && head.x < xcc + 0.18 && head.y < ycc + 0.05) {
            touch = true;
        } else {
            if(touch) {
                count++;
                touch = false;
                down = false;
                upc = 0;
            } else {
                touch = false;
            }
        }

    } 
    // check squat
    let res = checkSquat(poses);
    up = (res[0] == undefined)?up:res[0];
    down = (res[1] == undefined)?down:res[1];
    progress = (res[2] == undefined)?down:res[2];
    
    // draw keypoints
    color = progress?"red":(up?"white":(down?"#00ff00":"red"));
    draw(color, ctx1, poses);
    

}