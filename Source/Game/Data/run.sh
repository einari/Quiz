#!/bin/bash
docker run -d -p 27017:27017 -v /private:/data/db --name mongodb einari/mongodb