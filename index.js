import {detect} from './utils/start.js';

// global vars
let video;
window.videoHeight = 480;
window.videoWidth = 640;

// set up web cam
async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const video = document.getElementById('video');
  
  // Pre-setting video resolution to 640x480
  video.width = window.videoWidth;
  video.height = window.videoHeight;

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: window.videoWidth,
      height: window.videoHeight,
    },
  });
  
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

// load Camera

async function loadVideo() {
  const video = await setupCamera();
  video.play();

  return video;
}

// Main Function

async function main() {
  const net = await posenet.load(); // load posenet
  
  try {
    video = await loadVideo();
  } catch(e) {
    console.log(e);
  }

  detect(video, net);
}


main();