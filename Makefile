# Project variables
PROJECT_NAME ?= backend
ORG_NAME ?= backend
REPO_NAME ?= amdvl/backend

# Filenames
DEV_COMPOSE_FILE := docker-compose.yml
DEV_PROJECT := amdvl/backend

.PHONY: test build release clean

build:
	${INFO} "Building images ..."
	@ docker-compose -f $(DEV_COMPOSE_FILE) build
	${INFO} "Running tests ..."
	@ docker-compose -f $(DEV_COMPOSE_FILE) up builder
	${INFO} "Testing complete"

clean:
	${INFO} "Destroying development environment ..."
	docker-compose -f $(DEV_COMPOSE_FILE) kill
	docker-compose -f $(DEV_COMPOSE_FILE) rm -f
	docker images -q -f dangling=true -f label=application=$(REPO_NAME) | xargs -I ARGS docker rmi -r ARGS
	# docker rmi $(docker images -f dangling=true q)
	# docker volume rm $(docker volume ls -f dangling=true -q)
	#
	# docker volume rm $(docker volume ls -qf dangling=true)
	# docker rm $(docker ps -a -q)
	${INFO} "Clean complete"

# Cosmetics
YELLOW := "\e[1;33m"
NC := "\e[0m"

# Shell Functions
INFO := @bash -c '\
	printf $(YELLOW); \
	echo "=> $$1"; \
	printf $(NC)' SOME_VALUE
