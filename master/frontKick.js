// global vars
let down = false;
let up = false;
let xc, yc, xcl, xcr;
let upc = 0;
let kick = false;
let radius = 50;
let progress = true;
// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;
    if(upc == 0) {
        // take 20% of distance from the hip
        xcl = (0.8*poses[23].x);
        xcr = (poses[24].x + 0.2*poses[23].x);

        // y coordinate is y coordinate of hip
        yc = 1.1*poses[23].y*canvasHeight;

        upc++;
    }

    // generate circle for kick if in squat
    if(down)
    {   
        // generate circle on alternate sides
        xc = (count%2 == 0)? xcr : xcl;
        xc = xc*canvasWidth;

        ctx1.beginPath();
        ctx1.globalAlpha = 0.6;
        ctx1.arc(xc, yc, radius, 0, 2 * Math.PI);
        ctx1.fillStyle = kick?'#00ff00':'yellow'; // yellow if not kicked, green once kicked
        ctx1.fill();
        ctx1.closePath();

        // check if leg collides with circle
        // first - check if ankles are visible
        if(poses[31].visibility > 0.9 || poses[32].visibility > 0.9) {    
            // reduce circle coords to a scale of 0 to 1 for blazepose
            let xcc =  xc/canvasWidth;
            let ycc = yc/canvasHeight;

            let distr = Math.pow((xcc-poses[31].x),2) + Math.pow((ycc-poses[31].y),2); // check distance of right ankle from circle
            let distl = Math.pow((xcc-poses[32].x),2) + Math.pow((ycc-poses[32].y),2); // check distance of left ankle from circle
            
            // a point (x1,y1) is inside a circle if (x-x1)^2 + (y-y1)^2 <= radius^2
            let dist = (count%2==0) ? distr : distl;

            if(dist <= Math.pow(radius/canvasHeight, 2)) {
                kick = true; // trigger kick as true for green circle
            } else if(dist <= Math.pow(2*radius/canvasHeight, 2)){
                if(kick) {
                    count++;
                    down = false; // reset squat
                    kick = false;
                    upc = 0;
                }
            }
          } else {
              kick = false;
          }

        // draw keypoints only for ankles
        drawLandmarks(
            ctx1, [poses[31], poses[32]],
            {color: 'yellow', fillColor: 'yellow', lineWidth: 4, radius: 20});
    } 
    
    // check squat
    let res = checkSquat(poses);
    up = (res[0] == undefined)?up:res[0];
    down = (res[1] == undefined)?down:res[1];
    progress = (res[2] == undefined)?down:res[2];
    let color = progress?"red":(up?"white":(down?"#00ff00":"red"));

    // draw keypoints
    draw(color, ctx1, poses);
        
    
}