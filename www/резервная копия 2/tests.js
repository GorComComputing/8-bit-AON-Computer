//Тест 4-битного сумматора
function ComputeADD(){
	let a = 0;
	let b = 1;
	let c = 0;
	let d = 0;

	let e = 0;
	let f = 1;
	let g = 0;
	let h = 0;

	let carry = 0;	
	
	res=SD4(a,b,c,d,e,f,g,h,0);
	
	console.log("Sum: "+res[0]+res[1]+res[2]+res[3]+res[4]);
	console.log("Количество элементов: "+siliconNum);
	siliconNum =0;
}


//Тест RS-триггера
function ComputeRS(){
	r = 0;
	s = 1;
    console.log("R:"+r);
	console.log("S:"+s);
	console.log("Q:"+q2);

	q2=RS(r,s,q2);
	console.log("Res Q: "+q2);
	console.log("Res notQ: "+NOT(q2));
}


//Тест D-триггера
function ComputeD(){
	d = 0;
	clk = 1;
    console.log("D:"+d);
	console.log("Clk:"+clk);
	console.log("Q:"+q2);

	q2=D(d,clk,q2);
	console.log("Res Q: "+q2);
	console.log("Res notQ: "+NOT(q2));
}


//Тест 4-битной защелки
function ComputeLatch4(){
	d1 = 1;
	d2 = 0;
	d3 = 1;
	d4 = 0;
	clk = 1;
    console.log("D:"+d1+d2+d3+d4);
	console.log("Clk:"+clk);
	console.log("Q:"+q21+q22+q23+q24);

	q2=Latch4(d1,d2,d3,d4,clk,q21,q22,q23,q24);
	q21=q2[0];
	q22=q2[1];
	q23=q2[2];
	q24=q2[3];
	console.log("Res Q: "+q21+q22+q23+q24);
}


//Тест 4-битного регистра
function TestRegR(){
	console.log("BUS: "+BUS[0]+BUS[1]+BUS[2]+BUS[3]+"   ("+bin2hex(BUS)+")");
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
	Register4(AX,0,1);
	console.log("BUS: "+BUS[0]+BUS[1]+BUS[2]+BUS[3]+"   ("+bin2hex(BUS)+")");
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
}


//Тест 4-битного регистра
function TestRegW(){
	console.log("BUS: "+BUS[0]+BUS[1]+BUS[2]+BUS[3]+"   ("+bin2hex(BUS)+")");
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
	Register4(AX,1,0);
	console.log("BUS: "+BUS[0]+BUS[1]+BUS[2]+BUS[3]+"   ("+bin2hex(BUS)+")");
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
}


//Тест XOR
function TestXOR(){
	
	IP[0]=XOR(AX[0],BX[0]);
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
	
}


//Тест XOR4
function TestXOR4(){
	console.log("BX: "+BX[0]+BX[1]+BX[2]+BX[3]+"   ("+bin2hex(BX)+")");
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
	IP=XOR4(AX,BX);
	console.log("BX: "+BX[0]+BX[1]+BX[2]+BX[3]+"   ("+bin2hex(BX)+")");
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
}


//Тест OR4
function TestOR4(){
	console.log("BX: "+BX[0]+BX[1]+BX[2]+BX[3]+"   ("+bin2hex(BX)+")");
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
	IP=OR4(AX,BX);
	console.log("BX: "+BX[0]+BX[1]+BX[2]+BX[3]+"   ("+bin2hex(BX)+")");
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
}


//Тест AND4
function TestAND4(){
	console.log("BX: "+BX[0]+BX[1]+BX[2]+BX[3]+"   ("+bin2hex(BX)+")");
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
	IP=AND4(AX,BX);
	console.log("BX: "+BX[0]+BX[1]+BX[2]+BX[3]+"   ("+bin2hex(BX)+")");
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
}


//Тест NOT4
function TestNOT4(){
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
	IP=NOT4(IP);
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
}


//Тест SHL4
function TestSHL4(){
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
	IP=SHL4(IP);
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
}


//Тест SHR4
function TestSHR4(){
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
	IP=SHR4(IP);
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
}


//Тест BUS1
function TestBUS1(){
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
	IP=BUS1(IP,1);
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
}


//Тест Mult2x1
function TestMult2x1(){
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
	console.log("BX: "+BX[0]+BX[1]+BX[2]+BX[3]+"   ("+bin2hex(BX)+")");
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
	IP[0]=Mult2x1(AX[0],BX[0],0);
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
}


//Тест ALU
function TestALU(){
	let CODI=[];
	CODI[0]=1;
	CODI[1]=0;
	CODI[2]=1;
	
	console.log("AX: "+AX[0]+AX[1]+AX[2]+AX[3]+"   ("+bin2hex(AX)+")");
	console.log("BX: "+BX[0]+BX[1]+BX[2]+BX[3]+"   ("+bin2hex(BX)+")");
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
	IP=ALU4(AX,BX,0,CODI);
	console.log("IP: "+IP[0]+IP[1]+IP[2]+IP[3]+"   ("+bin2hex(IP)+")");
}


//Тест счетчика
function StepperTest(){
	console.error("STEP n: ");
	STEP=Stepper7(1,M[11]);
	console.warn("STEP: "+STEP);
	STEP=Stepper7(0,M[11]);
	//console.log("STEP: "+STEP);
}


//Тест дешифратора 2х4
function TestDecode(){
	let CODIREG=[0,0];
	let CODOREG=[0,0,0,0];
	
	CODIREG=[0,0];
	console.error("CODIREG: "+CODIREG);
	CODOREG=Decod2x4(CODIREG);
	console.log("CODOREG: "+CODOREG);
	
	CODIREG=[0,1];
	console.error("CODIREG: "+CODIREG);
	CODOREG=Decod2x4(CODIREG);
	console.log("CODOREG: "+CODOREG);
	
	CODIREG=[1,0];
	console.error("CODIREG: "+CODIREG);
	CODOREG=Decod2x4(CODIREG);
	console.log("CODOREG: "+CODOREG);
	
	CODIREG=[1,1];
	console.error("CODIREG: "+CODIREG);
	CODOREG=Decod2x4(CODIREG);
	console.log("CODOREG: "+CODOREG);
}


//Тест 1 kHZ
function Test1kHz(){
	gerc=1;      
}


//Тест 1 HZ
function Test1Hz(){
	gerc=1000;      
}


//Тест 4-OR
function TestOR4(){
	console.log("OR4 0000: "+OR4in(0,0,0,0));  
	console.log("OR4 0001: "+OR4in(0,0,0,1)); 
	console.log("OR4 0010: "+OR4in(0,0,1,0));  
	console.log("OR4 0100: "+OR4in(0,1,0,0));  	
	console.log("OR4 1000: "+OR4in(1,0,0,0));  	
	console.log("OR4 1111: "+OR4in(1,1,1,1));   
}