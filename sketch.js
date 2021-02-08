import { drawKeypoints } from './utils/utils.js';

// console.log('in');
const videoHeight = 480;
const videoWidth = 640;

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

  async function poseDetect(){
    
    let pose = await net.estimatePoses(video, {
      flipHorizontal: flipPoseHorizontal,
      decodingMethod: 'single-person'
    })

    ctx.save();
    ctx.scale(-1,1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();
  
    drawKeypoints(pose[0]);
    
    requestAnimationFrame(poseDetect);
  }

  poseDetect();

}

async function main() {
  const net = await posenet.load();
  let video;
  try {
    console.log('in');
    video = await loadVideo();
  } catch(e) {
    console.log(e);
  }

  detect(video, net);
}

main();