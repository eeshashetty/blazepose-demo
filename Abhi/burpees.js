

// ==========================================================================================================
function inbox(landmark,bx,by,bh,bl){
    if (landmark.x>=bx && landmark.x<=bx+bl && landmark.y>=by && landmark.y<=by+bh){
        return true;
    }
    return false;
}









// Run main function
// ==========================================================================================================


const exercise=[{y:350*canvasHeight/500,l:200*canvasWidth/600,h:100*canvasHeight/500},{y:50*canvasHeight/500,l:200*canvasWidth/600,h:300*canvasHeight/500},{y:200*canvasHeight/500,l:200*canvasWidth/600,h:250*canvasHeight/500}]
var xcordinate=[canvasWidth*50/600,200*canvasWidth/600,350*canvasWidth/600];
var i=0;
var rectx=0;
var xidx=Math.floor(Math.random()*3);
rectx=xcordinate.splice(xidx,1)[0];

function Exercise(results) {


    var clr='blue';
    
        ctx2.beginPath();
        ctx2.strokeStyle='yellow';
        ctx2.lineWidth=5;
        ctx2.rect(rectx,exercise[i].y,exercise[i].l,exercise[i].h);
        ctx2.stroke();
        bx=rectx/canvasWidth;
        bl=exercise[i].l/canvasWidth;
        by=exercise[i].y/canvasHeight;
        bh=exercise[i].h/canvasHeight;

        if (i==0){
            // instruct.innerHTML='Do pushup';
            if (results.poseLandmarks[11].visibility>0.8 && results.poseLandmarks[12].visibility>0.8 && inbox(results.poseLandmarks[11],bx,by,bh,bl) && inbox(results.poseLandmarks[12],bx,by,bh,bl)){
                i=(i+1)%3;
                count+=1;
                // countElement.innerHTML=count;
                xidx=Math.floor(Math.random()*2);
                tmpx=xcordinate.splice(xidx,1)[0];
                xcordinate.push(rectx);
                rectx=tmpx;

                
            }
        }
        else if(i==1){
            // instruct.innerHTML='Jump';
            if (results.poseLandmarks[0].visibility>0.8  && results.poseLandmarks[33].y<by){
                i=(i+1)%3;
                count+=1;
                // countElement.innerHTML=count;
                xidx=Math.floor(Math.random()*2);
                tmpx=xcordinate.splice(xidx,1)[0];
                xcordinate.push(rectx);
                rectx=tmpx;
                
            }
        }
        else{
            // instruct.innerHTML='Squat';

            if (((results.poseLandmarks[23].visibility>0.8 && results.poseLandmarks[27].visibility>0.8 && results.poseLandmarks[25].visibility>0.8) || (results.poseLandmarks[26].visibility>0.8 && results.poseLandmarks[24].visibility>0.8 && results.poseLandmarks[28].visibility>0.8)) && (inbox(results.poseLandmarks[25],bx,by,bh,bl) || inbox(results.poseLandmarks[26],bx,by,bh,bl))){
                a=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
                b=find_angle(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
                if((a<120 || b<120) && (inbox(results.poseLandmarks[11],bx,by,bh,bl) || inbox(results.poseLandmarks[12],bx,by,bh,bl))){
                    i=(i+1)%3;
                    count+=1;
                    xidx=Math.floor(Math.random()*2);
                    tmpx=xcordinate.splice(xidx,1)[0];
                    xcordinate.push(rectx);
                    rectx=tmpx;
                }
                
                // countElement.innerHTML=count;
                
            }
        }
        // drawLandmarks(ctx1, results.poseLandmarks,
        //                   {color: clr, lineWidth: 2});
       
    

  }
  
 