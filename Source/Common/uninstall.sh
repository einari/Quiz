#!/bin/bash

azure servicefabric application delete fabric:/QuizCommon
azure servicefabric application type unregister QuizCommonType 1.0.0
