//8-битный регистр счетчик команд
let IP=[0,0,0,0,0,0,0,0];

//8-битный регистр команд
let IR=[0,0,0,0,0,0,0,0];

//8-битный буфер шины адреса
let MAR=[0,0,0,0,0,0,0,0];

//8-битные регистры общего назначения
let AX=[0,0,0,0,0,0,0,1];
let BX=[0,0,0,0,0,0,1,0];
let CX=[0,0,0,0,0,0,1,1];
let DX=[0,0,0,0,0,1,0,0];

//4-битный регистр флагов
let FL=[0,0,0,0]; //CAEZ

//8-битная внутренняя шина
let BUS=[0,0,0,0,0,0,0,0];

//8-битные буферные регистры АЛУ
let TMP=[0,0,0,0,0,0,0,0];
let ACC=[0,0,0,0,0,0,0,0];

//Память RAM		 
//let RAM=[];
let RAM = new Array(256).fill(0);



//RAM
function RAMse(set,enable) {	
	if (enable == 1)
		BUS=dec2bin(RAM[bin2dec(MAR)].charCodeAt(0));// RAM[MAR]->BUS
	return;
}


//8-битный регистр IP (работает с шиной BUS)
function IPse(set,enable) {
	//Set
	IP[0]=D(BUS[0],set,IP[0]);
	IP[1]=D(BUS[1],set,IP[1]);
	IP[2]=D(BUS[2],set,IP[2]);
	IP[3]=D(BUS[3],set,IP[3]);
	IP[4]=D(BUS[4],set,IP[4]);
	IP[5]=D(BUS[5],set,IP[5]);
	IP[6]=D(BUS[6],set,IP[6]);
	IP[7]=D(BUS[7],set,IP[7]);
	//Enable
	BUS[0]=Mult2x1(BUS[0],IP[0],enable);
	BUS[1]=Mult2x1(BUS[1],IP[1],enable);
	BUS[2]=Mult2x1(BUS[2],IP[2],enable);
	BUS[3]=Mult2x1(BUS[3],IP[3],enable);
	BUS[4]=Mult2x1(BUS[4],IP[4],enable);
	BUS[5]=Mult2x1(BUS[5],IP[5],enable);
	BUS[6]=Mult2x1(BUS[6],IP[6],enable);
	BUS[7]=Mult2x1(BUS[7],IP[7],enable);
	document.querySelector("#IP").textContent = ""+paddy(bin2hex(IP),2);
	return;
}


//8-битный регистр IR (работает с шиной BUS) только set
function IRs(set) {
	//Set
	IR[0]=D(BUS[0],set,IR[0]);
	IR[1]=D(BUS[1],set,IR[1]);
	IR[2]=D(BUS[2],set,IR[2]);
	IR[3]=D(BUS[3],set,IR[3]);
	IR[4]=D(BUS[4],set,IR[4]);
	IR[5]=D(BUS[5],set,IR[5]);
	IR[6]=D(BUS[6],set,IR[6]);
	IR[7]=D(BUS[7],set,IR[7]);
	document.querySelector("#IR").textContent = ""+IR[0]+IR[1]+IR[2]+IR[3]+" "+IR[4]+IR[5]+IR[6]+IR[7];
	return;
}


//8-битный регистр MAR (работает с шиной BUS) только set
function MARs(set) {
	//Set
	MAR[0]=D(BUS[0],set,MAR[0]);
	MAR[1]=D(BUS[1],set,MAR[1]);
	MAR[2]=D(BUS[2],set,MAR[2]);
	MAR[3]=D(BUS[3],set,MAR[3]);
	MAR[4]=D(BUS[4],set,MAR[4]);
	MAR[5]=D(BUS[5],set,MAR[5]);
	MAR[6]=D(BUS[6],set,MAR[6]);
	MAR[7]=D(BUS[7],set,MAR[7]);
	document.querySelector("#MAR").textContent = ""+paddy(bin2hex(MAR),2);
	return;
}


//8-битный регистр AX (работает с шиной BUS)
function AXse(set,enable) {
	//Set
	AX[0]=D(BUS[0],set,AX[0]);
	AX[1]=D(BUS[1],set,AX[1]);
	AX[2]=D(BUS[2],set,AX[2]);
	AX[3]=D(BUS[3],set,AX[3]);
	AX[4]=D(BUS[4],set,AX[4]);
	AX[5]=D(BUS[5],set,AX[5]);
	AX[6]=D(BUS[6],set,AX[6]);
	AX[7]=D(BUS[7],set,AX[7]);
	//Enable
	BUS[0]=Mult2x1(BUS[0],AX[0],enable);
	BUS[1]=Mult2x1(BUS[1],AX[1],enable);
	BUS[2]=Mult2x1(BUS[2],AX[2],enable);
	BUS[3]=Mult2x1(BUS[3],AX[3],enable);
	BUS[4]=Mult2x1(BUS[4],AX[4],enable);
	BUS[5]=Mult2x1(BUS[5],AX[5],enable);
	BUS[6]=Mult2x1(BUS[6],AX[6],enable);
	BUS[7]=Mult2x1(BUS[7],AX[7],enable);
	document.querySelector("#AX").textContent = ""+paddy(bin2hex(AX),2);
	return;
}


