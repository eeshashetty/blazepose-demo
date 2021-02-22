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
    ctx1.rect(xcc*canvasWidth, (ycc + count/4)*canvasHeight, canvasWidth/10, (0.78 - count/4)*canvasHeight);
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