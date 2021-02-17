import {detect} from './utils/start.js';

// global vars
window.videoHeight = 1280;
window.videoWidth = 720;

// set up blazepose
const pose = new Pose({
  locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.1/${file}`;
},
});

// set blazepose options
pose.setOptions({
  selfieMode: true,
  smoothLandmarks: true,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});
pose.onResults(detect);

// set up camera
const videoElement = document.getElementById('video');

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({image: videoElement});
  },
  width: 1280,
  height: 720
});

camera.start();