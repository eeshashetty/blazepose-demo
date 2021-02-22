let xc,yc,xcr,xcl;
let radius = 38;
let raise = false;
let up = false;
let upc = 0;
let wait = 0;

function Exercise(results) {
      
    let poses = results.poseLandmarks;

    let color = up?"white":"#ff0000";
    
    // draw keypoints only for ankles
    drawLandmarks(
        ctx1, [poses[31], poses[32]],
        {color: 'yellow', fillColor: 'yellow', lineWidth: 4, radius: 20});

    if(upc == 0) {
        yc = 1.3*(poses[23].y)*canvasHeight;
        let diff = Math.abs(5*(poses[24].x - poses[23].x));
        // take distance between knee and heel
        xcl = poses[23].x - diff;
        xcr = poses[24].x + diff;  
        
        upc++;
    }

     
    // generate circle on alternate sides
    xc = (count%2==0)? xcr : xcl;
    xc = xc*canvasWidth;

    ctx1.beginPath();
    ctx1.arc(xc, yc, radius, 0, 2 * Math.PI);
    ctx1.lineWidth = 8;
    ctx1.strokeStyle = raise?'#00ff00':'black';
    ctx1.stroke();
    ctx1.globalAlpha = 0.6;
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