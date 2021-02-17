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
var clap=0;
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

var high=1;
var low=0;
var clr='blue';
// ==========================================================================================================



// HTML Button Functions
// ==========================================================================================================
function reset(){
    count=0;
    countElement.innerHTML=count;
    instruct.innerHTML='Jump and lift your hands and put legs apart';
}

function start(){
    if (fnstate){
        fnstate=0;
        ctbutton.innerHTML='Start';
    }
    else{
        setTimeout(function(){fnstate=1;
            ctbutton.innerHTML='Stop';},3000);
    }
}

// ==========================================================================================================



// Angle Function
// ==========================================================================================================
function find_angle(A,B,C) {
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB))*180/Math.PI;
}

// ==========================================================================================================



// Run main function
// ==========================================================================================================



function onResults(results) {
    ctx.save();
    ctx.clearRect(0, 0, 600, 500);
    ctx.drawImage(
        results.image, 0, 0, 600, 500);
    if (fnstate){
    
        results.poseLandmarks[24].x=(results.poseLandmarks[24].x+results.poseLandmarks[23].x)/2;
        
        a=find_angle(results.poseLandmarks[27],results.poseLandmarks[24],results.poseLandmarks[28]);
        
        high = Math.min(high,results.poseLandmarks[0].y);
        low= Math.max(low,results.poseLandmarks[0].y);

        
        if (a>=20 && results.poseLandmarks[14].y<results.poseLandmarks[12].y && results.poseLandmarks[13].y<results.poseLandmarks[11].y && (((low-high)/high)>0.3)){
            clr='green';
            if (!clap){
                clap=1;
                count+=1;
                countElement.innerHTML=count;
                instruct.innerHTML='Jump and relax';
            }
            high=1;
            low=0;
        }
        else if (a<20 && results.poseLandmarks[14].y>results.poseLandmarks[12].y && results.poseLandmarks[13].y>results.poseLandmarks[11].y && (((low-high)/high)>0.3)){
            if(clap){
                clr='blue';
                clap=0;
                count+=1;
                instruct.innerHTML='Jump and lift your hands and put legs apart';
                countElement.innerHTML=count;
            }
            high=1;
            low=0;
        }
    }
    drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: clr, lineWidth: 4});
    drawLandmarks(ctx, results.poseLandmarks,
                  {color: clr, lineWidth: 2});
    ctx.restore();
    // console.log(results.poseLandmarks[0]);
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
