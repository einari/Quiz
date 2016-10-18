#!/bin/bash

azure servicefabric application delete fabric:/Backend
azure servicefabric application type unregister BackendType 1.0.0
