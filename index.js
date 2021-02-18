import {detect} from './utils/start.js';

// global vars
window.videoHeight = window.innerHeight;
window.videoWidth = window.innerWidth;

window.aspect_ratio=window.videoWidth/window.videoHeight;


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

var aspect_ratio=window.videoWidth/window.videoHeight;

if($(window).width()/aspect_ratio>$(window).height()){
  window.videoHeight = $(window).height();
  window.videoWidth = Math.floor(window.videoHeight*aspect_ratio);
}
else {
  console.log("fix2");
  window.videoWidth = $(window).width();
  window.videoHeight = Math.floor(window.videoWidth/aspect_ratio);
}

// set up camera
const videoElement = document.getElementById('video');

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await pose.send({image: videoElement});
  },
  width: window.videoWidth,
  height: window.videoHeight
});

camera.start();