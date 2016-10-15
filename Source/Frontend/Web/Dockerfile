#FROM ubuntu:14.04
FROM microsoft/dotnet:1.0-core
COPY bin/Debug/netcoreapp1.0/publish/. /app
WORKDIR /app
EXPOSE 5000/tcp
CMD ["dotnet", "Web.dll", "--server.urls", "http://*:5000"]
#ENTRYPOINT dotnet Web.dll --server.urls http://*:50000
