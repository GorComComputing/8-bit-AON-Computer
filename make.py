#!/usr/bin/python3
import subprocess
import sys
#import secret
import docker
import os
#import tests

# git clone https://gorcom2012@bitbucket.org/p4p_service/market_tv.git
#userGit = "gorcom2012"
#repoGit = "p4p_service/market_tv"
container_name = "mex12"
image_name = "mex12"
ports = {"6010/tcp": 443}


# Удалить __pycache__
def del_pycache():	
	subprocess.run(["rm", "-r", "__pycache__"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	
	
# Вывод сообщения об ошибке
def print_error_message():
    print("Выбери один из параметров:")
    print("  make    - собрать веб-сервер")
    print("  ssl     - создать сертификат SSL")
    print("  git     - commit to Bitbucket")
    print("  docker  - создать Docker контейнер")
    print("  stop  	 - остановить Docker контейнер")
    
    
# Выполнить команду make
def make_command(command, directory=None):
    cmd = ["make"]
    if directory:
        cmd.extend(["-C", directory])
    subprocess.run(cmd)
    print(f"MAKE   {command} OK")
	
	
# Найти контейнер по имени
def find_container(container_name):
	client = docker.from_env()
	list_container = client.containers.list()
	print(list_container)
	
	if not list_container:
            print(f"Контейнер с именем '{container_name}' не найден.")
            return
	
	for id in list_container:
		container = client.containers.get(id)
		print(container.attrs['Config']['Image'])
		
		if container.attrs['Config']['Image'] == container_name:
			container.stop()
			print(f"Контейнер с именем '{container_name}' найден.")
	
	
def run_container_by_name(container_name):
	client = docker.from_env()
	try:
		client.containers.run(container_name)
		# Для запуска в фоновом режиме
		#client.containers.run(container_name, detach=True)
		print(f"Контейнер '{container_name}' успешно запущен.")
	except docker.errors.NotFound:
		print(f"Контейнер с именем '{container_name}' не найден.")
	except docker.errors.APIError as e:
		print(f"Произошла ошибка при запуске контейнера: {e}")
	finally:
		client.close()
		
		
def run_container_in_background(image_name, container_name, ports):
    client = docker.from_env()
    try:
        # Запускаем контейнер в фоновом режиме с пробросом портов
        container = client.containers.run(
            image_name,
            name=container_name,
            ports=ports,
            detach=True,
            auto_remove=True
        )
        print(f"Контейнер '{container_name}' успешно запущен в фоновом режиме.")
    except docker.errors.ImageNotFound:
        print(f"Образ с именем '{image_name}' не найден.")
    except docker.errors.APIError as e:
        print(f"Произошла ошибка при запуске контейнера: {e}")
    finally:
        client.close()
	
	
def stop_containers_by_name(container_name):
    client = docker.from_env()
    try:
        # Получаем список всех контейнеров (включая остановленные)
        containers = client.containers.list(all=True, filters={"name": container_name})
        
        if not containers:
            print(f"Контейнеры с именем '{container_name}' не найдены.")
            return

        # Останавливаем все найденные контейнеры
        for container in containers:
            container_id = container.id
            container.stop()
            print(f"Контейнер с ID {container_id} и именем '{container_name}' успешно остановлен.")
    except docker.errors.APIError as e:
        print(f"Произошла ошибка при остановке контейнеров: {e}")
    finally:
        client.close()
		
		
def remove_containers_by_name(container_name):
    client = docker.from_env()
    try:
        # Получаем список всех контейнеров с заданным именем
        containers = client.containers.list(filters={"name": container_name})
        
        if not containers:
            print(f"Контейнеры с именем '{container_name}' не найдены.")
            return

        # Останавливаем и удаляем все найденные контейнеры
        for container in containers:
            container_id = container.id
            container.stop()
            container.remove(force=True)
            print(f"Контейнер с ID {container_id} и именем '{container_name}' успешно остановлен и удален.")
    except docker.errors.APIError as e:
        print(f"Произошла ошибка при остановке и удалении контейнеров: {e}")
    finally:
        client.close()
        
        
def remove_all_exited_containers():
    client = docker.from_env()
    try:
        # Получаем список всех контейнеров с фильтром по статусу 'exited'
        containers = client.containers.list(all=True, filters={"status": "exited"})
        
        if not containers:
            print("Нет завершенных контейнеров для удаления.")
            return

        # Удаляем все найденные завершенные контейнеры
        for container in containers:
            container_id = container.id
            container.remove()
            print(f"Контейнер с ID {container_id} успешно удален.")
    except docker.errors.APIError as e:
        print(f"Произошла ошибка при удалении контейнеров: {e}")
    finally:
        client.close()
        
        
def remove_created_containers():
    client = docker.from_env()
    try:
        # Получаем список всех контейнеров с фильтром по статусу "Created"
        containers = client.containers.list(filters={"status": "created"})
        
        if not containers:
            print("Нет контейнеров со статусом 'Created' для удаления.")
            return

        # Удаляем все найденные контейнеры
        for container in containers:
            container_id = container.id
            container.remove(force=True)
            print(f"Контейнер с ID {container_id} успешно удален.")
    except docker.errors.APIError as e:
        print(f"Произошла ошибка при удалении контейнеров: {e}")
    finally:
        client.close()
        
        
def remove_image_by_name(image_name):
    client = docker.from_env()
    try:
        # Получаем список всех образов
        images = client.images.list(name=image_name)
        
        if not images:
            print(f"Образ с именем '{image_name}' не найден.")
            return

        # Удаляем все найденные образы
        for image in images:
            client.images.remove(image.id, force=True)
            print(f"Образ '{image_name}' с ID {image.id} успешно удален.")
    except docker.errors.ImageNotFound:
        print(f"Образ с именем '{image_name}' не найден.")
    except docker.errors.APIError as e:
        print(f"Произошла ошибка при удалении образа: {e}")
    finally:
        client.close()
        
     
def remove_dangling_images():
    client = docker.from_env()
    try:
        # Получаем список всех "dangling" образов
        dangling_images = client.images.list(filters={"dangling": True})
        
        if not dangling_images:
            print("Нет 'dangling' образов для удаления.")
            return

        # Удаляем все найденные 'dangling' образы
        for image in dangling_images:
            image_id = image.id
            client.images.remove(image_id)
            print(f"Образ с ID {image_id} успешно удален.")
    except docker.errors.APIError as e:
        print(f"Произошла ошибка при удалении образов: {e}")
    finally:
        client.close()
        
    
def build_container_from_dockerfile(path_to_dockerfile_directory, tag_name):
    client = docker.from_env()
    try:
        # Проверяем, существует ли указанный путь
        if not os.path.exists(path_to_dockerfile_directory):
            print(f"Указанный путь '{path_to_dockerfile_directory}' не существует.")
            return

        # Собираем образ из Dockerfile
        print(f"Начинаем сборку образа с тегом '{tag_name}' из директории '{path_to_dockerfile_directory}'...")
        image, logs = client.images.build(path=path_to_dockerfile_directory, tag=tag_name)
        
        # Выводим логи сборки
        for log in logs:
            if 'stream' in log:
                print(log['stream'].strip())
        
        print(f"Образ с тегом '{tag_name}' успешно собран.")
    except docker.errors.BuildError as e:
        print(f"Ошибка при сборке образа: {e}")
    except docker.errors.APIError as e:
        print(f"Произошла ошибка при взаимодействии с Docker API: {e}")
    finally:
        client.close()
        
        
def run_docker_compose(compose_file='docker-compose.yml'):
    try:
        # Формируем команду для запуска Docker Compose
        command = ['docker-compose', '-f', compose_file, 'up', '-d']
        
        # Выполняем команду
        result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Выводим результат выполнения команды
        print(result.stdout.decode())
        print(result.stderr.decode())
        
        print("Docker Compose запущен успешно")
    except subprocess.CalledProcessError as e:
        print("Ошибка при запуске Docker Compose:")
        print(e.stderr.decode())
        
        
def stop_docker_compose(compose_file_path):
	subprocess.run(["docker-compose", "down", "-v"])
	print("OK: docker-compose DOWN")
    

if len(sys.argv) != 2 and not (len(sys.argv) == 3 and sys.argv[1] == "git"):
    print_error_message()
    del_pycache()
    sys.exit(1)

valid_commands = [
				  "make",
				  "ssl", 
				  "git", 
				  "docker",
				  "stop",
				  ]
				  
command = sys.argv[1]
if command not in valid_commands:
    print_error_message()
    del_pycache()
    sys.exit(1)

if (sys.argv[1] == "make"):
	# Сборка сервера
    make_command("8-bit-AON", "./")
    
    
elif command == "ssl":
	# Сгенерировать сертификаты SSL
	subprocess.run(["chmod", "+x", "openssl.sh"])
	subprocess.run(["./openssl.sh"])
	print("OK: SSL generated")
		
    
elif command == "git":
    # Git commit to GitHub
    subprocess.run(["git", "add", "."])
    print("OK: git add .")
    
    if len (sys.argv) < 3:
        comment = "-//-"
    else:
        comment = sys.argv[2]
    subprocess.run(["git", "commit", "-m", comment])
    print("OK: git commit -m \"{0}\"".format(comment))
    
    #subprocess.run(["git", "push", "https://{0}@bitbucket.org/{1}/{2}.git".format(secret.tokenGit, userGit, repoGit)])
    #print("OK: git push to {0}".format(repoGit))
#    subprocess.run(["git", "push"])
#    print("OK: git push to Bitbucket")


elif command == "docker":
	# Сборка сервера
	make_command("MEX", "./")
	# Создание Docker контейнера
	stop_docker_compose('./docker-compose.yml')
	remove_containers_by_name(container_name)
	remove_created_containers()
	remove_all_exited_containers()
	remove_image_by_name(image_name)
	remove_dangling_images()
	build_container_from_dockerfile("./", image_name)
	#run_container_in_background(image_name, container_name, ports)
	run_docker_compose()
    
   
elif command == "stop":
	# Остановить контейнер Docker
	remove_containers_by_name(container_name)
	remove_created_containers()
	remove_all_exited_containers()
	#remove_image_by_name(image_name)
	remove_dangling_images()

	
else:
    print_error_message()
    del_pycache()
    sys.exit(1)
    
del_pycache()

	
	

	
