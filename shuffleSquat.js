// global vars
let down = false;
let up = false;
let color = "red";
let xc, yc, xcr, xcl, xd;
let radius = 35;
let upc = 0;
let wait = 0;
let first = true;
let stroke;
let in_box = false;
count++;
up = false; // reset
down = false; // reset
let s = true;
let start = new Audio('Audio files/Instructions/Great-Lets start.mp3');

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

    if(s) {
        start.play()
        s = false;
      }

    let xcc, ycc;

    // draw keypoints
    draw(color, ctx1, poses);

    stroke = "yellow";
    // generate box area on alternate sides on alternate counts
    if (count % 2 == 0) {
        xcc = 0.2;
        ycc = 0.15;

        ctx1.beginPath();
        ctx1.font = Math.floor((canvasWidth*30)/720) + "px Arial";
        ctx1.fillText("↓", 0.3*canvasWidth, 0.14*canvasHeight)
        ctx1.rect(0.22 * canvasWidth, 0.05 * canvasHeight, 0.2*canvasWidth, 0.06 * canvasHeight);
        ctx1.globalAlpha = 0.6;
        ctx1.fillStyle = "black";
        ctx1.fill();
        ctx1.font = Math.floor((canvasWidth*18)/720) + "px Arial";
        ctx1.globalAlpha = 1;
        ctx1.fillStyle = "yellow";
        ctx1.fillText("Squat Here", 0.25*canvasWidth, 0.095*canvasHeight)
        ctx1.closePath();

        ctx1.beginPath();
        ctx1.rect(xcc * canvasWidth, ycc * canvasHeight, 0.24*canvasWidth, 0.64 * canvasHeight);

    } else {
        xcc = 0.56;
        ycc = 0.15;

        ctx1.beginPath();
        ctx1.font = Math.floor((canvasWidth*30)/720) + "px Arial";
        ctx1.fillText("↓", 0.66*canvasWidth, 0.14*canvasHeight)
        ctx1.rect(0.58 * canvasWidth, 0.05 * canvasHeight, 0.2*canvasWidth, 0.06 * canvasHeight);
        ctx1.globalAlpha = 0.6;
        ctx1.fillStyle = "black";    
        ctx1.fill();
        ctx1.font = Math.floor((canvasWidth*18)/720) + "px Arial";
        ctx1.globalAlpha = 1;
        ctx1.fillStyle = "yellow";
        ctx1.fillText("Squat Here", 0.61*canvasWidth, 0.095*canvasHeight)
        ctx1.closePath();

        ctx1.beginPath();
        ctx1.rect(xcc * canvasWidth, ycc * canvasHeight, 0.24*canvasWidth, 0.64 * canvasHeight);
        
    }


    // fetch hip points
    let hip = poses[34];

    // check if person is standing inside the box
    if (hip.x > xcc && hip.y > ycc && hip.x < xcc + 0.25 && hip.y < ycc + 0.84) {
        in_box = true;
        // check squat
        let res = checkSquat(poses);
        up = (res[0] == undefined) ? up : res[0];
        down = (res[1] == undefined) ? down : res[1];
        progress = (res[2] == undefined) ? down : res[2];
        color = progress ? "white" : (up ? "white" : (down ? "#00ff00" : "red"));

        // count one squat if person squatted and stood up
        if (down) {   // wait incrementer so that color can be seen for a few frames
            stroke = "#00ff00";
            count++;
            play(count);
            up = false; // reset
            down = false; // reset
        }
    } else {
        in_box = false;
        color = "red";
    }


    if(!in_box) {
        let arr = new Image();
        arr.src = "Arrow icons/bi-arrow.png";
        let w = (canvasWidth*160)/720;
        let h = (canvasHeight*100)/480;

        ctx1.font = Math.floor((canvasWidth*40)/720) + "px Arial";
        ctx1.drawImage(arr, 0.37*canvasWidth, 0.5*canvasHeight, w, h)
        
    }

    ctx1.strokeStyle = stroke;
    ctx1.lineWidth = "5";
    ctx1.stroke();
    ctx1.closePath();

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
    } else if(count % 3 == 0) {
        great[Math.floor(Math.random()*great.length)].play();
    } 
}  
