let xcr,yc,xcl,xr,xl,sl,sr,y;
let kickr = false;
let kickl = false;
let radius = 38;
let wait = 0;
let up = false;
let upc = 0;
let showr = true;
let showl = true;
let newc = true;
let stroke, fill;
let red = true;
let s = true;
let bump = new Audio('audio/Gamebump.mp3');
let start = new Audio('audio/start.mp3');

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

    if(s) {
        start.play()
        s = false;
      }

    if(upc==0 || !showl && !showr){
        
        // fix x coordinate as the distance of difference between both shoudlers from each shoulder
        xc = (poses[12].x + poses[11].x)/2
        xcr = 0.7*xc*canvasWidth;
        xcl = 1.3*xc*canvasWidth;
        
        sl = 0.9*poses[11].x;
        sr = 1.1*poses[12].x;

        // y coordinate is that of shoulder
        yc = poses[12].y*canvasHeight;

        showl = true;
        showr = true;

        upc++;
    }

    // let a = genShape(xr, xl, sr, sl, y, newc);
    // xcr = a[0];
    // xcl = a[1];
    // yc = a[2];
    // newc = a[3];

    // console.log(xcr,xcl,yc,newc);
    
    // generate circles for punch if in squat
    // create circle on both sides
    if(showl){

        ctx1.beginPath();
        ctx1.arc(xcr, yc, radius, 0, 2 * Math.PI);
        stroke = "black";
        fill = "red";
        if(red && (poses[19].visibility > 0.9 || poses[20].visibility > 0.9)) {    
            let xcc =  xcr/canvasWidth;
            let ycc = yc/canvasHeight;
            let distr = Math.pow((xcc-poses[19].x),2) + Math.pow((ycc-poses[19].y),2); // distance of right hand from left circle
            
            if(distr <= Math.pow(radius/canvasHeight, 2)) {
                bump.play();
                count++;
                play(count);
                stroke = '#00ff00';
                fill = '#00ff00';
                showl = false;
                red = false;
            }
        
        }

        ctx1.lineWidth = 8;
        ctx1.strokeStyle = stroke;
        ctx1.stroke();
        ctx1.globalAlpha = 0.6;       
        ctx1.fillStyle = fill;
        ctx1.fill();
        ctx1.closePath();
    }
        
    if(showr){

        ctx1.beginPath();
        ctx1.arc(xcl, yc, radius, 0, 2 * Math.PI);
        stroke = "black";
        fill = "#4a73ef";
        
        if(!red && (poses[19].visibility > 0.9 || poses[20].visibility > 0.9)) {    
            let xcc =  xcl/canvasWidth;
            let ycc = yc/canvasHeight;
            let dist = Math.pow((xcc-poses[20].x),2) + Math.pow((ycc-poses[20].y),2); // distance of left hand from right circle
            
            if(dist <= Math.pow(radius/canvasHeight, 2)) {
                bump.play();
                count++;
                stroke = '#00ff00';
                fill = '#00ff00';
                showr = false;
                red = true;
            }
        }

        ctx1.lineWidth = 8;
        ctx1.strokeStyle = stroke;
        ctx1.stroke();
        ctx1.globalAlpha = 0.6;       
        ctx1.fillStyle = fill;
        ctx1.fill();
        ctx1.closePath();
    }


    // draw keypoints for both hands
    drawLandmarks(
    ctx1, [poses[20]],
    {color: '#4a73ef', fillColor: '#4a73ef', lineWidth: 4, radius: 15});

    drawLandmarks(
        ctx1, [poses[19]],
        {color: 'red', fillColor: 'red', lineWidth: 4, radius: 15});
    
    ctx2.beginPath();
    ctx2.rect(0.75*canvasWidth,0.27*canvasHeight, 0.2*canvasWidth, 0.35*canvasHeight);
    ctx2.globalAlpha = 0.6;
    ctx2.fillStyle = "black";
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.globalAlpha = red?1:0.1;
    ctx2.font = Math.floor((canvasWidth*22)/720) + "px Arial";
    ctx2.fillStyle = red?"red":"black";
    ctx2.fillText("RED", 0.81*canvasWidth, 0.4*canvasHeight);
    ctx2.closePath();

    ctx2.font = Math.floor((canvasWidth*22)/720) + "px Arial";
    ctx2.globalAlpha = red?0.1:1;
    ctx2.fillStyle = red?"black":"#4a73ef";
    ctx2.fillText("BLUE", 0.81*canvasWidth, 0.5*canvasHeight);
    

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