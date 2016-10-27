#!/bin/bash
azure servicefabric cluster connect $SERVICEFABRIC_CLUSTER
(exec ./Common/install.sh)
(exec ./Administration/install.sh)
(exec ./Game/install.sh)
(exec ./Backend/install.sh)