#!/bin/bash
azure servicefabric cluster connect $SERVICEFABRIC_CLUSTER
pushd ./Common
(exec ./install.sh)
popd

pushd ./Administration
(exec ./install.sh)
popd

pushd ./Game
(exec ./install.sh)
popd

pushd ./Backend
(exec ./install.sh)
popd