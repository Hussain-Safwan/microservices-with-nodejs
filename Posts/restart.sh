docker build -t hussaf/posts:latest .
docker push hussaf/posts:latest
kubectl rollout restart deployment posts-depl