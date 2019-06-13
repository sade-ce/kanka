 
FROM microsoft/dotnet:2.2-sdk

LABEL author="zinderud"
ENV DOTNET_USE_POLLING_FILE_WATCHER=1
ENV ASPNETCORE_URLS=http://*:5000

WORKDIR /var/www/backend

COPY . .

EXPOSE 5000

CMD ["/bin/bash", "-c", "dotnet restore && dotnet watch run"]