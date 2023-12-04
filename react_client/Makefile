DOCKER_IMAGE:=client

run_local: node_modules
	PORT=8001 npm start

node_modules:
	npm install

build:
	docker build --tag ${DOCKER_IMAGE} .

run:
	docker run --rm -it --publish 8001:8001 ${DOCKER_IMAGE}