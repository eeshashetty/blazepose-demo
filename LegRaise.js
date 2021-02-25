let xc,yc,xcr,xcl;
let radius = 38;
let raise = false;
let up = false;
let upc = 0;
let wait = 0;
let start = new Audio('Audio files/Instructions/Great-Lets start.mp3');
let bump = new Audio('Audio files/Instructions/Gamebump.mp3');
let s = true;

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;
   
    if(s) {
      start.play()
      s = false;
    }

    let color = up?"white":"#ff0000";
    
    // draw keypoints only for ankles
    drawLandmarks(
        ctx1, [poses[31], poses[32]],
        {color: '#e68214', fillColor: '#e68214', lineWidth: 4, radius: 15});

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
    ctx1.globalAlpha = 0.8;
    ctx1.fillStyle = raise?'#00ff00':'#e68214'; // #e68214 if not kicked, green once kicked
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
            
                bump.play();
                count++;
                play(count);
                console.log("kick");
                upc = 0;
            }
            
        } 
        
}


function play(count) {
    let one = new Audio('Audio files/Count/1.mp3');
    let two = new Audio('Audio files/Count/2.mp3');
    let three = new Audio('Audio files/Count/3.mp3');
    let great = [
        new Audio('Audio files/Motivation/come on.mp3'),
        new Audio('Audio files/Motivation/Good Work.mp3'),
        new Audio('Audio files/Motivation/Great Going.mp3'),
        new Audio('Audio files/Motivation/Keep breathing.mp3'),
        new Audio('Audio files/Motivation/Keep Going.mp3'),
        new Audio('Audio files/Motivation/Keep Pushing.mp3'),
        new Audio('Audio files/Motivation/Very Good.mp3'),
        new Audio('Audio files/Motivation/Very nice.Keep going.mp3'),
        new Audio('Audio files/Motivation/Very Nice.mp3'),
        new Audio('Audio files/Motivation/you are doing good.mp3'),
    ]
    if(count == 1) {
        one.play();
    } else if (count == 2) {
        two.play();
    } else if (count == 3) {
        three.play();
    } else if(count % 6 == 0) {
        great[Math.floor(Math.random()*great.length)].play();
    } 
}  
