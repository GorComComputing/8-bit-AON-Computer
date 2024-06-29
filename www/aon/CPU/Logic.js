//little-endian

//2AND
function AND(a,b) {
	return a*b;
}


//2OR
function OR(a,b) {
	if (a+b) return 1;
	else return 0;
}


//NOT
function NOT(a) {
	return 1-a;
}


//2XOR
function XOR(a,b) {
	let f1=NOT(a);
	let f2=NOT(b);
	let f3=AND(f1,b);
	let f4=AND(a,f2);
	let f5=NOT(f3);
	let f6=NOT(f4);
	let f7=AND(f5,f6);
	return NOT(f7);
}


//3-AND
function AND3(a,b,c) {
	let f1=AND(a,b);
	return AND(c,f1);
}


//4-OR
function OR4in(a,b,c,d) {
	let f1=OR(a,b);
	let f2=OR(c,d);
	return OR(f1,f2);
}


//5-OR
function OR5in(a,b,c,d,e) {
	let f1=OR4in(a,b,c,d);
	return OR(f1,e);
}


//6-OR
function OR6in(a,b,c,d,e,f) {
	let f1=OR(a,b);
	let f2=OR(c,d);
	let f3=OR(f1,f2);
	let f4=OR(e,f);
	return OR(f3,f4);
}


//Полусумматор
function HS(a,b) {
	let f1=AND(a,b);
	let f2=OR(a,b);
	let f3=NOT(f1)
	return AND(f2,f3);
}


//Полный сумматор с переносом из предыдущего разряда
function SD(a,b,d) {
	let f1=HS(a,b);
	let c=HS(f1,d);
	let f2=AND(f1,d);
	let f3=AND(a,b);
	d=OR(f2,f3);
	return [d, c];
}


//RS-триггер
function RS(r,s,q) {
	if(s===1 && r===1){console.error("Error RS: S=1 R=1");return;}
	let notQ=NOT(OR(s,q));
	return NOT(OR(r,notQ));
}


//D-триггер
function D(d,clk,q) {
	let f1=NOT(d);
	let f2=AND(f1,clk);
	let f3=AND(d,clk);
	return RS(f2,f3,q);
}


//Дешифратор 3х8
function Decod3x8(CODI) {
	let CODO=[];

	let f1=NOT(CODI[0]);
	let f2=NOT(CODI[1]);
	let f3=NOT(CODI[2]);

	CODO[7]=AND3(f1,f2,f3);//000
	CODO[6]=AND3(f1,f2,CODI[2]);//001
	CODO[5]=AND3(f1,CODI[1],f3);//010
	CODO[4]=AND3(f1,CODI[1],CODI[2]);//011
	CODO[3]=AND3(CODI[0],f2,f3);//100
	CODO[2]=AND3(CODI[0],f2,CODI[2]);//101
	CODO[1]=AND3(CODI[0],CODI[1],f3);//110
	CODO[0]=AND3(CODI[0],CODI[1],CODI[2]);//111
	return CODO;
}


//Дешифратор 2х4
function Decod2x4(CODIREG) {
	let CODOREG=[];

	let f1=NOT(CODIREG[0]);
	let f2=NOT(CODIREG[1]);

	CODOREG[3]=AND(f1,f2); //00
	CODOREG[2]=AND(f1,CODIREG[1]); //01
	CODOREG[1]=AND(CODIREG[0],f2); //10
	CODOREG[0]=AND(CODIREG[0],CODIREG[1]); //11
	return CODOREG;
}


//Мультиплексор 2х1
function Mult2x1(a,b,sel) {
	let f1=AND(b,sel);
	let f2=NOT(sel);
	let f3=AND(a,f2);
	return OR(f1,f3);
}


//8-битный сумматор с переносом из предыдущего разряда
function ADD4(A,B,carry) {
	let res1=SD(A[7],B[7],carry);
	let res2=SD(A[6],B[6],res1[0]);
	let res3=SD(A[5],B[5],res2[0]);
	let res4=SD(A[4],B[4],res3[0]);
	let res5=SD(A[3],B[3],res4[0]);
	let res6=SD(A[2],B[2],res5[0]);
	let res7=SD(A[1],B[1],res6[0]);
	let res8=SD(A[0],B[0],res7[0]);
	
	//Бит переноса делаю в конце массива !!!
	return [res8[1], res7[1], res6[1], res5[1], res4[1], res3[1], res2[1], res1[1], res8[0]];
}


