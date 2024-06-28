#include <iostream>
#include <string>
#include <vector>
#include <cstring>
#include "civetweb.h"

// Функция для проверки окончания строки
bool ends_with(const std::string& str, const std::string& suffix) {
    return str.size() >= suffix.size() && 
           str.compare(str.size() - suffix.size(), suffix.size(), suffix) == 0;
}

// Функция для обработки запросов к статическим файлам
int handle_request(struct mg_connection *conn, void *cbdata) {
    const struct mg_request_info *req_info = mg_get_request_info(conn);
    std::string uri(req_info->local_uri);

    // Путь к файлу
    std::string filepath = "./www" + uri;

    // Открытие файла
    FILE *file = fopen(filepath.c_str(), "rb");
    if (file == nullptr) {
        // Если файл не найден, возвращаем 404
        mg_send_http_error(conn, 404, "File not found");
        return 404;
    }

	std::cout << "BEGIN" << std::endl;

    // Чтение файла по частям и отправка его содержимого
    constexpr size_t buffer_size = 1024; // Размер буфера для чтения
    char buffer[buffer_size];
    size_t bytes_read;
    
    std::cout << buffer << std::endl;

    // Определение MIME-типа
    std::string mime_type;
    if (ends_with(uri, ".html")) {
        mime_type = "text/html";
    } else if (ends_with(uri, ".css")) {
        mime_type = "text/css";
    } else if (ends_with(uri, ".js")) {
        mime_type = "application/javascript";
    } else {
        mime_type = "application/octet-stream";
    }

    // Отправка заголовков
    mg_send_http_ok(conn, mime_type.c_str(), -1); // -1 для передачи частями

    // Чтение файла по частям и отправка его содержимого
    while ((bytes_read = fread(buffer, 1, buffer_size, file)) > 0) {
        mg_write(conn, buffer, bytes_read);
    }

    fclose(file);
    
    std::cout << "END" << std::endl;

    return 200;
}

int main(int argc, char *argv[]) {
    const char *options[] = {
        "document_root", ".",  // Корневая директория для раздачи файлов
        "listening_ports", "8080",  // Порт для прослушивания
        nullptr
    };

    // Создание и запуск сервера
    struct mg_callbacks callbacks;
    memset(&callbacks, 0, sizeof(callbacks));
    struct mg_context *ctx = mg_start(&callbacks, nullptr, options);

    // Обработчик запросов
    mg_set_request_handler(ctx, "/", handle_request, nullptr);

    std::cout << "Server started on port 8080" << std::endl;

    // Ожидание завершения работы сервера
    std::string dummy;
    std::getline(std::cin, dummy);

    // Остановка сервера
    mg_stop(ctx);

    return 0;
}

