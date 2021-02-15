import {detect} from './utils/start.js';

// global vars
let video;
window.videoHeight = 480;
window.videoWidth = 640;

window.fps = new FPS();

const pose = new Pose({
  locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.1/${file}`;
},
});

pose.setOptions({
  selfieMode: true,
  smoothLandmarks: true,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});
pose.onResults(detect);

/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.
 */
const videoElement = document.getElementById('video');

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();