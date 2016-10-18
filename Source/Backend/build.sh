#!/bin/bash
DIR=`dirname $0`
dotnet restore $DIR/../Backend/src/Backend/Game/project.json -s ~/ServiceFabricSDK/csharp/packages -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
dotnet build $DIR/../Backend/src/Backend/Game/project.json
dotnet publish $DIR/../Backend/src/Backend/Game/project.json -o $DIR/../Backend/Backend/GamePkg/Code
