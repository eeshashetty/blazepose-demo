let xcr,yc,xcl,xr,xl,sl,sr,y;
let kickr = false;
let kickl = false;
let radius = 30;
let wait = 0;
let up = false;
let upc = 0;
let showr = true;
let showl = true;
let newc = true;

function Exercise(results) {
    let poses = results.poseLandmarks;

    if(upc==0){
        // fix x coordinate as the distance of difference between both shoudlers from each shoulder
        xr = (2*poses[12].x - poses[11].x);
        xl = (2*poses[11].x - poses[12].x);

        sl = 0.9*poses[11].x;
        sr = 1.1*poses[12].x;

        // y coordinate is that of shoulder
        y = poses[12].y;

        upc++;
    }

    let a = genShape(xr, xl, sr, sl, y, newc);
    xcr = a[0];
    xcl = a[1];
    yc = a[2];
    newc = a[3];

    console.log(xcr,xcl,yc,newc);
    
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
            wait++;
            if(wait>2) {
                showl = false;
                wait = 0;
            }
        }

        if(distl <= Math.pow(radius/canvasHeight, 2)){
            kickr = true; // trigger kick to change blue circle to green
            wait++;
            if(wait>2) {
                showr = false;
                wait = 0;
            }
        }

        // if both circles are punched, one punch squat
        if(kickl && kickr) {
            // wait counter is done so that the green color can be seen for a few extra frames
            wait++;
            if(wait>5){
            kickl = false; // reset
            kickr = false; // reset
            count++;
            upc = 0;
            wait = 0;
            showl = true;
            showr = true;
            newc = true;
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

function genShape(xr, xl, sr, sl, y, newc) {
    
    if(newc)
    { 
        xcr = Math.floor((sr + Math.random()*(xr-sr)) * canvasWidth)
        xcl = Math.floor((xl - Math.random()*(sl-xl)) * canvasWidth)
        
        yc = Math.floor((0.15 + Math.random()*(1.5*y - 0.15)) * canvasHeight);
        
        newc = false;
    }

    return [xcr, xcl, yc, newc]
  
}