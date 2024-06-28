//RAM
function RAMse(set,enable) {	
	if (enable == 1)
		BUS=dec2bin(RAM[bin2dec(MAR)].charCodeAt(0));// RAM[MAR]->BUS
	return;
}



//8-битный регистр (работает с шиной BUS)
function Register4(REG,clk,enable) {
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
}


//8-битный регистр ACC (работает с АЛУ)
function RegisterACC4(clk,enable,bus1) {
	let RES = [0,0,0,0,0,0,0,0];
	let CODO = [];
	let TMP1 = [];
	
	//console.warn("CODI: "+CODI[0]+CODI[1]+CODI[2]);
	
	CODO=Decod3x8(CODI);
	//console.warn("CODO: "+CODO);
	
	TMP1=BUS1(TMP,bus1);
	//console.warn("TMP1: "+TMP1);
	
	F2=XOR4(BUS,TMP1);
	F3=OR4(BUS,TMP1);
	F4=AND4(BUS,TMP1);
	F5=NOT4(BUS);
	F6=SHL4(BUS,FL[0]);          //F=[0,0,0,0]; //CAEZ 
	F7=SHR4(BUS,FL[0]);          //F=[0,0,0,0]; //CAEZ 
	F8=ADD4(BUS,TMP1,FL[0]);     //F=[0,0,0,0]; //CAEZ 
	//console.warn("FL: "+FL[0]+FL[1]+FL[2]+FL[3]);
	//console.warn("F8: "+F8);
	
	RES[0]=Mult2x1(RES[0],F2[0],CODO[1]);
	RES[1]=Mult2x1(RES[1],F2[1],CODO[1]);
	RES[2]=Mult2x1(RES[2],F2[2],CODO[1]);
	RES[3]=Mult2x1(RES[3],F2[3],CODO[1]);
	RES[4]=Mult2x1(RES[4],F2[4],CODO[1]);
	RES[5]=Mult2x1(RES[5],F2[5],CODO[1]);
	RES[6]=Mult2x1(RES[6],F2[6],CODO[1]);
	RES[7]=Mult2x1(RES[7],F2[7],CODO[1]);
	
	RES[0]=Mult2x1(RES[0],F3[0],CODO[2]);
	RES[1]=Mult2x1(RES[1],F3[1],CODO[2]);
	RES[2]=Mult2x1(RES[2],F3[2],CODO[2]);
	RES[3]=Mult2x1(RES[3],F3[3],CODO[2]);
	RES[4]=Mult2x1(RES[4],F3[4],CODO[2]);
	RES[5]=Mult2x1(RES[5],F3[5],CODO[2]);
	RES[6]=Mult2x1(RES[6],F3[6],CODO[2]);
	RES[7]=Mult2x1(RES[7],F3[7],CODO[2]);
	
	RES[0]=Mult2x1(RES[0],F4[0],CODO[3]);
	RES[1]=Mult2x1(RES[1],F4[1],CODO[3]);
	RES[2]=Mult2x1(RES[2],F4[2],CODO[3]);
	RES[3]=Mult2x1(RES[3],F4[3],CODO[3]);
	RES[4]=Mult2x1(RES[4],F4[4],CODO[3]);
	RES[5]=Mult2x1(RES[5],F4[5],CODO[3]);
	RES[6]=Mult2x1(RES[6],F4[6],CODO[3]);
	RES[7]=Mult2x1(RES[7],F4[7],CODO[3]);
	
	RES[0]=Mult2x1(RES[0],F5[0],CODO[4]);
	RES[1]=Mult2x1(RES[1],F5[1],CODO[4]);
	RES[2]=Mult2x1(RES[2],F5[2],CODO[4]);
	RES[3]=Mult2x1(RES[3],F5[3],CODO[4]);
	RES[4]=Mult2x1(RES[4],F5[4],CODO[4]);
	RES[5]=Mult2x1(RES[5],F5[5],CODO[4]);
	RES[6]=Mult2x1(RES[6],F5[6],CODO[4]);
	RES[7]=Mult2x1(RES[7],F5[7],CODO[4]);
	
	RES[0]=Mult2x1(RES[0],F6[0],CODO[5]);
	RES[1]=Mult2x1(RES[1],F6[1],CODO[5]);
	RES[2]=Mult2x1(RES[2],F6[2],CODO[5]);
	RES[3]=Mult2x1(RES[3],F6[3],CODO[5]);
	RES[4]=Mult2x1(RES[4],F6[4],CODO[5]);
	RES[5]=Mult2x1(RES[5],F6[5],CODO[5]);
	RES[6]=Mult2x1(RES[6],F6[6],CODO[5]);
	RES[7]=Mult2x1(RES[7],F6[7],CODO[5]);
	
	RES[0]=Mult2x1(RES[0],F7[0],CODO[6]);
	RES[1]=Mult2x1(RES[1],F7[1],CODO[6]);
	RES[2]=Mult2x1(RES[2],F7[2],CODO[6]);
	RES[3]=Mult2x1(RES[3],F7[3],CODO[6]);
	RES[4]=Mult2x1(RES[4],F7[4],CODO[6]);
	RES[5]=Mult2x1(RES[5],F7[5],CODO[6]);
	RES[6]=Mult2x1(RES[6],F7[6],CODO[6]);
	RES[7]=Mult2x1(RES[7],F7[7],CODO[6]);
	
	RES[0]=Mult2x1(RES[0],F8[0],CODO[7]);
	RES[1]=Mult2x1(RES[1],F8[1],CODO[7]);
	RES[2]=Mult2x1(RES[2],F8[2],CODO[7]);
	RES[3]=Mult2x1(RES[3],F8[3],CODO[7]);
	RES[4]=Mult2x1(RES[4],F8[4],CODO[7]);
	RES[5]=Mult2x1(RES[5],F8[5],CODO[7]);
	RES[6]=Mult2x1(RES[6],F8[6],CODO[7]);
	RES[7]=Mult2x1(RES[7],F8[7],CODO[7]);
	
	//console.warn("RES: "+RES[0]+RES[1]+RES[2]+RES[3]+RES[4]+RES[5]+RES[6]+RES[7]);
	
	//Сохраняем в регистр ACC результат АЛУ
	ACC[0]=D(RES[0],clk,ACC[0]);
	ACC[1]=D(RES[1],clk,ACC[1]);
	ACC[2]=D(RES[2],clk,ACC[2]);
	ACC[3]=D(RES[3],clk,ACC[3]);
	ACC[4]=D(RES[4],clk,ACC[4]);
	ACC[5]=D(RES[5],clk,ACC[5]);
	ACC[6]=D(RES[6],clk,ACC[6]);
	ACC[7]=D(RES[7],clk,ACC[7]);

	BUS[0]=Mult2x1(BUS[0],ACC[0],enable);
	BUS[1]=Mult2x1(BUS[1],ACC[1],enable);
	BUS[2]=Mult2x1(BUS[2],ACC[2],enable);
	BUS[3]=Mult2x1(BUS[3],ACC[3],enable);
	BUS[4]=Mult2x1(BUS[4],ACC[4],enable);
	BUS[5]=Mult2x1(BUS[5],ACC[5],enable);
	BUS[6]=Mult2x1(BUS[6],ACC[6],enable);
	BUS[7]=Mult2x1(BUS[7],ACC[7],enable);


//console.warn("C: "+F8[8]);
	//Сохраняем в регистр FL (флаги) результат АЛУ
	FL[0]=D(F8[8],clk,FL[0]);
	//FL[1]=D(RES[1],clk,FL[1]);
	//FL[2]=D(RES[2],clk,FL[2]);
	//FL[3]=D(RES[3],clk,FL[3]);
//console.warn("FL[C]: "+FL[0]);
	
	
//	RES[4]=//larger
//	RES[5]=//equal
//	RES[6]=//zero
//	RES[7]=//carry out
	return;
}


