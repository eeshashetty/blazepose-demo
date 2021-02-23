// global vars
let c = 0;
let down = false;
let up = false;
let progress = true;
let s = true;
let start = new Audio('audio/start.mp3');

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

    if(s) {
        start.play()
        s = false;
      }

    // check squat
    let res = checkSquat(poses);
    up = (res[0] == undefined)?up:res[0];
    down = (res[1] == undefined)?down:res[1];
    progress = (res[2] == undefined)?down:res[2];

    // skeleton color is green if in squat, white if standing up
    let color = progress?"red":(up?"white":(down?"#00ff00":"red"));

    // start counting once in squat
    if(down && !progress && !up) {
        c++;
    }

    count = Math.floor(c/fps);

    // draw Keypoints
    draw(color, ctx1, poses);

}
