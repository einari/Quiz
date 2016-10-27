#!/bin/bash
docker login -u="$1" -p="$2"
docker push $3/quizadministrationweb
docker push $3/quizgameweb
