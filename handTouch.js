// global vars
let newc = true;
let xc,yc;
let radius = 38;
let touch = false;
let stroke, fill;

function Exercise(results) {
    let poses = results.poseLandmarks;

    let a = genShape(count, xc, yc, newc);
    xc = a[0];
    yc = a[1];
    newc = a[2];
    

    ctx1.beginPath();
    ctx1.arc(xc, yc, radius, 0, 2 * Math.PI);
    stroke = "black";
    fill = "yellow";
    
    let l = 19;
    let r = 20;
    
    // draw keypoints
    drawLandmarks(
    ctx1, [poses[l], poses[r]],
    {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 20});
    
    // check if hand/leg collides with circle
    if(poses[l].visibility > 0.9 || poses[r].visibility > 0.9) {    
        let xcc =  xc/canvasWidth;
        let ycc = yc/canvasHeight;
        let distr = Math.pow((xcc-poses[l].x),2) + Math.pow((ycc-poses[l].y),2);
        let distl = Math.pow((xcc-poses[r].x),2) + Math.pow((ycc-poses[r].y),2);
        
        if(distl <= Math.pow(radius/canvasHeight, 2) || distr <= Math.pow(radius/canvasHeight, 2)) {
            stroke = "#00ff00";
            fill = "#00ff00";
            newc = true;
            count++;
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

function genShape(count, xc, yc, newc) {
    
    if(newc)
    { 
        if(count%2 == 0)
            xc = Math.floor((0.1 + Math.random()*0.05) * canvasWidth)
        else
            xc = Math.floor((0.9 - Math.random()*0.05) * canvasWidth)
        
        yc = Math.floor((0.3 + Math.random()*0.4) * canvasHeight);
        
        newc = false;
    }

    return [xc, yc, newc]
  
}