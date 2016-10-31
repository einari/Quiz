#!/bin/bash
azure servicefabric cluster connect $SERVICEFABRIC_CLUSTER
pushd ./Common
(exec ./uninstall.sh)
popd

pushd ./Administration
(exec ./uninstall.sh)
popd

pushd ./Game
(exec ./uninstall.sh)
popd

pushd ./Backend
(exec ./uninstall.sh)
popd