;Hello World! на ассемблере 8-bit AON Computer

start:
	JMP print    ;0100 0000 0001 0110   ;40 16
;Выводимая на экран строка
hello:	db "Starting Gor.Com...",0	    ;53 74 61 72 74 69 6E 67 20 47 6F 72 2E 43 6F 6D 2E 2E 2E 00
	
print:			 ;16:
	MOV CX,02h   ;001000 10 0000 0010   ;22 02
	MOV DX,E0h   ;001000 11 1110 0000   ;23 E0

start_loop:		 ;1A:
	LD AX,[CX]   ;0000 10 00            ;08
	XOR BX,BX	 ;1110 01 01			;E5
	CMP AX,BX	 ;1111 00 01			;F1
	JE end_loop	 ;0101 0010 0010 0110	;52 26
	ST [DX],AX   ;0001 11 00            ;1C
	
	MOV BX,01h   ;001000 01 0000 0001   ;21 01
	ADD CX,BX    ;1 000 01 10           ;86
	ADD DX,BX    ;1 000 01 11           ;87
	
	JMP start_loop;0100 0000 0001 1010   ;40 1A
	
end_loop:		;26:
	;MOV AX,53h
	;MOV DX,FFFFh
	;ST [DX],AX
	JMP $		;0100 0000 0010 0110	;40 26
end start