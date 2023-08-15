all: build up

build:
	docker-compose -f ./docker-compose.yaml build

up:
	docker-compose -f ./docker-compose.yaml up -d

run:
	docker-compose -f ./docker-compose.yaml up

down:
	docker-compose -f ./docker-compose.yaml down

fdown:
	docker stop $$(docker ps -a -q)
	docker rm $$(docker ps -a -q)
	docker rmi -f $$(docker images -a -q)
	docker system prune -a -f

db:
	docker-compose -f ./docker-compose.yaml up -d db

dbdown:
	docker-compose -f ./docker-compose.yaml stop db

vclean:
	docker volume rm $$(docker volume ls -qf dangling=true)