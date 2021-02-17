// Webcam Element
// ==========================================================================================================
const webcamElement = document.getElementById('webcam');
webcamElement.width=600;
webcamElement.height=500;
// ==========================================================================================================


// Display Variables and Elements
// ==========================================================================================================
var dodgeCount = document.getElementById('count');
var count = 0;
var inframe = document.getElementById('inframe');
var gamename=document.getElementById('game');
// ==========================================================================================================


// State Control Variables
// ==========================================================================================================
var fnstate = 0;
// ==========================================================================================================


// Button Elements
// ==========================================================================================================
const ctbutton=document.getElementById('ctbutton');
const rstbutton=document.getElementById('rstbutton');
// ==========================================================================================================


// Script environment variables
// ==========================================================================================================

const lineWidth = 2;
var colour='blue';
const minConfidencescore=0.5;
var canvasWidth=600;
var canvasHeight=500;
const flipPoseHorizontal = true;
// ==========================================================================================================


// Game Canvas Variables
// ==========================================================================================================
const canvas2 = document.getElementById('output2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = canvasWidth;
canvas2.height = canvasHeight;

// ==========================================================================================================
var audio= new Audio('hit.mpeg');
const canvas1 = document.getElementById('output1');
const ctx1 = canvas1.getContext('2d');

// since images are being fed from a webcam, we want to feed in the
// original image and then just flip the keypoints' x coordinates. If instead
// we flip the image, then correcting left-right keypoint pairs requires a
// permutation on all the keypoints.

canvas1.width = canvasWidth;
canvas1.height = canvasHeight;

var fullscreen=0;




// HTML Button Functions
// ==========================================================================================================
function reset(){
    count=0;
    dodgeCount.innerHTML=count;
    fnstate=0;
    ctbutton.innerHTML='Start';
    blockx=-0.1*canvasWidth;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function start(){
    if (fnstate){
        fnstate=0;
        ctbutton.innerHTML='Start';
        blockx=-0.1*canvasWidth;
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    }
    else{
        setTimeout(function(){fnstate=1;
            ctbutton.innerHTML='Stop';},3000);
        
        
    }
}

var functionVar=null;

function game(x){
    switch (x) {
        case 1:
            gamename.innerHTML='Dodging Game';
            
            if (functionVar!=null){
                $("script").last().remove();
            }
            $.getScript("dodge.js");
            functionVar=1;
            break;
        case 2:
            gamename.innerHTML='Lunges';
            if (functionVar!=null){
                $("script").last().remove();
            }
            $.getScript("lunges.js");
            functionVar=1;
            break;
        case 3:
            gamename.innerHTML='Jumping Jacks';
            if (functionVar!=null){
                $("script").last().remove();
            }
            $.getScript("jj.js");
            functionVar=1;
            break;
        case 4:
            gamename.innerHTML='Burpees';
            if (functionVar!=null){
                $("script").last().remove();
            }
            $.getScript("burpees.js");
            functionVar=1;
            break;
    
        default:
            break;
    }
}

// ==========================================================================================================

function find_angle(A,B,C) {
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB))*180/Math.PI;
}




// Run main function
// ==========================================================================================================

const minConfidence=0.5;
var initialized=0;

function onResults(results) {
    // Adds landmark of top of head
    // 
    var headx=results.poseLandmarks[0].x;
    var heady=results.poseLandmarks[0].y-(2*Math.abs(results.poseLandmarks[7].x-results.poseLandmarks[8].x));
    results.poseLandmarks.push({x:headx,y:heady});
    // 
    //
    if (!initialized){
        var txt='';
        ctx1.clearRect(0, 0, 600, 500);
        ctx1.drawImage(results.image, 0, 0, 600, 500);
        if(!(results.poseLandmarks[0].y<0.1 || results.poseLandmarks[0].y>0.2) && !(results.poseLandmarks[27].y<0.8 || results.poseLandmarks[27].y>0.9 || results.poseLandmarks[28].y<0.8 || results.poseLandmarks[28].y>0.9)){
            initialized=1;
        }
        else{
            var clrup='green';
            var clrdown='green';
            if (results.poseLandmarks[0].y<0.1 || results.poseLandmarks[0].y>0.2){
                clrup='blue';
                txt=txt+'Get head between the lines ';
            }
            if (results.poseLandmarks[27].y<0.8 || results.poseLandmarks[27].y>0.9 || results.poseLandmarks[28].y<0.8 || results.poseLandmarks[28].y>0.9){
                clrdown='blue';
                txt=txt+'Get ankles between the lines';
            }
            instruct.innerHTML=txt;
        
            ctx1.fillStyle = clrup;
            ctx1.fillRect(0, canvasHeight*0.1, canvasWidth, 5);
            ctx1.fillRect(0, canvasHeight*0.2, canvasWidth, 5);
        
            ctx1.fillStyle = clrdown;
            ctx1.fillRect(0, canvasHeight*0.8, canvasWidth, 5);
            ctx1.fillRect(0, canvasHeight*0.90, canvasWidth, 5);
        }
    }
    else{
    instruct.innerHTML='';
    ctx1.save();
    ctx1.clearRect(0, 0, 600, 500);
    ctx1.drawImage(
        results.image, 0, 0, 600, 500);
    ctx2.save();
    ctx2.clearRect(0, 0, 600, 500);
    
    var clr='blue';
    if (fnstate){
    Exercise(results);
    }

    // drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS,
    //                {color: clr, lineWidth: 4});
    // drawLandmarks(ctx, results.poseLandmarks,
    //               {color: clr, lineWidth: 2});
    ctx1.restore();
    ctx2.restore();
    }
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