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


//Шаг осциллятора (8-битный)
function Step(){
	let FCbuf;
	let CODIREG=[0,0];
	let CODIINS=[0,0,0];
	let CODOINS=[0,0,0,0,0,0,0,0];
			
	//Такты счетчика до 7
	STEP=Stepper7(1,M[11]);
			document.querySelector("#ST").textContent = ""+STEP[0]+STEP[1]+STEP[2]+STEP[3]+STEP[4]+STEP[5]+STEP[6];
	STEP=Stepper7(0,M[11]);
	
	
	///////////////////////////////////////////////////////////////////////////////////////
	CODIINS[0]=IR[1];
	CODIINS[1]=IR[2];
	CODIINS[2]=IR[3];
		console.log("CODIINS: "+CODIINS[0]+CODIINS[1]+CODIINS[2]); 
	CODOINS=Decod3x8(CODIINS);
		console.log("CODOINS: "+CODOINS[0]+CODOINS[1]+CODOINS[2]+CODOINS[3]+CODOINS[4]+CODOINS[5]+CODOINS[6]+CODOINS[7]); 
	let f17=NOT(IR[0]);
	
	let f18=AND(f17,CODOINS[7]);
	let f19=AND(f17,CODOINS[6]);
	let f20=AND(f17,CODOINS[5]);
	let f21=AND(f17,CODOINS[4]);
	let f22=AND(f17,CODOINS[3]);
	let f23=AND(f17,CODOINS[2]);
	let f24=AND(f17,CODOINS[1]);
	let f25=AND(f17,CODOINS[0]);
	
	let f26=AND(STEP[3],f18);
	let f27=AND(STEP[3],f19);
	let f28=AND(STEP[3],f20);
	let f29=AND(STEP[3],f21);
	let f30=AND(STEP[3],f22);
	let f31=AND(STEP[3],f23);
	let f32=AND(STEP[3],f24);
	let f33=AND3(STEP[3],f25,IR[4]);
	
	let f34=NOT(IR[4]);
	let f35=AND(STEP[4],f18);
	let f36=AND(STEP[4],f19);
	let f37=AND(STEP[4],f20);
	console.log("f37: "+f37); 
	console.log("f20: "+f20); 
	console.log("STEP[4]: "+STEP[4]);
	console.log("f17: "+f17);
	console.log("CODOINS[2]: "+CODOINS[5]);
	let f38=AND(STEP[4],f22);
	let f39=AND(STEP[4],f23);
	let f40=AND3(STEP[4],f25,f34);
	let f41=AND(STEP[5],f20);
	
	let f42=AND(IR[4],FL[0]);
	let f43=AND(IR[5],FL[1]);
	let f44=AND(IR[6],FL[2]);
	let f45=AND(IR[7],FL[3]);
	let f46=OR4in(f42,f43,f44,f45);
	let f47=AND3(STEP[5],f23,f46);
	
	
	
	CODIREG[0]=IR[6];
	CODIREG[1]=IR[7];
	let CODOREGbe=Decod2x4(CODIREG);
	
	let f5=AND(IR[0],STEP[3]);
	let f6=OR4in(f5,f36,f29,f33);
	let f7=AND(f6,CODOREGbe[3]);
	let f8=AND(f6,CODOREGbe[2]);
	let f9=AND(f6,CODOREGbe[1]);
	let f10=AND(f6,CODOREGbe[0]);
	
	
	
	
	
	
	CODIREG[0]=IR[4];
	CODIREG[1]=IR[5];
	let CODOREGae=Decod2x4(CODIREG);

	let f11=AND(IR[0],STEP[4]);
	let f12=OR4in(f11,f26,f27,0);             //OR3in
	let f13=AND(f12,CODOREGae[3]);
	let f14=AND(f12,CODOREGae[2]);
	let f15=AND(f12,CODOREGae[1]);
	let f16=AND(f12,CODOREGae[0]);
	
	

	
	
	
	
	let f1=AND3(IR[1],IR[2],IR[3]);
	let f2=NOT(f1);
	let f3=AND3(f2,IR[0],STEP[5]);
	let f4=OR4in(f35,f3,f37,f40);
	
	CODIREG[0]=IR[6];
	CODIREG[1]=IR[7];
	let CODOREGbs=Decod2x4(CODIREG);
		









	
	
	//All Enables
	Bus1enable=OR4in(STEP[0],f32,f31,f28);
	IPenable=OR4in(STEP[0],f28,f30,f31);
	RAMenable=OR5in(STEP[1],f47,f38,f37,f35);
	ACCenable=OR4in(STEP[2],f39,f41,f3);
	AXenable=OR(f7,f13);
	BXenable=OR(f8,f14);
	CXenable=OR(f9,f15);
	DXenable=OR(f10,f16);
	IOenable=f40;
	//All Sets
	IRset=STEP[1];
	MARset=OR6in(STEP[0],f28,f31,f26,f27,f30);
	IPset=OR6in(STEP[2],f29,f38,f39,f41,f47);
	ACCset=OR4in(STEP[0],f28,f31,f11);
	RAMset=f36;
	TMPset=f5;
	FLset=OR(f32,f11);
	AXset=AND(f4,CODOREGbs[3]);
	BXset=AND(f4,CODOREGbs[2]);
	CXset=AND(f4,CODOREGbs[1]);
	DXset=AND(f4,CODOREGbs[0]);
	IOset=f33;
	//ALU
	CODI[0]=AND3(STEP[4],IR[0],IR[1]);
	CODI[1]=AND3(STEP[4],IR[0],IR[2]);
	CODI[2]=AND3(STEP[4],IR[0],IR[3]);
	
	document.querySelector("#bus1enable").textContent = "Bus1: "+Bus1enable;
	document.querySelector("#IPenable").textContent = "IP en: "+IPenable;
	document.querySelector("#RAMenable").textContent = "RAM en: "+RAMenable;
	document.querySelector("#ACCenable").textContent = "ACC en: "+ACCenable;
	document.querySelector("#AXenable").textContent = "AX en: "+AXenable;
	document.querySelector("#BXenable").textContent = "BX en: "+BXenable;
	document.querySelector("#CXenable").textContent = "CX en: "+CXenable;
	document.querySelector("#DXenable").textContent = "DX en: "+DXenable;
	document.querySelector("#CODI").textContent = "CODI: "+CODI[0]+CODI[1]+CODI[2];
	
	document.querySelector("#IRset").textContent = "IR set: "+IRset;
	document.querySelector("#IPset").textContent = "IP set: "+IPset;
	document.querySelector("#RAMset").textContent = "RAM set: "+RAMset;
	document.querySelector("#ACCset").textContent = "ACC set: "+ACCset;
	document.querySelector("#AXset").textContent = "AX set: "+AXset;
	document.querySelector("#BXset").textContent = "BX set: "+BXset;
	document.querySelector("#CXset").textContent = "CX set: "+CXset;
	document.querySelector("#DXset").textContent = "DX set: "+DXset;
	document.querySelector("#MARset").textContent = "MAR set: "+MARset;
	document.querySelector("#TMPset").textContent = "TMP set: "+TMPset;
	document.querySelector("#FLset").textContent = "FL set: "+FLset;
	
	
	
	//All Enables
	IPse(0,IPenable);
	IRs(0);
	MARs(0);
	AXse(0,AXenable);
	BXse(0,BXenable);
	CXse(0,CXenable);
	DXse(0,DXenable);
	TMPs(0);
	RAMse(0,RAMenable);
	RegisterACC4(0,ACCenable,0);
	//All Sets
	IPse(IPset,0);
	IRs(IRset);
	MARs(MARset);
	AXse(AXset,0);
	BXse(BXset,0);
	CXse(CXset,0);
	DXse(DXset,0);
	TMPs(TMPset);
	RAMse(RAMset,0);
	RegisterACC4(ACCset,0,Bus1enable);
	
	document.querySelector("#BUS").textContent = "BUS: "+BUS[0]+BUS[1]+BUS[2]+BUS[3]+" "+BUS[4]+BUS[5]+BUS[6]+BUS[7];
	/////////////////////////////////////////////////////////////////////////////////////
	
	//Step1   MOV MAR,IP 	
	if (STEP[0]===1){

			console.warn(">Step "+bin2hex(IP)+"   IP: "+IP[0]+IP[1]+IP[2]+IP[3]+" "+IP[4]+IP[5]+IP[6]+IP[7]);
			//console.log("	         AX: "+AX[0]+AX[1]+AX[2]+AX[3]+" "+AX[4]+AX[5]+AX[6]+AX[7]+"   ("+paddy(bin2hex(AX),2)+")");
			//console.log("	         BX: "+BX[0]+BX[1]+BX[2]+BX[3]+" "+BX[4]+BX[5]+BX[6]+BX[7]+"   ("+paddy(bin2hex(BX),2)+")");
	
	
	
	
	//IPse(0,1);// IP->BUS
	//MARs(1);// BUS->MAR
				
	//ADD IP,1
	//Сохраняем флаг переноса в буфер, чтобы он не влиял на счетчик команд
	FCbuf=FL[0];
	FL[0]=0;
	CODI=[0,0,0];
	//RegisterACC4(1,0,1);// ->ACC  (set,enable,bus1)
	FL[0]=FCbuf;		
	}
	
	
}