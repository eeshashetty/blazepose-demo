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

// squat+jump
function Exercise(results) {

    let poses = results.poseLandmarks;

    let xcc, ycc;

    // draw keypoints
    draw(color, ctx1, poses);

    stroke = "yellow";
    // generate box area on alternate sides on alternate counts
    if (count % 2 == 0) {
        xcc = 0.25;
        ycc = 0.09;

        ctx1.beginPath();
        ctx1.rect(xcc * canvasWidth, ycc * canvasHeight, 0.19*canvasWidth, 0.84 * canvasHeight);
        
    } else {
        xcc = 0.56;
        ycc = 0.09;

        ctx1.beginPath();
        ctx1.rect(xcc * canvasWidth, ycc * canvasHeight, 0.19*canvasWidth, 0.84 * canvasHeight);
        
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
        if (up && down) {   // wait incrementer so that color can be seen for a few frames
            stroke = "#00ff00";
            count++;
            up = false; // reset
            down = false; // reset
        }
    } else {
        in_box = false;
        color = "red";
    }

    ctx1.strokeStyle = stroke;
    ctx1.lineWidth = "8";
    ctx1.stroke();
    ctx1.closePath();


    ctx2.beginPath();
    ctx2.rect(0.85*canvasWidth,0.3*canvasHeight, 0.15*canvasWidth, 0.4*canvasHeight);
    ctx2.globalAlpha = 0.6;
    ctx2.fillStyle = "black";
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.globalAlpha = 1;
    ctx2.font = Math.floor((canvasWidth*25)/720) + "px Arial";
    ctx2.fillStyle = in_box?"yellow":"gray";
    ctx2.fillText("Squat", 0.88*canvasWidth, 0.45*canvasHeight);
    ctx2.closePath();

    ctx2.font = Math.floor((canvasWidth*25)/720) + "px Arial";
    ctx2.fillStyle = in_box?"gray":"yellow";
    ctx2.fillText("Shuffle", 0.88*canvasWidth, 0.55*canvasHeight);


} 