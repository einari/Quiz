#!/bin/bash

azure servicefabric application delete fabric:/Game
azure servicefabric application type unregister GameType 1.0.0
