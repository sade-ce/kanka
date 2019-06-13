#dockerfile kullanımı

docker build -t backend .

docker image ls
docker run  --name backend --env ASPNETCORE_ENVIRONMENT=Development -p 8000:80 backend:lastest