// global vars
let newc = true;
let xc,yc;
let radius = 38;
let hip, ankle;
let upc = 0;
let touch = false;
let stroke, fill;
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

    if(upc == 0) {
        hip = poses[24].y;
        ankle = poses[28].y;
        upc++;
    }

    let a = genShape(count, xc, yc, newc, hip, ankle);
    xc = a[0];
    yc = a[1];
    newc = a[2];
    
    ctx1.beginPath();
    ctx1.arc(xc, yc, radius, 0, 2 * Math.PI);
    stroke = "black";
    fill = "yellow";

    let l = 31;
    let r = 32;
    
    // draw keypoints
    drawLandmarks(
    ctx1, [poses[l], poses[r]],
    {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 15});
    
    // check if hand/leg collides with circle
    if(poses[l].visibility > 0.9 || poses[r].visibility > 0.9) {    
        let xcc =  xc/canvasWidth;
        let ycc = yc/canvasHeight;
        let distr = Math.pow((xcc-poses[l].x),2) + Math.pow((ycc-poses[l].y),2);
        let distl = Math.pow((xcc-poses[r].x),2) + Math.pow((ycc-poses[r].y),2);
        
        if(distl <= Math.pow(radius/canvasHeight, 2) || distr <= Math.pow(radius/canvasHeight, 2)) {
            bump.play();
            count++;
            play(count);
            stroke = "#00ff00";
            fill = "#00ff00";
            newc = true;
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

function genShape(count, xc, yc, newc, hip, ankle) {
    
    if(newc)
    { 
        if(count%2 == 0)
            xc = Math.floor((0.1 + Math.random()*0.05) * canvasWidth);
        else
            xc = Math.floor((0.9 - Math.random()*0.05) * canvasWidth);
        
        yc = Math.floor((hip + Math.random()*(ankle-hip)) * canvasHeight); 
          
        newc = false;
    }  

    return [xc, yc, newc]
}