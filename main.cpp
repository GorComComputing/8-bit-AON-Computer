#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

#define BUFFER_SIZE 1024
#define PORT 8080

// Функция для проверки окончания строки
bool ends_with(const std::string& str, const std::string& suffix) {
    return str.size() >= suffix.size() && 
           str.compare(str.size() - suffix.size(), suffix.size(), suffix) == 0;
}

// Функция для обработки HTTP запросов от клиента
void handle_client(int client_socket) {
    char request_buffer[BUFFER_SIZE];
    ssize_t bytes_received;

    // Чтение HTTP запроса от клиента
    bytes_received = recv(client_socket, request_buffer, BUFFER_SIZE, 0);
    if (bytes_received < 0) {
        std::cerr << "Error reading from socket" << std::endl;
        close(client_socket);
        return;
    }

    // Извлечение URI из HTTP запроса
    std::istringstream request_stream(request_buffer);
    std::string request_line;
    std::getline(request_stream, request_line);

    std::string method, uri, http_version;
    std::istringstream request_line_stream(request_line);
    request_line_stream >> method >> uri >> http_version;

    // Проверка на метод GET
    if (method != "GET") {
        std::cerr << "Unsupported method: " << method << std::endl;
        close(client_socket);
        return;
    }

    // Если URI равен "/", заменяем его на "/index.html"
    if (uri == "/") {
        uri = "/index.html";
    }

    // Убираем начальный слэш из URI
    uri.erase(0, 1);

    // Формируем полный путь к файлу
    std::string file_path = "./www/" + uri;
    std::cerr << file_path << std::endl;

    // Открываем файл
    std::ifstream file(file_path, std::ios::binary);
    if (!file.is_open()) {
        std::cerr << "Failed to open file: " << file_path << std::endl;
        // Отправляем HTTP заголовок об ошибке
        std::string error_response = "HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\nFile not found";
        send(client_socket, error_response.c_str(), error_response.size(), 0);
        close(client_socket);
        return;
    }

    // Отправляем HTTP заголовок клиенту
    std::string response = "HTTP/1.1 200 OK\r\nContent-Type: ";
    if (ends_with(uri, ".html")) {
        response += "text/html\r\n";
    } else if (ends_with(uri, ".css")) {
        response += "text/css\r\n";
    } else if (ends_with(uri, ".js")) {
        response += "application/javascript\r\n";
    } else {
        response += "application/octet-stream\r\n";
    }
    response += "\r\n";
    send(client_socket, response.c_str(), response.size(), 0);

    // Читаем и отправляем содержимое файла по частям
    char buffer[BUFFER_SIZE];
    ssize_t bytes_read;
    while (true) {
        file.read(buffer, BUFFER_SIZE);
        bytes_read = file.gcount();
        if (bytes_read > 0) {
            send(client_socket, buffer, bytes_read, 0);
        }
        if (file.eof()) {
            break;
        }
    }

    // Закрываем файл и соединение с клиентом
    file.close();
    close(client_socket);
}

int main() {
    int server_socket, client_socket;
    struct sockaddr_in server_addr, client_addr;
    socklen_t sin_size = sizeof(struct sockaddr_in);

    // Создаем сокет
    server_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket < 0) {
        std::cerr << "Failed to create socket" << std::endl;
        return 1;
    }

    // Настраиваем структуру сетевого адреса сервера
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT); // Порт 
    server_addr.sin_addr.s_addr = INADDR_ANY;

    // Привязываем сокет к IP и порту
    if (bind(server_socket, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        std::cerr << "Bind failed" << std::endl;
        close(server_socket);
        return 1;
    }

    // Слушаем порт на входящие соединения
    if (listen(server_socket, 10) < 0) {
        std::cerr << "Listen failed" << std::endl;
        close(server_socket);
        return 1;
    }

    std::cout << "Server started on port 8080" << std::endl;

    // Основной цикл сервера
    while (true) {
        // Принимаем входящее соединение
        client_socket = accept(server_socket, (struct sockaddr *)&client_addr, &sin_size);
        if (client_socket < 0) {
            std::cerr << "Accept failed" << std::endl;
            continue;
        }

        // Обрабатываем запрос от клиента в отдельном потоке или процессе
        handle_client(client_socket);
    }

    // Закрываем серверный сокет
    close(server_socket);
    return 0;
}

