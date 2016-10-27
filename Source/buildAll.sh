#!/bin/bash

# Build Adminitration Frontend
pushd ./Administration/Web
exec ./build.sh
popd

# Build Game Frontend
pushd ./Game/Web
exec ./build.sh
popd

# Build Backend
pushd ./Backend
exec ./build.sh
popd