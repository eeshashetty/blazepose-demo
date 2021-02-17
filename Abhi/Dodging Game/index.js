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
let net;
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
var blockx=-50;
var ylist=[canvasHeight*0.2,canvasHeight*0.05]
var blocky=ylist[Math.floor(Math.random() * 2)];
var speed=20;
var reset=0;

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


// ==========================================================================================================




// Game Function
// ==========================================================================================================

// function gamemain(){
//     async function game(){
//         if (fnstate){
//         var blockwidth=0.1*canvasWidth;
//         var blockheight=0.05*canvasHeight;
//         ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
//         hitState=  headHit(blockx,blocky,blockwidth,blockheight);
//         ctx2.font = "900 50px Arial";
//         ctx2.textAlign = "center";

//         if (blocky==canvasHeight*0.2){
//             ctx2.fillStyle = "yellow";
//             ctx2.fillText("Dodge", 0.5*canvasWidth, 0.8*canvasHeight);
//             if (blockx>=canvasWidth || hitState){
//                 if (blockx>=canvasWidth){
//                     count+=1;
//                     dodgeCount.innerHTML=count;
//                     audio.play()
//                 }
//             reset=1;
//             }
//             else{
//             reset=0;}
//         }
//         else{
//             ctx2.fillStyle = "red";
//             ctx2.fillText("Hit", 0.5*canvasWidth, 0.8*canvasHeight);
//             if (blockx>=canvasWidth || hitState){
//                 if (hitState){
//                     count+=1;
//                     dodgeCount.innerHTML=count;
//                     audio.play();
//                 }
//             reset=1;
//             }
//             else{
//             reset=0;}
//         }

//         ctx2.fillRect(blockx, blocky, blockwidth, blockheight);
//         if(reset){
//             blockx=-blockwidth;
//             blocky=ylist[Math.floor(Math.random() * 2)];
//         }
//         speed=blockwidth/5;
//         blockx+=speed;
//     }
//         requestAnimationFrame(game);
        
//     }
//     game()
// }

// ==========================================================================================================




// Head Hitbox Function
// ==========================================================================================================
//                                                  Hitbox is marked with * 
//      ______
//      |_____|                                                   
//     Dodge this    * *,,,,* *                     Hitbox extends from top of head to bottom of canvas 
//                   * /    \ *                     Width of hitbox is the distance between left and right ear
//                   *| =  = |*
//                   * \ == / *
//                   *  |  |  *
//                   /--    --\
//                  /*        *\
//                   *        *
//                   *        *
// 

// function headHit(blockx,blocky,blockwidth,blockheight){
//     if (!(result.poseLandmarks[0].y - Math.abs(result.poseLandmarks[7].x - result.poseLandmarks[8].x) > blocky+blockheight) && ((blockx+blockwidth>=result.poseLandmarks[11].x && blockx+blockwidth<=result.poseLandmarks[12].x) || (blockx>=result.poseLandmarks[11].x && blockx<=result.poseLandmarks[12].x) || (blockx+blockwidth>=result.poseLandmarks[12].x && blockx<=result.poseLandmarks[11].x))){
//             return true;
//         }
//     return false;
// }

// ==========================================================================================================




// Leg Hitbox Function
// ==========================================================================================================
//                                                   Hitline is marked with * 
//                          
//                      |         |                  Hitline is the line segment between ankle and knee.
//                      /   /\    |                  We check if rightmost point A and leftmost point B of the 
//                     /   /  /  /                   block are on opposite sides of hitline.
//                    /* /   /* / 
//                    |*|    |*|
//      ______        |*|    |*|
//      A_____B       |*|    |*|
//                  {__*_) {__*_) 
//     Dodge this
// 

// function legHit(blockx,blocky){
//     if (!(Math.max(result.keypoints[15].position.y , result.keypoints[16].position.y) < blocky)){
//             m1=(result.keypoints[15].position.y-result.keypoints[13].position.y)/(result.keypoints[15].position.x-result.keypoints[13].position.x)
//             c1=result.keypoints[15].position.y-(m1*result.keypoints[15].position.x)
//             p1=blocky-(m1*(blockx+50))-c1
//             p2=blocky-(m1*(blockx))-c1
//             if (p1>=0 && p2<=0){
//                 // console.log(p1,p2);
//                 return true;
//             }
//             m1=(result.keypoints[14].position.y-result.keypoints[16].position.y)/(result.keypoints[14].position.x-result.keypoints[16].position.x)
//             c1=result.keypoints[16].position.y-(m1*result.keypoints[16].position.x)
//             p1=blocky-(m1*(blockx+50))-c1
//             p2=blocky-(m1*(blockx))-c1
//             if (p1>=0 && p2<=0){
//                 // console.log(p1,p2);
//                 return true;
//             }
//         }
//     return false;
// }

// ==========================================================================================================









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
    ctx1.save();
    ctx1.clearRect(0, 0, 600, 500);
    ctx1.drawImage(
        results.image, 0, 0, 600, 500);
    var clr='blue';
    if (fnstate){
        ylist=[canvasHeight*0.2,canvasHeight*0.05];
        var blockwidth=0.1*canvasWidth;
        var blockheight=0.05*canvasHeight;
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        if (!(results.poseLandmarks[33].y > (blocky+blockheight)/canvasHeight) && (((blockx+blockwidth)/canvasWidth>=results.poseLandmarks[11].x && (blockx+blockwidth)/canvasWidth<=results.poseLandmarks[12].x) || (blockx/canvasWidth>=results.poseLandmarks[11].x && blockx/canvasWidth<=results.poseLandmarks[12].x) || ((blockx+blockwidth)/canvasWidth>=results.poseLandmarks[12].x && blockx/canvasWidth<=results.poseLandmarks[11].x))){
            hitState=true;
        }
        else{
            hitState=false;
        }

        ctx2.font = "900 50px Arial";
        ctx2.textAlign = "center";

        if (blocky==canvasHeight*0.2){
            ctx2.fillStyle = "yellow";
            ctx2.fillText("Dodge", 0.5*canvasWidth, 0.8*canvasHeight);
            if (blockx>=canvasWidth || hitState){
                if (blockx>=canvasWidth){
                    count+=1;
                    dodgeCount.innerHTML=count;
                    audio.play()
                }
            reset=1;
            }
            else{
            reset=0;}
        }
        else{
            ctx2.fillStyle = "red";
            ctx2.fillText("Hit", 0.5*canvasWidth, 0.8*canvasHeight);
            if (blockx>=canvasWidth || hitState){
                if (hitState){
                    count+=1;
                    dodgeCount.innerHTML=count;
                    audio.play();
                }
            reset=1;
            }
            else{
            reset=0;}
        }

        ctx2.fillRect(blockx, blocky, blockwidth, blockheight);
        if(reset){
            blockx=-blockwidth;
            blocky=ylist[Math.floor(Math.random() * 2)];
        }
        speed=blockwidth/5;
        blockx+=speed;
    }

    // drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS,
    //                {color: clr, lineWidth: 4});
    // drawLandmarks(ctx, results.poseLandmarks,
    //               {color: clr, lineWidth: 2});
    ctx1.restore();
    ctx2.restore();
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