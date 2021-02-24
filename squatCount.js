// global vars
let c = 0;
let down = false;
let up = false;
let progress = true;
let s = true;
let start = new Audio('Audio files/Instructions/Great-Lets start.mp3');
let prev = 0;

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

    if(prev != count) {
        play(count)
        prev = count;
    }

    // draw Keypoints
    draw(color, ctx1, poses);

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
    } else if(count % 5 == 0) {
        great[Math.floor(Math.random()*great.length)].play();
    } 
}  
