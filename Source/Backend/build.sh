#!/bin/bash
dotnet restore ./Game/project.json -s ~/ServiceFabricSDK/csharp/packages -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
dotnet build ./Game/project.json
dotnet publish ./Game/project.json -o ./QuizBackend/GamePkg/Code
