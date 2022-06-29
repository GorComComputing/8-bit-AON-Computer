//Синтаксический анализатор языка Oberon

function Compile(){
	console.log("Compile");
	nextCh();
	while(ch!=chEOT){
		nextCh();
	}
}