// Webcam Element
// ==========================================================================================================
const webcamElement = document.getElementById('webcam');
// ==========================================================================================================

// Display Variables
// ==========================================================================================================
var instruct = document.getElementById('instruct');
var countElement = document.getElementById('count');
var count = 0;
// ==========================================================================================================

// State Control Variables
// ==========================================================================================================
var fnstate = 0;
var lungestate=0;
var instructstate=0;
// ==========================================================================================================

// Button Elements
// ==========================================================================================================
const ctbutton=document.getElementById('ctbutton');
const rstbutton=document.getElementById('rstbutton');
// ==========================================================================================================


// Script environment variables
// ==========================================================================================================
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');

// ==========================================================================================================



// HTML Button Functions
// ==========================================================================================================
function shoulder(){
    ctbutton.style.backgroundColor='gray';
    rstbutton.style.backgroundColor='green';
    fnstate=1;
}

function nose(){
    ctbutton.style.backgroundColor='green';
    rstbutton.style.backgroundColor='gray';
    fnstate=0;
}

// ==========================================================================================================



// ==========================================================================================================




// Run main function
// ==========================================================================================================

const minConfidence=0.5;

const canvasHeight=500;
const canvasWidth=600;
function onResults(results) {
    // Adds landmark of top of head
    // 
    if (fnstate==0){
    var headx=(results.poseLandmarks[11].x+results.poseLandmarks[12].x)/2;
    var heady=results.poseLandmarks[0].y-(Math.abs(results.poseLandmarks[0].y-results.poseLandmarks[11].y));
    }
    else{
        var headx=results.poseLandmarks[0].x;
        var heady=results.poseLandmarks[0].y-(2*Math.abs(results.poseLandmarks[7].x-results.poseLandmarks[8].x)); 
    }
    results.poseLandmarks.push({x:headx,y:heady});
    // 
    // 
    ctx.save();
    ctx.clearRect(0, 0, 600, 500);
    ctx.drawImage(
        results.image, 0, 0, 600, 500);
    var txt='';
    var clrup='green';
    var clrdown='green';
    if (results.poseLandmarks[0].y<0.1 || results.poseLandmarks[0].y>0.2){
        clrup='blue';
        txt=txt+'Get head between the lines';
    }
    if (results.poseLandmarks[27].y<0.8 || results.poseLandmarks[27].y>0.9 || results.poseLandmarks[28].y<0.8 || results.poseLandmarks[28].y>0.9){
        clrdown='blue';
        txt=txt+'Get ankles between the lines';
    }
    instruct.innerHTML=txt;

    ctx.fillStyle = clrup;
    ctx.fillRect(0, canvasHeight*0.1, canvasWidth, 5);
    ctx.fillRect(0, canvasHeight*0.2, canvasWidth, 5);

    ctx.fillStyle = clrdown;
    ctx.fillRect(0, canvasHeight*0.8, canvasWidth, 5);
    ctx.fillRect(0, canvasHeight*0.90, canvasWidth, 5);

    // drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS,
    //                {color: clr, lineWidth: 4});
    drawLandmarks(ctx, results.poseLandmarks,
                  {color: 'blue', lineWidth: 2});
    ctx.restore();
    // console.log(results.poseLandmarks);
  }
  
  const pose = new Pose({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  }});
  pose.setOptions({
    upperBodyOnly: false,
    smoothLandmarks: true,
    selfieMode: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });


                
pose.onResults(onResults);

  const camera = new Camera(webcamElement, {
    onFrame: async () => {
      await pose.send({image: webcamElement});
    },
    width: 1280,
    height: 720
  });

  camera.start();
