FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /app
COPY *.csproj ./
RUN dotnet restore backend.csproj
COPY . ./
RUN dotnet publish backend.csproj -c Release -o out
FROM microsoft/dotnet:2.1-aspnetcore-runtime AS runtime
WORKDIR /app
COPY — from=build /app/out .
ENTRYPOINT [“dotnet”, backend.dll”]