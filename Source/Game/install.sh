#!/bin/bash

azure servicefabric application package copy QuizGame fabric:ImageStore
azure servicefabric application type register QuizGame
azure servicefabric application create fabric:/QuizGame  QuizGameType 1.0.0


