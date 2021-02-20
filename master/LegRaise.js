let xc,yc,xcr,xcl;
let radius = 30;
let raise = false;
let up = false;
let upc = 0;
let wait = 0;

function Exercise(results) {
      
    let poses = results.poseLandmarks;

    let color = up?"white":"#ff0000";
    console.log("here");
    // draw keypoints
    draw(color, ctx1, poses);

    if(upc == 0) {
        yc = 1.3*(poses[23].y)*canvasHeight;

        // take distance between knee and heel
        xcl = poses[23].x - 1.3*Math.sqrt(Math.pow(poses[25].x - poses[29].x, 2) + Math.pow(poses[25].y - poses[29].y, 2));
        xcr = poses[24].x + 1.3*Math.sqrt(Math.pow(poses[25].x - poses[29].x, 2) + Math.pow(poses[25].y - poses[29].y, 2));  
        
        upc++;
    }

    ctx1.font = "30px Arial";
    ctx1.fillStyle = "blue";
    ctx1.textAlign = "center";
    ctx1.fillText("Leg Raises = " + count, canvasWidth/2, canvasHeight*3/40);
     
        // generate circle on alternate sides
    xc = (count%2==0)? xcr : xcl;
    xc = xc*canvasWidth;

    ctx1.beginPath();
    ctx1.globalAlpha = 0.6;
    ctx1.arc(xc, yc, radius, 0, 2 * Math.PI);
    ctx1.fillStyle = raise?'#00ff00':'yellow'; // yellow if not kicked, green once kicked
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
            raise = true;
            console.log('in');
             // trigger kick as true for green circle
        } else {
            if(raise) {
                count++;
                console.log("kick");
                raise = false;
                upc = 0;
            }
            
        }
        } else {
              raise = false;
          }
        
}