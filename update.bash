#!/usr/bin/env /bin/bash

DOCKER_NAME=discord_mshllhbot;
DOCKER_IMAGE=discord_mshllhbot;

cp -rvf ./quotes /tmp;
git stash;
git pull origin master;
git stash pop;
docker stop  && docker rm ;
docker build -t  .;
docker run -t -d   -v /mnt/c/Users/sagara/Documents/projects/github/mshllhBot/quotes:/usr/src/app/quotes/   --name    
