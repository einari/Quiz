#!/bin/bash
dotnet restore ./Game.Interfaces/project.json -s ~/ServiceFabricSDK/csharp/packages -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
dotnet build ./Game.Interfaces/project.json

dotnet restore ./Game/project.json -s ~/ServiceFabricSDK/csharp/packages -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
dotnet build ./Game/project.json
dotnet publish ./Game/project.json -o ./QuizBackend/GamePkg/Code

dotnet restore ./Receiver/project.json -s ~/ServiceFabricSDK/csharp/packages -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
dotnet build ./Receiver/project.json
dotnet publish ./Receiver/project.json -o ./QuizBackend/ReceiverPkg/Code