//Цикл осциллятора (8-битный)
function Loop(){
	let FCbuf;
			
			//Измерение частоты процессора
			startTime = Date.now();    
	
	//Такты счетчика до 7
	STEP=Stepper7(1,M[11]);
			document.querySelector("#ST").textContent = ""+STEP[0]+STEP[1]+STEP[2]+STEP[3]+STEP[4]+STEP[5]+STEP[6];
	STEP=Stepper7(0,M[11]);
	
	
			
	
	
	
	if (STEP[0]==1){
	//Step1   MOV MAR,IP 
			console.warn(">Step "+bin2hex(IP)+"   IP: "+IP[0]+IP[1]+IP[2]+IP[3]+" "+IP[4]+IP[5]+IP[6]+IP[7]);
			console.log("	         AX: "+AX[0]+AX[1]+AX[2]+AX[3]+" "+AX[4]+AX[5]+AX[6]+AX[7]+"   ("+paddy(bin2hex(AX),2)+")");
			console.log("	         BX: "+BX[0]+BX[1]+BX[2]+BX[3]+" "+BX[4]+BX[5]+BX[6]+BX[7]+"   ("+paddy(bin2hex(BX),2)+")");
	Register4(IP,0,1);// IP->BUS
	Register4(MAR,1,0);// BUS->TMP
			document.querySelector("#MAR").textContent = ""+paddy(bin2hex(MAR),2);
	
	//ADD IP,1
	//Устанавливаем код АЛУ в 000 (ADD), чтобы сбросить предыдущее значение
	CODI=[0,0,0];
	//Сохраняем флаг переноса в буфер, чтобы он не влиял на счетчик команд
	FCbuf=FL[0];
	FL[0]=0;
	RegisterACC4(1,0,1);// ->ACC  (set,enable,bus1)
	FL[0]=FCbuf;
			document.querySelector("#ACC").textContent = ""+paddy(bin2hex(ACC),2);	
			document.querySelector("#flag-C").textContent = ""+FL[0];
			document.querySelector("#flag-A").textContent = ""+FL[1];
			document.querySelector("#flag-E").textContent = ""+FL[2];
			document.querySelector("#flag-Z").textContent = ""+FL[3];			
	}
	//MOV IR,[MAR]
	//BUS=dec2bin(RAM[bin2dec(MAR)].charCodeAt(0));// RAM[MAR]->BUS
	//console.log("       RAM ["+paddy(bin2hex(MAR),2)+"]: "+BUS[0]+BUS[1]+BUS[2]+BUS[3]+" "+BUS[4]+BUS[5]+BUS[6]+BUS[7]+"   ("+bin2hex(BUS)+")");
	//Register4(IR,1,0);// BUS->IR
	//document.querySelector("#IR").textContent = ""+IR[0]+IR[1]+IR[2]+IR[3]+" "+IR[4]+IR[5]+IR[6]+IR[7];
	
	
	
	if (STEP[1]==1){
	//Step2   MOV BX,[MAR]
	RAMse(0,1);
			console.log("       RAM ["+paddy(bin2hex(MAR),2)+"]: "+BUS[0]+BUS[1]+BUS[2]+BUS[3]+" "+BUS[4]+BUS[5]+BUS[6]+BUS[7]+"   ("+bin2hex(BUS)+")");
	Register4(BX,1,0);// BUS->BX
			document.querySelector("#BX").textContent = ""+paddy(bin2hex(BX),2);
			//document.querySelector("#IR").textContent = ""+IR[0]+IR[1]+IR[2]+IR[3]+" "+IR[4]+IR[5]+IR[6]+IR[7];
	
	//Register4(IR,1,0);// BUS->IR
	//document.querySelector("#IR").textContent = ""+IR[0]+IR[1]+IR[2]+IR[3]+" "+IR[4]+IR[5]+IR[6]+IR[7];
	}
	
	
	
	if (STEP[2]==1){
	//Step3
	
			let divElement1 = document.querySelector("#mem-block"+bin2dec(IP));
			divElement1.classList.toggle("marker-ip");
			divElement1.classList.toggle("marker");
	
	//FL[0]=0;
	//document.querySelector("#flag-C").textContent = ""+FL[0];
	
	
	//Register4(IP,0,1);// IP->BUS    (set,enable)

	
	//Выдать на шину BUS значение регистра ACC
	RegisterACC4(0,1,0); // ACC->BUS    (set,enable,bus1)
	//Сохранение результата c шины BUS в регистре IP
	Register4(IP,1,0); // BUS->IP    (set,enable)
			document.querySelector("#IP").textContent = ""+paddy(bin2hex(IP),2);




			let divElement = document.querySelector("#mem-block"+bin2dec(IP));
			divElement.classList.toggle("marker-ip");
			divElement.classList.toggle("marker");
	}
	
	
	
	
	if (STEP[3]==1){
	//Step4	
	//ADD AX,BX
	Register4(BX,0,1);// BX->BUS
	Register4(TMP,1,0);// BUS->TMP
			document.querySelector("#TMP").textContent = ""+paddy(bin2hex(TMP),2);
	}
	
	
	
	
	if (STEP[4]==1){
	//Step5
	
	CODI[0]=IR[1];
	CODI[1]=IR[2];
	CODI[2]=IR[3];
	
	Register4(AX,0,1);// AX->BUS
	//FL[0]=0;
	//console.error("TMP:",TMP);
	//console.error("BUS:",BUS);
	//console.error("ACC:",ACC);
	RegisterACC4(1,0,0);// ->ACC  (set,enable,bus1)
	//console.error("TMP:",TMP);
	//console.error("BUS:",BUS);
	//console.error("ACC:",ACC);
			document.querySelector("#ACC").textContent = ""+paddy(bin2hex(ACC),2);
			document.querySelector("#flag-C").textContent = ""+FL[0];
			document.querySelector("#flag-A").textContent = ""+FL[1];
			document.querySelector("#flag-E").textContent = ""+FL[2];
			document.querySelector("#flag-Z").textContent = ""+FL[3];
	}
	
	
	
	if (STEP[5]==1){
	//Step6
	//Выдать на шину BUS значение регистра ACC
	RegisterACC4(0,1,0);// ACC->BUS  (set,enable,bus1)
	//Сохранение результата c шины BUS в регистре AX
	Register4(AX,1,0);// BUS->AX   (set,enable)
			document.querySelector("#AX").textContent = ""+paddy(bin2hex(AX),2);
	
	
			console.log("	         AX: "+AX[0]+AX[1]+AX[2]+AX[3]+" "+AX[4]+AX[5]+AX[6]+AX[7]+"   ("+paddy(bin2hex(AX),2)+")");
			console.log("	         BX: "+BX[0]+BX[1]+BX[2]+BX[3]+" "+BX[4]+BX[5]+BX[6]+BX[7]+"   ("+paddy(bin2hex(BX),2)+")");
	

			document.querySelector("#CX").textContent = ""+paddy(bin2hex(CX),2);
			document.querySelector("#DX").textContent = ""+paddy(bin2hex(DX),2);
	}

	
	
	
	
	//Измерение частоты процессора
	elapsedTime = Date.now() - startTime;
	
	//Служебная информация
    //console.warn("Частота: "+Math.ceil(1000/elapsedTime)+" Гц, Элементов: "+siliconNum+", Транзисторов: "+siliconNum*2);
	siliconNum=0;

}