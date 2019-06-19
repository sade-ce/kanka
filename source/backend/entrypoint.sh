
until dotnet ef -s backend -p backend database update; do
>&2 echo "DB is starting up"
sleep 1
done

>&2 echo "DB is up - executing command"
exec $run_cmd
