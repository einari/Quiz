#!/bin/bash

azure servicefabric application delete fabric:/QuizGame
azure servicefabric application type unregister QuizGameType 1.0.0
