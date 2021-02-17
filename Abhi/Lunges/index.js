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
function reset(){
    count=0;
    countElement.innerHTML=count;
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


// Over ride POSE_CONNECTIONS
// ==========================================================================================================

// POSE_CONNECTIONS=[[NOSE,P],[NOSE,V]];

// L: 27
// LEFT_EAR: 7
// LEFT_ELBOW: 13
// LEFT_EYE: 2
// LEFT_EYE_INNER: 1
// LEFT_EYE_OUTER: 3
// LEFT_HIP: 23
// LEFT_INDEX: 19
// LEFT_PINKY: 17
// LEFT_SHOULDER: 11
// LEFT_THUMB: 21
// LEFT_WRIST: 15
// M: 31
// N: 29
// NOSE: 0
// O: 25
// P: 9
// R: 28
// RIGHT_EAR: 8
// RIGHT_ELBOW: 14
// RIGHT_EYE: 5
// RIGHT_EYE_INNER: 4
// RIGHT_EYE_OUTER: 6
// RIGHT_HIP: 24
// RIGHT_INDEX: 20
// RIGHT_PINKY: 18
// RIGHT_SHOULDER: 12
// RIGHT_THUMB: 22
// RIGHT_WRIST: 16
// S: 32
// T: 30
// U: 26
// V: 10

// POSE_CONNECTIONS=[[NOSE,P],[NOSE,V]];

// ==========================================================================================================



// Activity and Intensity
// ==========================================================================================================

// Note: Redundant computation on line 331 in base.js
// const sampling_rate=3;
// var sampling_count=0;
// var check_pose=1;
// const activityLandmark=[11,12,13,14,15,16,23,24,25,26,27,28];
// var saved_activity=Array(50).fill(0);
// var saved_activity_iterator=0;
// var sampled_pose=null;
// var total_activity=0;
// // Activity
// if (sampling_count<sampling_rate){
//     sampling_count+=1;
// }
// else {
//     if (sampled_pose!=null){
//         var activity=0;
//         for (let i=0;i<activityLandmark.length;i+=1){
//             if (results.poseLandmarks[activityLandmark[i]].visibility>minConfidence && sampled_pose[activityLandmark[i]].visibility>minConfidence){
//                 const dx = (results.poseLandmarks[activityLandmark[i]].x - sampled_pose[activityLandmark[i]].x)*100;
//                 const dy = (results.poseLandmarks[activityLandmark[i]].y - sampled_pose[activityLandmark[i]].y)*100;
//                 // console.log(typeof());
//                 var diff= Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
//                 activity+=diff;
                
//             }
//         }
//         activity=Math.round(activity/10);
//         total_activity+=activity;
//         console.log('Total acitvity: '+total_activity);    
//         saved_activity[saved_activity_iterator]=activity;
//         saved_activity_iterator=(saved_activity_iterator+1)%50;
//     }
//     sampled_pose=results.poseLandmarks;
//     check_pose=1;
//     sampling_count=0;

// }
// // Intensity
// var fr=6;
// var intensity_iterator=(saved_activity_iterator-fr)%50;
// var act_sum=0
// while(intensity_iterator!=saved_activity_iterator+1){
//     act_sum+=saved_activity[intensity_iterator];
//     intensity_iterator=(intensity_iterator+1)%50;
// }
// console.log('Intensity: '+Math.round((act_sum/fr)));


// Run main function
// ==========================================================================================================

const minConfidence=0.5;


function onResults(results) {
    // Adds landmark of top of head
    // 
    var headx=results.poseLandmarks[0].x;
    var heady=results.poseLandmarks[0].y-(2*Math.abs(results.poseLandmarks[7].x-results.poseLandmarks[8].x));
    results.poseLandmarks.push({x:headx,y:heady});
    // 
    // 
    ctx.save();
    ctx.clearRect(0, 0, 600, 500);
    ctx.drawImage(
        results.image, 0, 0, 600, 500);
    a=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
    b=find_angle(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
    var clr='blue';
    if (fnstate){
        if(!instructstate){
            instruct.innerHTML='Face right and move right leg forward.';
        }
        else{
            instruct.innerHTML='Face left and move left leg forward.';
        }
        if (results.poseLandmarks[26].y>=((results.poseLandmarks[25].y+results.poseLandmarks[27].y)/2) || results.poseLandmarks[25].y>=((results.poseLandmarks[26].y+results.poseLandmarks[28].y)/2)){
            if (a<=100 && b<= 100){
                clr='green';
                if (!lungestate){
                    count+=1;
                    countElement.innerHTML=count;
                    lungestate=1;
                    instructstate=(instructstate+1)%2;
                }
            }
        }
        else{
            lungestate=0;
        }
    }

    // drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS,
    //                {color: clr, lineWidth: 4});
    drawLandmarks(ctx, results.poseLandmarks,
                  {color: clr, lineWidth: 2});
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
