// Программа рисует флаг

const yk = 15; 					// растяжение волны по Y
const xk = 32; 					// растяжение волны по X
const pi = 3.14; 

const Top = 50;  				// позиция 1 линии флага
const Bottom = 150; 			// позиция 2 линии флага
const corner = 0.2; 			// угол наклона флага
 
let x,y; 						// кординаты
let t = 0; 						// координата волны


let w = canvas.width; 					  // ширина 500
let h = canvas.height; 					  // высота 500

 
// запуск таймера рисования флага
function letDraw() {
	setInterval(Draw, 20); 			// 20 мс (50 кадров в секунду)
}
 
 
 
 
// рисует на экране
function Draw() {
	context.clearRect(0, 0, w, h);	// очистка экрана //********************************************************************************
	
	context.beginPath(); 			// начинает контур
	context.fillStyle='rgba(255, 0, 0, 1)'; // цвет флага 'Red'         //********************************************************************************
		
	t++; 						// t от -100 до 500
	if(t>w) t=-pi*xk;			// если координата волны дошла до конца, вернуть ее обратно	
		
	// рисует верхнию линию в контур
	for(var x=0-t; x+t<w; x++){  //-pi*xk
		y=yk*Sinus(x/xk);		
		context.lineTo(x+t,y+Top); //********************************************************************************
	}		
	
			//context.fill();  		// заливаем все
			//context.beginPath(); 	// начинаем контур 
			//context.fillStyle='rgba(255, 0, 0, 1)'; // устанавливаем цвет заливки (красный)
	
	// рисует нижнию линию в контур
	for(; x>0-t; x--){  //-pi*xk
		y=yk*Sinus(x/xk);		
		context.lineTo(x+t,y+Bottom);   //********************************************************************************
	}	
	context.fill();  				// вывод контура на экран 
}









/*
// рисует на экране
function Draw() {
	ctx.clearRect(0, 0, w, h);	// очистка экрана
	
	ctx.beginPath(); 			// начинает контур
	ctx.fillStyle='rgba(255, 0, 0, 1)'; // цвет флага 'Red'
	
	
	t++; 						// t от -100 до 500
	if(t>w) t=0-pi*xk;			// если координата волны дошла до конца, вернуть ее обратно	
	
	// рисует верхнию линию в контур
	for(var x=0-t,gy=0; x+t<w-pi*xk; x++, gy+=corner){  
		y=yk*Math.sin(x/xk);		
		ctx.lineTo(x+t,y+h/Top-gy); 
	}		
	
			ctx.fill();  		// заливаем все
			ctx.beginPath(); 	// начинаем контур 
			ctx.fillStyle='rgba(255, 0, 0, 1)'; // устанавливаем цвет заливки (красный)
	
	// рисует нижнию линию в контур
	for(; x>0-t-pi*xk; x--, gy-=corner){  
		y=yk*Math.sin(x/xk);		
		ctx.lineTo(x+t,y+h/Bottom-gy); 
	}	
	ctx.fill();  				// вывод контура на экран 
}*/