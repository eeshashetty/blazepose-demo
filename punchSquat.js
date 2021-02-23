// global vars
let down = false;
let up = false;
let progress = true;
let xcr,xcl, yc;
let upc = 0;
let color;
let kickl = false;
let kickr = false;
let wait = 0;
let radius = 38;
let showr = true;
let showl = true;
let c = 0;
let s = true;
let start = new Audio('audio/start.mp3');
let bump = new Audio('audio/Gamebump.mp3');

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

    if(s) {
        start.play()
        s = false;
      }

      if(upc == 0 || !showl & !showr) {
        // fix x coordinate as the distance of difference between both shoudlers from each shoulder
        xc = (poses[12].x + poses[11].x)/2
        xcr = 0.7*xc*canvasWidth;
        xcl = 1.3*xc*canvasWidth;
        
        // y coordinate is that of mouth
        yc = poses[12].y*canvasHeight;
        showl = true;
        showr = true;
        upc++;
    }

    // generate circles for punch if in squat
    if(down)
    {   
        if(showl){

            ctx1.beginPath();
            ctx1.arc(xcr, yc, radius, 0, 2 * Math.PI);
            stroke = "black";
            fill = "red";
            if(poses[19].visibility > 0.9 || poses[20].visibility > 0.9) {    
                let xcc =  xcr/canvasWidth;
                let ycc = yc/canvasHeight;
                let distr = Math.pow((xcc-poses[19].x),2) + Math.pow((ycc-poses[19].y),2); // distance of right hand from left circle
                
                if(distr <= Math.pow(radius/canvasHeight, 2)) {
                    c++;
                    bump.play();
                    stroke = '#00ff00';
                    fill = '#00ff00';
                    showl = false;
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
            fill = "blue";
            
            if(poses[19].visibility > 0.9 || poses[20].visibility > 0.9) {    
                let xcc =  xcl/canvasWidth;
                let ycc = yc/canvasHeight;
                let dist = Math.pow((xcc-poses[20].x),2) + Math.pow((ycc-poses[20].y),2); // distance of left hand from right circle
                
                if(dist <= Math.pow(radius/canvasHeight, 2)) {
                    c++;
                    bump.play();
                    stroke = '#00ff00';
                    fill = '#00ff00';
                    showr = false;
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
    
        if(c==2) {
            c = 0;
            down = false;
            count++;
            play(count);
        }
    
        // draw keypoints for both hands
        drawLandmarks(
        ctx1, [poses[20]],
        {color: 'blue', fillColor: 'blue', lineWidth: 4, radius: 15});
    
        drawLandmarks(
            ctx1, [poses[19]],
            {color: 'red', fillColor: 'red', lineWidth: 4, radius: 15});
         
    } 
    
    else {
        // check squat   
        let res = checkSquat(poses);
        up = (res[0] == undefined)?up:res[0];
        down = (res[1] == undefined)?down:res[1];
        progress = (res[2] == undefined)?down:res[2];
        color = progress?"red":(up?"white":(down?"#00ff00":"red"));

        // draw keypoints
        draw(color, ctx1, poses);

        }

    ctx2.beginPath();
    ctx2.rect(0.65*canvasWidth,0.27*canvasHeight, 0.2*canvasWidth, 0.35*canvasHeight);
    ctx2.globalAlpha = 0.6;
    ctx2.fillStyle = "black";
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.globalAlpha = 1;
    ctx2.font = Math.floor((canvasWidth*22)/720) + "px Arial";
    ctx2.fillStyle = down?"yellow":"gray";
    ctx2.fillText("PUNCH", 0.71*canvasWidth, 0.4*canvasHeight);
    ctx2.closePath();

    ctx2.font = Math.floor((canvasWidth*22)/720) + "px Arial";
    ctx2.fillStyle = down?"gray":"yellow";
    ctx2.fillText("SQUAT", 0.71*canvasWidth, 0.5*canvasHeight);
    
    
}