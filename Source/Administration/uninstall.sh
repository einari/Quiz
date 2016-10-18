#!/bin/bash

azure servicefabric application delete fabric:/QuizAdministration
azure servicefabric application type unregister QuizAdministrationType 1.0.0
