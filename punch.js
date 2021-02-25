let wait = 0;
let xcc, ycc;
let punch = false;
let s = true;
let start = new Audio('Audio files/Instructions/Great-Lets start.mp3');
let bump = new Audio('Audio files/Instructions/Gamebump.mp3');

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

    if(s) {
        start.play()
        s = false;
      }    
    
    xcc = 0.76;
    ycc = 0.09;
    // Punching Bag - White
    ctx1.beginPath();
    ctx1.rect(xcc*canvasWidth - 4, ycc*canvasHeight - 4, canvasWidth/10 + 8, 0.78*canvasHeight + 8);
    ctx1.lineWidth = 6;
    ctx1.strokeStyle = "white";
    ctx1.stroke();
    ctx1.globalAlpha = 0.4;
    ctx1.fillStyle = "white";
    ctx1.fill();
    ctx1.closePath();

    // Punching Bag - Red 
    // X coordinate keeps on moving down
    ctx1.beginPath();
    ctx1.globalAlpha = 1;
    ctx1.rect(xcc*canvasWidth, ((ycc + (count/10*0.78))*canvasHeight), canvasWidth/10, (0.78 - 0.78 * count/10)*canvasHeight);
    ctx1.fillStyle = "red";
    ctx1.fill();
    ctx1.closePath();

    let rightHand = poses[19];
    let leftHand = poses[20];

    // check if hand is in punching bag
    if(rightHand.x > xcc && rightHand.y > ycc && rightHand.x < xcc + 0.1 && rightHand.y < ycc + 0.84 ||
        leftHand.x > xcc && leftHand.y > ycc && leftHand.x < xcc + 0.1 && leftHand.y < ycc + 0.84) 
        {
            punch = true;
        } else {
            if(punch) {
                count++;
                wait = 0;
                punch = false;
            }
        }
        if(count==10) {
            count = 0;
        }
       
        
    // draw keypoints only for hands
    drawLandmarks(
        ctx1, [rightHand, leftHand],
        {color: '#e68214', fillColor: '#e68214', lineWidth: 4, radius: 15});
    


    }

