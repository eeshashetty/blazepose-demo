// global vars
let down = false;
let up = false;
let xc, yc, xcl, xcr;
let upc = 0;
let kick = false;
let radius = 35;
let progress = true;
let color;
let stroke, fill;
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
    
    if(upc == 0) {
        yc = 1.1*(poses[23].y)*canvasHeight;
        let diff = 5*Math.abs(poses[24].x - poses[23].x);
        // take distance between knee and heel
        xcl = poses[23].x - diff;
        xcr = poses[24].x + diff;  
        

        upc++;
        
    }
    
    // generate circle for kick if in squat
    if(down)
    {   
        // generate circle on alternate sides
        xc = (count%2 == 0)? xcr : xcl;
        xc = xc*canvasWidth;

        ctx1.beginPath();
        ctx1.arc(xc, yc, radius, 0, 2 * Math.PI);
        stroke = "black";
        fill = "yellow";
        
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
                bump.play();
                count++;       
                play(count);  
                down = false;
                stroke = "#00ff00";
                fill = "#00ff00";
            }
        }

   

        ctx1.lineWidth = 8;
        ctx1.strokeStyle = stroke;
        ctx1.stroke();
        ctx1.globalAlpha = 0.6;
        ctx1.fillStyle = fill; // yellow if not kicked, green once kicked
        ctx1.fill();
        ctx1.closePath();


        // draw keypoints only for ankles
        drawLandmarks(
            ctx1, [poses[31], poses[32]],
            {color: 'yellow', fillColor: 'yellow', lineWidth: 4, radius: 15});
    } 
    
    // check squat
    let res = checkSquat(poses);
    up = (res[0] == undefined)?up:res[0];
    down = (res[1] == undefined)?down:res[1];
    progress = (res[2] == undefined)?down:res[2];
    let color = progress?"red":(up?"white":(down?"#00ff00":"red"));

    // draw keypoints
    draw(color, ctx1, poses);

    ctx2.beginPath();
    ctx2.rect(0.65*canvasWidth,0.27*canvasHeight, 0.2*canvasWidth, 0.35*canvasHeight);
    ctx2.globalAlpha = 0.6;
    ctx2.fillStyle = "black";
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.globalAlpha = down?1:0.1;
    ctx2.font = Math.floor((canvasWidth*25)/720) + "px Arial";
    ctx2.fillStyle = down?"yellow":"black";
    ctx2.fillText("KICK", 0.71*canvasWidth, 0.4*canvasHeight);
    ctx2.closePath();

    ctx2.font = Math.floor((canvasWidth*25)/720) + "px Arial";
    ctx2.globalAlpha = down?0.1:1;
    ctx2.fillStyle = down?"black":"yellow";
    ctx2.fillText("SQUAT", 0.71*canvasWidth, 0.5*canvasHeight);
    
           
}