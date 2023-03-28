docker build -t hussaf/event-bus:latest .
docker push hussaf/event-bus:latest
kubectl rollout restart deployment event-bus-depl