#!/bin/sh

# Cкрипт предназначен для проверки и перезапуска сервера "MEX12", если он не работает.

while true
do
	# Проверяем, запущен ли процесс MEX12
	if ! pgrep -x "MEX12" > /dev/null
	then
    	killall MEX12					# Завершение всех процессов "MEX12"
		chmod +x /MEX/MEX12 			# Установка права на выполнение для файла
    	sleep 1  						# Ожидание 1 секунду
    	/MEX/MEX12 &  					# Запускаем MEX12 в фоновом режиме
	fi

	sleep 1								# Ожидание 1 секунду перед следующей проверкой

done