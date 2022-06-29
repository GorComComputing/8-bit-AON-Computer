;Hello World! на ассемблере 8-bit AON Computer

start:
	JMP print    ;0100 0000 0000 1110   ;40 0E
;Выводимая на экран строка
hello:	db "Hello World!"	            ;48 65 6C 6C 6F 20 57 6F 72 6C 64 21
	
print:
	MOV CX,02h   ;001000 10 0000 0010   ;22 02
	MOV DX,E0h   ;001000 11 1110 0000   ;23 E0

loop:
	LD AX,[CX]   ;0000 10 00            ;08
	ST [DX],AX   ;0001 11 00            ;1C
	
	MOV BX,01h   ;001000 01 0000 0001   ;21 01
	ADD CX,BX    ;1 000 01 10           ;86
	ADD DX,BX    ;1 000 01 11           ;87
	
	JMP loop     ;0100 0000 0001 0010   ;40 12
end start