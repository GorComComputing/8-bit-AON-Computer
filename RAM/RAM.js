//Память RAM		 
let RAM=[];


//RAM
function RAMse(set,enable) {	 
	if (enable)
		BUS=dec2bin(RAM[bin2dec(MAR)].charCodeAt(0));// RAM[MAR]->BUS
	if (set){
		RAM[bin2dec(MAR)]=String.fromCharCode(+bin2dec(BUS)); // BUS->RAM[MAR]
		document.querySelector("#mem-block"+bin2dec(MAR)).textContent = paddy(dec2hex(RAM[bin2dec(MAR)].charCodeAt(0)),2);
	
		if(bin2dec(MAR)>=224 && bin2dec(MAR)<=255){
			if(RAM[bin2dec(MAR)]===" ")
				document.querySelector("#text-display"+bin2dec(MAR)).textContent = "\u00A0";	
			else
				document.querySelector("#text-display"+bin2dec(MAR)).textContent = RAM[bin2dec(MAR)];	
		}			
	}
}


//Загрузка программы из файла в память RAM в hex
function LoadFile(){
	Reset();
	let i=2;
	let RAM2 = new Array(256).fill(0);
	
	let file = document.getElementById('file').files[0];
	let reader = new FileReader();
	reader.readAsBinaryString(file);
	reader.onload=function(){
	RAM2=reader.result;

	let bodyElement = document.querySelector(".memory-content");
	let item = document.querySelector("#mem-block1");//.firstChild;
	let item0 = document.querySelector(".memory-block");//.firstChild;
	//item=item.firstChild;
	//item0=item0.firstChild;

	item0.textContent = paddy(dec2hex(RAM2[0].charCodeAt(0)), 2);
	item.textContent = paddy(dec2hex(RAM2[1].charCodeAt(0)), 2);
	RAM[0]=RAM2[0];
	RAM[1]=RAM2[1];

	for(;i<RAM2.length && i<=223;i++){
		//let clonedItem = item.cloneNode(true);
		let clonedItem = document.querySelector("#mem-block"+i);
		RAM[i]= RAM2[i];
		clonedItem.textContent = paddy(dec2hex(RAM[i].charCodeAt(0)),2);
		//clonedItem.setAttribute("id", "mem-block"+i);
		//bodyElement.appendChild(clonedItem);
	}
	
	for(;i<=223;i++){
		//let clonedItem = item.cloneNode(true);
		let clonedItem = document.querySelector("#mem-block"+i);
		RAM[i]=String.fromCharCode(0x00);
		clonedItem.textContent = paddy(dec2hex(RAM[i].charCodeAt(0)),2);
		//clonedItem.setAttribute("id", "mem-block"+i);
		//bodyElement.appendChild(clonedItem);
	}
	
	for(;i<=255;i++){
		//let clonedItem = item.cloneNode(true);
		let clonedItem = document.querySelector("#mem-block"+i);
		RAM[i]=String.fromCharCode(0x00);
		clonedItem.textContent = paddy(dec2hex(RAM[i].charCodeAt(0)),2);
		//clonedItem.setAttribute("id", "mem-block"+i);
		//clonedItem.classList.add("textual-display-region");
		//bodyElement.appendChild(clonedItem);
	}
	console.warn("Loaded "+RAM2.length+" bytes");

	
	console.warn("RAM Length: "+RAM.length+" bytes");
	console.log(RAM);

	}
	reader.onerror=function(){
		console.log(reader.error);
	}
}


//Очистка памяти RAM
function ClearRAM(){

	let bodyElement = document.querySelector(".memory-content");
	document.querySelector("#mem-block1").textContent = "00";
	RAM[0]=String.fromCharCode(0x00);;
	console.warn(paddy(dec2hex(RAM[0].charCodeAt(0)),2));
	document.querySelector(".memory-block").textContent = "00";
	RAM[1]=String.fromCharCode(0x00);;
	console.warn(paddy(dec2hex(RAM[1].charCodeAt(0)),2));
	
	for(let i=2;i<RAM.length && i<=255;i++){
		RAM[i]=String.fromCharCode(0x00);;
		console.warn(paddy(dec2hex(RAM[i].charCodeAt(0)),2));
		document.querySelector("#mem-block"+i).textContent = paddy(dec2hex(RAM[i].charCodeAt(0)),2);
		
		if(i>=224 && i<=255)
				document.querySelector("#text-display"+i).textContent = "\u00A0";						
	}
	console.warn("Cleared "+RAM.length+" bytes");
	Reset();
}