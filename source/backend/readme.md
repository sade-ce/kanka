#dockerfile kullanımı

docker build -t backend .

docker image ls
docker run  --name backend --env ASPNETCORE_ENVIRONMENT=Development -p 5000:5000 backend:lastest