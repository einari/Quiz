#!/bin/bash

azure servicefabric application package copy QuizCommon fabric:ImageStore
azure servicefabric application type register QuizCommon
azure servicefabric application create fabric:/QuizCommon  QuizCommonType 1.0.0


