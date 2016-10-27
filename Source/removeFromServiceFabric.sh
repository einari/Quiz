#!/bin/bash
azure servicefabric cluster connect $SERVICEFABRIC_CLUSTER
(exec ./Common/uninstall.sh)
(exec ./Administration/uninstall.sh)
(exec ./Game/uninstall.sh)
(exec ./Backend/uninstall.sh)