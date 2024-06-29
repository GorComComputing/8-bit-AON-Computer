function  HttpRequest(s, body) {
  	//console.log('Log from JS: ['+s+']');
	var response = "";
	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {  
        	//console.log(xhttp.responseText);
            response = xhttp.responseText;
        } else {
        	response = "Response FAIL"
        }
      };
      //xhttp.withCredentials = true;
      xhttp.open("POST", s, false);
      //xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencode');
	  xhttp.send(body);
     
      return {response: response};
}


function drawDo() {   
    let imageDataArray = wasmByteMemoryArray.slice(graphicsBufferPointer, graphicsBufferPointer + graphicsBufferSize);
    canvasImageData.data.set(imageDataArray);
    
    canvasContext.putImageData(canvasImageData, 0, 0);
}

/*
function  camDraw(x, y) {
  	base_image = new Image();
  	base_image.src = '/img/pic.jpg?rnd=' + Math.random();
  	base_image.onload = function(){
    	canvasContext.drawImage(base_image, x, y);
  	}
}*/


function  getCamTime() {
	var now = new Date();
	console.log(now.getTime().toString(10));
  	return {response: now.getTime().toString(10)};
}




		


		

