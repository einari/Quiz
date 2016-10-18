#!/bin/bash

azure servicefabric application delete fabric:/QuizBackend
azure servicefabric application type unregister QuizBackendType 1.0.0
