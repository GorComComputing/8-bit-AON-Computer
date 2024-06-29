# Указываем минимальную версию CMake
cmake_minimum_required(VERSION 3.10)

# Название проекта
project(AON)

# Устанавливаем стандарт C++
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Добавляем исполняемый файл
add_executable(AON main.cpp)