//8-битный XOR
function XOR4(A,B) {
	let res = [];
	res[0]=XOR(A[0],B[0]);
	res[1]=XOR(A[1],B[1]);
	res[2]=XOR(A[2],B[2]);
	res[3]=XOR(A[3],B[3]);
	res[4]=XOR(A[4],B[4]);
	res[5]=XOR(A[5],B[5]);
	res[6]=XOR(A[6],B[6]);
	res[7]=XOR(A[7],B[7]);
	return res;
}


//8-битный OR
function OR4(A,B) {
	let res = [];
	res[0]=OR(A[0],B[0]);
	res[1]=OR(A[1],B[1]);
	res[2]=OR(A[2],B[2]);
	res[3]=OR(A[3],B[3]);
	res[4]=OR(A[4],B[4]);
	res[5]=OR(A[5],B[5]);
	res[6]=OR(A[6],B[6]);
	res[7]=OR(A[7],B[7]);
	return res;
}


//8-битный AND
function AND4(A,B) {
	let res = [];
	res[0]=AND(A[0],B[0]);
	res[1]=AND(A[1],B[1]);
	res[2]=AND(A[2],B[2]);
	res[3]=AND(A[3],B[3]);
	res[4]=AND(A[4],B[4]);
	res[5]=AND(A[5],B[5]);
	res[6]=AND(A[6],B[6]);
	res[7]=AND(A[7],B[7]);
	return res;
}


//8-битный NOT
function NOT4(A) {
	let res = [];
	res[0]=NOT(A[0]);
	res[1]=NOT(A[1]);
	res[2]=NOT(A[2]);
	res[3]=NOT(A[3]);
	res[4]=NOT(A[4]);
	res[5]=NOT(A[5]);
	res[6]=NOT(A[6]);
	res[7]=NOT(A[7]);
	return res;
}


//8-битный сдвиг влево
function SHL4(A,carry) {
	let res = [];
	res[0]=A[1];
	res[1]=A[2];
	res[2]=A[3];
	res[3]=A[4];
	res[4]=A[5];
	res[5]=A[6];
	res[6]=A[7];
	res[7]=carry;
	return res;
}


//8-битный сдвиг вправо
function SHR4(A,carry) {
	let res = [];
	res[0]=carry;
	res[1]=A[0];
	res[2]=A[1];
	res[3]=A[2];
	res[4]=A[3];
	res[5]=A[4];
	res[6]=A[5];
	res[7]=A[6];
	return res;
}


//8-битный bus 1
function BUS1(A,bus1) {
	let res = [];
	let f1=NOT(bus1);
	res[0]=AND(A[0],f1);
	res[1]=AND(A[1],f1);
	res[2]=AND(A[2],f1);
	res[3]=AND(A[3],f1);
	res[4]=AND(A[4],f1);
	res[5]=AND(A[5],f1);
	res[6]=AND(A[6],f1);
	res[7]=OR(A[7],bus1);
	return res;
}


//Счетчик 7-шаговый
function Stepper7(clk,rst) {
	let STEP = [];
	
	let f1=NOT(rst);
	let f2=NOT(clk);
	let f3=OR(rst,f2);
	let f4=OR(rst,clk);
	
	M[0]=D(f1,f3,M[0]);
	M[1]=D(M[0],f4,M[1]);
	M[2]=D(M[1],f3,M[2]);
	M[3]=D(M[2],f4,M[3]);
	M[4]=D(M[3],f3,M[4]);
	M[5]=D(M[4],f4,M[5]);
	M[6]=D(M[5],f3,M[6]);
	M[7]=D(M[6],f4,M[7]);
	M[8]=D(M[7],f3,M[8]);
	M[9]=D(M[8],f4,M[9]);
	M[10]=D(M[9],f3,M[10]);
	M[11]=D(M[10],f4,M[11]);
	
	let f5=NOT(M[1]);
	let f6=NOT(M[3]);
	let f7=NOT(M[5]);
	let f8=NOT(M[7]);
	let f9=NOT(M[9]);
	let f10=NOT(M[11]);
	
	STEP[0]=OR(rst,f5);
	STEP[1]=AND(M[1],f6);
	STEP[2]=AND(M[3],f7);
	STEP[3]=AND(M[5],f8);
	STEP[4]=AND(M[7],f9);
	STEP[5]=AND(M[9],f10);
	STEP[6]=M[11];
	
	return STEP;
}

