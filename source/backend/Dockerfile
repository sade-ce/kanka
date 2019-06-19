 
FROM microsoft/dotnet:2.2-sdk

LABEL author="zinderud"
ENV DOTNET_USE_POLLING_FILE_WATCHER=1
ENV ASPNETCORE_URLS=http://*:5000

WORKDIR /var/www/backend

COPY . .
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]
EXPOSE 5000
RUN chmod +x ./entrypoint.sh
CMD /bin/bash ./entrypoint.sh
RUN dotnet build "backend.csproj" -c Release -o /app



 
CMD  ["/bin/bash", "-c", " dotnet watch run"]
# docker build -t backend .
# docker run   -p 5000:5000 backend:latest

# Option 1
# Start PostgreSQL and ASP.NET Core (link ASP.NET core to ProgreSQL container with legacy linking)
 
# docker run -d  --name my-postgres -p 5432:5432  -e POSTGRES_PASSWORD=password postgres 
# docker run -d -p 5432:5432 --name my-postgres -e POSTGRES_PASSWORD=password postgres
# docker run -d -p 5000:5000 --link my-postgres:postgres backend
