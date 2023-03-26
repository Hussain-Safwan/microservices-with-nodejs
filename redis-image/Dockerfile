# Use existing image as base to create
FROM alpine

# Download and install dependencies
RUN apk add --update redis
RUN apk add --update gcc

# Tell the image what to do when it starts up as a container
CMD ["redis-server"]