// Webcam Element
// ==========================================================================================================
const webcamElement = document.getElementById('webcam');
webcamElement.height=Math.min(window.innerHeight,720);
webcamElement.width=(16*webcamElement.height)/9;
// ==========================================================================================================


// Display Variables and Elements
// ==========================================================================================================
var countElement = document.getElementById('count');
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
var exerciseName='';
const lineWidth = 2;
const minConfidencescore=0.5;
var canvasHeight=Math.min(window.innerHeight,720);
var canvasWidth=(16*canvasHeight)/9;
const flipPoseHorizontal = true;
// ==========================================================================================================


// Game Canvas Variables
// ==========================================================================================================
const canvas2 = document.getElementById('output2');
const ctx2 = canvas2.getContext('2d');
canvas2.width = canvasWidth;
canvas2.height = canvasHeight;

// ==========================================================================================================
// var audio= new Audio('hit.mpeg');
const canvas1 = document.getElementById('output1');
const ctx1 = canvas1.getContext('2d');
canvas1.width = canvasWidth;
canvas1.height = canvasHeight;

// var fullscreen=0;

const sampling_rate=3;
var sampling_count=0;
const activityLandmark=[11,12,13,14,15,16,23,24,25,26,27,28];
var saved_activity=Array(50).fill(0);
var saved_activity_iterator=0;
var sampled_pose=null;
var total_activity=0;
var fr=6;
var act_sum=0;
// HTML Button Functions
// ==========================================================================================================
function reset(){
    count=0;
    countElement.innerHTML=count;
    fnstate=0;
    ctbutton.innerHTML='Start';
    blockx=-0.1*canvasWidth;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    instruct.innerHTML='';
}

function start(){
    if (fnstate){
        fnstate=0;
        ctbutton.innerHTML='Start';
        blockx=-0.1*canvasWidth;
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        instruct.innerHTML='';
    }
    else{
        setTimeout(function(){fnstate=1;
            ctbutton.innerHTML='Stop';},3000);
            instruct.innerHTML='';
        
    }
}

var functionVar=null;

function game(x){
    switch (x) {
        case 1:
            // gamename.innerHTML='Dodging Game';
            
            if (functionVar!=null){
                $("script").last().remove();
            }
            $.getScript("dodge.js");
            functionVar=1;
            exerciseName='Dodge Game';
            break;
        case 2:
            // gamename.innerHTML='Lunges';
            if (functionVar!=null){
                $("script").last().remove();
            }
            $.getScript("lunges.js");
            exerciseName='Lunges';
            functionVar=1;
            break;
        case 3:
            // gamename.innerHTML='Jumping Jacks';
            if (functionVar!=null){
                $("script").last().remove();
            }
            $.getScript("jj.js");
            functionVar=1;
            exerciseName='Jumping Jacks';
            break;
        case 4:
            // gamename.innerHTML='Burpees';
            if (functionVar!=null){
                $("script").last().remove();
            }
            $.getScript("burpees.js");
            exerciseName='Burpees';
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
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        ctx1.drawImage(results.image, 0, 0, canvas1.width, canvas1.height);
        if((results.poseLandmarks[0].visibility>0.8 && results.poseLandmarks[27].visibility>0.8 && results.poseLandmarks[28].visibility>0.8) && !(results.poseLandmarks[33].y<0.1 || results.poseLandmarks[33].y>0.2) && !(results.poseLandmarks[27].y<0.8 || results.poseLandmarks[27].y>0.9 || results.poseLandmarks[28].y<0.8 || results.poseLandmarks[28].y>0.9)){
            initialized=1;
        }
        else{
            var txt='';
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
            ctx1.font = "900 "+canvasHeight/20+"px Arial";
            ctx1.textAlign = "center";
            ctx1.fillStyle = 'yellow';
            ctx1.fillText(txt, 0.5*canvasWidth, 0.8*canvasHeight);
        
            ctx1.fillStyle = clrup;
            ctx1.fillRect(0, canvasHeight*0.1, canvasWidth, 5);
            // ctx1.fillRect(0, canvasHeight*0.2, canvasWidth, 5);
        
            ctx1.fillStyle = clrdown;
            // ctx1.fillRect(0, canvasHeight*0.8, canvasWidth, 5);
            ctx1.fillRect(0, canvasHeight*0.90, canvasWidth, 5);
        }
    }
    else{
    instruct.innerHTML='';
    ctx1.save();
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx1.drawImage(
        results.image, 0, 0, canvas1.width, canvas1.height);
    ctx2.save();
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    
    ctx2.beginPath();
    ctx2.globalAlpha=0.6;
    ctx2.fillStyle='black';
    ctx2.fillRect(0,canvasHeight*0.9,canvasWidth,canvasHeight*0.1);
    var clr='blue';
    if (fnstate){
    Exercise(results);
    


    ctx2.globalAlpha=1;
    ctx2.fillStyle='yellow';
    ctx2.font = "900 "+canvasHeight*0.05+"px Arial";
    ctx2.fillText('Score: '+count,0,canvasHeight*0.975);

    // Activity
    if (sampling_count<sampling_rate){
        sampling_count+=1;
    }
    else {
        if (sampled_pose!=null){
            var activity=0;
            for (let i=0;i<activityLandmark.length;i+=1){
                if (results.poseLandmarks[activityLandmark[i]].visibility>minConfidence && sampled_pose[activityLandmark[i]].visibility>minConfidence){
                    const dx = (results.poseLandmarks[activityLandmark[i]].x - sampled_pose[activityLandmark[i]].x)*100;
                    const dy = (results.poseLandmarks[activityLandmark[i]].y - sampled_pose[activityLandmark[i]].y)*100;
                    // console.log(typeof());
                    var diff= Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
                    activity+=diff;
                    
                }
            }
            activity=Math.round(activity/10);
            total_activity+=activity;
            saved_activity[saved_activity_iterator]=activity;
            saved_activity_iterator=(saved_activity_iterator+1)%50;
        }
        sampled_pose=results.poseLandmarks;
        sampling_count=0;

    }
    // Intensity

    var intensity_iterator=(saved_activity_iterator-fr)%50;
    act_sum=0;
    while(intensity_iterator!=saved_activity_iterator){
        act_sum+=saved_activity[intensity_iterator];
        // console.log(saved_activity[intensity_iterator]);
        intensity_iterator=(intensity_iterator+1)%50;
    }
    
    }
    var intensity=Math.round(act_sum/fr);
    if (isNaN(intensity)){
        intensity=0;
    }
    ctx2.globalAlpha=1;
    ctx2.fillStyle='yellow';
    ctx2.font = "900 "+canvasHeight*0.05+"px Arial";
    ctx2.fillText('Activity: '+total_activity,canvasWidth/4,canvasHeight*0.975);
    ctx2.fillText('Intensity: '+intensity,canvasWidth/2,canvasHeight*0.975);
    ctx2.fillText(exerciseName,canvasWidth/1.4,canvasHeight*0.975);

    // console.log(intensity);
    ctx1.restore();
    ctx2.restore();
    }
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