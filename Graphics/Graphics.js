let xDisp=0;

// Цикл отрисовки графического дисплея
function animationLoop() {
	var canvas = document.querySelector("canvas");
	var context = canvas.getContext('2d');
   	var imgData=context.createImageData(2,2);
	
	for (var i=0; i<imgData.data.length; i+=4){
		imgData.data[i+0]=xDisp;
		imgData.data[i+1]=0;
		imgData.data[i+2]=0;
		imgData.data[i+3]=255;
	}
	
	
	for (let y=0; y<120; y++){ // 1 цикл 
            for (let x=0; x<160; x++) // 2 цикл 
				context.putImageData(imgData,x,y);
			x=0;
	} 
	
	//context.putImageData(imgData,xDisp,0);
	xDisp++;
  
  
	requestAnimationFrame(animationLoop);
}