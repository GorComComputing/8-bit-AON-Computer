# Используем минималистичный базовый образ busybox
FROM busybox

# Указываем, что контейнер будет прослушивать порт 80
EXPOSE 443

# Копируем необходимые файлы и директории в контейнер
RUN mkdir /MEX
COPY MEX12 /MEX
COPY launch.sh /MEX
COPY localhost.crt /MEX
COPY localhost.key /MEX

# Устанавливаем права на выполнение для определенных файлов
RUN chmod +x /MEX/MEX12
RUN chmod +x /MEX/launch.sh

# Устанавливаем рабочую директорию
WORKDIR /MEX

# Определяем команду для запуска скрипта поднимающего MEX12 при старте контейнера
CMD ["./launch.sh"]
