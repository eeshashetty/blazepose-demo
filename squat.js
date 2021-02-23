// global vars
let down = false;
let up = false;
let progress = true;
let a = 0;
let b = 0;
let s = true;
let start = new Audio('audio/start.mp3');

// count squats 
function Exercise(results) {
    let poses = results.poseLandmarks;    
    
    if(s) {
        start.play()
        s = false;
    }

    // one squat occurs when person goes in squat position and stands up after - hence up and down are both true
    if(up && down)
    {   
        count++;
        play(count);
        up = false; // reset
        down = false; // reset
    } 
        
    let color = progress?"red":(up?"white":(down?"#00ff00":"red"));
    // draw keypoints
    draw(color, ctx1, poses);

    // check if in squat
    let res = checkSquat(poses);
    up = (res[0] == undefined)?up:res[0];
    down = (res[1] == undefined)?down:res[1];
    progress = (res[2] == undefined)?down:res[2];
    a = (res[3] == undefined)?down:res[3];
    b = (res[4] == undefined)?down:res[4];

    ctx2.beginPath();
    ctx2.rect(0.65*canvasWidth, 0.2*canvasHeight, 0.2*canvasWidth, 0.5*canvasHeight);
    ctx2.globalAlpha = 0.6;
    ctx2.fillStyle = "black";
    ctx2.fill();
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.globalAlpha = up?0.1:1;;
    ctx2.font = Math.floor((canvasWidth*24)/720) + "px Arial";
    ctx2.fillStyle = up?"black":"yellow";
    ctx2.fillText("⤊", 0.73*canvasWidth, 0.3*canvasHeight);
    ctx2.font = Math.floor((canvasWidth*18)/720) + "px Arial";
    ctx2.fillText("UP", 0.71*canvasWidth, 0.4*canvasHeight);
    ctx2.closePath();

    ctx2.font = Math.floor((canvasWidth*18)/720) + "px Arial";
    ctx2.globalAlpha = up?1:0.1;
    ctx2.fillStyle = up?"black":"yellow";
    ctx2.fillText("SQUAT", 0.71*canvasWidth, 0.5*canvasHeight);
    ctx2.font = Math.floor((canvasWidth*24)/720) + "px Arial";
    ctx2.fillText("⤋", 0.73*canvasWidth, 0.62*canvasHeight);

    
}