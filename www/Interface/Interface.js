//import './CPU/Logic.js';
//import './CPU/ALU.js';
//import './CPU/Registers.js';
//import './CPU/CU.js';
//import './tests.js';

let gerc;      //миллисекунды
let intervalID=0;  //указатель таймера
let timer=false; // таймер осциллятора
let timerSimulate=false; // таймер симулятора


//Пуск и Стоп осциллятора
function Run(){
	switch(document.getElementById('CPUMode').value){
	case "Simulator":
		if(timerSimulate){
			document.getElementById('Hz').removeAttribute("disabled");
			document.getElementById('CPUMode').removeAttribute("disabled");
			console.error(">Stop Simulate");
			clearInterval(intervalID);
			document.querySelector("#run-stop").textContent = "Run";
			timerSimulate=false;	
		}
		else{
			gerc=document.getElementById('Hz').value;
			document.getElementById('Hz').setAttribute('disabled', 'true');
			document.getElementById('CPUMode').setAttribute('disabled', 'true');
			console.warn(">Run Simulate");
			intervalID = setInterval(StepSimulate, gerc);
			document.querySelector("#run-stop").textContent = "Stop";
			timerSimulate=true;	
		}
		break;
	case "AON":
		if(timer){
			document.getElementById('Hz').removeAttribute("disabled");
			document.getElementById('CPUMode').removeAttribute("disabled");
			console.error(">Stop");
			clearInterval(intervalID);
			document.querySelector("#run-stop").textContent = "Run";
			timer=false;	
		}
		else{
			gerc=document.getElementById('Hz').value;
			document.getElementById('Hz').setAttribute('disabled', 'true');
			document.getElementById('CPUMode').setAttribute('disabled', 'true');
			console.warn(">Run");
			intervalID = setInterval(Step, gerc);
			document.querySelector("#run-stop").textContent = "Stop";
			timer=true;	
		}
		break;	
	}	
}


//Один шаг осциллятора
function StepOn(){
	switch(document.getElementById('CPUMode').value){
	case "Simulator":
		StepSimulate();
		break;
	case "AON":
		Step();
		break;
	}
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
	
	//Очистка дисплея
	DrawClean();
}


//Добавление количества нулей в начале строки
function paddy(num, padlen, padchar) {
    let pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    let pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
}


//Перевод числа bin->hex
function bin2hex(strA){	
	return parseInt(""+strA[0]+strA[1]+strA[2]+strA[3]+strA[4]+strA[5]+strA[6]+strA[7], 2).toString(16).toUpperCase();
}


//Перевод числа bin->dec
function bin2dec(strA){	
	return parseInt(""+strA[0]+strA[1]+strA[2]+strA[3]+strA[4]+strA[5]+strA[6]+strA[7], 2).toString(10);
}


//Перевод числа dec->hex
function dec2hex(strA){	
	return parseInt(""+strA, 10).toString(16).toUpperCase();
}


//Перевод числа dec->bin
function dec2bin(strA){	
	let number=paddy(parseInt(""+strA, 10).toString(2),8);	
	return (""+number).split("").map(Number);
}


//При загрузке страницы
function funonload(){
	let bodyElement = document.querySelector(".memory-content");
	let item = document.querySelector("#mem-block1");
	let item0 = document.querySelector(".memory-block");

	for(let i=2;i<65146;i++){
		let clonedItem = item.cloneNode(true);
		clonedItem.setAttribute("id", "mem-block"+i);
		bodyElement.appendChild(clonedItem);
	}
	
	for(let i=65146;i<=65535;i++){
		let clonedItem = item.cloneNode(true);
		clonedItem.setAttribute("id", "mem-block"+i);
		clonedItem.classList.add("textual-display-region");
		bodyElement.appendChild(clonedItem);
	}
	
	bodyElement = document.querySelector("#linesFF");
	item = document.querySelector("#lineNumFF");
	for(let i=1;i<=0xFFF;i++){
		let clonedItem = item.cloneNode(true);
		clonedItem.textContent = ""+paddy(dec2hex(i),3)+"";
		bodyElement.appendChild(clonedItem);
	}
	
	console.warn("Cloned");
	// Очистка дисплея
	DrawClean();				
}





//Запуск транслятора языка Ассемблера
function Assemble(){

}


//Запуск компилятора языка C
function CCompile(){
	console.warn("C Compiler start");
	Init();
	Compile();
	Done();
}


function Init(){
	console.log("Init");
	ResetText();
}


function Done(){
	console.log("Done");
}

