

// ==========================================================================================================
function inbox(landmark,bx,by,bh,bl){
    if (landmark.x>=bx && landmark.x<=bx+bl && landmark.y>=by && landmark.y<=by+bl){
        return true;
    }
    return false;
}









// Run main function
// ==========================================================================================================


const exercise=[{x:50,y:350,l:200,h:100},{x:200,y:50,l:200,h:300},{x:350,y:150,l:200,h:300}]
var i=0;

function Exercise(results) {


    var clr='blue';
    
        ctx2.beginPath();
        ctx2.strokeStyle='yellow';
        ctx2.lineWidth=5;
        ctx2.rect(exercise[i].x,exercise[i].y,exercise[i].l,exercise[i].h);
        ctx2.stroke();
        bx=exercise[i].x/canvasWidth;
        bl=exercise[i].l/canvasWidth;
        by=exercise[i].y/canvasHeight;
        bh=exercise[i].h/canvasHeight;

        if (i==0){
            instruct.innerHTML='Do pushup';
            if (inbox(results.poseLandmarks[11],bx,by,bh,bl) && inbox(results.poseLandmarks[12],bx,by,bh,bl)){
                i=(i+1)%3;
                count+=1;
                countElement.innerHTML=count;
                
            }
        }
        else if(i==1){
            instruct.innerHTML='Jump';
            if (inbox(results.poseLandmarks[11],bx,by,bh,bl) && inbox(results.poseLandmarks[12],bx,by,bh,bl) && inbox(results.poseLandmarks[25],bx,by,bh,bl) && inbox(results.poseLandmarks[26],bx,by,bh,bl)){
                i=(i+1)%3;
                count+=1;
                countElement.innerHTML=count;
                
            }
        }
        else{
            instruct.innerHTML='Squat';
            if (inbox(results.poseLandmarks[11],bx,by,bh,bl) && inbox(results.poseLandmarks[12],bx,by,bh,bl)){
                i=(i+1)%3;
                count+=1;
                countElement.innerHTML=count;
                
            }
        }
       
    

  }
  
 