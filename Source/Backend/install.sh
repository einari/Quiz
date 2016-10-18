#!/bin/bash

azure servicefabric application package copy QuizBackend fabric:ImageStore
azure servicefabric application type register QuizBackend
azure servicefabric application create fabric:/QuizBackend  QuizBackendType 1.0.0


