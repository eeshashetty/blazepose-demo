const videoHeight = 480;
const videoWidth = 640;
let down = false;
let up = false;
let squats = 0;
let poses = [];
let x = [];
let y = [];
let xc, yc;
let newc = true;
let frame = 0;
let count = 0;
let wait = -1;

async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: videoWidth,
      height: videoHeight,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo() {
  const video = await setupCamera();
  video.play();

  return video;
}

function detect(video, net) {
  const canvas = document.getElementById('output');
  const ctx = canvas.getContext('2d');

  const flipPoseHorizontal = true;

  canvas.width = videoWidth;
  canvas.height = videoHeight;
  
  function genCircle(ctx) {
    ctx.scale(-1,1);
    ctx.translate(-videoWidth, 0);
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    
    if(newc)
    {
      if(wait>3 || wait == -1)
      {
        count++;
        let X = [Math.floor((0.1 + Math.random()*0.05) * videoWidth), Math.floor((0.9 - Math.random()*0.05) * videoWidth)];
        xc = (X[Math.floor(Math.random()*2)]);
        yc = Math.floor((0.3 + Math.random()*0.4) * videoHeight);
    
        newc = false;
        wait = 0;
      }
    }

    ctx.rect(videoWidth*3/10,0,videoWidth*4/10,videoHeight/8);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Use Hands " + (count-1), videoWidth/2, videoHeight*3/40);
  }

  async function poseDetect(){
    
    // poses = await net.estimatePoses(video, {
    //   flipHorizontal: flipPoseHorizontal,
    //   decodingMethod: 'single-person'
    // })

    ctx.save();
    ctx.scale(-1,1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    if(count <= 20)
    {  
      genCircle(ctx);
     
      var data = ctx.getImageData(xc-50, yc-50, 100, 100);

      ctx.beginPath();
      ctx.globalAlpha = 0.6;
      ctx.arc(xc, yc, 50, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.stroke();
      let diff = 0;
      
      for(let i = 0; i<data.data.length; i++) {
        diff += Math.abs(x[i] - data.data[i]);
      }

      diff = diff/data.data.length;
      
      if(diff > 4 && frame>40)
        {
          wait++;
          newc = true;
        }

      x = data.data;
      
      
      // drawKeypoints(ctx);
      // drawSkeleton(poses[0].keypoints, 0.5, ctx);
      
      frame++;
    }
    ctx.restore();
    requestAnimationFrame(poseDetect);
  }

  poseDetect();

}

function checkSquat(rightKnee,leftKnee,rightHip,leftHip) {

  // calculate slope of right hip+knee and left hip+knee
  let a1 = Math.abs((rightHip.y - rightKnee.y)/(rightHip.x - rightKnee.x));
  let a2 = Math.abs((leftHip.y - leftKnee.y)/(leftHip.x - leftKnee.x));
  
  // slope while standing is more than 5
  if(a1 >=5 && a2 >= 5)
      return "up"
  
  // slope while in squat is close to 0
  else if(a1 >=0 && a1 <=1.5 && a2 >= 0 && a1 <= 1.5)
      return "down";    
  else
      return "";
}

function drawKeypoints(ctx)  {
  let rightKnee = null;
  let leftKnee = null;
  let rightHip = null;
  let leftHip = null;
  let rightAnkle = null;
  let leftAnkle = null;
  let keypoint = [];
  let pose = poses[0];
  for (let j = 0; j < pose.keypoints.length; j++) {
      
      keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
     
      ctx.beginPath();
      ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2*Math.PI);
      
      // assign color based on whether in squat or not
      ctx.fillStyle = down ? "#00ff00" : "#ff0000";
      
      ctx.fill();

      // save coordinates for knee and hip
      if(keypoint.part == 'rightKnee')
          rightKnee = keypoint.position;
      else if(keypoint.part == 'leftKnee')
          leftKnee = keypoint.position;
      else if(keypoint.part == 'rightHip')
          rightHip = keypoint.position;
      else if(keypoint.part == 'leftHip')
          leftHip = keypoint.position;
      else if(keypoint.part == 'rightAnkle')
          rightAnkle = keypoint.position;
      else if(keypoint.part == 'leftAnkle')
          leftAnkle = keypoint.position;
  }
  }
  // return if all keypoints aren't detected
  if(rightKnee == null || leftKnee == null || rightHip == null || leftHip == null || rightAnkle == null || leftAnkle == null)
      return;
  
  else 
      {   
          const res = checkSquat(rightKnee,leftKnee,rightHip,leftHip);
          
          // check if in squat position
          if(res == 'down')
          {down = true;}
          
          // check if standing - if there was a "down" right before - count as one squat
          else if(res == 'up')
          { up = true;
              if(down)
              {
                  squats+=1;
                  document.getElementById("status").innerHTML = "squats = " + squats;
                  up = false;
                  down = false;
              }
          }

      }
  }

function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints =
      posenet.getAdjacentKeyPoints(keypoints, minConfidence);

  function toTuple({y, x}) {
    return [y, x];
  }

  let color = down ? "#00ff00" : "#ff0000";;

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
        toTuple(keypoints[0].position), toTuple(keypoints[1].position), color,
        scale, ctx);
  });
}

async function main() {
  const net = await posenet.load();
  let video;
  try {
    video = await loadVideo();
  } catch(e) {
    console.log(e);
  }

  detect(video, net);
}

main();