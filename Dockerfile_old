# Используем минималистичный базовый образ ubuntu
FROM ubuntu:latest

# Установка необходимых пакетов, если это требуется
# RUN apt-get update && apt-get install -y <пакеты>

# Указываем, что контейнер будет прослушивать порт 8080
EXPOSE 8080

# Копируем необходимые файлы и директории в контейнер
RUN mkdir /AON
COPY launch.sh AON /AON/
COPY www /AON/www

# Устанавливаем права на выполнение для определенных файлов
RUN chmod +x /AON/AON
RUN chmod +x /AON/launch.sh

# Устанавливаем рабочую директорию
WORKDIR /AON

# Определяем команду для запуска скрипта поднимающего AON при старте контейнера
CMD ["./launch.sh"]
