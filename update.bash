#!/usr/bin/env /bin/bash

DOCKER_NAME=discord_mshllhbot;
DOCKER_IMAGE=discord_mshllhbot;

cp -rvf ./quotes /tmp;
git stash;
git pull origin master;
git stash pop;
docker stop ${DOCKER_NAME} && docker rm ${DOCKER_NAME};
docker build -t ${DOCKER_IMAGE} .;
docker run -t -d -v ${PWD}/quotes:/usr/src/app/quotes/ --name ${DOCKER_NAME} ${DOCKER_IMAGE};