//8-битный регистр BX (работает с шиной BUS)
function BXse(set,enable) {
	//Set
	BX[0]=D(BUS[0],set,BX[0]);
	BX[1]=D(BUS[1],set,BX[1]);
	BX[2]=D(BUS[2],set,BX[2]);
	BX[3]=D(BUS[3],set,BX[3]);
	BX[4]=D(BUS[4],set,BX[4]);
	BX[5]=D(BUS[5],set,BX[5]);
	BX[6]=D(BUS[6],set,BX[6]);
	BX[7]=D(BUS[7],set,BX[7]);
	//Enable
	BUS[0]=Mult2x1(BUS[0],BX[0],enable);
	BUS[1]=Mult2x1(BUS[1],BX[1],enable);
	BUS[2]=Mult2x1(BUS[2],BX[2],enable);
	BUS[3]=Mult2x1(BUS[3],BX[3],enable);
	BUS[4]=Mult2x1(BUS[4],BX[4],enable);
	BUS[5]=Mult2x1(BUS[5],BX[5],enable);
	BUS[6]=Mult2x1(BUS[6],BX[6],enable);
	BUS[7]=Mult2x1(BUS[7],BX[7],enable);
	document.querySelector("#BX").textContent = ""+paddy(bin2hex(BX),2);
	return;
}


//8-битный регистр CX (работает с шиной BUS)
function CXse(set,enable) {
	//Set
	CX[0]=D(BUS[0],set,CX[0]);
	CX[1]=D(BUS[1],set,CX[1]);
	CX[2]=D(BUS[2],set,CX[2]);
	CX[3]=D(BUS[3],set,CX[3]);
	CX[4]=D(BUS[4],set,CX[4]);
	CX[5]=D(BUS[5],set,CX[5]);
	CX[6]=D(BUS[6],set,CX[6]);
	CX[7]=D(BUS[7],set,CX[7]);
	//Enable
	BUS[0]=Mult2x1(BUS[0],CX[0],enable);
	BUS[1]=Mult2x1(BUS[1],CX[1],enable);
	BUS[2]=Mult2x1(BUS[2],CX[2],enable);
	BUS[3]=Mult2x1(BUS[3],CX[3],enable);
	BUS[4]=Mult2x1(BUS[4],CX[4],enable);
	BUS[5]=Mult2x1(BUS[5],CX[5],enable);
	BUS[6]=Mult2x1(BUS[6],CX[6],enable);
	BUS[7]=Mult2x1(BUS[7],CX[7],enable);
	document.querySelector("#CX").textContent = ""+paddy(bin2hex(CX),2);
	return;
}


//8-битный регистр DX (работает с шиной BUS)
function DXse(set,enable) {
	//Set
	DX[0]=D(BUS[0],set,DX[0]);
	DX[1]=D(BUS[1],set,DX[1]);
	DX[2]=D(BUS[2],set,DX[2]);
	DX[3]=D(BUS[3],set,DX[3]);
	DX[4]=D(BUS[4],set,DX[4]);
	DX[5]=D(BUS[5],set,DX[5]);
	DX[6]=D(BUS[6],set,DX[6]);
	DX[7]=D(BUS[7],set,DX[7]);
	//Enable
	BUS[0]=Mult2x1(BUS[0],DX[0],enable);
	BUS[1]=Mult2x1(BUS[1],DX[1],enable);
	BUS[2]=Mult2x1(BUS[2],DX[2],enable);
	BUS[3]=Mult2x1(BUS[3],DX[3],enable);
	BUS[4]=Mult2x1(BUS[4],DX[4],enable);
	BUS[5]=Mult2x1(BUS[5],DX[5],enable);
	BUS[6]=Mult2x1(BUS[6],DX[6],enable);
	BUS[7]=Mult2x1(BUS[7],DX[7],enable);
	document.querySelector("#DX").textContent = ""+paddy(bin2hex(DX),2);
	return;
}


//8-битный регистр TMP (работает с шиной BUS) только set
function TMPs(set) {
	//Set
	TMP[0]=D(BUS[0],set,TMP[0]);
	TMP[1]=D(BUS[1],set,TMP[1]);
	TMP[2]=D(BUS[2],set,TMP[2]);
	TMP[3]=D(BUS[3],set,TMP[3]);
	TMP[4]=D(BUS[4],set,TMP[4]);
	TMP[5]=D(BUS[5],set,TMP[5]);
	TMP[6]=D(BUS[6],set,TMP[6]);
	TMP[7]=D(BUS[7],set,TMP[7]);
	document.querySelector("#TMP").textContent = ""+paddy(bin2hex(TMP),2);
	return;
}




//8-битный регистр (работает с шиной BUS)
/*function Register4(REG,clk,enable) {
	REG[0]=D(BUS[0],clk,REG[0]);
	REG[1]=D(BUS[1],clk,REG[1]);
	REG[2]=D(BUS[2],clk,REG[2]);
	REG[3]=D(BUS[3],clk,REG[3]);
	REG[4]=D(BUS[4],clk,REG[4]);
	REG[5]=D(BUS[5],clk,REG[5]);
	REG[6]=D(BUS[6],clk,REG[6]);
	REG[7]=D(BUS[7],clk,REG[7]);

	BUS[0]=Mult2x1(BUS[0],REG[0],enable);
	BUS[1]=Mult2x1(BUS[1],REG[1],enable);
	BUS[2]=Mult2x1(BUS[2],REG[2],enable);
	BUS[3]=Mult2x1(BUS[3],REG[3],enable);
	BUS[4]=Mult2x1(BUS[4],REG[4],enable);
	BUS[5]=Mult2x1(BUS[5],REG[5],enable);
	BUS[6]=Mult2x1(BUS[6],REG[6],enable);
	BUS[7]=Mult2x1(BUS[7],REG[7],enable);
	return;
}*/