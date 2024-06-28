package main

import (
    "log"
    "net/http"
    "os"
)

func main() {
    // Директория, откуда будут раздаваться файлы
    fs := http.FileServer(http.Dir("www"))

    // Обработчик для корневого пути, который раздает файлы из директории www
    http.Handle("/", fs)

    // Запуск веб-сервера на порту 8080
    port := "8080"
    if fromEnv := os.Getenv("PORT"); fromEnv != "" {
        port = fromEnv
    }
    log.Printf("Server starting on port %s\n", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}

