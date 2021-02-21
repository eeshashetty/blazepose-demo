let wait = 0;
let xcc, ycc;
let punch = false;

function Exercise(results) {
    if(count == 4) {
        count = 0;
    }
    
    let poses = results.poseLandmarks;

    xcc = 0.76;
    ycc = 0.09;
    // Punching Bag - White
    ctx1.beginPath();
    ctx1.rect(xcc*canvasWidth, ycc*canvasHeight, canvasWidth/10, 0.84*canvasHeight);
    ctx1.fillStyle = "white";
    ctx1.fill();
    ctx1.closePath();

    // Punching Bag - Red 
    // X coordinate keeps on moving down
    ctx1.beginPath();
    ctx1.rect(xcc*canvasWidth, (ycc + count/4)*canvasHeight, canvasWidth/10, (0.84 - count/4)*canvasHeight);
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
                // increment counter to let code wait for a few frames
                wait++;
                if(wait>5) {
                    count++;
                    wait = 0;
                    punch = false;
                    }
            }
        }

        
    // draw keypoints only for hands
    drawLandmarks(
        ctx1, [rightHand, leftHand],
        {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 20});
    


    }