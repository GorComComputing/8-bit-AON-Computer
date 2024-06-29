//8-битный регистр ACC (работает с АЛУ)
function RegisterACC4(set,enable,bus1) {
	let RES = [0,0,0,0,0,0,0,0];
	let CODO = [];
	let TMP1 = [];
	
	CODO=Decod3x8(CODI);
	
	TMP1=BUS1(TMP,bus1);
	
	F2=XOR4(BUS,TMP1);
	F3=OR4(BUS,TMP1);
	F4=AND4(BUS,TMP1);
	F5=NOT4(BUS);
	F6=SHL4(BUS,FL[0]);          //F=[0,0,0,0]; //CAEZ 
	F7=SHR4(BUS,FL[0]);          //F=[0,0,0,0]; //CAEZ 
	F8=ADD4(BUS,TMP1,FL[0]);     //F=[0,0,0,0]; //CAEZ 
	
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
	
	//Сохраняем в регистр ACC результат АЛУ
	ACC[0]=D(RES[0],set,ACC[0]);
	ACC[1]=D(RES[1],set,ACC[1]);
	ACC[2]=D(RES[2],set,ACC[2]);
	ACC[3]=D(RES[3],set,ACC[3]);
	ACC[4]=D(RES[4],set,ACC[4]);
	ACC[5]=D(RES[5],set,ACC[5]);
	ACC[6]=D(RES[6],set,ACC[6]);
	ACC[7]=D(RES[7],set,ACC[7]);

	BUS[0]=Mult2x1(BUS[0],ACC[0],enable);
	BUS[1]=Mult2x1(BUS[1],ACC[1],enable);
	BUS[2]=Mult2x1(BUS[2],ACC[2],enable);
	BUS[3]=Mult2x1(BUS[3],ACC[3],enable);
	BUS[4]=Mult2x1(BUS[4],ACC[4],enable);
	BUS[5]=Mult2x1(BUS[5],ACC[5],enable);
	BUS[6]=Mult2x1(BUS[6],ACC[6],enable);
	BUS[7]=Mult2x1(BUS[7],ACC[7],enable);

	//Сохраняем в регистр FL (флаги) результат АЛУ
	FL[0]=D(F8[8],set,FL[0]);
	//FL[1]=D(RES[1],set,FL[1]);
	//FL[2]=D(RES[2],set,FL[2]);
	//FL[3]=D(RES[3],set,FL[3]);
//console.warn("FL[C]: "+FL[0]);
	
	
//	RES[4]=//larger
//	RES[5]=//equal
//	RES[6]=//zero
//	RES[7]=//carry out

			document.querySelector("#ACC").textContent = ""+paddy(bin2hex(ACC),2);	
			document.querySelector("#flag-C").textContent = ""+FL[0];
			document.querySelector("#flag-A").textContent = ""+FL[1];
			document.querySelector("#flag-E").textContent = ""+FL[2];
			document.querySelector("#flag-Z").textContent = ""+FL[3];
}