#!/bin/bash

azure servicefabric application package copy QuizAdministration fabric:ImageStore
azure servicefabric application type register QuizAdministration
azure servicefabric application create fabric:/QuizAdministration  QuizAdministrationType 1.0.0


