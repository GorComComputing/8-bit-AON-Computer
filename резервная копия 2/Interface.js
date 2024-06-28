let siliconNum =0; //количество логических элементов
let gerc;      //миллисекунды
let intervalID=0;  //указатель таймера
let timer=false;


//Пуск и Стоп осциллятора
function Run(){

	if(timer){
		document.getElementById('Hz').removeAttribute("disabled");
		console.error(">Stop");
		clearInterval(intervalID);
		document.querySelector("#run-stop").textContent = "Run";
		timer=false;	
	}
	else{
		gerc=document.getElementById('Hz').value;
		document.getElementById('Hz').setAttribute('disabled', 'true');
		console.warn(">Run");
		intervalID = setInterval(Loop, gerc);
		document.querySelector("#run-stop").textContent = "Stop";
		timer=true;	
	}
}


//Шаг осциллятора
function Step(){
	Loop();
}


//Сброс компьютера в 0
function Reset(){
	document.getElementById('Hz').removeAttribute("disabled");
	console.error(">Stop");
	clearInterval(intervalID);
	document.querySelector("#run-stop").textContent = "Run";
	timer=false;
	siliconNum =0; 
	
	let divElement1 = document.querySelector("#mem-block"+bin2dec(IP));
	divElement1.classList.toggle("marker-ip");
	divElement1.classList.toggle("marker");
	
	IP=[0,0,0,0,0,0,0,0];
	IR=[0,0,0,0,0,0,0,0];
	MAR=[0,0,0,0,0,0,0,0];
	AX=[0,0,0,0,0,0,0,0];
	BX=[0,0,0,0,0,0,0,0];
	CX=[0,0,0,0,0,0,0,0];
	DX=[0,0,0,0,0,0,0,0];
	FL=[0,0,0,0]; //CAEZ
	BUS=[0,0,0,0,0,0,0,0];
	TMP=[0,0,0,0,0,0,0,0];
	ACC=[0,0,0,0,0,0,0,0];
	M=[0,0,0,0,0,0,0,0,0,0,0,0];
	console.error(">Reset");
	document.querySelector("#IP").textContent = "00";
	document.querySelector("#AX").textContent = "00";
	document.querySelector("#BX").textContent = "00";
	document.querySelector("#CX").textContent = "00";
	document.querySelector("#DX").textContent = "00";
	document.querySelector("#IR").textContent = "0000 0000";
	document.querySelector("#MAR").textContent = "00";
	document.querySelector("#flag-C").textContent = "0";
	document.querySelector("#flag-A").textContent = "0";
	document.querySelector("#flag-E").textContent = "0";
	document.querySelector("#flag-Z").textContent = "0";
	document.querySelector("#TMP").textContent = "00";
	document.querySelector("#ACC").textContent = "00";
	document.querySelector("#ST").textContent = "0000000";
	
	let divElement = document.querySelector("#mem-block0");
	divElement.classList.toggle("marker-ip");
	divElement.classList.toggle("marker");
}


//Добавление количества нулей в начале строки
function paddy(num, padlen, padchar) {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
}


//Перевод числа bin->hex
function bin2hex(strA){	
	let n;
	//console.log(strA);
	n=parseInt(""+strA[0]+strA[1]+strA[2]+strA[3]+strA[4]+strA[5]+strA[6]+strA[7], 2).toString(16).toUpperCase();	
	return n;
}


//Перевод числа bin->dec
function bin2dec(strA){	
	//console.log(strA);
	let n;
	n=parseInt(""+strA[0]+strA[1]+strA[2]+strA[3]+strA[4]+strA[5]+strA[6]+strA[7], 2).toString(10);	
	return n;
}


//Перевод числа dec->hex
function dec2hex(strA){	
	let n;
	//console.log(strA);
	n=parseInt(""+strA, 10).toString(16).toUpperCase();	
	return n;
}


//Перевод числа dec->bin
function dec2bin(strA){	
	//console.log(""+strA[0]+strA[1]+strA[2]+strA[3]+strA[4]+strA[5]+strA[6]+strA[7]);
	let number=paddy(parseInt(""+strA, 10).toString(2),8);	
	let n = (""+number).split("").map(Number)
	//console.log(n);
	return n;
}


//Загрузка программы из файла в память RAM в hex
function LoadFile(){
	let file = document.getElementById('file').files[0];
	let reader = new FileReader();
	reader.readAsBinaryString(file);
	reader.onload=function(){
		//console.log(reader.result);
		RAM= reader.result;


	
	let bodyElement = document.querySelector(".memory-content");
	let item = document.querySelector("#mem-block1");
	let item0 = document.querySelector(".memory-block");

	item0.textContent = paddy(dec2hex(RAM[0].charCodeAt(0)), 2);
	item.textContent = paddy(dec2hex(RAM[1].charCodeAt(0)), 2);

	for(let i=2;i<RAM.length && i<=255;i++){
		let clonedItem = item.cloneNode(true);
		clonedItem.textContent = paddy(dec2hex(RAM[i].charCodeAt(0)),2);
		clonedItem.setAttribute("id", "mem-block"+i);
		bodyElement.appendChild(clonedItem);
	}
	//console.warn("test256");
	console.warn("Loaded "+RAM.length+" bytes");

	}
	reader.onerror=function(){
		console.log(reader.error);
	}
}


//Очистка памяти RAM
function ClearRAM(){

	let bodyElement = document.querySelector(".memory-content");
	document.querySelector("#mem-block1").textContent = "00";
	RAM[0]=0;
	console.warn(paddy(dec2hex(RAM[0].charCodeAt(0)),2));
	document.querySelector(".memory-block").textContent = "00";
	RAM[1]=0;
	console.warn(paddy(dec2hex(RAM[1].charCodeAt(0)),2));
	




	for(let i=2;i<RAM.length;i++){
		RAM[i]=0;
		console.warn(paddy(dec2hex(RAM[i].charCodeAt(0)),2));
		document.querySelector("#mem-block"+i).textContent = paddy(dec2hex(RAM[i].charCodeAt(0)),2);
		
		
		
		
	}
	console.warn("Cleared "+RAM.length+" bytes");

	

}





