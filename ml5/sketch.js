let video;
let poseNet;
let poses = [];
let squats = 0;
let down = false;
let up = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, 'single', modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });

  video.hide();
}

function modelReady() {
  select('#status').html('squats = 0');
}

function draw() {
    translate(video.width, 0);
    scale(-1,1);
    image(video, 0, 0, width, height);
    drawKeypoints()
    drawSkeleton();
}

// logic - find slope of the line connecting hip and knee
function checkSquat(rk,lk,rh,lh) {

    // calculate slope of right hip+knee and left hip+knee
    let a1 = Math.abs((rh.y - rk.y)/(rh.x - rk.x));
    let a2 = Math.abs((lh.y - lk.y)/(lh.x - lk.x));
    
    // slope while standing is more than 5
    if(a1 >=5 && a2 >= 5)
        return "up"
    
    // slope while in squat is close to 0
    else if(a1 >=0 && a1 <=1.5 && a2 >= 0 && a1 <= 1.5)
        return "down";    
    else
        return "";
}

function drawKeypoints()  {
  let rk = null;
  let lk = null;
  let rh = null;
  let lh = null;
  for (let i = 0; i < poses.length; i++) {
    
    let pose = poses[i].pose;
    let keypoint = [];
    for (let j = 0; j < pose.keypoints.length; j++) {
        
        keypoint = pose.keypoints[j];
        if (keypoint.score > 0.2) {
        
        // assign color based on whether in squat or not
        if(down)
          fill(0, 255, 0);
        else
          fill(255, 0, 0);

        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);

        // save coordinates for knee and hip
        if(keypoint.part == 'rightKnee')
            rk = keypoint.position;
        else if(keypoint.part == 'leftKnee')
            lk = keypoint.position;
        else if(keypoint.part == 'rightHip')
            rh = keypoint.position;
        else if(keypoint.part == 'leftHip')
            lh = keypoint.position;
    }
      }
      // continue loop if all keypoints aren't detected
      if(rk == null || lk == null || rh == null || lh == null)
        continue;
      
      else 
        {   
            const res = checkSquat(rk,lk,rh,lh);
            
            // check if in squat position
            if(res == 'down')
              {down = true;}
            
            // check if standing - if there was a "down" right before - count as one squat
              else if(res == 'up')
              { up = true;
                if(down)
                  {
                    squats+=1;
                    select('#status').html("squats = " + squats);
                    up = false;
                    down = false;
                }
              }

        }
    }
    return false;
  }

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      
      // assign color based on whether in squat or not
      if(down) {
        stroke(0,255,0);
      } else {
        stroke(255,0,0);
      }
      strokeWeight(5);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}