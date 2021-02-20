// global vars
let down = false;
let up = false;
let color = "red";
let xc, yc, xcr, xcl, xd;
let radius = 35;
let upc = 0;
let wait = 0;
let first = true;

// squat+jump
function Exercise(results) {

    let poses = results.poseLandmarks;

    let xcc, ycc;

    // generate box area on alternate sides on alternate counts
    if(count%2 == 0) {
        xcc = 0.19;
        ycc = 0.09;
        
        ctx1.beginPath();
        ctx1.rect(xcc*canvasWidth, ycc*canvasHeight - 30, canvasWidth/4, 30);
        ctx1.fillStyle = (up&&down)?"#00ff00":"yellow";
        ctx1.fill();
        ctx1.strokeStyle = (up&&down)?"#00ff00":"yellow";
        ctx1.lineWidth = "8";
        ctx1.stroke();        
        ctx1.closePath();

        ctx1.font = "25px Arial";
        ctx1.fillStyle = "black";
        ctx1.textAlign = "center";
        ctx1.fillText("squat here", 0.25*canvasWidth, 0.08*canvasHeight);  

        ctx1.beginPath();
        ctx1.rect(xcc*canvasWidth, ycc*canvasHeight, canvasWidth/4, 0.84*canvasHeight);
        ctx1.strokeStyle = (up&&down)?"#00ff00":"yellow";
        ctx1.lineWidth = "8";
        ctx1.stroke();
        ctx1.closePath();
        
    } else {
        xcc = 0.56;
        ycc = 0.09;


        ctx1.beginPath();
        ctx1.rect(xcc*canvasWidth, ycc*canvasHeight - 30, canvasWidth/4, 30);
        ctx1.fillStyle = (up&&down)?"#00ff00":"yellow";
        ctx1.fill();
        ctx1.strokeStyle = (up&&down)?"#00ff00":"yellow";
        ctx1.lineWidth = "8";
        ctx1.stroke();        
        ctx1.closePath();

        ctx1.font = "25px Arial";
        ctx1.globalAlpha = 1;
        ctx1.fillStyle = "black";
        ctx1.fillText("squat here", 0.80*canvasWidth, 0.08*canvasHeight);

        ctx1.beginPath();
        ctx1.rect(xcc*canvasWidth, ycc*canvasHeight, canvasWidth/4, 0.84*canvasHeight);
        ctx1.strokeStyle = (up&&down)?"#00ff00":"yellow";
        ctx1.lineWidth = "8";
        ctx1.stroke();
        ctx1.closePath();
    }

    // draw keypoints
    draw(color, ctx1, poses);
    
    // fetch hip points
    let hip = poses[34];
    
    // check if person is standing inside the box
    if(hip.x > xcc && hip.y > ycc && hip.x < xcc + 0.25 && hip.y < ycc + 0.84) {
        // check squat
        let res = checkSquat(poses);
        up = (res[0] == undefined)?up:res[0];
        down = (res[1] == undefined)?down:res[1];

        // skeleton turns green if in squat, white if inside the box. otherwise red
        color = down?"#00ff00":"white";

        // count one squat if person squatted and stood up
        if(up && down)
        {   // wait incrementer so that color can be seen for a few frames
            wait++;
            console.log(wait);
            if(wait>10) {
                wait = 0;
                count++;
                up = false; // reset
                down = false; // reset
            }

            }
        }
        
        


} 