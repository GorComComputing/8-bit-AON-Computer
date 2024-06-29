//Stepper7
let M=[0,0,0,0,0,0,0,0,0,0,0,0];

//Шина управления
let CODI=[0,0,0];
//All Enables
let Bus1enable=0;
let IPenable=0;
let RAMenable=0;
let ACCenable=0;
let AXenable=0;
let BXenable=0;
let CXenable=0;
let DXenable=0;
//All Sets
let IRset=0;
let MARset=0;
let IPset=0;
let ACCset=0;
let RAMset=0;
let TMPset=0;
let FLset=0;
let AXset=0;
let BXset=0;
let CXset=0;
let DXset=0;


//Цикл осциллятора (8-битный)
function Loop(){
	let FCbuf;
	let CODIREG=[0,0];
	let RegBe;
	let RegAe;
	let RegBs;
	let ACCs;
	let TMPset;
	let f1,f2,f3,f4,f5;
	let CODOREGae;
	let CODOREGbe;
	let CODOREGbs;
	
	let CODOINS=[0,0,0,0,0,0,0,0];
			
  	
	//Такты счетчика до 7
	STEP=Stepper7(1,M[11]);
			document.querySelector("#ST").textContent = ""+STEP[0]+STEP[1]+STEP[2]+STEP[3]+STEP[4]+STEP[5]+STEP[6];
	STEP=Stepper7(0,M[11]);
	
	
		
	//Step1   MOV MAR,IP 	
	if (STEP[0]==1){

			console.warn(">Step "+bin2hex(IP)+"   IP: "+IP[0]+IP[1]+IP[2]+IP[3]+" "+IP[4]+IP[5]+IP[6]+IP[7]);
			console.log("	         AX: "+AX[0]+AX[1]+AX[2]+AX[3]+" "+AX[4]+AX[5]+AX[6]+AX[7]+"   ("+paddy(bin2hex(AX),2)+")");
			console.log("	         BX: "+BX[0]+BX[1]+BX[2]+BX[3]+" "+BX[4]+BX[5]+BX[6]+BX[7]+"   ("+paddy(bin2hex(BX),2)+")");
	
	
	///////////////////////////////////////////////////////////////////////////////////////
	CODIREG[0]=IR[6];
	CODIREG[1]=IR[7];
	CODOREGbe=Decod2x4(CODIREG);
	
	f5=AND(IR[0],STEP[3]);
	f6=OR4in(f5,0,0,0);
	f7=AND(f6,CODOREGbe[3]);
	f8=AND(f6,CODOREGbe[2]);
	f9=AND(f6,CODOREGbe[3]);
	f10=AND(f6,CODOREGbe[0]);
	
	
	
	
	
	
	CODIREG[0]=IR[4];
	CODIREG[1]=IR[5];
	CODOREGae=Decod2x4(CODIREG);

	f11=AND(IR[0],STEP[4]);
	f12=OR4in(f11,0,0,0);
	f13=AND(f12,CODOREGae[3]);
	f14=AND(f12,CODOREGae[2]);
	f15=AND(f12,CODOREGae[1]);
	f16=AND(f12,CODOREGae[0]);
	
	

	
	
	
	
	f1=AND3(IR[1],IR[2],IR[3]);
	f2=NOT(f1);
	f3=AND3(f2,IR[0],STEP[5]);
	f4=OR4in(0,f3,0,0);
	
	CODIREG[0]=IR[6];
	CODIREG[1]=IR[7];
	CODOREGbs=Decod2x4(CODIREG);
		

	
	
	//All Enables
	Bus1enable=OR4in(STEP[0],0,0,0);
	IPenable=OR4in(STEP[0],0,0,0);
	RAMenable=OR4in(STEP[1],0,0,0);
	ACCenable=OR4in(STEP[2],0,0,f3);
	AXenable=OR();
	BXenable=OR();
	CXenable=OR();
	DXenable=OR();
	//All Sets
	IRset=0;
	MARset=0;
	IPset=0;
	ACCset=OR4in(STEP[0],0,0,f11);
	RAMset=0;
	TMPset=f5;
	FLset=0;
	AXset=AND(f4,CODOREGbs[3]);
	BXset=AND(f4,CODOREGbs[2]);
	CXset=AND(f4,CODOREGbs[1]);
	DXset=AND(f4,CODOREGbs[0]);
	//ALU
	CODI[0]=AND3(STEP[4],IR[0],IR[1]);
	CODI[1]=AND3(STEP[4],IR[0],IR[2]);
	CODI[2]=AND3(STEP[4],IR[0],IR[3]);
	
	/////////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
	IPse(0,1);// IP->BUS
	MARs(1);// BUS->MAR
				
	//ADD IP,1
	//Сохраняем флаг переноса в буфер, чтобы он не влиял на счетчик команд
	FCbuf=FL[0];
	FL[0]=0;
	CODI=[0,0,0];
	RegisterACC4(1,0,1);// ->ACC  (set,enable,bus1)
	FL[0]=FCbuf;		
	}
	
	
	//Step2   MOV IR,[MAR]
	if (STEP[1]==1){

	RAMse(0,1);
			console.log("       RAM ["+paddy(bin2hex(MAR),2)+"]: "+BUS[0]+BUS[1]+BUS[2]+BUS[3]+" "+BUS[4]+BUS[5]+BUS[6]+BUS[7]+"   ("+bin2hex(BUS)+")");
	IRs(1);// BUS->IR		
	}
	
	
	//Step3
	if (STEP[2]==1){
	
			let divElement1 = document.querySelector("#mem-block"+bin2dec(IP));
			divElement1.classList.toggle("marker-ip");
			divElement1.classList.toggle("marker");
	
	//Выдать на шину BUS значение регистра ACC
	CODI=[0,0,0];
	RegisterACC4(0,1,0); // ACC->BUS    (set,enable,bus1)
	//Сохранение результата c шины BUS в регистре IP
	IPse(1,0);// BUS->IP 
			
			let divElement = document.querySelector("#mem-block"+bin2dec(IP));
			divElement.classList.toggle("marker-ip");
			divElement.classList.toggle("marker");
	}
	
	
	
	//Step4		
	if (STEP[3]==1){
	
	TMPset=RegBe=AND(IR[0],STEP[3]);
	
	CODIREG[0]=IR[6];
	CODIREG[1]=IR[7];
	CODOREGbe=Decod2x4(CODIREG);
	
	//ADD AX,BX
	if(CODOREGbe[3]) AXse(0,1);// AX->BUS
	if(CODOREGbe[2]) BXse(0,1);// BX->BUS
	if(CODOREGbe[1]) CXse(0,1);// CX->BUS
	if(CODOREGbe[0]) DXse(0,1);// DX->BUS
	
	TMPs(1);//BUS->TMP		
	}
	
	
	
	//Step5
	if (STEP[4]==1){
	
	CODI[0]=IR[1];
	CODI[1]=IR[2];
	CODI[2]=IR[3];
	
	RegAe=ACCs=AND(IR[0],STEP[4]);
	
	CODIREG[0]=IR[4];
	CODIREG[1]=IR[5];
	CODOREGae=Decod2x4(CODIREG);

	if(CODOREGae[3]) AXse(0,1);// AX->BUS
	if(CODOREGae[2]) BXse(0,1);// BX->BUS
	if(CODOREGae[1]) CXse(0,1);// CX->BUS
	if(CODOREGae[0]) DXse(0,1);// DX->BUS
	
	RegisterACC4(1,0,0);// ->ACC  (set,enable,bus1)
	}
	
	
	//Step6
	if (STEP[5]==1){
	
	f1=AND3(IR[1],IR[2],IR[3]);
	f2=NOT(f1);
	ACCe=RegBs=AND3(f2,IR[0],STEP[5]);
	
	CODIREG[0]=IR[6];
	CODIREG[1]=IR[7];
	CODOREGbs=Decod2x4(CODIREG);
		
	//Выдать на шину BUS значение регистра ACC
	RegisterACC4(0,1,0);// ACC->BUS  (set,enable,bus1)
	
	//Сохранение результата c шины BUS в регистре AX
	if(CODOREGbs[3]) AXse(1,0);// BUS->AX
	if(CODOREGbs[2]) BXse(1,0);// BUS->BX
	if(CODOREGbs[1]) CXse(1,0);// BUS->CX
	if(CODOREGbs[0]) DXse(1,0);// BUS->DX
	
			console.log("	         AX: "+AX[0]+AX[1]+AX[2]+AX[3]+" "+AX[4]+AX[5]+AX[6]+AX[7]+"   ("+paddy(bin2hex(AX),2)+")");
			console.log("	         BX: "+BX[0]+BX[1]+BX[2]+BX[3]+" "+BX[4]+BX[5]+BX[6]+BX[7]+"   ("+paddy(bin2hex(BX),2)+")");
	}

	
	
	
	

	
	//Служебная информация
    //console.warn("Элементов: "+siliconNum+", Транзисторов: "+siliconNum*2);
	siliconNum=0;

}