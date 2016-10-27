#!/bin/bash
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
docker push $DOCKER_TARGETACCOUNT/quizadministrationweb
docker push $DOCKER_TARGETACCOUNT/quizgameweb
