//Симулятор CPU

// Регистры
let IPsim=0;
let IRsim=0;
let FLsim=[0,0,0,0];    //CAEZ
let RegFile=[0,0,0,0];  //0-AX, 1-BX, 2-CX, 3-DX


//Шаг симулятора процессора
function StepSimulate(){
	//Fetch Instruction
	let IPsimBefore=IPsim;
	IRsim=RAM[IPsim].charCodeAt(0);
	IPsim++;
	
	//Decode Instruction
	let isALU=IRsim>>7;
	let Operation=IRsim>>4&7;
	let RegA=IRsim>>2&3;
	let RegB=IRsim&3;
	let FC=(IRsim&8)>>7;
	let FA=(IRsim&4)>>3;
	let FE=(IRsim&2)>>1;
	let FZ=IRsim&1;
	
	console.warn("Simulate: "+IPsim);
	console.log("IRsim: "+IRsim);
	console.log("isALU: "+isALU);
	console.log("Operation: "+Operation);
	console.log("RegA: "+RegA);
	console.log("RegB: "+RegB);
	console.log("FC: "+FC);
	console.log("FA: "+FA);
	console.log("FE: "+FE);
	console.log("FZ: "+FZ);
	
	//Execute Instruction
	if(isALU){ // ALU Operations
		switch(Operation){
		case 0:  // ADD
			RegFile[RegB] = RegFile[RegA] + RegFile[RegB];
			if (RegFile[RegB]>65535) {RegFile[RegB]=65535; FLsim[0]=1;}
			else FLsim[0]=0;
			if (RegFile[RegB]===0) FLsim[3]=1;
			else FLsim[3]=0;
			break;
		case 1:  // SHL
			RegFile[RegB] = RegFile[RegA] << 1;
			FLsim[0]=RegFile[RegA] & 15;
			if (RegFile[RegB]===0) FLsim[3]=1;
			else FLsim[3]=0;
			break;
		case 2:  // SHR
			RegFile[RegB] = RegFile[RegA] >> 1;
			FLsim[0]=RegFile[RegA] & 1;
			if (RegFile[RegB]===0) FLsim[3]=1;
			else FLsim[3]=0;
			break;
		case 3:  // NOT
			RegFile[RegB] = ~RegFile[RegA];
			if (RegFile[RegB]===0) FLsim[3]=1;
			else FLsim[3]=0;
			break;
		case 4:  // AND
			RegFile[RegB] = RegFile[RegA] & RegFile[RegB];
			if (RegFile[RegB]===0) FLsim[3]=1;
			else FLsim[3]=0;
			break;
		case 5:  // OR
			RegFile[RegB] = RegFile[RegA] | RegFile[RegB];
			if (RegFile[RegB]===0) FLsim[3]=1;
			else FLsim[3]=0;
			break;
		case 6:  // XOR
			RegFile[RegB] = RegFile[RegA] ^ RegFile[RegB];
			if (RegFile[RegB]===0) FLsim[3]=1;
			else FLsim[3]=0;
			break;
		case 7:  // CMP
			if ((RegFile[RegB] - RegFile[RegA])===0) FLsim[2]=1;
			else FLsim[2]=0;
			if ((RegFile[RegB] - RegFile[RegA])>0) FLsim[1]=1;
			else FLsim[1]=0;
			FLsim[0]=0;
			FLsim[3]=0;
			break;
		}
	}
	else{  // Other Operations
		switch(Operation){
		case 0:  // Load
			RegFile[RegB] = RAM[RegFile[RegA]].charCodeAt(0);
			break;
		case 1:  // Store
			RAM[RegFile[RegA]] = String.fromCharCode(RegFile[RegB]);
			document.querySelector("#mem-block"+RegFile[RegA]).textContent = paddy(dec2hex(RAM[RegFile[RegA]].charCodeAt(0)),2);
			DrawASCII(RegFile[RegA]);
			break;
		case 2:  // Data
			RegFile[RegB] = RAM[IPsim].charCodeAt(0);
			IPsim++;
			break;
		case 3:  // JMP to Reg
			IPsim = RegFile[RegB];
			console.error("IPsim now: "+IPsim);
			break;
		case 4:  // JMP to Address
			IPsim = RAM[IPsim].charCodeAt(0);
			console.error("IPsim now: "+IPsim);
			break;
		case 5:  // JMP IF to Address
			if((FC & FLsim[0]) || (FA & FLsim[1]) || (FE & FLsim[2]) || (FZ & FLsim[3])){
			IPsim = RAM[IPsim].charCodeAt(0);
			console.error("IPsim now: "+IPsim);
			}
			else IPsim++;
			break;
		case 6:  // Clear Flags
			FLsim=[0,0,0,0];
			break;
		case 7:  // IO
			
			break;
		}
	}
	
	let divElement1 = document.querySelector("#mem-block"+IPsimBefore);
	divElement1.classList.toggle("marker-ip");
	divElement1.classList.toggle("marker");
		
	document.querySelector("#IP").textContent = ""+paddy(dec2hex(IPsim),2);
	document.querySelector("#AX").textContent = ""+paddy(dec2hex(RegFile[0]),2);
	document.querySelector("#BX").textContent = ""+paddy(dec2hex(RegFile[1]),2);
	document.querySelector("#CX").textContent = ""+paddy(dec2hex(RegFile[2]),2);
	document.querySelector("#DX").textContent = ""+paddy(dec2hex(RegFile[3]),2);
	
	document.querySelector("#flag-C").textContent = ""+FLsim[0];
	document.querySelector("#flag-A").textContent = ""+FLsim[1];
	document.querySelector("#flag-E").textContent = ""+FLsim[2];
	document.querySelector("#flag-Z").textContent = ""+FLsim[3];
	
	divElement = document.querySelector("#mem-block"+IPsim);
	divElement.classList.toggle("marker-ip");
	divElement.classList.toggle("marker");
}


