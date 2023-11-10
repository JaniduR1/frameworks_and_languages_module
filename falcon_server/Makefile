DOCKER_IMAGE:=server

build:
	docker build --tag falcon_server .

run:
	docker run --rm --publish 8000:8000 falcon_server