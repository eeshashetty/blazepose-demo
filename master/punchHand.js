let xcr,yc,xcl;
let kickr = false;
let kickl = false;
let radius = 30;
let wait = 0;
let up = false;
let upc = 0;
let showr = true;
let showl = true;

function Exercise(results) {
    let poses = results.poseLandmarks;

    if(upc==0){
        // fix x coordinate as the distance of difference between both shoudlers from each shoulder
        xcr = (2*poses[12].x - poses[11].x)*canvasWidth;
        xcl = (2*poses[11].x - poses[12].x)*canvasWidth;
        
        // y coordinate is that of shoulder
        yc = poses[12].y*canvasHeight;

        upc++;
    }


    ctx1.font = "30px Arial";
    ctx1.fillStyle = "blue";
    ctx1.textAlign = "center";
    ctx1.fillText("Punches = " + count, canvasWidth/2, canvasHeight*3/40);
    
    // generate circles for punch if in squat
    // create circle on both sides
    if(showl){
        ctx1.beginPath();
        ctx1.globalAlpha = 0.6;
        ctx1.arc(xcr, yc, radius, 0, 2 * Math.PI);
        ctx1.fillStyle = kickl?'#00ff00':'red';
        ctx1.fill();
        ctx1.closePath();
    }
    if(showr){
        ctx1.beginPath();
        ctx1.globalAlpha = 0.6;
        ctx1.arc(xcl, yc, radius, 0, 2 * Math.PI);
        ctx1.fillStyle = kickr?'#00ff00':'blue';
        ctx1.fill();
        ctx1.closePath();
}

    // check if hand collides with circle
    // check for hand visibility
    if(poses[19].visibility > 0.9 || poses[20].visibility > 0.9) {    
        let xcc =  xcr/canvasWidth;
        let xcd = xcl/canvasWidth;
        let ycc = yc/canvasHeight;
        let distr = Math.pow((xcc-poses[19].x),2) + Math.pow((ycc-poses[19].y),2); // distance of right hand from left circle
        let distl = Math.pow((xcd-poses[20].x),2) + Math.pow((ycc-poses[20].y),2); // distance of left hand from right circle
        
        if(distr <= Math.pow(radius/canvasHeight, 2)) {
            kickl = true; // trigger kick to change red circle to green
            showl = false;
        }

        if(distl <= Math.pow(radius/canvasHeight, 2)){
            kickr = true; // trigger kick to change blue circle to green
            showr = false;
        }

        // if both circles are punched, one punch squat
        if(kickl && kickr) {
            // wait counter is done so that the green color can be seen for a few extra frames
            wait++;
            if(wait>10){
            kickl = false; // reset
            kickr = false; // reset
            count++;
            upc = 0;
            showl = true;
            showr = true;
        }
        }  
    }

    // draw keypoints for both hands
    drawLandmarks(
    ctx1, [poses[20]],
    {color: 'blue', fillColor: 'blue', lineWidth: 4, radius: 20});

    drawLandmarks(
        ctx1, [poses[19]],
        {color: 'red', fillColor: 'red', lineWidth: 4, radius: 20});
    
}

