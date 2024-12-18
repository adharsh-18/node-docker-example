#!/bin/bash

echo "Pulling the latest code from GitHub..."
git pull origin main  # Pulls the latest code from the 'main' branch

echo "Building Docker image..."
docker build -t node-app .  # Build the Docker image

echo "Stopping old container..."
docker stop node-app || true  # Stops the old container if it's running

echo "Removing old container..."
docker rm node-app || true  # Removes the old container

echo "Running new container..."
docker run -d -p 3000:3000 --name node-app node-app  # Run the new container
