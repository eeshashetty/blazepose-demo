// global vars
let down = false;
let up = false;
let progress = true;
let a = 0;
let b = 0;
let s = true;
let start = new Audio('audio/start.mp3');
let one = new Audio('audio/1.mp3');
let two = new Audio('audio/2.mp3');
let three = new Audio('audio/3.mp3');
let great = new Audio('audio/great.mp3');

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
        if(count == 1) {
            one.play();
        } else if (count == 2) {
            two.play();
        } else if (count == 3) {
            three.play();
        } else if(count%5 == 0) {
            great.play();
        }
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
    
}