// Дисплей
let canvas = document.querySelector("canvas");
let context = canvas.getContext('2d');
let imgData=context.createImageData(2,2);


// Блинкинг Графический экран (вывод на экран из видеопамяти)
function DrawGraph(pozLin, all) {
	switch(all){
	case 0:  //Выводит 1 символ за раз
		for (let i=0; i<imgData.data.length; i+=4){
			imgData.data[i+0]=0xFF;
			imgData.data[i+1]=0xFF;
			imgData.data[i+2]=0;
			imgData.data[i+3]=255;
		}
		context.putImageData(imgData,pozLin-224,0);
		break;
	case 1:  //Выводит всю видеопамять за раз
		let poz=224;
		for (let y=0; y<120; y++){ // 1 цикл 
            for (let x=0; x<160; x++) {// 2 цикл 
				for (let i=0; i<imgData.data.length; i+=4){
					let color;
					if(RAM[poz]===String.fromCharCode(0x00) || RAM[poz]===undefined) color = 0;
					else color = 255;
					imgData.data[i+0]=color;
					imgData.data[i+1]=0;
					imgData.data[i+2]=0;
					imgData.data[i+3]=255;
				}
				context.putImageData(imgData,x,y);
				poz++;
			}
			x=0;
		} 
	
	
	
		//for (let poz=224; poz<=255; poz++){
		//	for (let i=0; i<imgData.data.length; i+=4){
		//		imgData.data[i+0]=RAM[poz];
		//		imgData.data[i+1]=0;
		//		imgData.data[i+2]=0;
		//		imgData.data[i+3]=255;
		//	}
		//	context.putImageData(imgData,poz-224,0);
		//}	
		break;	
	}	
	
}


// Блинкинг Текстовый экран (вывод на экран из видеопамяти)
function DrawText(pozLin, all) {
	switch(all){
	case 0:  //Выводит 1 символ за раз
		if(RAM[pozLin]===" ")
			document.querySelector("#text-display"+pozLin).textContent = "\u00A0";	
		else
			document.querySelector("#text-display"+pozLin).textContent = RAM[pozLin];	
		break;
	case 1:  //Выводит всю видеопамять за раз
		for (let i=224; i<=255; i++){
			if(RAM[i]===" ")
				document.querySelector("#text-display"+i).textContent = "\u00A0";	
			else
				document.querySelector("#text-display"+i).textContent = RAM[i];	
		}	
		break;	
	}	
	
}


function DrawByte(sym, posX, posY) {
	let poz=0;
	for (let y=posY*16; y<posY*16+16; y+=2){ // 1 цикл 
        for (let x=posX*12+3; x<posX*12+3+12; x+=2) {// 2 цикл 
			if(ASCII[sym][poz]) {
				for (let i=0; i<imgData.data.length; i+=4){					
					imgData.data[i+0]=0xFF;
					imgData.data[i+1]=0xFF;
					imgData.data[i+2]=0;
					imgData.data[i+3]=255;
				}
				context.putImageData(imgData,x,y);	
				}
			else {
				for (let i=0; i<imgData.data.length; i+=4){					
					imgData.data[i+0]=0;
					imgData.data[i+1]=0;
					imgData.data[i+2]=0xAA;
					imgData.data[i+3]=255;
				}
				context.putImageData(imgData,x,y);		
				}
			poz++;
		}
		x=0;
	} 
}


// Вывод на экран 1 байт из видеопамяти (TextMode)
function DrawASCII(posZ) {
	let posY=~~((posZ-223)/26);                  //65145
	if ((posZ-223)%26===0) posY=~~((posZ-223)/26)-1; 
	let posX=(posZ-223)%26;
	if (posX===0) posX=26;
	let poz=0;
	for (let y=posY*16; y<posY*16+16; y+=2){ // 1 цикл 
        for (let x=posX*12-12+6; x<posX*12+6; x+=2) {// 2 цикл 
			if(ASCII[RAM[posZ].charCodeAt(0)][poz]) {
				for (let i=0; i<imgData.data.length; i+=4){					
					imgData.data[i+0]=0xFF;
					imgData.data[i+1]=0xFF;
					imgData.data[i+2]=0;
					imgData.data[i+3]=255;
				}
				context.putImageData(imgData,x,y);
			}
			else {
				for (let i=0; i<imgData.data.length; i+=4){					
					imgData.data[i+0]=0;
					imgData.data[i+1]=0;
					imgData.data[i+2]=0xAA;
					imgData.data[i+3]=255;
				}
				context.putImageData(imgData,x,y);
			}							
			poz++;
		}
		x=0;
	} 
}


// Очистка экрана
function DrawClean() {
	//Очистка графического дисплея  (заливка синим)
	for (let y=0; y<240; y+=2){ // 1 цикл 
        for (let x=0; x<320; x+=2) {// 2 цикл 
			for (let i=0; i<imgData.data.length; i+=4){
				imgData.data[i+0]=0;
				imgData.data[i+1]=0;
				imgData.data[i+2]=0xAA;
				imgData.data[i+3]=255;
			}
			context.putImageData(imgData,x,y);
		}
		x=0;
	} 
	//Очистка текстового дисплея
	/*for(let i=224;i<=255;i++){
		document.querySelector("#text-display"+i).textContent = "\u00A0";
		RAM[i]=String.fromCharCode(0x00);
		document.querySelector("#mem-block"+i).textContent = paddy(dec2hex(RAM[i].charCodeAt(0)),2);
	}*/
}